import json
from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
from app.utils.helpers import safe_request

def detect_ai(text: str):
    prompt = f"""
Analyze the following text and estimate probability that it was AI-generated.

Return JSON:
{{
  "ai_probability": 0-100,
  "reason": ""
}}

Text:
{text}
"""

    response = safe_request(
        f"{OPENROUTER_BASE_URL}/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json_data={
            "model": MODEL_NAME,
            "messages": [{"role": "user", "content": prompt}],
        },
    )

    if not response:
        return {"ai_probability": 50, "reason": "Detection failed"}

    content = response["choices"][0]["message"]["content"]

    try:
        return json.loads(content)
    except:
        return {"ai_probability": 50, "reason": content}