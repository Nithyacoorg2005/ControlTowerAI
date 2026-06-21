import asyncio
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

from app.agents import data, text, vision, synthesizer

router = APIRouter()

@router.post("/process-documents")
async def process_documents(files: List[UploadFile] = File(...)):
    """
    The main ingestion endpoint. Takes a multimodal array of files, routes them 
    asynchronously to the correct specific AI agents, and synthesizes a final dashboard payload.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded.")
    vision_tasks = []
    data_tasks = []
    text_tasks = []

    for file in files:
        content = await file.read()
        filename = file.filename.lower()
        mime_type = file.content_type

        if mime_type.startswith("image/"):
            vision_tasks.append(vision.analyze_image(filename, mime_type, content))
        
        elif filename.endswith(('.csv', '.xlsx', '.xls')):
            decoded_text = content.decode('utf-8', errors='ignore')
            data_tasks.append(data.analyze_tabular_data(filename, decoded_text))
            
        elif filename.endswith(('.pdf', '.txt')) or mime_type == "text/plain":
            decoded_text = content.decode('utf-8', errors='ignore')
            text_tasks.append(text.analyze_unstructured_text(filename, decoded_text))
            
        else:
            print(f"Skipping unsupported file type: {filename}")
    try:
        results = await asyncio.gather(
            asyncio.gather(*vision_tasks),
            asyncio.gather(*data_tasks),
            asyncio.gather(*text_tasks),
            return_exceptions=True
        )
        vision_results = results[0] if not isinstance(results[0], Exception) else []
        data_results = results[1] if not isinstance(results[1], Exception) else []
        text_results = results[2] if not isinstance(results[2], Exception) else []

    except Exception as e:
        print(f"Error during parallel execution: {str(e)}")
        raise HTTPException(status_code=500, detail="Agent execution failed.")
    try:
        final_dashboard_payload = await synthesizer.synthesize_executive_briefing(
            vision_insights={"results": vision_results},
            tabular_insights={"results": data_results},
            text_insights={"results": text_results}
        )
        return JSONResponse(content=final_dashboard_payload)
        
    except Exception as e:
        print(f"Synthesizer failure: {str(e)}")
        return JSONResponse(content={
            "healthScore": 71,
            "critical": ["System fallback engaged due to synthesis timeout."],
            "warnings": ["Partial data processing."],
            "opportunities": ["Retry file ingestion."],
            "actions": ["Check API rate limits."]
        }, status_code=206)