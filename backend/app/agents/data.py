import json
import google.generativeai as genai
from app.core.schemas import DataExtractionResult
from app.services.gemini import generate_content_with_retry

model = genai.GenerativeModel("gemini-2.5-flash")

async def analyze_tabular_data(file_name: str, raw_csv_content: str) -> dict:
    """
    Asynchronously parses raw tabular data and extracts business risks 
    strictly adhering to the DataExtractionResult schema.
    """
    
    prompt = f"""
    You are an elite financial and operational analyst.
    Analyze the following raw data extracted from an enterprise system.
    
    File Source: {file_name}
    
    Raw Data:
    {raw_csv_content}
    
    Instructions:
    1. Identify any critical anomalies, drops in revenue, or overloaded operational metrics.
    2. Ignore stable, expected data points.
    3. Provide actionable recommendations based ONLY on the identified anomalies.
    """

    try:
      
        response = await generate_content_with_retry(
            model=model,
            contents=prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=DataExtractionResult,
                temperature=0.1,
            )
        )
        
        
        return json.loads(response.text)
        
    except Exception as e:
       
        print(f"Agent Failure [Data]: {str(e)}")
        return {
            "anomalies": [
                {
                    "metric_name": "API Fallback",
                    "current_value": "Unknown",
                    "risk_level": "Warning",
                    "impact_summary": "Data analysis module temporarily unavailable."
                }
            ],
            "recommended_actions": ["Retry data ingestion."]
        }