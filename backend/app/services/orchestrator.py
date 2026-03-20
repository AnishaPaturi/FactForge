from app.services.claim_extractor import extract_claims
from app.services.search_service import search_claim
from app.services.verifier import verify_claim
from app.services.ai_detector import detect_ai

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
            "sources": evidence
        })

    return {
        "ai_detection": ai_score,
        "claims": results
    }