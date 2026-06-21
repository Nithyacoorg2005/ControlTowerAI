import json
import google.generativeai as genai
from app.core.schemas import TextExtractionResult
from app.services.gemini import generate_content_with_retry

model = genai.GenerativeModel("gemini-2.5-flash")

async def analyze_unstructured_text(file_name: str, text_content: str) -> dict:
    """
    Asynchronously processes raw text (PDFs, transcripts, emails) and extracts 
    structured business intelligence adhering to the TextExtractionResult schema.
    """
    
    prompt = f"""
    You are an elite Chief of Staff analyzing enterprise communications and documents.
    
    Source Document: {file_name}
    
    Raw Content:
    {text_content}
    
    Instructions:
    1. Read the provided text and ruthlessly filter out small talk, pleasantries, and irrelevant data.
    2. Extract only operational, financial, or strategic risks and opportunities.
    3. Categorize them and assign a severity level.
    4. Provide a brutal, two-sentence executive summary of the document's true meaning.
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
        print(f"Agent Failure [Text]: {str(e)}")
        return {
            "extracted_insights": [
                {
                    "category": "System",
                    "issue_or_opportunity": f"Failed to parse {file_name} due to API timeout.",
                    "severity": "Medium"
                }
            ],
            "executive_summary": "Text analysis partially degraded. Proceeding with available structured data."
        }