from fastapi import FastAPI
from app.api.routes import router
from app.models.db_models import Base
from app.db import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FactForge API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

