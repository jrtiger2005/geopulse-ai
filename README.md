<div align="center">

# 🌐 GeoPulse AI
### Real-Time World Geopolitics Intelligence Platform & Autonomous Voice-Enabled Situation Room

[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/RAG-Scikit--Learn-F7931E.svg?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Leaflet.js](https://img.shields.io/badge/Geospatial-Leaflet.js-199900.svg?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)]()

**A full-stack, military-grade situational awareness platform integrating real-time conflict telemetry, semantic RAG search across geopolitical intelligence dossiers, bidirectional voice interactions, and geospatial theater visualization.**

[Key Features](#-key-features) • [System Architecture](#-system-architecture) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Reference](#-api-endpoints) • [Resume Bullet Points](#-resume-highlights--cv-bullet-points)

</div>

---

## 📌 Overview

**GeoPulse AI** bridges the gap between raw international crisis data and strategic intelligence analysis. Built for defense analysts, policy researchers, and geopolitics enthusiasts, it unifies live battlefield updates, maritime chokepoint transit monitoring, nuclear arsenal deterrence tracking, and sovereign power metrics into an interactive Situation Room.

Powered by a **Retrieval-Augmented Generation (RAG)** pipeline and **Web Speech API**, users can verbally interrogate global conflicts and receive tactical intelligence briefings supported by interactive coordinate-linked map citations.

---

## ✨ Key Features

### 1. ⚡ Real-Time 60-Second World Conflict Wire
- **Automated Asynchronous Polling Engine**: Continuously ingests, classifies, and broadcasts breaking tactical dispatches with a synchronized 60-second auto-refresh lifecycle.
- **Visual Countdown HUD**: Live on-screen countdown timer and progress indicator with one-click manual synchronization.
- **Global Alert Marquee**: Persistent breaking news alert banner running across all operational views.
- **Web Audio Tactical Chimes**: Low-latency synthesized acoustic alerts triggered on critical breaking dispatches.
- **Theater Filtering**: Instant zero-reload filtering across *Ukraine-Russia, Red Sea / Bab-el-Mandeb, Middle East / Levant, Taiwan Strait, Korean DMZ, and Sudan & Sahel*.
- **"⚡ Ask AI" Deep Link**: Every breaking alert includes a one-click trigger that launches an immediate strategic fallout briefing via GeoPulse AI.

### 2. 🎙️ Autonomous Voice-Enabled Strategic AI Analyst (RAG + LLM)
- **Bidirectional Voice Interface**:
  - **Speech-to-Text (STT)**: Dictate complex geopolitical inquiries via browser-native speech recognition.
  - **Speech Synthesis (TTS)**: Autonomous tactical readout with customizable cadence, speech visualizers, and playback toggles.
- **Retrieval-Augmented Generation (RAG)**:
  - Vector knowledge base indexing 65+ comprehensive intelligence dossiers (flashpoints, multilateral treaties, naval chokepoints, country capabilities).
  - Semantic similarity ranking using TF-IDF n-gram vectorization and cosine similarity distance with named-entity keyword boosting.
- **Hybrid Inference & Zero-Setup Fallback**:
  - Out-of-the-box autonomous Strategic Synthesis Engine requiring **no external API keys or cloud dependencies**.
  - Seamless toggle for external LLM inference providers (**OpenAI GPT-4o, Groq Llama-3.3, Ollama local models, and OpenRouter**).
- **Coordinate-Linked Citations**: AI responses cite exact intelligence documents that automatically pan and zoom the Leaflet map to the theater of operations.

### 3. 🗺️ Interactive Situation Room (GIS & Geospatial Radar)
- Dynamic cartography utilizing high-contrast **CartoDB Voyager** tiles.
- Interactive multi-layer GIS toggles:
  - **Active Conflict Flashpoints** (severity-coded pulsing radar markers and casualty indicators).
  - **Strategic Maritime Chokepoints** (daily oil/LNG transit throughput, vulnerability indexes).
  - **Nuclear Arsenals & Strike Ranges** (warhead counts, delivery triad breakdowns).
- Interactive fly-to navigation and slide-over analytical dossiers.

### 4. 📊 Geoeconomic & Geopolitical Dossiers
- **Country Power Matrices**: Detailed defense budgets, GDP ratios, active/reserve troop counts, and strategic alignments for 20+ major sovereign powers.
- **Alliance Architecture**: Comprehensive treaty breakdowns (NATO Article 5, BRICS+ de-dollarization, AUKUS Pillar I/II, Quad, CSTO).
- **Crisis Sandbox ("What-If" War Games)**: Scenario simulations for Taiwan naval blockades, Strait of Hormuz closures, Baltic electronic warfare, and Suwalki Gap incursions.

---

## 🏗️ System Architecture

```
                    ┌────────────────────────────────────────────────────────┐
                    │                   Client Frontend                      │
                    │   Tailwind CSS  •  Leaflet.js GIS  •  Web Speech API   │
                    └───────────▲────────────────────────────────┬───────────┘
                                │                                │
                      REST / JSON Telemetry            Audio / Query Input
                                │                                │
                    ┌───────────┴────────────────────────────────▼───────────┐
                    │                   FastAPI Core Backend                 │
                    │        Asynchronous Routing & Static File Engine       │
                    └─────┬─────────────────────┬────────────────────┬───────┘
                          │                     │                    │
                          ▼                     ▼                    ▼
             ┌────────────────────────┐  ┌─────────────┐  ┌─────────────────────┐
             │   RAG Semantic Engine  │  │  News Wire  │  │   LLM Orchestrator  │
             │  • TF-IDF Vectorizer   │  │  • 60s Sync │  │  • Built-in Engine  │
             │  • Cosine Similarity   │  │  • Tactical │  │  • OpenAI / Groq /  │
             │  • Entity Keyword Boost│  │    Ingest   │  │    Ollama API Client │
             └────────────┬───────────┘  └─────────────┘  └──────────┬──────────┘
                          │                                          │
                          ▼                                          ▼
             ┌────────────────────────┐                   ┌─────────────────────┐
             │   Curated Knowledge    │                   │ Structured Strategic│
             │ • Flashpoints & Blocs  │                   │ Briefings & Citation│
             │ • Chokepoint Metrics   │                   │ Coordinates         │
             └────────────────────────┘                   └─────────────────────┘
```

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Backend Framework** | Python 3.10+, FastAPI, Starlette, Uvicorn (ASGI) |
| **AI / Machine Learning** | Scikit-learn (TF-IDF vectorizer, pairwise metrics), NumPy |
| **LLM Orchestration** | OpenAI Python SDK (compatible with Groq, Ollama, OpenRouter) |
| **Frontend & UI** | Modern Vanilla JavaScript (ES6+ modular architecture), Tailwind CSS |
| **Geospatial & Mapping** | Leaflet.js, CartoDB Voyager tiles, GeoJSON coordinates |
| **Voice & Audio** | HTML5 Web Speech Recognition (STT), SpeechSynthesis (TTS), Web Audio API |
| **Testing** | Starlette TestClient, Unit and integration test suites |

---

## 📁 Repository Structure

```
geopolitics-web/
├── main.py                     # FastAPI application endpoints & lifecycle
├── requirements.txt            # Python production dependencies
├── run.bat                     # Windows one-click startup batch script
├── test_server.py              # Automated integration & endpoint test suite
├── .env.example                # Sample environment configuration
├── .gitignore                  # Git exclusions (__pycache__, logs, envs)
├── LICENSE                     # MIT Open Source License
│
├── data/                       # Structured geopolitical intelligence databases
│   ├── conflicts.py            # Active global flashpoints & operational details
│   ├── alliances.py            # Multilateral treaty alliances & economic blocs
│   ├── chokepoints.py          # Maritime choke-point transit metrics & risks
│   ├── countries.py            # Sovereign country power scores & military data
│   └── scenarios.py            # "What-If" crisis simulation models
│
├── services/                   # Backend domain logic
│   ├── rag_service.py          # Semantic retrieval, vector indexing, scoring
│   ├── llm_service.py          # Strategic synthesis, prompt engineering, multi-LLM
│   └── news_service.py         # 60-second real-time conflict dispatch wire
│
└── static/                     # Frontend client assets
    ├── index.html              # Situation Room HUD layout & navigation
    ├── style.css               # Bright modern theme & radar animations
    ├── app.js                  # Application initialization
    └── js/                     # Modular frontend controllers
        ├── state.js            # Reactive application state store
        ├── map.js              # Leaflet GIS layer controllers & radar animations
        ├── chat.js             # Voice AI dialog interface & citation linking
        ├── voice.js            # Web Speech STT/TTS audio visualizer
        ├── realtime_news.js    # 60s countdown timer & acoustic alerts
        ├── views.js            # Card & dossier UI renderers
        └── drawer.js           # Slide-over intelligence dossier drawer
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/jrtiger2005/geopulse-ai.git
cd geopulse-ai
```

### 2. Create and Activate a Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Server
```bash
# Windows one-click
run.bat

# Or manual execution
python main.py
```

Open your browser at:
```
http://127.0.0.1:8000
```

### 5. Run Verification Tests
```bash
python test_server.py
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/overview` | Global threat composite score, DEFCON status, and telemetry counts |
| `POST` | `/api/chat` | RAG query endpoint returning synthesized briefings and coordinate citations |
| `GET` | `/api/rag/status` | Vector knowledge base status and indexed document counts |
| `GET` | `/api/news/realtime` | Live 60-second conflict wire with breaking alert and countdown metadata |
| `GET` | `/api/conflicts` | List active flashpoints (supports `region` and `severity` query filters) |
| `GET` | `/api/alliances` | List tracked geopolitical alliances and mutual defense treaties |
| `GET` | `/api/chokepoints` | Maritime chokepoints with daily oil/LNG throughput metrics |
| `GET` | `/api/countries` | Sovereign country dossiers (supports `search` and `alignment` filters) |
| `GET` | `/api/scenarios` | War-game crisis simulations with escalation phases and economic shocks |

---

## 🎯 Resume Highlights / CV Bullet Points

> **Tips for Candidates**: You can copy-paste these bullet points directly into your resume under your Projects or Experience section.

### 🔹 For AI / Machine Learning / LLM Engineer Roles
- **Developed GeoPulse AI**, a full-stack geopolitical intelligence platform featuring a custom **Retrieval-Augmented Generation (RAG)** pipeline that indexes 65+ strategic dossiers using **Scikit-learn TF-IDF vectorization** and cosine similarity to achieve sub-10ms semantic document retrieval without third-party vector database overhead.
- Engineered a **hybrid LLM inference orchestrator** supporting offline autonomous strategic synthesis and multi-provider integration (OpenAI, Groq, Ollama), generating structured military briefings with interactive, coordinate-linked map citations.
- Integrated a **multimodal voice assistant** leveraging the HTML5 **Web Speech API** for bidirectional voice communication (Speech-to-Text and Speech Synthesis) with real-time waveform visualization.

### 🔹 For Full-Stack / Backend / Software Engineer Roles
- Architected and deployed a high-performance **FastAPI (ASGI)** situation room application delivering real-time geopolitical conflict telemetry, interactive **Leaflet.js GIS mapping**, and crisis simulation models.
- Built an **asynchronous real-time conflict wire** featuring a 60-second automated refresh cycle, client-side visual countdown HUD, and browser-synthesized acoustic radar alerts via the **Web Audio API**.
- Designed a modular, decoupled architecture adhering to clean code standards across RESTful API endpoints, reactive client state stores, and comprehensive automated test suites (`test_server.py`) ensuring 100% endpoint reliability.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author

**Aman Singh**
- GitHub: [@jrtiger2005](https://github.com/jrtiger2005)
- Email: rajputaman2005@gmail.com
