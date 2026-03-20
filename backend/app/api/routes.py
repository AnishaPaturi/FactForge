from fastapi import APIRouter
from app.models.schemas import InputRequest
from app.services.orchestrator import run_pipeline
from app.utils.helpers import fetch_url_content

router = APIRouter()

@router.post("/analyze")
def analyze(input_data: InputRequest):
    text = input_data.text

    if input_data.url:
        text = fetch_url_content(input_data.url)

    result = run_pipeline(text)
    return result


@router.get("/")
def health():
    return {"status": "ok"}