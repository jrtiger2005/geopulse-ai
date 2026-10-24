"""
GeoPulse AI - Retrieval-Augmented Generation (RAG) Service
Indexes all geopolitical flashpoints, alliances, chokepoints, country dossiers,
crisis simulations, and intelligence news into a searchable semantic knowledge base.
"""
import re
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from data.conflicts import CONFLICTS
from data.alliances import ALLIANCES
from data.chokepoints import CHOKEPOINTS
from data.countries import COUNTRIES
from data.scenarios import SCENARIOS
from services.news_service import get_latest_news

class GeopoliticalRAGService:
    def __init__(self):
        self.documents: List[Dict[str, Any]] = []
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words="english", max_features=10000)
        self.tfidf_matrix = None
        self.build_index()

    def build_index(self):
        """Extracts structured intelligence into normalized chunked documents."""
        docs = []

        # 1. Index Conflicts
        for c in CONFLICTS:
            text = (
                f"Conflict Flashpoint: {c['name']} ({c['region']}). Severity: {c['severity']}. "
                f"Status: {c['status']}. Primary Parties: {', '.join(c['primary_parties'])}. "
                f"Escalation Risk: {c['escalation_risk']}%. Nuclear Deterrence Shadow: {c['nuclear_shadow']}. "
                f"Background: {c['background']} "
                f"Key Stakes: {' '.join(c['key_stakes'])} "
                f"Latest Operational Developments: {c['latest_developments']} "
                f"Casualty Estimate: {c['casualty_estimate']}. "
                f"Tags: {', '.join(c['tags'])}."
            )
            docs.append({
                "id": f"conflict-{c['id']}",
                "entity_id": c['id'],
                "entity_type": "conflict",
                "title": c['name'],
                "region": c['region'],
                "severity": c['severity'],
                "lat": c.get('lat'),
                "lng": c.get('lng'),
                "content": text,
                "keywords": [c['name'], c['region']] + c['primary_parties'] + c['tags']
            })

        # 2. Index Alliances
        for a in ALLIANCES:
            text = (
                f"International Alliance / Power Bloc: {a['name']} ({a['acronym']}). Founded: {a['founded']}. "
                f"Type: {a['type']}. Headquarters: {a['headquarters']}. "
                f"Collective Defense Treaty: {a['collective_defense']}. Core Clause: {a['core_clause']}. "
                f"Total Combined GDP: ${a['total_gdp_trillions']} Trillion. Population: {a['total_population_billions']} Billion. "
                f"Total Military Budget: ${a['total_military_budget_billions']} Billion. "
                f"Nuclear States: {', '.join(a['nuclear_states'])}. "
                f"Key Anchor Powers: {', '.join(a['key_powers'])}. "
                f"Members: {', '.join(a['members'])}. "
                f"Strategic Focus: {a['strategic_focus']}. "
                f"Description: {a['description']}."
            )
            docs.append({
                "id": f"alliance-{a['id']}",
                "entity_id": a['id'],
                "entity_type": "alliance",
                "title": f"{a['acronym']} - {a['name']}",
                "region": "Global/Multilateral",
                "severity": "High" if a['collective_defense'] else "Medium",
                "content": text,
                "keywords": [a['name'], a['acronym']] + a['key_powers'] + a['members'][:10]
            })

        # 3. Index Chokepoints
        for cp in CHOKEPOINTS:
            text = (
                f"Strategic Maritime Chokepoint: {cp['name']}. Waterway: {cp['waterway']}. "
                f"Littoral States: {', '.join(cp['littoral_states'])}. "
                f"Daily Oil Transit: {cp['oil_transit_bpd']}. LNG Transit Share: {cp['lng_transit_pct']}. "
                f"Vulnerability Rating: {cp['vulnerability_level']} (Risk Score: {cp['risk_score']}/100). "
                f"Strategic Overview: {cp['description']} "
                f"Historical Incidents: {cp['historical_incidents']} "
                f"Maritime Detours and Alternatives: {cp['alternatives']}."
            )
            docs.append({
                "id": f"chokepoint-{cp['id']}",
                "entity_id": cp['id'],
                "entity_type": "chokepoint",
                "title": cp['name'],
                "region": cp['waterway'],
                "severity": cp['vulnerability_level'],
                "lat": cp.get('lat'),
                "lng": cp.get('lng'),
                "content": text,
                "keywords": [cp['name'], cp['waterway']] + cp['littoral_states']
            })

        # 4. Index Countries
        for cn in COUNTRIES:
            text = (
                f"Country Geopolitical Dossier: {cn['name']} ({cn['flag']} {cn['iso']}). Capital: {cn['capital']}, Region: {cn['region']}. "
                f"Geopolitical Composite Power Score: {cn['power_score']}/100. Strategic Alignment: {cn['alignment']}. "
                f"Nominal GDP: ${cn['gdp_nominal_billions']:,} Billion USD. Defense Budget: ${cn['defense_budget_billions']} Billion USD ({cn['defense_pct_gdp']}% of GDP). "
                f"Active Military Personnel: {cn['active_military_personnel']:,}. Reserve Personnel: {cn['reserve_personnel']:,}. "
                f"Nuclear Weapon Capabilities: {cn['nuclear_status']}. "
                f"Major Treaty Alliances: {', '.join(cn['major_alliances'])}. "
                f"Primary Strategic Partners: {', '.join(cn['primary_partners'])}. "
                f"Primary Strategic Rivals: {', '.join(cn['strategic_rivals']) if isinstance(cn['strategic_rivals'], list) else cn['strategic_rivals']}. "
                f"Core Geostrategic Priorities: {cn['key_interests']} "
                f"Territorial and Maritime Disputes: {cn['territorial_disputes']}."
            )
            docs.append({
                "id": f"country-{cn['iso']}",
                "entity_id": cn['iso'],
                "entity_type": "country",
                "title": f"{cn['flag']} {cn['name']} ({cn['iso']})",
                "region": cn['region'],
                "severity": "Power " + str(cn['power_score']),
                "lat": cn.get('lat'),
                "lng": cn.get('lng'),
                "content": text,
                "keywords": [cn['name'], cn['iso'], cn['capital'], cn['alignment']] + cn['major_alliances']
            })

        # 5. Index Scenarios
        for sc in SCENARIOS:
            stages_text = " ".join([f"{st['phase']}: {st['action']}" for st in sc['escalation_stages']])
            text = (
                f"Crisis Simulation / War-Game Scenario: {sc['title']}. Timeframe: {sc['timeframe']}. "
                f"Probability Rating: {sc['probability_score']}. "
                f"Triggering Catalyst: {sc['trigger_event']} "
                f"Estimated Global Economic Damage: {sc['global_economic_shock']}. "
                f"Severely Affected Sectors: {', '.join(sc['key_affected_sectors'])}. "
                f"Escalation Stages: {stages_text} "
                f"Allied Military Contingencies: {sc['military_response']} "
                f"Geopolitical and Sanctions Fallout: {sc['diplomatic_consequences']}."
            )
            docs.append({
                "id": f"scenario-{sc['id']}",
                "entity_id": sc['id'],
                "entity_type": "scenario",
                "title": sc['title'],
                "region": "Global Crisis Simulation",
                "severity": sc['probability_score'],
                "content": text,
                "keywords": [sc['title']] + sc['key_affected_sectors']
            })

        # 6. Index News
        news_items = get_latest_news()
        for nw in news_items:
            text = (
                f"Diplomatic & Military Intelligence Alert: {nw['title']}. Category: {nw['category']}. "
                f"Urgency: {nw['urgency']}. Region: {nw['region']}. Source: {nw['source']}. "
                f"Summary: {nw['summary']} Strategic Impact: {nw['impact']}."
            )
            docs.append({
                "id": f"news-{nw['id']}",
                "entity_id": nw['id'],
                "entity_type": "news",
                "title": nw['title'],
                "region": nw['region'],
                "severity": nw['urgency'],
                "content": text,
                "keywords": [nw['title'], nw['category'], nw['source']]
            })

        self.documents = docs
        corpus = [d['content'] for d in self.documents]
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)
        print(f"[GeoPulse RAG] Successfully indexed {len(self.documents)} geopolitical intelligence documents.")

    def search(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        """Performs semantic vector search with keyword boost."""
        if not self.documents or self.tfidf_matrix is None:
            return []

        query_vec = self.vectorizer.transform([query])
        cosine_scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()

        # Keyword boost heuristic for named geopolitical entities
        query_lower = query.lower()
        query_words = set(re.findall(r"\w+", query_lower))

        scored_docs = []
        for idx, doc in enumerate(self.documents):
            score = float(cosine_scores[idx])

            # Exact keyword match boost
            matches = 0
            for kw in doc.get("keywords", []):
                kw_clean = kw.lower()
                if kw_clean in query_lower:
                    score += 0.35
                    matches += 1
                elif any(word in query_words for word in re.findall(r"\w+", kw_clean)):
                    score += 0.12
                    matches += 1

            if doc['title'].lower() in query_lower:
                score += 0.45

            if score > 0.05:
                scored_docs.append({
                    "score": round(score, 4),
                    "doc": doc
                })

        scored_docs.sort(key=lambda x: x["score"], reverse=True)
        top_results = [item["doc"] for item in scored_docs[:top_k]]
        return top_results

rag_service = GeopoliticalRAGService()
