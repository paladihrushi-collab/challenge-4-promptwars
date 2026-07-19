from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from api.auth import router as auth_router
from api.websockets import router as ws_router

app = FastAPI(
    title="StadiumMind AI API",
    description="Backend API for StadiumMind operations intelligence platform.",
    version="1.0.0"
)

from core.config import settings

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(ws_router, tags=["websockets"])

@app.get("/")
async def root():
    return {"message": "StadiumMind AI Backend is running."}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)