from fastapi import APIRouter
from app.models.schemas import InputRequest
from app.services.orchestrator import run_pipeline
from app.utils.helpers import fetch_url_content
from app.db import SessionLocal
from app.models.db_models import AnalysisResult

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

@router.get("/history")
def get_history():
    db = SessionLocal()
    data = db.query(AnalysisResult).all()
    db.close()

    return data