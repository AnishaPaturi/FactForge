import requests
from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME

def verify_claim(claim: str, evidence: list):
    prompt = f"""
Claim: {claim}

Evidence:
{evidence}

Classify the claim as:
True / False / Partially True / Unverifiable

Return JSON:
{{
  "verdict": "",
  "confidence": 0-100,
  "explanation": ""
}}
"""

    response = requests.post(
        f"{OPENROUTER_BASE_URL}/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": MODEL_NAME,
            "messages": [{"role": "user", "content": prompt}],
        },
    )

    content = response.json()["choices"][0]["message"]["content"]

    try:
        import json
        return json.loads(content)
    except:
        return {
            "verdict": "Unverifiable",
            "confidence": 50,
            "explanation": content
        }