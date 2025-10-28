@echo off
echo Starting Raspberry AI Frontend...
echo.
echo Make sure the backend is running on port 8000
echo.
cd /d "%~dp0\frontend"
npm run dev