from qdrant_client import QdrantClient
from core.config import settings

client = QdrantClient(url=settings.QDRANT_URL)

def init_collections():
    # Initialize basic collections for emergency protocols, stadium rules, etc.
    try:
        client.get_collection("stadium_protocols")
    except Exception:
        client.create_collection(
            collection_name="stadium_protocols",
            vectors_config={"size": 1536, "distance": "Cosine"}
        )