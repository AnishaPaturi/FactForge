from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.db import SessionLocal
from app.models.db_models import User

router = APIRouter()

# -------- SCHEMAS --------
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


# -------- SIGNUP --------
@router.post("/register")
def register(user: UserCreate):
    db = SessionLocal()

    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        db.close()
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {"message": "User registered successfully"}


# -------- LOGIN --------
@router.post("/login")
def login(user: UserLogin):
    db = SessionLocal()

    existing = db.query(User).filter(
        User.email == user.email,
        User.password == user.password
    ).first()

    db.close()

    if not existing:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}