from app.db import SessionLocal
from app.models.db_models import AnalysisResult
import json

def save_result(text, output):
    db = SessionLocal()

    record = AnalysisResult(
        input_text=text,
        ai_probability=output["ai_detection"]["ai_probability"],
        results=json.dumps(output)
    )

    db.add(record)
    db.commit()
    db.close()