from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests

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

@app.post("/chat")
async def chat(request: ChatRequest):
    prompt = '{"role": "user", "content": "' + request.prompt + '"}'
    print(prompt)

    response = requests.post(
        "http://127.0.0.1:11434/api/generate",
        json = {
            "model": "tinyllama:latest",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()
    print(data)
    return {"reply": data.get("response", "")}
