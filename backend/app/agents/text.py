import json
import google.generativeai as genai
from app.core.schemas import TextExtractionResult
from app.services.gemini import generate_content_with_retry

model = genai.GenerativeModel("gemini-2.5-flash")

async def analyze_document(file_name: str, mime_type: str, file_bytes: bytes) -> dict:
    """
    Natively processes document binaries (PDFs, TXT) without corrupting them via string decoding.
    """
    prompt = f"""
    You are an elite Chief of Staff analyzing enterprise communications and documents.
    Source Document: {file_name}
    
    Instructions:
    1. Read the attached document and ruthlessly filter out small talk, pleasantries, and irrelevant data.
    2. Extract only operational, financial, or strategic risks and opportunities.
    3. Categorize them and assign a severity level.
    4. Provide a brutal, two-sentence executive summary of the document's true meaning.
    """

    try:
        # Package the raw binary directly for Gemini
        document_part = {
            "mime_type": mime_type,
            "data": file_bytes
        }

        response = await generate_content_with_retry(
            model=model,
            contents=[prompt, document_part],
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=TextExtractionResult,
                temperature=0.2,
            ),
        )
        return json.loads(response.text)
        
    except Exception as e:
        print(f"Agent Failure [Text/Doc]: {str(e)}")
        return {
            "extracted_insights": [
                {
                    "category": "System",
                    "issue_or_opportunity": f"Failed to natively parse {file_name}.",
                    "severity": "High"
                }
            ],
            "executive_summary": "Document processing corrupted."
        }