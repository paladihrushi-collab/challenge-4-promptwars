import time
import json
import random
import requests

import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000/internal/broadcast")
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY", "stadiummind_dev_internal_key")

# Define the zones we want to simulate crowd density for
ZONES = [
    {"id": "gate-1", "name": "Gate 1", "base_density": 0.4},
    {"id": "gate-2", "name": "Gate 2", "base_density": 0.2},
    {"id": "gate-3", "name": "Gate 3", "base_density": 0.6},
    {"id": "lot-e", "name": "Lot E", "base_density": 0.3},
    {"id": "lot-g", "name": "Lot G", "base_density": 0.5},
    {"id": "section-100", "name": "Section 100", "base_density": 0.8},
]

def simulate_crowd():
    print("Starting StadiumMind Crowd Simulation...")
    while True:
        updates = []
        for zone in ZONES:
            # Fluctuate density by +/- 0.15
            variation = random.uniform(-0.15, 0.15)
            current_density = max(0.0, min(1.0, zone["base_density"] + variation))
            
            # Update base density slightly for a random walk effect
            zone["base_density"] = max(0.0, min(1.0, zone["base_density"] + random.uniform(-0.05, 0.05)))
            
            status = "Normal"
            if current_density > 0.85:
                status = "Critical"
            elif current_density > 0.6:
                status = "Busy"
                
            updates.append({
                "zone_id": zone["id"],
                "name": zone["name"],
                "density": current_density,
                "status": status,
                "timestamp": time.time()
            })
            
        payload = {
            "type": "crowd_update",
            "data": {"zones": updates}
        }
        
        try:
            requests.post(BACKEND_URL, json=payload, headers={"x-internal-api-key": INTERNAL_API_KEY})
            print(f"Broadcasted update for {len(updates)} zones.")
        except Exception as e:
            print(f"Failed to reach backend: {e}")
            time.sleep(5)  # Backoff on failure
            
        time.sleep(3)

if __name__ == "__main__":
    simulate_crowd()
