from app.services.claim_extractor import extract_claims
from app.services.search_service import search_claim
from app.services.verifier import verify_claim
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
                "sources": []
            })
            continue

        verification = verify_claim(claim, evidence)

        results.append({
            "claim": claim,
            "verdict": verification["verdict"],
            "confidence": verification["confidence"],
            "explanation": verification["explanation"],
            "sources": [
                {
                    "label": src.get("label") or urlparse(src["url"]).netloc.replace("www.", ""),
                    "url": src["url"],
                    "score": src.get("score", 0)
                }
                for src in evidence
            ]
        })

    final_output = {
        "ai_detection": ai_score,
        "claims": results
    }

    save_result(text, final_output)

    return final_output