
import re
import json
from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
from app.utils.helpers import load_prompt, safe_request

def extract_claims(text: str):
    template = load_prompt("app/prompts/extraction_prompt.txt")
    prompt = template.replace("{input_text}", text)

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
        return []

    content = response["choices"][0]["message"]["content"]

    # Extract JSON array from messy LLM output
    try:
        json_match = re.search(r'\[.*\]', content, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        else:
            return [content]
    except:
        return [content]