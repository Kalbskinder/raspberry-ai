@echo off
echo Starting Raspberry AI Backend Server...
echo.
echo Make sure Ollama is running first with: ollama serve
echo.
cd /d "%~dp0"
call .venv\Scripts\activate
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
pause