from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ==================== MODELS ====================

# Status Check Models (existing)
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Form Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    investmentGoal: Optional[str] = None
    message: Optional[str] = None

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    investmentGoal: Optional[str] = None
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


# Profile/Settings Models
class SocialLinks(BaseModel):
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None

class Profile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = "Juniper Broz"
    title: str = "Investment Specialist"
    tagline: str = "Strategic Wealth Building Through Disciplined Investment"
    description: str = "Registered investment professional specializing in forex, cryptocurrency, and stock options with a proven track record of data-driven portfolio management."
    finraLink: str = "https://brokercheck.finra.org/individual/summary/6740971"
    email: str = "contact@juniperbroz.com"
    whatsapp: str = "+1234567890"
    telegram: str = "@juniperbrozforex"
    yearsExperience: int = 12
    clientsServed: int = 500
    assetsManaged: str = "$45M+"
    socialLinks: SocialLinks = Field(default_factory=SocialLinks)
    credentials: List[str] = Field(default_factory=lambda: [
        "Series 7 - General Securities Representative",
        "Series 66 - Uniform Combined State Law",
        "Certified Financial Planner (CFP)",
        "Chartered Market Technician (CMT)"
    ])

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    finraLink: Optional[str] = None
    email: Optional[str] = None
    whatsapp: Optional[str] = None
    telegram: Optional[str] = None
    yearsExperience: Optional[int] = None
    clientsServed: Optional[int] = None
    assetsManaged: Optional[str] = None
    socialLinks: Optional[SocialLinks] = None
    credentials: Optional[List[str]] = None


# Testimonial Models
class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int = Field(ge=1, le=5)

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    content: str
    rating: int = Field(ge=1, le=5)
    isActive: bool = True

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    isActive: Optional[bool] = None


# Insight/Blog Models
class InsightCreate(BaseModel):
    title: str
    excerpt: str
    content: Optional[str] = None
    category: str
    readTime: str = "5 min read"

class Insight(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: Optional[str] = None
    category: str
    date: str = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%B %d, %Y"))
    readTime: str = "5 min read"
    isPublished: bool = True

class InsightUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    readTime: Optional[str] = None
    isPublished: Optional[bool] = None


# Performance Models
class PerformanceSummary(BaseModel):
    ytdReturn: str = "+18.4%"
    avgAnnualReturn: str = "+14.2%"
    sharpeRatio: str = "1.85"
    maxDrawdown: str = "-8.3%"

class ChartDataPoint(BaseModel):
    month: str
    portfolio: float
    benchmark: float

class AllocationItem(BaseModel):
    asset: str
    percentage: int
    color: str

class Performance(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    summary: PerformanceSummary = Field(default_factory=PerformanceSummary)
    disclaimer: str = "Past performance does not guarantee future results. All investments involve risk, including loss of principal."
    chartData: List[ChartDataPoint] = Field(default_factory=list)
    allocation: List[AllocationItem] = Field(default_factory=list)

class PerformanceUpdate(BaseModel):
    summary: Optional[PerformanceSummary] = None
    disclaimer: Optional[str] = None
    chartData: Optional[List[ChartDataPoint]] = None
    allocation: Optional[List[AllocationItem]] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()