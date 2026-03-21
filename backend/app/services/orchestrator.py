def classify_source_stance(claim: str, evidence: list):
    from app.utils.helpers import safe_request
    from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
    import json, re

    prompt = f"""
Claim: {claim}

STRICT RULES:
- If source supports claim → Agree
- If source contradicts OR proves claim wrong → Disagree
- Only use Neutral if unrelated

IMPORTANT:
If source says claim is false → Disagree

Return ONLY JSON list:
["Agree", "Disagree", "Agree"]

NO explanation.

Sources:
"""

    for i, src in enumerate(evidence):
        content = src.get("snippet", "") or src.get("content", "")
        prompt += f"\n{i+1}. {content}\n"

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
        return ["Neutral"] * len(evidence)

    content = response["choices"][0]["message"]["content"]

    try:
        match = re.search(r'\[.*\]', content, re.DOTALL)
        result = json.loads(match.group()) if match else []

        if len(result) != len(evidence):
            return ["Neutral"] * len(evidence)

        return result
    except:
        return ["Neutral"] * len(evidence)