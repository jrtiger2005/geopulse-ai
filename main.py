import os
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from data.conflicts import CONFLICTS
from data.alliances import ALLIANCES
from data.chokepoints import CHOKEPOINTS
from data.countries import COUNTRIES
from data.scenarios import SCENARIOS
from services.news_service import news_service, get_latest_news
from services.rag_service import rag_service
from services.llm_service import llm_service

app = FastAPI(
    title='GeoPulse AI: World Geopolitics Intelligence Platform',
    description='Real-time situational awareness, 60s conflict updates, RAG & LLM strategic chatbot, and crisis simulation.',
    version='2.1.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# Mount static files
app.mount('/static', StaticFiles(directory='static'), name='static')

class ChatRequest(BaseModel):
    query: str
    history: Optional[List[Dict[str, str]]] = []
    config: Optional[Dict[str, Any]] = None

@app.get('/')
def serve_index():
    return FileResponse('static/index.html')

@app.get('/api/overview')
def get_overview():
    # Calculate composite global tension index (scale 0 - 100)
    avg_conflict_risk = sum(c.get('escalation_risk', 50) for c in CONFLICTS) / len(CONFLICTS)
    avg_chokepoint_risk = sum(cp.get('risk_score', 50) for cp in CHOKEPOINTS) / len(CHOKEPOINTS)
    global_tension = round((avg_conflict_risk * 0.6) + (avg_chokepoint_risk * 0.4), 1)

    if global_tension >= 80:
        defcon_level = 'DEFCON 2 (Severe Alert)'
        defcon_color = '#ef4444'
    elif global_tension >= 65:
        defcon_level = 'DEFCON 3 (Heightened Armed Readiness)'
        defcon_color = '#f59e0b'
    elif global_tension >= 50:
        defcon_level = 'DEFCON 4 (Increased Watch)'
        defcon_color = '#eab308'
    else:
        defcon_level = 'DEFCON 5 (Normal Peacetime)'
        defcon_color = '#10b981'

    return {
        'platform': 'GeoPulse AI',
        'global_tension_index': global_tension,
        'defcon_status': defcon_level,
        'defcon_color': defcon_color,
        'active_conflicts_count': len(CONFLICTS),
        'critical_conflicts_count': sum(1 for c in CONFLICTS if c.get('severity') == 'Critical'),
        'tracked_alliances_count': len(ALLIANCES),
        'monitored_chokepoints_count': len(CHOKEPOINTS),
        'tracked_countries_count': len(COUNTRIES),
        'nuclear_armed_states_count': 9,
        'global_defense_spending_est_trillions': 2.44,
        'simulation_scenarios_count': len(SCENARIOS),
        'rag_indexed_documents': len(rag_service.documents)
    }

@app.post('/api/chat')
def chat_endpoint(req: ChatRequest):
    if not req.query or not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    response = llm_service.generate_response(
        query=req.query.strip(),
        chat_history=req.history,
        llm_config=req.config
    )
    return response

@app.get('/api/rag/status')
def get_rag_status():
    return {
        'status': 'active',
        'total_indexed_documents': len(rag_service.documents),
        'categories': {
            'conflicts': sum(1 for d in rag_service.documents if d['entity_type'] == 'conflict'),
            'alliances': sum(1 for d in rag_service.documents if d['entity_type'] == 'alliance'),
            'chokepoints': sum(1 for d in rag_service.documents if d['entity_type'] == 'chokepoint'),
            'countries': sum(1 for d in rag_service.documents if d['entity_type'] == 'country'),
            'scenarios': sum(1 for d in rag_service.documents if d['entity_type'] == 'scenario'),
            'news': sum(1 for d in rag_service.documents if d['entity_type'] == 'news'),
        }
    }

@app.get('/api/news/realtime')
def get_realtime_news(conflict: str = None):
    return news_service.get_realtime_conflict_news(conflict_filter=conflict)

@app.get('/api/news')
def get_news(category: str = None):
    news_data = news_service.get_realtime_conflict_news()
    items = news_data["items"]
    if category and category != 'All':
        items = [n for n in items if n.get('category') == category]
    return items

@app.get('/api/conflicts')
def get_conflicts(region: str = None, severity: str = None):
    results = CONFLICTS
    if region and region != 'All':
        results = [c for c in results if c.get('region') == region]
    if severity and severity != 'All':
        results = [c for c in results if c.get('severity') == severity]
    return results

@app.get('/api/conflicts/{conflict_id}')
def get_conflict(conflict_id: str):
    for c in CONFLICTS:
        if c['id'] == conflict_id:
            return c
    raise HTTPException(status_code=404, detail='Conflict not found')

@app.get('/api/alliances')
def get_alliances():
    return ALLIANCES

@app.get('/api/alliances/{alliance_id}')
def get_alliance(alliance_id: str):
    for a in ALLIANCES:
        if a['id'] == alliance_id:
            return a
    raise HTTPException(status_code=404, detail='Alliance not found')

@app.get('/api/chokepoints')
def get_chokepoints():
    return CHOKEPOINTS

@app.get('/api/countries')
def get_countries(search: str = None, alignment: str = None):
    results = COUNTRIES
    if alignment and alignment != 'All':
        results = [c for c in results if c.get('alignment') == alignment]
    if search:
        s = search.lower()
        results = [
            c for c in results 
            if s in c.get('name', '').lower() 
            or s in c.get('iso', '').lower() 
            or s in c.get('capital', '').lower()
        ]
    return results

@app.get('/api/countries/{iso}')
def get_country(iso: str):
    for c in COUNTRIES:
        if c['iso'].upper() == iso.upper():
            return c
    raise HTTPException(status_code=404, detail='Country not found')

@app.get('/api/scenarios')
def get_scenarios():
    return SCENARIOS

if __name__ == '__main__':
    import uvicorn
    print('Starting GeoPulse AI Geopolitics Intelligence Platform on http://127.0.0.1:8000')
    uvicorn.run('main:app', host='127.0.0.1', port=8000, reload=True)
