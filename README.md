# StadiumMind AI - Enterprise Operations Platform

An AI-powered autonomous operations intelligence platform designed for the FIFA World Cup 2026. This platform acts as an AI "brain" that continuously analyzes live operational data, predicts future issues, and recommends proactive actions.

## Architecture

This is a monorepo containing multiple microservices:

1. **Frontend (`/frontend`)**: Next.js 14 App Router application with Tailwind CSS, React Leaflet, and a glassmorphic Admin Dashboard.
2. **Backend (`/backend`)**: FastAPI service handling WebSockets for real-time syncing of crowd data and alerts.
3. **AI Engine (`/ai-engine`)**: FastAPI service running a LangGraph orchestrator that dynamically routes queries to specialized AI Agents (Crowd, Emergency, Simulation). Uses OpenAI GPT-4o-mini for real-time decision support.
4. **CV Service (`/cv-service`)**: Python service running an asynchronous loop to simulate Computer Vision anomaly detection (e.g. physical altercations, bottlenecks).
5. **Simulation Service (`/simulation`)**: Python service pushing simulated live IoT turnstile/crowd density telemetry to the backend every 3 seconds.

## Getting Started

1. Create a `.env` file at the root of the project with your `OPENROUTER_API_KEY` (and `NEXT_PUBLIC_MAPBOX_TOKEN` if applicable).
2. Start the Backend API (Port 8000):
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
3. Start the AI Engine (Port 8001):
   ```bash
   cd ai-engine
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8001
   ```
4. Start the Next.js Frontend (Port 3000):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Start the Live Simulators (In separate terminals):
   ```bash
   cd cv-service
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8002
   ```
   ```bash
   cd simulation
   pip install -r requirements.txt
   python main.py
   ```

## Key Features
- **Predictive Crowd Management**: Live heatmap predictions on the Leaflet dashboard.
- **Emergency Copilot**: Intelligent routing of medical and security incidents using RAG and LangGraph.
- **Live WebSocket Sync**: Real-time visualization of 80,000+ simulated stadium guests.