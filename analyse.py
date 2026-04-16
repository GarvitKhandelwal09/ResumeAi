import os
import re
from PyPDF2 import PdfReader
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini Client
client = genai.Client(api_key=os.getenv("api_key"))

    
def analyze_resume_logic(jd: str, pdf_file):
    # 1. Read the PDF content
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + " "

    # 2. Text Cleaning
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9.,%:@/\+\- ]', '', text)
    clean_text = text[:6000]

    # 3. Construct Prompt
    prompt = f"""
    You are an ATS Expert. 
    TASK: Analyze the Resume against the Job Description (JD) below.
    
    INSTRUCTIONS:
    - Compare the skills in the JD directly to the Resume.
    - Highlight specific matches and specific gaps.
    - Do not use any asterisks (*) in the output.
    - ALSO TELL THE KEYWORDS TO MATCH ADD IN RESUME TO IMROVE
    
    JD: {jd}
    
    RESUME: {clean_text}
    
    OUTPUT FORMAT:
    ATS SCORE: [0-100]
    MATCHED SKILLS: [List skills found in both]
    MISSING SKILLS: [List skills in JD but not in Resume]
    ADVICE: [How to bridge the gap]
    
    """

    # 4. Generate Content
    response = client.models.generate_content(
        model="gemini-flash-latest", 
        contents=prompt
    )
    return response.text