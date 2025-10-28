from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str

@app.get("/")
async def root():
    return {"message": "Raspberry AI API is running!"}

@app.get("/health")
async def health_check():
    # Check if Ollama is reachable
    try:
        response = requests.get("http://127.0.0.1:11434/api/tags", timeout=5)
        ollama_status = "connected" if response.status_code == 200 else "error"
    except:
        ollama_status = "disconnected"
    
    return {
        "status": "healthy",
        "ollama": ollama_status,
        "message": "API is running"
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    logger.info(f"Received chat request: {request.prompt}")

    try:
        logger.info("Sending request to Ollama...")
        response = requests.post(
            "http://127.0.0.1:11434/api/generate",
            json={
                "model": "tinyllama:latest",
                "prompt": request.prompt,
                "stream": False
            },
            timeout=30  # Add timeout to prevent hanging
        )
        
        logger.info(f"Ollama response status: {response.status_code}")
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        logger.info(f"Ollama response data: {data}")
        
        return {"reply": data.get("response", "No response from model")}
    
    except requests.exceptions.ConnectionError as e:
        error_msg = "Cannot connect to Ollama. Make sure Ollama is running (try: ollama serve)"
        logger.error(f"Connection error: {e}")
        return {"reply": error_msg}
    except requests.exceptions.Timeout as e:
        error_msg = "Ollama request timed out. The model might be loading."
        logger.error(f"Timeout error: {e}")
        return {"reply": error_msg}
    except requests.exceptions.RequestException as e:
        error_msg = f"Error communicating with Ollama: {str(e)}"
        logger.error(f"Request error: {e}")
        return {"reply": error_msg}
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        logger.error(f"Unexpected error: {e}")
        return {"reply": error_msg}
