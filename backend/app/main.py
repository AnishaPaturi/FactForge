from fastapi import FastAPI
from app.api.routes import router
from app.models.db_models import Base
from app.db import engine

app = FastAPI(title="FactForge API")

Base.metadata.create_all(bind=engine)

app.include_router(router)

