from sqlalchemy import Column, String, Integer, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid
from datetime import datetime

Base = declarative_base()

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    input_text = Column(Text)
    ai_probability = Column(Integer)
    results = Column(Text)  # JSON stored as string
    created_at = Column(DateTime, default=datetime.utcnow)