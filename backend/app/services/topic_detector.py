from typing import Dict
import re

# Simple keyword-based classifier (fast + hackathon friendly)
TOPIC_KEYWORDS = {
    "health": [
        "medicine", "covid", "vaccine", "disease", "treatment",
        "doctor", "health", "virus", "cancer", "therapy"
    ],
    "politics": [
        "government", "election", "minister", "policy",
        "president", "parliament", "vote", "law"
    ],
    "technology": [
        "ai", "software", "technology", "internet",
        "computer", "blockchain", "cyber", "app"
    ]
}


def detect_topic(text: str) -> str:
    text = text.lower()

    scores = {topic: 0 for topic in TOPIC_KEYWORDS}

    for topic, keywords in TOPIC_KEYWORDS.items():
        for word in keywords:
            if re.search(rf"\b{word}\b", text):
                scores[topic] += 1

    # pick highest score
    detected = max(scores, key=scores.get)

    # fallback if nothing matched
    if scores[detected] == 0:
        return "general"

    return detected