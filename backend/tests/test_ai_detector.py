from app.services.ai_detector import detect_ai

def test_ai_detection_runs():
    text = "Artificial intelligence is transforming industries."

    result = detect_ai(text)

    assert "ai_probability" in result
    assert 0 <= result["ai_probability"] <= 100