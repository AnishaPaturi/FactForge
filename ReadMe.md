# 🧠 FactForge – AI-Powered Fact & Claim Verification System

![Python](https://img.shields.io/badge/Python-3.10-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-green)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet)
![Deployment](https://img.shields.io/badge/Deployed-Render-purple)
![Database](https://img.shields.io/badge/Database-SQLite-yellow)
![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)

---

## 🚀 Overview

FactForge is an AI-powered fact-checking system that analyzes text or articles, extracts verifiable claims, retrieves real-world evidence, and determines their accuracy.

It combines **LLMs + real-time search + structured verification** to combat misinformation in a scalable and explainable way.

---

## 🎯 Problem Statement

With the rapid rise of AI-generated content and digital misinformation, manual fact-checking is:

* ❌ Time-consuming
* ❌ Not scalable
* ❌ Prone to human error

FactForge automates this entire process using a multi-stage AI pipeline.

---

## ⚙️ Features

### 🧩 Claim Extraction

* Extracts atomic, verifiable claims
* Preserves original wording (no correction bias)

---

### 🔎 Evidence Retrieval

* Uses Tavily API for real-time search
* Retrieves top relevant sources
* Filters unreliable domains (Reddit, Facebook, YouTube)

---

### 🧪 Verification Engine

* Classifies claims as:

  * ✅ True
  * ❌ False
  * ⚠️ Partially True
  * ❓ Unverifiable
* Generates:

  * Confidence score
  * Evidence-based explanation

---

### 🤖 AI Content Detection

* Estimates probability of input being AI-generated

---

### 🗄️ Database Integration

* Stores all verification results using SQLite
* Supports history retrieval for auditability

---

### 🌐 Deployment

* Fully deployed on Render
* Public API available globally

---

## 🏗️ Architecture

```text
Input (Text / URL)
   ↓
Claim Extraction (LLM)
   ↓
Search Agent (Tavily API)
   ↓
Verification Agent (LLM)
   ↓
Database Storage (SQLite)
   ↓
API Response
```

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Backend    | FastAPI (Python)              |
| LLM        | OpenRouter (GPT-based models) |
| Search API | Tavily                        |
| Database   | SQLite                        |
| Deployment | Render                        |

---

## 📁 Project Structure

```text
backend/
│
├── app/
│   ├── api/
│   │   └── routes.py
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
│   │   ├── ai_detector.py
│   │   ├── claim_extractor.py
│   │   ├── db_service.py
│   │   ├── orchestrator.py
│   │   ├── search_service.py
│   │   └── verifier.py
│   │
│   ├── utils/
│   │   ├── helpers.py
│   │   └── logger.py
│   │
│   ├── db.py
│   └── main.py
│
├── tests/
│   ├── conftest.py
│   ├── test_ai_detector.py
│   ├── test_claim_extractor.py
│   ├── test_orchestrator.py
│   ├── test_search_service.py
│   └── test_verifier.py
│
├── .env
├── fact_checker.db
├── render.yaml
├── requirements.txt
└── run.py
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/factforge-backend.git
cd factforge-backend/backend
```

---

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_key
TAVILY_API_KEY=your_key
```

---

### 4️⃣ Run the Application

```bash
python run.py
```

---

## 🌍 Live API

🔗 https://factforge-api.onrender.com
📄 Docs: https://factforge-api.onrender.com/docs

---

## 🧪 API Endpoints

### 🔹 Analyze Text

**POST** `/analyze`

```json
{
  "text": "The Earth is flat."
}
```

---

### 🔹 Get History

**GET** `/history`

Returns previously verified results stored in SQLite.

---

## 🧠 Example Output

```text
Claim: The Earth is flat
Verdict: False
Confidence: 95%
Explanation: Scientific evidence confirms Earth is spherical.
Sources: Wikipedia, BBC Earth
```

---

## 🧪 Testing

Run all tests:

```bash
pytest -v
```

Covers:

* Claim extraction
* Search service
* Verification logic
* Orchestrator pipeline
* AI detection

---

## 📊 Evaluation Highlights

* ✔️ Accurate claim extraction
* ✔️ Evidence-grounded verification
* ✔️ Explainable AI reasoning
* ✔️ Multi-agent architecture
* ✔️ End-to-end tested pipeline

---

## 🚧 Limitations

* SQLite is not persistent on cloud restarts
* Dependent on external APIs
* Search results may vary

---

## 🔮 Future Improvements

* PostgreSQL for persistent storage
* Frontend UI for visualization
* Source credibility scoring
* Image/deepfake detection

---

## 👩‍💻 Team

* **Anisha** – Backend & LLM Integration
* **Jayashree** – Frontend
* **Sravani** – Search & Orchestration

---

## 🏆 Conclusion

FactForge demonstrates how AI can be leveraged to build scalable, explainable, and reliable fact-checking systems to combat misinformation in real time.

---

⭐ If you found this project useful, consider giving it a star!
