from pydantic import BaseModel

class AgentResponse(BaseModel):
    agent_name: str
    response: str
    confidence: float
    recommended_actions: list[str] = []

class BaseAgent:
    def __init__(self, name: str):
        self.name = name

    async def process(self, query: str, context: dict = None) -> AgentResponse:
        raise NotImplementedError