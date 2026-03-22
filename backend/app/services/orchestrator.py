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

from urllib.parse import urlparse


# 🔥 CONFIDENCE LEVEL
def get_confidence_level(score: int) -> str:
    if score >= 75:
        return "High"
    elif score >= 40:
        return "Medium"
    return "Low"


# 🔥 BIAS DETECTION
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


# 🔥 BETTER EXPLANATION
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
    Keep it short (2-3 lines).
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
    # 🔥 AI DETECTION
    ai_score = detect_ai(text)

    # 🔥 TOPIC + WARNING :contentReference[oaicite:0]{index=0}
    topic = detect_topic(text)
    warning = generate_warning(topic)

    claims = extract_claims(text)
    results = []

    for claim in claims:
        claim = claim.strip().rstrip(".")

        evidence = search_claim(claim) :contentReference[oaicite:2]{index=2}

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

        # 🔥 VERIFY
        verification = verify_claim(claim, evidence) :contentReference[oaicite:3]{index=3}
        verdict = verification["verdict"]

        # 🔥 ADDITIONS
        confidence_level = get_confidence_level(verification["confidence"])
        bias = detect_bias(claim)
        explanation = generate_better_explanation(claim, verdict, evidence)

        # 🔥 STANCES
        raw_stances = classify_source_stance(claim, evidence)

        negative_keywords = [
            "myth", "false", "not true", "incorrect",
            "debunked", "no evidence", "misconception"
        ]

        positive_keywords = [
            "true", "confirmed", "proven", "correct"
        ]

        cleaned_stances = []

        for i in range(len(evidence)):
            content = " ".join([
                evidence[i].get("title", ""),
                evidence[i].get("snippet", "")
            ]).lower()

            val = "Neutral"

            if any(k in content for k in negative_keywords):
                val = "Disagree"
            elif any(k in content for k in positive_keywords):
                val = "Agree"
            elif raw_stances and i < len(raw_stances):
                val = str(raw_stances[i]).capitalize()

            if val == "Neutral":
                if verdict == "False":
                    val = "Disagree"
                elif verdict == "True":
                    val = "Agree"

            cleaned_stances.append(val)

        stances = cleaned_stances

        # 🔥 AGREEMENT
        agreement_data = compute_agreement_score(stances, evidence)

        # 🔥 FORMAT SOURCES (with credibility already computed in search)
        formatted_sources = []
        for i, src in enumerate(evidence):
            formatted_sources.append({
                "label": src.get("title"),
                "url": src["url"],
                "snippet": src.get("snippet", ""),
                "credibility": src.get("score", 0),  # already computed :contentReference[oaicite:4]{index=4}
                "stance": stances[i]
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