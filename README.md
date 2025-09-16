#OceanPulse - Ocean Hazard Reporting Platform 🌊


## Overview
This project is a **Smart India Hackathon 2025 (SIH 2025)** submission for Problem ID 25039:  
**Integrated Platform for Crowdsourced Ocean Hazard Reporting & Social Media Analytics**.

The platform enables **real-time ocean hazard reporting**, predictive insights using AI, and social media trend analysis to support early warnings and disaster preparedness for coastal communities.

---

## Features
- **Crowdsourced Hazard Reporting:** Users can report hazards in real-time with geolocation.  
- **Interactive Hazard Map:** Visualize hazards and trends geographically.  
- **Social Media Analytics:** Analyze Twitter and other platforms for early signals of hazards.  
- **Predictive Alerts:** AI-driven predictions for potential hazards.  
- **User Management:** Authentication and role-based access control for secure usage.  

---

## Tech Stack
- **Frontend:** ReactJS 
- **Backend:**  Python (FastAPI)  
- **Database:** PostgreSQL + PostGIS
- **AI & NLP:** Python, Hugging Face Transformers (IndicBERT for text, Whisper for voice), Twitter API / YouTube API
- **Offline Support:** IndexedDB (Web)
- **Media Storage:** AWS S3
- **Mapping / Visualization:** Leaflet.js  
- **Deployment:** Docker on AWS

---

## Getting Started
### Prerequisites
- Python ≥ 3.10  
- PostgreSQL installed locally or cloud instance  
- Docker (optional, for containerized deployment)  

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Bavan23/OceanPulse.git
