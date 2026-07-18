from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
import os
from agents.crowd import CrowdPredictionAgent
from agents.emergency import EmergencyAgent
from agents.simulation import SimulationAgent

class AgentState(TypedDict):
    query: str
    route: str
    final_response: dict

def router_node(state: AgentState):
    # Initialize OpenRouter LLM
    llm = ChatOpenAI(
        model="openai/gpt-4o-mini",
        openai_api_key=os.getenv("OPENROUTER_API_KEY", "dummy"),
        openai_api_base="https://openrouter.ai/api/v1"
    )
    
    # In reality, use an LLM to decide the route.
    # For now, we will still use the mock logic to guarantee routing works
    # without relying entirely on the prompt for the structural scaffold.
    query = state["query"].lower()
    if "emergency" in query or "medical" in query or "fire" in query:
        return {"route": "emergency"}
    elif "simulate" in query or "what if" in query or "close" in query:
        return {"route": "simulate"}
    else:
        return {"route": "crowd"}

async def crowd_node(state: AgentState):
    agent = CrowdPredictionAgent()
    res = await agent.process(state["query"])
    return {"final_response": res.dict()}

async def emergency_node(state: AgentState):
    agent = EmergencyAgent()
    res = await agent.process(state["query"])
    return {"final_response": res.dict()}

async def simulation_node(state: AgentState):
    agent = SimulationAgent()
    res = await agent.process(state["query"])
    return {"final_response": res.dict()}

workflow = StateGraph(AgentState)

workflow.add_node("router", router_node)
workflow.add_node("crowd", crowd_node)
workflow.add_node("emergency", emergency_node)
workflow.add_node("simulate", simulation_node)

workflow.set_entry_point("router")

workflow.add_conditional_edges(
    "router",
    lambda x: x["route"],
    {
        "crowd": "crowd",
        "emergency": "emergency",
        "simulate": "simulate"
    }
)

workflow.add_edge("crowd", END)
workflow.add_edge("emergency", END)
workflow.add_edge("simulate", END)

orchestrator_app = workflow.compile()