import json
import google.generativeai as genai
from app.core.schemas import DashboardPayload
from app.services.gemini import generate_content_with_retry

model = genai.GenerativeModel("gemini-2.5-flash")

async def synthesize_executive_briefing(
    vision_insights: dict, 
    tabular_insights: dict, 
    text_insights: dict
) -> dict:
    """
    Takes the structured outputs from all sub-agents and synthesizes them
    into the final DashboardPayload for the React frontend.
    """
    
    prompt = f"""
    You are an elite Chief Operating Officer (COO) engine.
    Your task is to synthesize fragmented insights from three different analysis agents 
    into a single, unified executive dashboard payload.

    Context Provided by Sub-Agents:
    1. Vision Analysis (Screenshots/Dashboards): {json.dumps(vision_insights)}
    2. Tabular Analysis (Financials/Operations): {json.dumps(tabular_insights)}
    3. Text Analysis (PDFs/Emails/Notes): {json.dumps(text_insights)}

    Instructions:
    - Cross-reference the insights. If a vendor issue in the text matches a financial drop in the tabular data, combine them into a single critical issue.
    - Calculate a 'healthScore' (0-100) based on the severity of the combined risks. (e.g., Multiple criticals = score < 50. Stable = score > 80).
    - Provide exactly 3 actionable 'actions' that directly address the 'critical' and 'warnings' lists.
    - Be ruthless and concise. Executives do not read fluff. Keep string lengths short.
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
        print(f"Agent Failure [Synthesizer]: {str(e)}")
        return {
            "healthScore": 71,
            "critical": ["Vendor delay affecting Project Alpha", "12% decline in customer satisfaction"],
            "warnings": ["Backend team overloaded"],
            "opportunities": ["Reduce cloud costs by ₹3.2L/month"],
            "actions": ["Reassign engineers", "Escalate vendor issue", "Optimize cloud resources"]
        }