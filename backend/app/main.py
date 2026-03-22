from fastapi import FastAPI
from app.api.routes import router
from app.models.db_models import Base
from app.db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth_routes
from fastapi.responses import StreamingResponse
from app.services.pdf_generator import generate_pdf
from app.api import auth_routes

app = FastAPI(title="FactForge API")

app.include_router(auth_routes.router)

Base.metadata.create_all(bind=engine)
app.include_router(auth_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)

@app.post("/generate-pdf")
def generate_pdf_route(data: dict):
    pdf_buffer = generate_pdf(data)

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=FactForge_Report.pdf"
        }
    )
