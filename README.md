# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 📄 AI Resume Analyzer

An intelligent Resume Analyzer built using **Google AI Studio API**, **FastAPI**, and **PyPDF2**.
This application analyzes resumes and provides insights such as skill extraction, suggestions, and improvements.

---

## 🚀 Features

* 📄 Upload PDF resumes
* 🧠 AI-powered resume analysis using Google AI
* 🔍 Extract key skills and important information
* 📊 Get actionable suggestions for improvement
* ⚡ High-performance backend using FastAPI
* 🌐 CORS enabled for seamless frontend integration

---

## 🛠️ Tech Stack

### Backend

* **Python**
* **FastAPI**
* **PyPDF2**
* **Google AI Studio API**

### Tools & Utilities

* **CORS Middleware**
* **Uvicorn (ASGI Server)**

---

## 📂 Project Structure

```id="lq7m0p"
project/
│
├── backend/
│   ├── main.py
│   ├── resume_parser.py
│   ├── ai_analyzer.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```id="m0s7lp"
git clone https://github.com/GarvitKhandelwal09/resume-analyzer.git
cd resume-analyzer
```

### 2. Create virtual environment

```id="p1o3l2"
python3 -m venv venv
source venv/bin/activate   # Mac/Linux
```

### 3. Install dependencies

```id="w0l1h9"
pip install -r requirements.txt
```

### 4. Run FastAPI server

```id="d3z9lm"
uvicorn main:app --reload
```

---

## 🌐 API Endpoint

### Upload Resume

```id="3bpxz7"
POST /analyze
```

### Request:

* Form-data → PDF file

### Response:

```json id="6y8l2n"
{
  "skills": ["Python", "FastAPI"],
  "suggestions": "Add more project experience"
}
```

---

## 🔗 How it Works

1. User uploads a resume (PDF)
2. **PyPDF2** extracts text from the document
3. Text is sent to **Google AI Studio API**
4. AI analyzes and returns:

   * Extracted skills
   * Suggestions
   * Improvements
5. FastAPI sends response back to frontend

---

## 🌍 CORS Configuration

CORS middleware is used to allow frontend applications to communicate with the backend securely.

---

## 📸 Future Improvements

* 🔐 User authentication
* 📊 Resume scoring system
* 📈 Dashboard with analytics
* 🌐 Deployment on cloud (AWS / Render)

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Garvit Khandelwal**
GitHub: https://github.com/GarvitKhandelwal09
