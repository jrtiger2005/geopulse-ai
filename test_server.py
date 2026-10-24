import sys
import os

print("=== Testing GeoPulse AI Real-Time Conflict Wire & Services ===")
try:
    from main import app
    from data.conflicts import CONFLICTS
    from services.news_service import news_service
    from services.rag_service import rag_service
    from services.llm_service import llm_service

    print("  [PASS] Modules imported successfully.")
    print(f"  [INFO] Indexed RAG Documents: {len(rag_service.documents)}")
except Exception as e:
    print("  [FAIL] Module import error:", e)
    sys.exit(1)

print("\n=== Testing Real-Time News API & Countdown Endpoints ===")
try:
    from starlette.testclient import TestClient
    client = TestClient(app)

    # 1. Realtime News Endpoint
    res = client.get("/api/news/realtime")
    assert res.status_code == 200, f"Realtime news returned {res.status_code}"
    rt_data = res.json()
    assert rt_data.get("status") == "live"
    assert "next_update_seconds" in rt_data and rt_data["next_update_seconds"] <= 60
    assert "breaking_alert" in rt_data
    assert len(rt_data["items"]) >= 8
    print(f"  [PASS] GET /api/news/realtime -> Live status confirmed")
    print(f"         Next Update In: {rt_data['next_update_seconds']}s")
    print(f"         Breaking Headline: [{rt_data['breaking_alert']['conflict']}] {rt_data['breaking_alert']['headline'][:65]}...")
    print(f"         Total Active Alerts: {len(rt_data['items'])}")

    # 2. Filtered Realtime News
    res_flt = client.get("/api/news/realtime?conflict=Red Sea")
    assert res_flt.status_code == 200
    flt_data = res_flt.json()
    assert len(flt_data["items"]) > 0
    print(f"  [PASS] GET /api/news/realtime?conflict=Red Sea -> {len(flt_data['items'])} matching dispatches")

    # 3. Chat Endpoint
    chat_payload = {
        "query": "What is the latest conflict alert in the Red Sea?",
        "history": [],
        "config": {"provider": "builtin"}
    }
    chat_res = client.post("/api/chat", json=chat_payload)
    assert chat_res.status_code == 200
    assert len(chat_res.json()["citations"]) > 0
    print("  [PASS] POST /api/chat -> HTTP 200 (RAG answered with citations)")

    # 4. Static Files Verification
    static_files = [
        "static/index.html",
        "static/style.css",
        "static/js/state.js",
        "static/js/map.js",
        "static/js/views.js",
        "static/js/drawer.js",
        "static/js/voice.js",
        "static/js/realtime_news.js",
        "static/js/chat.js",
        "static/app.js"
    ]
    for path in static_files:
        assert os.path.exists(path), f"Missing {path}"
        print(f"  [PASS] Verified: {path} ({os.path.getsize(path):,} bytes)")

    print("\n*********************************************************************")
    print("  ALL REAL-TIME CONFLICT WIRE & AUTO-REFRESH TESTS PASSED! ")
    print("*********************************************************************")
except Exception as e:
    print("  [FAIL] Test encountered error:", e)
    sys.exit(1)
