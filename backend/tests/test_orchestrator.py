from app.services.orchestrator import run_pipeline

def test_pipeline_output_structure():
    text = "The Earth is flat."

    result = run_pipeline(text)

    assert "claims" in result
    assert isinstance(result["claims"], list)

    if result["claims"]:
        claim = result["claims"][0]

        assert "claim" in claim
        assert "verdict" in claim
        assert "confidence" in claim
        assert "explanation" in claim
        assert "sources" in claim

def test_pipeline_false_claim():
    text = "The Earth is flat."

    result = run_pipeline(text)

    claims = result["claims"]

    assert len(claims) > 0
    assert claims[0]["verdict"] in ["False", "Partially True"]