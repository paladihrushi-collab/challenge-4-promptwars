from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

import json
from pydantic import BaseModel

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

class BroadcastMessage(BaseModel):
    type: str
    data: dict

from fastapi import Header, HTTPException
from core.config import settings

@router.post("/internal/broadcast")
async def broadcast_internal(msg: BroadcastMessage, x_internal_api_key: str = Header(None)):
    """Internal endpoint for microservices to broadcast to WebSocket clients."""
    if x_internal_api_key != settings.INTERNAL_API_KEY:
        raise HTTPException(status_code=403, detail="Invalid internal API key")
    await manager.broadcast(json.dumps(msg.dict()))
    return {"status": "broadcasted"}

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Dashboard clients mostly just listen, but can ping
            pass
    except WebSocketDisconnect:
        manager.disconnect(websocket)