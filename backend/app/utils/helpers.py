import requests
import time

def fetch_url_content(url: str) -> str:
    try:
        res = requests.get(url, timeout=5)
        return res.text[:5000]
    except:
        return ""

def load_prompt(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# def safe_request(url, headers, json_data, retries=3):
#     for _ in range(retries):
#         try:
#             res = requests.post(url, headers=headers, json=json_data, timeout=10)
#             if res.status_code == 200:
#                 return res.json()
#         except:
#             pass
#         time.sleep(1)
#     return None
import requests

def safe_request(url, headers=None, json_data=None):
    try:
        response = requests.post(url, headers=headers, json=json_data)
        
        print("STATUS CODE:", response.status_code)
        print("RESPONSE TEXT:", response.text)

        if response.status_code == 200:
            return response.json()
        else:
            return None

    except Exception as e:
        print("ERROR:", e)
        return None