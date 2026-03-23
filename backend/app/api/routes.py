from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.schemas import InputRequest
from app.services.orchestrator import run_pipeline
from app.utils.helpers import fetch_url_content
from app.models.db_models import AnalysisResult
from app.db import get_db

import uuid
import json

router = APIRouter()


# ✅ ANALYZE ROUTE (FIXED)
@router.post("/analyze")
def analyze(input_data: InputRequest, db: Session = Depends(get_db)):
    text = input_data.text

    if input_data.url:
        text = fetch_url_content(input_data.url)

    result = run_pipeline(text)

    report_id = str(uuid.uuid4())[:8]

    record = AnalysisResult(
        id=report_id,
        input_text=text,
        ai_probability=result["ai_detection"]["ai_probability"],
        results=json.dumps(result)
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "report_id": report_id,
        **result
    }


# ✅ HEALTH CHECK
@router.get("/")
def health():
    return {"status": "ok"}


# ✅ HISTORY (FIXED)
@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    data = db.query(AnalysisResult).all()
    return data


# ✅ GET REPORT (FIXED)
@router.get("/report/{report_id}")
def get_report(report_id: str, db: Session = Depends(get_db)):
    data = db.query(AnalysisResult).filter(
        AnalysisResult.id == report_id
    ).first()

    if not data:
        return {"error": "Report not found"}

    parsed = json.loads(data.results)

    return {
        "id": data.id,
        "input_text": data.input_text,
        "ai_probability": data.ai_probability,
        **parsed
    }