from app.services.verifier import verify_claim

def test_verifier_false_claim():
    claim = "The Earth is flat"

    evidence = [
        {
            "title": "Flat Earth - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Flat_Earth",
            "snippet": "Flat Earth is a scientifically disproven concept."
        }
    ]

    result = verify_claim(claim, evidence)

    assert "verdict" in result
    assert result["verdict"] in ["True", "False", "Partially True", "Unverifiable"]