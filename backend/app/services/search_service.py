import requests
from app.core.config import TAVILY_API_KEY

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

            # 🚫 filter bad sources
            if any(domain in link for domain in bad_domains):
                continue

            results.append({
                "title": r.get("title"),
                "url": link,
                "snippet": r.get("content"),
            })

        return results[:3]  # top 3 clean results

    except:
        return []