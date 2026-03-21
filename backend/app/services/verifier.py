import json
import re
from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
from app.utils.helpers import load_prompt, safe_request


# 🔹 VERIFY CLAIM (unchanged logic, slightly safer)
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
        json_match = re.search(r'\{.*\}', content, re.DOTALL)
        parsed = json.loads(json_match.group()) if json_match else {}

        return {
            "verdict": parsed.get("verdict", "Unverifiable"),
            "confidence": parsed.get("confidence", 50),
            "explanation": parsed.get("explanation", "")
        }

    except:
        return {
            "verdict": "Unverifiable",
            "confidence": 50,
            "explanation": content
        }


# 🔥 IMPROVED STANCE CLASSIFIER
def classify_source_stance(claim: str, evidence: list):
    from app.utils.helpers import safe_request
    from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
    import json, re

    prompt = f"""
Claim: {claim}

You MUST classify each source STRICTLY:

RULES:
- Supports claim → Agree
- Contradicts / says false / myth → Disagree
- Neutral ONLY if completely unrelated

STRICT:
- If text says "myth", "false", "incorrect", "not true" → Disagree
- DO NOT overuse Neutral

Return ONLY valid JSON:
["Agree", "Disagree", "Agree"]

NO explanation.

Sources:
"""

    for i, src in enumerate(evidence):
        content = " ".join([
            src.get("title", ""),
            src.get("snippet", ""),
            src.get("content", "")
        ])
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

# 🔥 FINAL AGREEMENT (COUNTS + WEIGHTED)
def compute_agreement_score(stances: list, evidence: list):
    agree_count = stances.count("Agree")
    disagree_count = stances.count("Disagree")
    neutral_count = stances.count("Neutral")

    weighted_agree = 0
    weighted_disagree = 0
    weighted_neutral = 0

    for i, stance in enumerate(stances):
        weight = evidence[i].get("score", 1) if i < len(evidence) else 1

        if stance == "Agree":
            weighted_agree += weight
        elif stance == "Disagree":
            weighted_disagree += weight
        else:
            weighted_neutral += weight

    total_weight = weighted_agree + weighted_disagree + weighted_neutral

    score = round((weighted_agree / total_weight) * 100, 2) if total_weight > 0 else 0
    
    if agree_count == 0 and disagree_count > 0:
        insight = "All sources contradict the claim"
    # 🔥 BONUS: Insight (demo killer)
    if score is None:
        insight = "No sufficient data"
    elif score > 75:
        insight = "Strong agreement among sources"
    elif score > 50:
        insight = "Majority of sources agree"
    elif score > 25:
        insight = "Mixed or conflicting sources"
    else:
        insight = "Most sources disagree with the claim"

    return {
        "counts": {
            "agree": agree_count,
            "disagree": disagree_count,
            "neutral": neutral_count
        },
        "weighted": {
            "agree": round(weighted_agree, 2),
            "disagree": round(weighted_disagree, 2),
            "neutral": round(weighted_neutral, 2)
        },
        "agreement_score": score,
        "insight": insight,
        "type": "hybrid"
    }