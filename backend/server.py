from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

GOOGLE_SHEETS_WEBHOOK_URL = os.environ.get("GOOGLE_SHEETS_WEBHOOK_URL", "").strip()

# Seed baseline stats so the site feels alive even before any submissions.
STATS_BASELINE = {
    "reports": 512,
    "areas_cleaned": 128,
    "community_members": 3240,
}

app = FastAPI(title="ClearSpace API")
api_router = APIRouter(prefix="/api")


class WasteReportCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    location: str = Field(..., min_length=2, max_length=500)
    waste_type: str = Field(..., min_length=1, max_length=80)
    description: str = Field(..., min_length=5, max_length=2000)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    photo_data_url: Optional[str] = None  # data:image/...;base64,...
    reporter_name: Optional[str] = None
    reporter_contact: Optional[str] = None


class WasteReport(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    location: str
    waste_type: str
    description: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    has_photo: bool = False
    reporter_name: Optional[str] = None
    reporter_contact: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    sheet_forwarded: bool = False


async def forward_to_google_sheet(payload: dict) -> bool:
    """POST the report to a Google Apps Script Web App URL. Returns True on success."""
    if not GOOGLE_SHEETS_WEBHOOK_URL:
        return False
    try:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as http:
            r = await http.post(GOOGLE_SHEETS_WEBHOOK_URL, json=payload)
            return 200 <= r.status_code < 400
    except Exception as e:
        logging.warning(f"Google Sheets forward failed: {e}")
        return False


@api_router.get("/")
async def root():
    return {"name": "ClearSpace API", "status": "ok"}


@api_router.post("/reports", response_model=WasteReport)
async def create_report(payload: WasteReportCreate):
    report = WasteReport(
        location=payload.location,
        waste_type=payload.waste_type,
        description=payload.description,
        latitude=payload.latitude,
        longitude=payload.longitude,
        has_photo=bool(payload.photo_data_url),
        reporter_name=payload.reporter_name,
        reporter_contact=payload.reporter_contact,
    )

    # Prepare webhook payload (flat, sheet-friendly)
    sheet_payload = {
        "id": report.id,
        "timestamp": report.created_at.isoformat(),
        "location": report.location,
        "waste_type": report.waste_type,
        "description": report.description,
        "latitude": report.latitude if report.latitude is not None else "",
        "longitude": report.longitude if report.longitude is not None else "",
        "reporter_name": report.reporter_name or "",
        "reporter_contact": report.reporter_contact or "",
        "has_photo": "yes" if report.has_photo else "no",
        "photo_data_url": payload.photo_data_url or "",
    }

    forwarded = await forward_to_google_sheet(sheet_payload)
    report.sheet_forwarded = forwarded

    # Persist to Mongo (serialize datetime; store photo separately so list is light)
    doc = report.model_dump()
    doc["created_at"] = report.created_at.isoformat()
    doc["photo_data_url"] = payload.photo_data_url or None
    await db.waste_reports.insert_one(doc)

    return report


@api_router.get("/reports", response_model=List[WasteReport])
async def list_reports(limit: int = 50):
    cursor = db.waste_reports.find(
        {},
        {"_id": 0, "photo_data_url": 0},
    ).sort("created_at", -1).limit(min(max(limit, 1), 200))
    items = await cursor.to_list(length=200)
    for it in items:
        if isinstance(it.get("created_at"), str):
            try:
                it["created_at"] = datetime.fromisoformat(it["created_at"])
            except Exception:
                it["created_at"] = datetime.now(timezone.utc)
    return items


@api_router.get("/reports/stats")
async def report_stats():
    try:
        total_reports = await db.waste_reports.count_documents({})
    except Exception:
        total_reports = 0
    # Approximate "areas cleaned" as a fraction of reports (engagement metric).
    areas_cleaned = STATS_BASELINE["areas_cleaned"] + int(total_reports * 0.18)
    return {
        "reports_filed": STATS_BASELINE["reports"] + total_reports,
        "areas_cleaned": areas_cleaned,
        "community_members": STATS_BASELINE["community_members"] + total_reports * 3,
        "resolution_rate": 94,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
