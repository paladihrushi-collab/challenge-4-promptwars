from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv

load_dotenv()
from orchestrator.langgraph import orchestrator_app

app = FastAPI(
    title="StadiumMind AI Engine",
    description="Multi-agent orchestration service using LangGraph.",
    version="1.0.0"
)

from core.config import settings

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Engine is running."}

@app.post("/query")
async def process_query(query: str):
    state = {"query": query}
    result = await orchestrator_app.ainvoke(state)
    
    return {
        "response": result.get("final_response", {}).get("response", "Could not process query."),
        "agent_used": result.get("final_response", {}).get("agent_name", "Unknown"),
        "confidence": result.get("final_response", {}).get("confidence", 0.0),
        "recommended_actions": result.get("final_response", {}).get("recommended_actions", [])
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)