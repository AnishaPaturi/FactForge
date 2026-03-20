import requests
from app.core.config import TAVILY_API_KEY

def search_claim(claim: str):
    url = "https://api.tavily.com/search"

    payload = {
        "api_key": TAVILY_API_KEY,
        "query": claim,
        "search_depth": "basic",
        "max_results": 3,
    }

    try:
        res = requests.post(url, json=payload)
        data = res.json()

        results = []
        for r in data.get("results", []):
            results.append({
                "title": r.get("title"),
                "url": r.get("url"),
                "snippet": r.get("content"),
            })

        return results

    except:
        return []