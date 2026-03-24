import requests
from datetime import datetime
from app.core.config import TAVILY_API_KEY
from app.services.credibility_service import CredibilityService

def search_claim(claim: str):
    api_url = "https://api.tavily.com/search"

    payload = {
        "api_key": TAVILY_API_KEY,
        "query": claim,
        "search_depth": "basic",
        "max_results": 5,
    }

    bad_domains = ["reddit.com", "facebook.com", "instagram.com"]

    try:
        res = requests.post(api_url, json=payload)
        data = res.json()

        results = []

        for r in data.get("results", []):
            link = r.get("url", "")

            if any(domain in link for domain in bad_domains):
                continue

            published_date = None

            score = CredibilityService.score_source(
                url=link,
                published_date=published_date,
                claim=claim,
                sources=data.get("results", [])
            )

            results.append({
                "title": r.get("title"),
                "url": link,
                "snippet": r.get("content"),
                "score": score
            })

        results.sort(key=lambda x: x["score"], reverse=True)

        return results

    except Exception as e:
        print("Search error:", e)
        return []