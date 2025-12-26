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


# ==================== CONTACT ENDPOINTS ====================

@api_router.post("/contacts", response_model=Contact)
async def create_contact(input: ContactCreate):
    """Submit a contact/consultation request"""
    contact_obj = Contact(**input.model_dump())
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    """Get all contact submissions"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact.get('timestamp'), str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    return contacts


# ==================== PROFILE ENDPOINTS ====================

@api_router.get("/profile", response_model=Profile)
async def get_profile():
    """Get site profile/settings"""
    profile = await db.profile.find_one({}, {"_id": 0})
    if not profile:
        # Return default profile if none exists
        default_profile = Profile()
        doc = default_profile.model_dump()
        await db.profile.insert_one(doc)
        return default_profile
    return Profile(**profile)

@api_router.put("/profile", response_model=Profile)
async def update_profile(input: ProfileUpdate):
    """Update site profile/settings"""
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if update_data:
        if 'socialLinks' in update_data and update_data['socialLinks']:
            update_data['socialLinks'] = update_data['socialLinks']
        await db.profile.update_one({}, {"$set": update_data}, upsert=True)
    profile = await db.profile.find_one({}, {"_id": 0})
    return Profile(**profile)


# ==================== TESTIMONIAL ENDPOINTS ====================

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all active testimonials"""
    testimonials = await db.testimonials.find({"isActive": True}, {"_id": 0}).to_list(100)
    return [Testimonial(**t) for t in testimonials]

@api_router.get("/testimonials/all", response_model=List[Testimonial])
async def get_all_testimonials():
    """Get all testimonials (including inactive)"""
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    return [Testimonial(**t) for t in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    """Create a new testimonial"""
    testimonial_obj = Testimonial(**input.model_dump())
    await db.testimonials.insert_one(testimonial_obj.model_dump())
    return testimonial_obj

@api_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, input: TestimonialUpdate):
    """Update a testimonial"""
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if update_data:
        result = await db.testimonials.update_one({"id": testimonial_id}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
    testimonial = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return Testimonial(**testimonial)

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    """Delete a testimonial"""
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}


# ==================== INSIGHT ENDPOINTS ====================

@api_router.get("/insights", response_model=List[Insight])
async def get_insights():
    """Get all published insights"""
    insights = await db.insights.find({"isPublished": True}, {"_id": 0}).to_list(100)
    return [Insight(**i) for i in insights]

@api_router.get("/insights/all", response_model=List[Insight])
async def get_all_insights():
    """Get all insights (including unpublished)"""
    insights = await db.insights.find({}, {"_id": 0}).to_list(100)
    return [Insight(**i) for i in insights]

@api_router.get("/insights/{insight_id}", response_model=Insight)
async def get_insight(insight_id: str):
    """Get a single insight by ID"""
    insight = await db.insights.find_one({"id": insight_id}, {"_id": 0})
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    return Insight(**insight)

@api_router.post("/insights", response_model=Insight)
async def create_insight(input: InsightCreate):
    """Create a new insight/article"""
    insight_obj = Insight(**input.model_dump())
    await db.insights.insert_one(insight_obj.model_dump())
    return insight_obj

@api_router.put("/insights/{insight_id}", response_model=Insight)
async def update_insight(insight_id: str, input: InsightUpdate):
    """Update an insight"""
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if update_data:
        result = await db.insights.update_one({"id": insight_id}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Insight not found")
    insight = await db.insights.find_one({"id": insight_id}, {"_id": 0})
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    return Insight(**insight)

@api_router.delete("/insights/{insight_id}")
async def delete_insight(insight_id: str):
    """Delete an insight"""
    result = await db.insights.delete_one({"id": insight_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Insight not found")
    return {"message": "Insight deleted successfully"}


# ==================== PERFORMANCE ENDPOINTS ====================

@api_router.get("/performance", response_model=Performance)
async def get_performance():
    """Get performance data"""
    performance = await db.performance.find_one({}, {"_id": 0})
    if not performance:
        # Return default performance data
        default_performance = Performance(
            chartData=[
                ChartDataPoint(month="Jan", portfolio=100, benchmark=100),
                ChartDataPoint(month="Feb", portfolio=103.2, benchmark=101.5),
                ChartDataPoint(month="Mar", portfolio=101.8, benchmark=99.2),
                ChartDataPoint(month="Apr", portfolio=106.5, benchmark=102.8),
                ChartDataPoint(month="May", portfolio=109.1, benchmark=104.1),
                ChartDataPoint(month="Jun", portfolio=108.2, benchmark=103.5),
                ChartDataPoint(month="Jul", portfolio=112.4, benchmark=106.2),
                ChartDataPoint(month="Aug", portfolio=115.8, benchmark=107.8),
                ChartDataPoint(month="Sep", portfolio=114.2, benchmark=105.9),
                ChartDataPoint(month="Oct", portfolio=117.5, benchmark=108.4),
                ChartDataPoint(month="Nov", portfolio=120.1, benchmark=110.2),
                ChartDataPoint(month="Dec", portfolio=118.4, benchmark=109.5),
            ],
            allocation=[
                AllocationItem(asset="Equities", percentage=40, color="#1e3a5a"),
                AllocationItem(asset="Forex", percentage=25, color="#3b82f6"),
                AllocationItem(asset="Cryptocurrency", percentage=20, color="#64748b"),
                AllocationItem(asset="Options", percentage=10, color="#94a3b8"),
                AllocationItem(asset="Cash", percentage=5, color="#cbd5e1"),
            ]
        )
        await db.performance.insert_one(default_performance.model_dump())
        return default_performance
    return Performance(**performance)

@api_router.put("/performance", response_model=Performance)
async def update_performance(input: PerformanceUpdate):
    """Update performance data"""
    update_data = {}
    if input.summary:
        update_data['summary'] = input.summary.model_dump()
    if input.disclaimer:
        update_data['disclaimer'] = input.disclaimer
    if input.chartData:
        update_data['chartData'] = [c.model_dump() for c in input.chartData]
    if input.allocation:
        update_data['allocation'] = [a.model_dump() for a in input.allocation]
    
    if update_data:
        await db.performance.update_one({}, {"$set": update_data}, upsert=True)
    
    performance = await db.performance.find_one({}, {"_id": 0})
    return Performance(**performance)


# ==================== SEED DATA ENDPOINT ====================

@api_router.post("/seed")
async def seed_database():
    """Seed database with initial data (testimonials and insights)"""
    
    # Check if data already exists
    testimonials_count = await db.testimonials.count_documents({})
    insights_count = await db.insights.count_documents({})
    
    seeded = {"testimonials": 0, "insights": 0}
    
    # Seed testimonials if empty
    if testimonials_count == 0:
        default_testimonials = [
            Testimonial(
                name="Michael R.",
                role="Business Owner",
                content="Juniper's disciplined approach to risk management has been exactly what I needed. My portfolio has grown steadily while I sleep soundly at night.",
                rating=5
            ),
            Testimonial(
                name="Sarah L.",
                role="Healthcare Professional",
                content="The transparency and communication are outstanding. I always know exactly what's happening with my investments and why.",
                rating=5
            ),
            Testimonial(
                name="David K.",
                role="Tech Executive",
                content="The forex signals have been incredibly accurate. Juniper's data-driven approach to trading has significantly improved my returns.",
                rating=5
            )
        ]
        for t in default_testimonials:
            await db.testimonials.insert_one(t.model_dump())
        seeded["testimonials"] = len(default_testimonials)
    
    # Seed insights if empty
    if insights_count == 0:
        default_insights = [
            Insight(
                title="Navigating Volatility: Q3 2025 Market Outlook",
                excerpt="Our analysis of current market conditions and strategic positioning for the months ahead.",
                category="Market Insights",
                readTime="8 min read"
            ),
            Insight(
                title="Understanding Cryptocurrency Regulation: What Investors Need to Know",
                excerpt="A comprehensive guide to the evolving regulatory landscape and its impact on digital asset investments.",
                category="White Paper",
                readTime="12 min read"
            ),
            Insight(
                title="Forex Trading Fundamentals: Currency Pair Analysis",
                excerpt="Deep dive into major currency pairs and the macroeconomic factors driving their movements.",
                category="Education",
                readTime="6 min read"
            ),
            Insight(
                title="Options Strategies for Income Generation",
                excerpt="How covered calls and cash-secured puts can enhance portfolio returns in sideways markets.",
                category="Strategy",
                readTime="10 min read"
            )
        ]
        for i in default_insights:
            await db.insights.insert_one(i.model_dump())
        seeded["insights"] = len(default_insights)
    
    return {"message": "Database seeded successfully", "seeded": seeded}

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