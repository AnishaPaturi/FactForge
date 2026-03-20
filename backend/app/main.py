from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="FactForge API")

app.include_router(router)