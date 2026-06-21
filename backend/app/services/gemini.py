import asyncio
import logging
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted, ServiceUnavailable

# Set up standard SDE logging so you can see the retries happening in your terminal
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ControlTower-GeminiService")

async def generate_content_with_retry(
    model: genai.GenerativeModel,
    contents: list | str,
    generation_config: genai.GenerationConfig,
    max_retries: int = 3,
    base_delay: int = 2
):
    """
    An enterprise-grade wrapper that intercepts Free Tier rate limits (15 RPM)
    and automatically applies asynchronous exponential backoff without blocking the server.
    """
    for attempt in range(max_retries):
        try:
            # Attempt to hit the API
            response = await model.generate_content_async(
                contents,
                generation_config=generation_config
            )
            return response
            
        except ResourceExhausted as e:
            # Catch 429: Too Many Requests
            if attempt == max_retries - 1:
                logger.error(f"Rate limit fatal after {max_retries} attempts.")
                raise e
            
            # Exponential backoff calculation: 2s, 4s, 8s...
            sleep_time = base_delay * (2 ** attempt)
            logger.warning(f"Rate limit hit (429). Retrying in {sleep_time}s...")
            await asyncio.sleep(sleep_time)
            
        except ServiceUnavailable as e:
            # Catch 503: Google's Servers are down/overloaded
            if attempt == max_retries - 1:
                logger.error("Google API unavailable. Fatal.")
                raise e
            
            sleep_time = base_delay * (2 ** attempt)
            logger.warning(f"Service Unavailable (503). Retrying in {sleep_time}s...")
            await asyncio.sleep(sleep_time)
            
        except Exception as e:
            # For any other error (e.g., malformed prompt or schema), fail immediately.
            # We do not retry bad logic.
            logger.error(f"Non-retryable Gemini API error: {str(e)}")
            raise e