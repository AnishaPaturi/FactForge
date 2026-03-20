from pydantic import BaseModel
from typing import List, Optional

class InputRequest(BaseModel):
    text: Optional[str] = None
    url: Optional[str] = None


class Evidence(BaseModel):
    title: str
    url: str
    snippet: str


class ClaimResult(BaseModel):
    claim: str
    verdict: str
    confidence: int
    explanation: str
    sources: List[Evidence]


class FinalResponse(BaseModel):
    claims: List[ClaimResult]