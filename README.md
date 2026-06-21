# ControlTower AI

> **The AI operating system for executives.**

Enterprise leaders waste hours switching between emails, spreadsheets, PDFs, and reports. ControlTower AI is an asynchronous, multi-agent decision engine that natively ingests fragmented multimodal data and synthesizes it into a single, decision-ready executive dashboard in under 10 seconds.

Built with **Google Gemini 2.5 Flash**, **FastAPI**, and **React**.

---

## System Architecture

ControlTower AI abandons the standard "chat wrapper" approach in favor of a deterministic, parallelized multi-agent pipeline. 

### The Engine (Backend)
* **Framework:** FastAPI (Python)
* **AI Core:** Google Gemini 2.5 Flash (via `google-generativeai`)
* **Data Validation:** Strict Pydantic schemas enforce 100% predictable JSON outputs, guaranteeing the UI never crashes due to AI hallucinations.
* **Asynchronous Routing:** Uses `asyncio.gather` to route files to specialized AI agents concurrently. Processing 10 files takes the same time as processing 1.
* **Native Multimodal I/O:** Bypasses legacy OCR and string decoding. PDF streams and image bytes are fed natively into Gemini for zero-loss context extraction.
* **Resilience:** Implements an exponential backoff interceptor to automatically handle API rate limits without blocking the server or dropping data.

### The Interface (Frontend)
* **Framework:** React + Vite
* **Styling:** Tailwind CSS (v3)
* **Design Language:** Monochromatic, high-contrast, minimalist enterprise UI. Zero bloat. 

---

## The Multi-Agent Pipeline

1. **Vision Agent (`vision.py`):** Scans dashboards and charts, extracting hard business metrics directly from pixels into structured JSON.
2. **Text Agent (`text.py`):** Acts as a Chief of Staff, ruthlessly filtering fluff from PDFs/transcripts to extract operational risks and opportunities natively from the binary stream.
3. **Data Agent (`data.py`):** Parses financial and tabular data, identifying statistical anomalies and mapping them to predefined risk tiers.
4. **The Synthesizer (`synthesizer.py`):** The COO node. Cross-references the structured JSON from the sub-agents, calculates an overarching System Health Score, and dictates the top 3 immediate execution steps.

---

##  Quick Start (Local Deployment)

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* Google AI Studio API Key

### 1. Backend Setup
Navigate to the backend directory and install the required Python dependencies.

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

Configure Environment:
Create a .env file in the root of the backend/ directory:

Plaintext
GEMINI_API_KEY="your_google_ai_studio_api_key_here"

Start the Server:

Bash
uvicorn app.main:app --reload
The API will be live at http://127.0.0.1:8000.

2. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and start the Vite development server.

Bash
cd frontend
npm install
npm run dev
The UI will be accessible at http://localhost:5173.