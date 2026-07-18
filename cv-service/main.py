from fastapi import FastAPI, UploadFile, File
import uvicorn
import asyncio
import time
import requests
import random

app = FastAPI(
    title="StadiumMind CV Service",
    description="Computer Vision service using YOLOv11 for crowd tracking.",
    version="1.0.0"
)

import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000/internal/broadcast")
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY", "stadiummind_dev_internal_key")

# Background task for simulating random CV anomaly detections
async def simulate_cv_anomalies():
    print("Starting CV anomaly simulation loop...")
    while True:
        await asyncio.sleep(random.randint(15, 30)) # Anomaly every 15-30 seconds
        
        anomalies = [
            {"camera": "CAM-04", "type": "Unauthorized Access", "location": "VIP Suite Corridor", "severity": "Medium"},
            {"camera": "CAM-12", "type": "Bottleneck", "location": "Gate 3 Entrance", "severity": "High"},
            {"camera": "CAM-29", "type": "Physical Altercation", "location": "Section 100 Concourse", "severity": "Critical"},
            {"camera": "CAM-08", "type": "Abandoned Object", "location": "Lot E", "severity": "Medium"}
        ]
        
        event = random.choice(anomalies)
        payload = {
            "type": "emergency_alert",
            "data": {
                "id": f"evt-{int(time.time())}",
                "timestamp": time.time(),
                **event
            }
        }
        
        try:
            requests.post(BACKEND_URL, json=payload, headers={"x-internal-api-key": INTERNAL_API_KEY})
            print(f"Broadcasted CV anomaly: {event['type']}")
        except Exception as e:
            print(f"Failed to reach backend: {e}")
            await asyncio.sleep(5)  # Backoff on failure

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulate_cv_anomalies())

@app.get("/")
async def root():
    return {"message": "CV Service is running."}

@app.post("/analyze/crowd")
async def analyze_crowd(image: UploadFile = File(...)):
    # In a real implementation, this would run YOLOv11 on the image
    return {
        "density_score": 0.85,
        "estimated_count": 142,
        "anomalies": ["Unusually dense cluster near Gate 3"]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)