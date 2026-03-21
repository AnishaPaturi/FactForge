from app.services.claim_extractor import extract_claims
from app.services.search_service import search_claim
from app.services.verifier import verify_claim, classify_source_stance, compute_agreement_score
from app.services.ai_detector import detect_ai
from app.services.db_service import save_result
from urllib.parse import urlparse


def run_pipeline(text: str):
    ai_score = detect_ai(text)

    claims = extract_claims(text)
    results = []

    for claim in claims:
        claim = claim.strip().rstrip(".")
        evidence = search_claim(claim)

        if not evidence:
            results.append({
                "claim": claim,
                "verdict": "Unverifiable",
                "confidence": 0,
                "explanation": "No evidence found",
                "sources": [],
                "source_analysis": None
            })
            continue

        verification = verify_claim(claim, evidence)

        # 🔥 STEP 1: GET RAW STANCES
        raw_stances = classify_source_stance(claim, evidence)

        # 🔥 STEP 2: STRONG HYBRID CLEANING
        cleaned_stances = []

        negative_keywords = [
            "myth", "false", "not visible", "cannot be seen",
            "not true", "incorrect", "no evidence", "debunked",
            "misconception", "not possible", "never"
        ]

        positive_keywords = [
            "true", "correct", "confirmed", "proven", "visible", "yes"
        ]

        for i in range(len(evidence)):
            # 🔥 USE ALL AVAILABLE TEXT (BIG FIX)
            content = " ".join([
                evidence[i].get("title", ""),
                evidence[i].get("snippet", ""),
                evidence[i].get("content", "")
            ]).lower()

            # 🔥 RULE 1: KEYWORD OVERRIDE (STRONG)
            if any(k in content for k in negative_keywords):
                val = "Disagree"
            elif any(k in content for k in positive_keywords):
                val = "Agree"

            else:
                # 🔥 RULE 2: LLM FALLBACK
                if raw_stances and i < len(raw_stances):
                    val = str(raw_stances[i]).strip().capitalize()

                    if val not in ["Agree", "Disagree", "Neutral"]:
                        val = "Neutral"
                else:
                    val = "Neutral"

            # 🔥 RULE 3: FINAL SAFETY OVERRIDE
            if val == "Neutral":
                if any(k in content for k in negative_keywords):
                    val = "Disagree"
                elif any(k in content for k in positive_keywords):
                    val = "Agree"

            cleaned_stances.append(val)

        stances = cleaned_stances

        # 🔥 STEP 3: AGREEMENT
        agreement_data = compute_agreement_score(stances, evidence)

        # 🔥 STEP 4: FORMAT SOURCES
        formatted_sources = []
        for i, src in enumerate(evidence):
            formatted_sources.append({
                "label": src.get("label") or urlparse(src["url"]).netloc.replace("www.", ""),
                "url": src["url"],
                "snippet": src.get("snippet", ""),
                "score": src.get("score", 0),
                "stance": stances[i]
            })

        results.append({
            "claim": claim,
            "verdict": verification["verdict"],
            "confidence": verification["confidence"],
            "explanation": verification["explanation"],
            "source_analysis": agreement_data,
            "sources": formatted_sources
        })

    final_output = {
        "ai_detection": ai_score,
        "claims": results
    }

    save_result(text, final_output)

    return final_output