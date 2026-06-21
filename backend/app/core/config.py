import os
from dotenv import load_dotenv
import google.generativeai as genai

# Force load the .env file from the root of the backend directory
load_dotenv()

class Settings:
    PROJECT_NAME: str = "ControlTower AI"
    VERSION: str = "1.0.0"
    
    # Pull the API key from the environment
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")

settings = Settings()

# The Hackathon Failsafe: 
# Crash immediately on startup if the key is missing. 
# Do not wait for a file upload to discover the API key isn't loaded.
if not settings.GEMINI_API_KEY:
    raise ValueError(
        "CRITICAL ERROR: GEMINI_API_KEY is missing. "
        "Ensure you have a .env file in the backend/ directory with your Google AI Studio key."
    )

# Configure the Gemini SDK globally here.
# Because this runs on startup, your agents (vision.py, data.py, etc.) 
# never need to worry about passing API keys. They just import genai and work.
genai.configure(api_key=settings.GEMINI_API_KEY)