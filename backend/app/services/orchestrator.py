from app.services.claim_extractor import extract_claims
from app.services.search_service import search_claim
from app.services.topic_detector import detect_topic
from app.services.bias_indicator import generate_warning

from app.services.verifier import (
    verify_claim,
    classify_source_stance,
    compute_agreement_score,
)

from app.services.ai_detector import detect_ai
from app.services.db_service import save_result

from app.core.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL, MODEL_NAME
from app.utils.helpers import safe_request


def get_confidence_level(score: int) -> str:
    if score >= 75:
        return "High"
    elif score >= 40:
        return "Medium"
    return "Low"


def detect_bias(text: str) -> str:
    prompt = f"""
    Classify the bias of this claim as:
    Left, Right, or Neutral.

    Claim:
    {text}

    Return ONLY one word.
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
        return "Neutral"

    try:
        return response["choices"][0]["message"]["content"].strip().capitalize()
    except:
        return "Neutral"


def generate_better_explanation(claim, verdict, evidence):
    context = "\n".join([
        f"- {src.get('snippet', '')}"
        for src in evidence[:3]
    ])

    prompt = f"""
    Claim: {claim}
    Verdict: {verdict}

    Evidence:
    {context}

    Explain clearly WHY the claim is {verdict}.
    Keep it short.
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
        return "Explanation unavailable"

    try:
        return response["choices"][0]["message"]["content"].strip()
    except:
        return "Explanation unavailable"


def run_pipeline(text: str):
    ai_score = detect_ai(text)

    topic = detect_topic(text)
    warning = generate_warning(topic)

    claims = extract_claims(text)
    results = []

    for claim in claims:
        claim = claim.strip().rstrip(".")

        evidence = search_claim(claim)

        if not evidence:
            results.append({
                "claim": claim,
                "verdict": "Unverifiable",
                "confidence": 0,
                "confidence_level": "Low",
                "bias": "Neutral",
                "explanation": "No evidence found",
                "sources": [],
                "source_analysis": None
            })
            continue

        verification = verify_claim(claim, evidence)
        verdict = verification["verdict"]

        confidence_level = get_confidence_level(verification["confidence"])
        bias = detect_bias(claim)
        explanation = generate_better_explanation(claim, verdict, evidence)

        raw_stances = classify_source_stance(claim, evidence)

        cleaned_stances = []
        for i in range(len(evidence)):
            val = "Neutral"

            if raw_stances and i < len(raw_stances):
                val = str(raw_stances[i]).capitalize()

            if val == "Neutral":
                if verdict == "False":
                    val = "Disagree"
                elif verdict == "True":
                    val = "Agree"

            cleaned_stances.append(val)

        agreement_data = compute_agreement_score(cleaned_stances, evidence)

        formatted_sources = []
        for i, src in enumerate(evidence):
            formatted_sources.append({
                "label": src.get("title"),
                "url": src["url"],
                "snippet": src.get("snippet", ""),
                "credibility": src.get("score", 0),
                "stance": cleaned_stances[i]
            })

        results.append({
            "claim": claim,
            "verdict": verdict,
            "confidence": verification["confidence"],
            "confidence_level": confidence_level,
            "bias": bias,
            "explanation": explanation,
            "source_analysis": agreement_data,
            "sources": formatted_sources
        })

    final_output = {
        "ai_detection": ai_score,
        "topic": topic,
        "warning": warning,
        "claims": results
    }

    save_result(text, final_output)

    return final_output