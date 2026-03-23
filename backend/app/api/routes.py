from fastapi import APIRouter
from app.models.schemas import InputRequest
from app.services.orchestrator import run_pipeline
from app.utils.helpers import fetch_url_content
from app.db import SessionLocal
from app.models.db_models import AnalysisResult


import uuid
import json

router = APIRouter()

@router.post("/analyze")
def analyze(input_data: InputRequest):
    text = input_data.text

    db = SessionLocal()

    if input_data.url:
        text = fetch_url_content(input_data.url)

    result = run_pipeline(text)
    report_id = str(uuid.uuid4())[:8]
    record = AnalysisResult(id=report_id,input_text=text,ai_probability = result["ai_detection"]["ai_probability"],
    results = json.dumps(result))
    db.add(record)
    db.commit()
    db.close()
    return {
        "report_id":report_id,
        **result
    }

@router.get("/")
def health():
    return {"status": "ok"}


@router.get("/history")
def get_history():
    db = SessionLocal()
    data = db.query(AnalysisResult).all()
    db.close()

    return data

@router.get("/report/{report_id}")
def get_report(report_id: str):
    db = SessionLocal()

    data = db.query(AnalysisResult).filter(
        AnalysisResult.id == report_id
    ).first()

    db.close()

    if not data:
        return {"error": "Report not found"}

    parsed = json.loads(data.results)

    return {
        "id": data.id,
        "input_text": data.input_text,
        "ai_probability": data.ai_probability,
        **parsed
    }