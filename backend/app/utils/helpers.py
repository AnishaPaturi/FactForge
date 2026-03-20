import requests

def fetch_url_content(url: str) -> str:
    try:
        res = requests.get(url, timeout=5)
        return res.text[:5000]  # trim for LLM
    except:
        return ""