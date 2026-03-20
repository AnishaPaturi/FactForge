import requests
from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME

def extract_claims(text: str):
    prompt = f"""
Extract atomic, verifiable claims from the following text.
Return ONLY a JSON array of strings.

Text:
{text}
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
        return [content]  # fallback