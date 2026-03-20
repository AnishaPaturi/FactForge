from app.services.claim_extractor import extract_claims

def test_claim_extraction_basic():
    text = "The capital of Australia is Sydney. The Earth is round."
    
    claims = extract_claims(text)

    assert isinstance(claims, list)
    assert len(claims) >= 2
    assert any("Sydney" in claim for claim in claims)
    assert any("Earth" in claim for claim in claims)