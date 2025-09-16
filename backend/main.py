# backend/main.py
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from databases import Database
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # reads .env

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://oceanpulse:changeme@localhost:5432/oceanpulse_dev"
)

database = Database(DATABASE_URL)
app = FastAPI(title="OceanPulse API (dev)")

# allow your frontend (Vite default port) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HazardIn(BaseModel):
    lat: float
    lon: float
    description: Optional[str] = None

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.post("/hazards/", status_code=201)
async def create_hazard(h: HazardIn):
    query = """
    INSERT INTO hazards (lat, lon, description)
    VALUES (:lat, :lon, :description)
    RETURNING id, created_at;
    """
    row = await database.fetch_one(query, values=h.dict())
    if not row:
        raise HTTPException(status_code=500, detail="Insert failed")
    return {"id": row["id"], "created_at": row["created_at"]}

@app.get("/hazards/")
async def list_hazards(limit: int = 100):
    query = "SELECT id, lat, lon, description, created_at FROM hazards ORDER BY created_at DESC LIMIT :limit"
    rows = await database.fetch_all(query, values={"limit": limit})
    return rows
