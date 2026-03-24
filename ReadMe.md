# 🧠 FactForge – AI-Powered Fact & Claim Verification System

![Python](https://img.shields.io/badge/Python-3.10-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-green)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet)
![Deployment](https://img.shields.io/badge/Deployed-Render-purple)
![Database](https://img.shields.io/badge/Database-SQLite-yellow)
![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)

---

## 🚀 Overview

FactForge is an **AI-powered fact-checking system** that analyzes text, extracts verifiable claims, retrieves real-world evidence, and determines their accuracy.

It combines **LLMs + real-time search + structured verification** to combat misinformation in a scalable and explainable way.

---

## 🎯 Problem Statement

With the rapid rise of AI-generated content and misinformation:

- ❌ Manual fact-checking is time-consuming  
- ❌ Not scalable  
- ❌ Prone to human bias  

👉 FactForge automates the entire process using a multi-stage AI pipeline.

---

## ⚙️ Key Features

### 🧩 Claim Extraction
- Extracts atomic, verifiable claims from text  
- Preserves original phrasing  

### 🔎 Evidence Retrieval
- Fetches real-time sources  
- Filters unreliable domains  

### 🧪 Verification Engine
- Classifies claims as:
  - ✅ True  
  - ❌ False  
  - ⚠️ Partially True  
  - ❓ Unverifiable  
- Generates:
  - Confidence score  
  - Explanation  

### ⚖️ Bias Detection
- Classifies claims as Left / Right / Neutral  

### 🤖 AI Content Detection
- Detects likelihood of AI-generated text  

### 📑 PDF Report Generation
- Download structured reports  

### 🗄️ History Tracking
- Stores previous results  

### 🔐 Authentication
- User login & signup  

---

## 🏗️ System Architecture

```
User Input
   ↓
Claim Extraction
   ↓
Topic Detection
   ↓
Evidence Retrieval
   ↓
Verification Engine
   ↓
Bias + AI Detection
   ↓
Explanation Generation
   ↓
Database Storage → API Response
```

Core pipeline handled in:
- `backend/app/services/orchestrator.py`

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | React (Vite) + Tailwind CSS   |
| Backend    | FastAPI (Python)              |
| LLM        | OpenRouter (GPT models)       |
| Search API | Tavily                        |
| Database   | SQLite (SQLAlchemy)           |
| Auth       | Passlib (bcrypt)              |
| Reports    | ReportLab                     |
| Deployment | Render                        |

---

## 📁 Project Structure

### 🔹 Backend

```
backend/
│
├── app/
│   ├── api/
│   │   ├── routes.py
│   │   └── auth_routes.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── constants.py
│   │
│   ├── models/
│   │   ├── db_models.py
│   │   └── schemas.py
│   │
│   ├── prompts/
│   │   ├── extraction_prompt.txt
│   │   └── verification_prompt.txt
│   │
│   ├── services/
│   │   ├── orchestrator.py
│   │   ├── claim_extractor.py
│   │   ├── topic_detector.py
│   │   ├── search_service.py
│   │   ├── verifier.py
│   │   ├── bias_indicator.py
│   │   ├── ai_detector.py
│   │   ├── credibility_service.py
│   │   ├── db_service.py
│   │   ├── pdf_generator.py
│   │   └── api.js
│   │
│   ├── utils/
│   │   ├── helpers.py
│   │   └── logger.py
│   │
│   ├── db.py
│   └── main.py
│
├── tests/
├── .env
├── fact_checker.db
├── requirements.txt
├── run.py
└── render.yaml
```

---

### 🔹 Frontend

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── AnalyticsPanel.jsx
│   │   ├── ClaimCard.jsx
│   │   ├── ClaimsList.jsx
│   │   ├── ConfidenceChart.jsx
│   │   ├── Footer.jsx
│   │   ├── InputBox.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProgressStepper.jsx
│   │   ├── ResultBreakdownChart.jsx
│   │   ├── ResultCard.jsx
│   │   ├── SummaryStats.jsx
│   │   └── WarningBanner.jsx
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── History.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env
```

---

## 📦 Dependencies

### 🔹 Backend

```bash
pip install -r requirements.txt
```

Or manually:

```bash
pip install fastapi uvicorn requests python-dotenv sqlalchemy pydantic reportlab pytz passlib bcrypt==4.0.1
```

---

### 🔹 Frontend

```bash
npm install
```

---

## 🔐 Environment Variables

### Backend `.env`

```env
OPENROUTER_API_KEY=your_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL_NAME=your_model
TAVILY_API_KEY=your_api_key
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## 🚀 Running the Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AnishaPaturi/FactForge.git
cd FactForge
```

---

### 2️⃣ Start Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### 3️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Auth
- POST /login
- POST /register

### 🧠 Core
- POST /analyze
- GET /history
- POST /generate-pdf

---

## 🧪 Example Request

```json
POST /analyze

{
  "text": "The Earth is flat"
}
```

---

## 📊 Example Output

```json
{
  "topic": "Science",
  "claims": [
    {
      "claim": "The Earth is flat",
      "verdict": "False",
      "confidence": 92,
      "bias": "Neutral"
    }
  ]
}
```

---

## 🧪 Testing

```bash
pytest -v
```

---

## ⚠️ Limitations

- Depends on external APIs  
- SQLite not persistent on cloud restarts  
- AI-generated explanations may vary  

---

## 🔮 Future Improvements

- PostgreSQL integration  
- Better source credibility scoring  
- Multi-language support  
- Advanced analytics dashboard  

---

## 👩‍💻 Team

- Anisha  
- Sravani  
- Jayashree  

---

## 🏆 Conclusion

FactForge demonstrates how AI can be leveraged to build scalable, explainable, and reliable fact-checking systems to combat misinformation in real time.

---

⭐ If you found this project useful, consider giving it a star!
