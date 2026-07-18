import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "StadiumMind AI Engine"
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    model_config = SettingsConfigDict(env_file="../../.env", extra="ignore")

settings = Settings()