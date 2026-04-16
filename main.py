import os
import re
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from google import genai
from services.analyse import analyze_resume_logic # Load environment variables (Make sure you have api_key=your_key in .env)
load_dotenv()

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Your Vite/React local URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini Client
client = genai.Client(api_key=os.getenv("api_key"))

@app.post("/analyze")
async def analyze_resume_endpoint(jd: str = Form(...), pdf_file: UploadFile = File(...)):
    try:
      # We pass the file stream directly to our service function
        result_text = analyze_resume_logic(jd, pdf_file.file)
        return {"result": result_text}
        

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error during AI analysis")

if __name__ == "__main__":
    import uvicorn
    # Start server on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)