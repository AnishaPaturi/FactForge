from app.services.claim_extractor import extract_claims
from app.services.search_service import search_claim
from app.services.topic_detector import detect_topic
from app.services.bias_indicator import generate_warning

from app.services.verifier import (
    verify_claim,
    classify_source_stance,
    compute_agreement_score,
)
from app.services.ai_detector import detect_ai
from app.services.db_service import save_result
from urllib.parse import urlparse


def run_pipeline(text: str):
    # 🔥 AI DETECTION
    ai_score = detect_ai(text)

    # 🔥 NEW: TOPIC DETECTION + WARNING
    topic = detect_topic(text)
    warning = generate_warning(topic)

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

        # 🔥 VERIFY CLAIM
        verification = verify_claim(claim, evidence)
        verdict = verification["verdict"]

        # 🔥 GET RAW STANCES (LLM)
        raw_stances = classify_source_stance(claim, evidence)

        # 🔥 KEYWORDS
        negative_keywords = [
            "myth", "false", "not visible", "cannot be seen",
            "not true", "incorrect", "no evidence", "debunked",
            "misconception", "not possible", "never"
        ]

        positive_keywords = [
            "true", "correct", "confirmed", "proven", "visible", "yes"
        ]

        cleaned_stances = []

        # 🔥 MAIN LOOP
        for i in range(len(evidence)):
            content = " ".join([
                evidence[i].get("title", ""),
                evidence[i].get("snippet", ""),
                evidence[i].get("content", "")
            ]).lower()

            val = "Neutral"

            # ✅ RULE 1: KEYWORD OVERRIDE
            if any(k in content for k in negative_keywords):
                val = "Disagree"
            elif any(k in content for k in positive_keywords):
                val = "Agree"

            # ✅ RULE 2: LLM FALLBACK
            elif raw_stances and i < len(raw_stances):
                val = str(raw_stances[i]).strip().capitalize()
                if val not in ["Agree", "Disagree", "Neutral"]:
                    val = "Neutral"

            # ✅ RULE 3: VERDICT ALIGNMENT
            if val == "Neutral":
                if verdict == "False":
                    val = "Disagree"
                elif verdict == "True":
                    val = "Agree"

            cleaned_stances.append(val)

        stances = cleaned_stances

        # 🔥 AGREEMENT SCORE
        agreement_data = compute_agreement_score(stances, evidence) or {
            "counts": {"agree": 0, "disagree": 0, "neutral": 0},
            "agreement_score": 0,
            "insight": "No agreement data available"
        }

        # 🔥 FORMAT SOURCES
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

    # 🔥 FINAL OUTPUT (UPDATED)
    final_output = {
        "ai_detection": ai_score,
        "topic": topic,          # ✅ NEW
        "warning": warning,      # ✅ NEW
        "claims": results
    }

    save_result(text, final_output)
    # print("FINAL OUTPUT:", final_output)

    return final_output