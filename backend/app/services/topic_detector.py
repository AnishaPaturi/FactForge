from typing import Dict
import re

# Simple keyword-based classifier (fast + hackathon friendly)
TOPIC_KEYWORDS = {
    "health": [
        "medicine", "covid", "vaccine", "disease", "treatment",
        "doctor", "health", "virus", "cancer", "therapy","hospital"
    ],
    "politics": [
        "government", "elections", "minister", "policy",
        "president", "parliament", "vote", "law","vote","congress","bjp"
    ],
    "technology": [
        "ai", "software", "technology", "internet",
        "computer", "blockchain", "cyber", "app","google","openai","chatgpt","model","algorithm"
    ],
    "education" : [
        "exam","school","college","student","education","university","syllabus","cbse","board exam"
    ],
    "sports":[
        "cricket","ipl","match","football","soccer","tennis","player","tournament","player","league","world cup","odi","t20","runs","wicket","goal","team","olympics"
    ]
}


def detect_topic(text: str) -> str:
    text = text.lower()

    scores = {topic: 0 for topic in TOPIC_KEYWORDS}

    for topic, keywords in TOPIC_KEYWORDS.items():
        for word in keywords:
            # if re.search(rf"\b{word}\b", text):
            if word in text:
                scores[topic] += 1

    # pick highest score
    detected = max(scores, key=scores.get)

    # fallback if nothing matched
    if scores[detected] == 0:
        return "general"

    return detected