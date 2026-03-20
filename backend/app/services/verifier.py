import json
import re
from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
from app.utils.helpers import load_prompt, safe_request

def verify_claim(claim: str, evidence: list):
    template = load_prompt("app/prompts/verification_prompt.txt")

    prompt = template.replace("{claim}", claim).replace(
        "{evidence}", str(evidence)
    )

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
        return {
            "verdict": "Unverifiable",
            "confidence": 0,
            "explanation": "Verification failed (API error)"
        }

   

    content = response["choices"][0]["message"]["content"]

    try:
        # Extract JSON even if wrapped in ```json ```
        json_match = re.search(r'\{.*\}', content, re.DOTALL)
        
        if json_match:
            parsed = json.loads(json_match.group())
            
            return {
                "verdict": parsed.get("verdict", "Unverifiable"),
                "confidence": parsed.get("confidence", 50),
                "explanation": parsed.get("explanation", "")
            }
        else:
            raise Exception("No JSON found")

    except:
        return {
            "verdict": "Unverifiable",
            "confidence": 50,
            "explanation": content
        }