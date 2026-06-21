import json
import google.generativeai as genai
from app.core.schemas import VisionExtractionResult
from app.services.gemini import generate_content_with_retry

# Gemini 2.5 Flash is natively multimodal and extremely fast at parsing charts/dashboards.
model = genai.GenerativeModel("gemini-2.5-flash")

async def analyze_image(file_name: str, mime_type: str, image_bytes: bytes) -> dict:
    """
    Asynchronously processes raw image bytes (screenshots, charts) and forces 
    the visual insights into the strict VisionExtractionResult schema.
    """
    
    prompt = f"""
    You are an elite enterprise analyst examining a business screenshot or chart.
    
    File Name: {file_name}
    
    Instructions:
    1. Scan the image for anomalies, spikes, drops, or critical alerts (e.g., high cloud billing, server downtime, declining sales charts).
    2. Ignore standard UI elements and focus strictly on the business data.
    3. Extract the financial or operational impact.
    4. Provide immediate, ruthless action steps based on the visual evidence.
    """

    try:
        # Multimodal payload: Pass the prompt and the raw image bytes together
        image_part = {
            "mime_type": mime_type,
            "data": image_bytes
        }

        # The correct call for vision.py
        response = await generate_content_with_retry(
            model=model,
            contents=[prompt, image_part], # Notice the array for multimodal input
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=VisionExtractionResult, # THIS MUST BE VisionExtractionResult
                temperature=0.1,
            )
        )
        
        return json.loads(response.text)
        
    except Exception as e:
        # The Failsafe: Ensures a corrupted PNG doesn't nuke the presentation.
        print(f"Agent Failure [Vision]: {str(e)}")
        return {
            "visual_anomalies": [
                {
                    "metric_or_issue": f"Unreadable visual data in {file_name}",
                    "financial_impact": "Unknown",
                    "action_required": "Verify dashboard screenshot integrity."
                }
            ],
            "overall_assessment": "Image processing degraded. Bypassing visual context."
        }