import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importing the router binds all your endpoints
from app.api.routes import router

# Importing settings ensures the environment variables (API Key) 
# are validated the exact millisecond the server boots.
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise decision engine backend powered by Google Gemini."
)

# --- BULLETPROOF CORS CONFIGURATION ---
# Vite runs on port 5173 by default. If you do not explicitly whitelist this,
# your browser will block the React app from sending files to this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
    allow_credentials=True,
    allow_methods=["*"], # Allows POST, GET, OPTIONS, etc.
    allow_headers=["*"], # Allows all headers
)

# Bind the document processing routes
app.include_router(router, prefix="/api/v1")

# --- HEALTH CHECK ---
# Always include a root endpoint. If the live demo crashes, hitting this 
# in the browser instantly tells you if the server is dead or if the UI is just bugged.
@app.get("/")
async def health_check():
    return {
        "status": "online",
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "gemini_engine": "active"
    }

if __name__ == "__main__":
    # This allows you to run the file directly during development
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)