from app.services.claim_extractor import extract_claims
from app.services.search_service import search_claim
from app.services.verifier import verify_claim

def run_pipeline(text: str):
    claims = extract_claims(text)

    results = []

    for claim in claims:
        evidence = search_claim(claim)
        verification = verify_claim(claim, evidence)

        results.append({
            "claim": claim,
            "verdict": verification["verdict"],
            "confidence": verification["confidence"],
            "explanation": verification["explanation"],
            "sources": evidence
        })

    return {"claims": results}