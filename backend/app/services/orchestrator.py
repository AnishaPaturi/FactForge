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

        # 🔥 STEP 1: GET STANCES
        raw_stances = classify_source_stance(claim, evidence)

        # 🔥 STEP 2: CLEAN + FIX STANCES (CRITICAL)
        cleaned_stances = []
        for i in range(len(evidence)):
            if raw_stances and i < len(raw_stances):
                val = str(raw_stances[i]).strip().capitalize()

                if val not in ["Agree", "Disagree", "Neutral"]:
                    val = "Neutral"
            else:
                val = "Neutral"

            cleaned_stances.append(val)

        stances = cleaned_stances

        # 🔥 STEP 3: AGREEMENT
        agreement_data = compute_agreement_score(stances, evidence)

        # 🔥 STEP 4: ATTACH STANCE TO SOURCES
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