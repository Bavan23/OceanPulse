<h1 align="center"><strong>OceanPulse 🌊</strong></h1>

<h2 align="center">
  Crowdsourced Ocean Hazard Reporting Platform with Real-Time Social Media Analytics.
</h2>

---
<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
  <img src="https://img.shields.io/badge/Frontend-ReactJS-blue" alt="Frontend: ReactJS">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green" alt="Backend: FastAPI">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-yellow" alt="Database: PostgreSQL">
</p>



## Overview
OceanPulse is a **full-stack web platform** designed to empower coastal communities, fishermen, and disaster management authorities. It provides:

- Real-time hazard reporting via citizen contributions.
- Predictive alerts using AI and NLP.
- Social media trend analysis to support early warning and preparedness.

---

## Features
- **Crowdsourced Hazard Reporting:** Submit location-tagged hazard reports with photos, videos, or voice notes.
- **Interactive Hazard Map:** Dynamic visualization of hazards and trends using Leaflet.js.
- **AI & Social Media Analytics:** Analyze Twitter, Instagram, and other platforms for early hazard signals.
- **Predictive Alerts:** AI-powered alerts based on verified reports and social media trends.
- **Role-Based Access:** Secure authentication for citizens, admins, and analysts.
- **Multilingual & Offline Support:** IndexedDB enables offline data capture for remote areas.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | ReactJS|
| Backend | Python, FastAPI |
| Database | PostgreSQL + PostGIS |
| Offline Support | IndexedDB (Web)|
| AI & NLP | Hugging Face Transformers (IndicBERT for text, Whisper for voice) |
| Media Storage | AWS S3 |
| Mapping & Visualization | Leaflet.js |
| Deployment | Docker on AWS |

---

## Getting Started

### Prerequisites
- Python ≥ 3.10
- Node.js ≥ 18
- PostgreSQL (local or cloud)
- Docker (optional, for containerized deployment)

### Installation
```bash
# Clone the repo
git clone https://github.com/Bavan23/OceanPulse.git
cd OceanPulse

# Install frontend
cd frontend
npm install
npm run dev

# Install backend
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
