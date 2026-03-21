def generate_warning(topic: str) -> dict:
    warnings = {
        "health": {
            "level": "high",
            "message": "⚠️ Health-related claims detected. This is a high-risk misinformation category."
        },
        "politics": {
            "level": "medium",
            "message": "⚠️ Political content detected. Potential bias or propaganda."
        },
        "technology": {
            "level": "low",
            "message": "ℹ️ Technology-related content detected. Verify technical accuracy."
        },
        "general": {
            "level": "none",
            "message": ""
        }
    }

    return warnings.get(topic, warnings["general"])