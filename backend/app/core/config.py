import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

MODEL_NAME = "openai/gpt-4o-mini"  # fast + cheap

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

DATABASE_URL = "sqlite:///./fact_checker.db"