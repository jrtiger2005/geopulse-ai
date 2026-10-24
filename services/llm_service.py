"""
GeoPulse AI - LLM & Strategic Reasoning Orchestrator
Handles RAG context assembly, multi-provider LLM calls (OpenAI, Groq, Ollama),
and provides a built-in Autonomous Geopolitical Strategic Synthesis Engine.
"""
import os
import json
from typing import List, Dict, Any, Optional
from services.rag_service import rag_service

SYSTEM_PROMPT = """You are GeoPulse AI, a senior global intelligence and geopolitical strategic analyst in a military-grade situation room.
Your mission is to deliver objective, rigorous, and actionable strategic intelligence.

Analyze the user's query using the retrieved intelligence documents below.
Ground your response in the provided facts (military spending, chokepoint throughput, treaty articles, active combatants, nuclear postures).
Structure your response clearly with:
- **Executive Strategic Summary**
- **Operational & Military Dynamics**
- **Geoeconomic & Supply Chain Implications**
- **Escalation Risk & Forward Outlook**

Maintain an analytical, authoritative tone similar to Stratfor, CSIS, or a National Security Council briefing.
"""

class GeopoliticalLLMService:
    def __init__(self):
        pass

    def generate_response(
        self,
        query: str,
        chat_history: Optional[List[Dict[str, str]]] = None,
        llm_config: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Runs the RAG pipeline and generates an intelligent geopolitical analysis."""
        if chat_history is None:
            chat_history = []
        if llm_config is None:
            llm_config = {}

        # 1. Retrieve relevant intelligence documents via RAG
        retrieved_docs = rag_service.search(query, top_k=4)

        # 2. Extract citations
        citations = []
        for doc in retrieved_docs:
            citations.append({
                "id": doc.get("id"),
                "entity_id": doc.get("entity_id"),
                "entity_type": doc.get("entity_type"),
                "title": doc.get("title"),
                "region": doc.get("region"),
                "severity": doc.get("severity"),
                "lat": doc.get("lat"),
                "lng": doc.get("lng")
            })

        # Check for user-provided or environment API keys
        provider = llm_config.get("provider", "builtin")
        api_key = (
            llm_config.get("api_key") or
            os.environ.get("OPENAI_API_KEY") or
            os.environ.get("GROQ_API_KEY")
        )

        # 3. Call External LLM if configured and key is available
        if provider in ["openai", "groq", "ollama", "openrouter"] and (api_key or provider == "ollama"):
            try:
                answer = self._call_external_llm(query, retrieved_docs, chat_history, provider, api_key, llm_config)
                return {
                    "answer": answer,
                    "citations": citations,
                    "suggested_followups": self._generate_followups(query, retrieved_docs),
                    "model_used": f"{provider}:{llm_config.get('model', 'default')}",
                    "rag_count": len(retrieved_docs)
                }
            except Exception as e:
                # Graceful fallback to built-in reasoning engine
                fallback_reason = str(e)
                synthesis = self._builtin_strategic_synthesis(query, retrieved_docs, fallback_note=f"(External LLM fallback: {fallback_reason})")
                return {
                    "answer": synthesis,
                    "citations": citations,
                    "suggested_followups": self._generate_followups(query, retrieved_docs),
                    "model_used": "GeoPulse Built-in Strategic Engine (Fallback)",
                    "rag_count": len(retrieved_docs)
                }

        # 4. Built-in Strategic Reasoning & Synthesis Engine (Default / Out-of-the-Box)
        synthesis = self._builtin_strategic_synthesis(query, retrieved_docs)
        return {
            "answer": synthesis,
            "citations": citations,
            "suggested_followups": self._generate_followups(query, retrieved_docs),
            "model_used": "GeoPulse Strategic Intelligence Engine (Zero-Setup)",
            "rag_count": len(retrieved_docs)
        }

    def _call_external_llm(
        self,
        query: str,
        retrieved_docs: List[Dict[str, Any]],
        chat_history: List[Dict[str, str]],
        provider: str,
        api_key: Optional[str],
        config: Dict[str, Any]
    ) -> str:
        from openai import OpenAI

        base_url = config.get("base_url")
        model = config.get("model")

        if provider == "groq":
            base_url = base_url or "https://api.groq.com/openai/v1"
            model = model or "llama-3.3-70b-versatile"
        elif provider == "ollama":
            base_url = base_url or "http://localhost:11434/v1"
            model = model or "llama3.2"
            api_key = api_key or "ollama"
        elif provider == "openrouter":
            base_url = base_url or "https://openrouter.ai/api/v1"
            model = model or "meta-llama/llama-3.3-70b-instruct"
        else: # OpenAI
            model = model or "gpt-4o-mini"

        client = OpenAI(api_key=api_key, base_url=base_url)

        context_blocks = []
        for i, doc in enumerate(retrieved_docs, 1):
            context_blocks.append(f"[Document {i}] ({doc['entity_type'].upper()} - {doc['title']})\n{doc['content']}")
        context_str = "\n\n".join(context_blocks)

        messages = [{"role": "system", "content": f"{SYSTEM_PROMPT}\n\nRETRIEVED INTELLIGENCE CONTEXT:\n{context_str}"}]

        # Append recent conversation history
        for msg in chat_history[-6:]:
            messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})

        messages.append({"role": "user", "content": query})

        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.3,
            max_tokens=900
        )
        return completion.choices[0].message.content

    def _builtin_strategic_synthesis(
        self,
        query: str,
        retrieved_docs: List[Dict[str, Any]],
        fallback_note: str = ""
    ) -> str:
        """Autonomous geopolitical analysis engine synthesizing structured briefings."""
        if not retrieved_docs:
            return (
                f"### Strategic Assessment\n\n"
                f"No direct matches found in current operational theater index for query: **\"{query}\"**.\n\n"
                f"**Recommendations:**\n"
                f"- Query active flashpoints (e.g., *Ukraine, Taiwan Strait, Middle East, Red Sea, Sahel, Sudan*)\n"
                f"- Query strategic maritime chokepoints (e.g., *Hormuz, Malacca, Bab-el-Mandeb, Suez, Panama*)\n"
                f"- Query superpower blocs (e.g., *NATO, BRICS+, Quad, AUKUS, CSTO*)\n"
                f"- Search national dossiers (e.g., *United States, China, Russia, India, Iran*)"
            )

        top_doc = retrieved_docs[0]
        supporting_docs = retrieved_docs[1:]

        # Extract intelligence parameters
        entity_type = top_doc.get("entity_type", "entity")
        title = top_doc.get("title", "Geopolitical Focus")
        region = top_doc.get("region", "Global")
        severity = top_doc.get("severity", "Monitored")

        sections = []

        if fallback_note:
            sections.append(f"> [!NOTE]\n> {fallback_note}\n")

        # Section 1: Executive Intelligence Summary
        sections.append(
            f"### ?? Executive Strategic Briefing: {title}\n\n"
            f"**Theater / Jurisdiction:** {region} &bull; **Classification / Threat Status:** `{severity}`\n\n"
            f"{top_doc['content'].split('Background: ')[-1].split('Key Stakes:')[0].strip()}"
        )

        # Section 2: Core Geopolitical Factors
        sections.append(
            f"#### ??? Strategic Posture & Core Dynamics\n"
            f"- **Primary Focus:** High-stakes engagement regarding sovereignty, deterrence posture, and regional supremacy.\n"
            f"- **Operational Context:** Documented intelligence indicates persistent tension along vital lines of communication and contested spheres of influence.\n"
            f"- **Cross-Theater Linkages:** Intersects with {', '.join([d['title'] for d in supporting_docs]) if supporting_docs else 'global balance of power'}."
        )

        # Section 3: Geoeconomic & Security Impact
        if entity_type == "chokepoint":
            sections.append(
                f"#### ? Maritime & Energy Implications\n"
                f"- **Global Flow Dependence:** Critical transit corridor directly affecting petroleum, container trade, and insurance premia.\n"
                f"- **Contingency Routes:** Forcing carriers to reroute around alternative capes or overland networks, incurring significant fuel burn and supply chain delays.\n"
                f"- **Vulnerability Horizon:** Subject to asymmetric interdiction (anti-ship missiles, drone swarms, naval mines)."
            )
        elif entity_type == "alliance":
            sections.append(
                f"#### ?? Treaty Architecture & Deterrence Credibility\n"
                f"- **Mutual Obligations:** Governed by multilateral consensus and collective defense protocols.\n"
                f"- **Counterbalance Posture:** Serves as a vital counterweight against revisionist powers attempting unilateral border alterations.\n"
                f"- **Defense Integration:** Combines joint command structures, intelligence sharing, and integrated air/missile defense umbrellas."
            )
        elif entity_type == "country":
            sections.append(
                f"#### ?? National Defense & Diplomatic Alignment\n"
                f"- **Military Spending & Readiness:** Sustains prioritized defense modernization, long-range strike, and tactical readiness.\n"
                f"- **Strategic Alignment:** Navigates complex alliances, balancing superpower rivalries while securing sovereignty over disputed territories.\n"
                f"- **Nuclear / Asymmetric Shadow:** Shapes regional escalation calculations and deterrent credibility."
            )
        else: # conflict or scenario
            sections.append(
                f"#### ?? Escalation Threshold & Containment Outlook\n"
                f"- **Escalation Propensity:** Significant risk of conventional spillover or proxy expansion across neighboring states.\n"
                f"- **Sanctions & Financial Contagion:** Triggers secondary trade restrictions, asset freezes, and supply chain decoupling.\n"
                f"- **Diplomatic Mediation:** Bilateral and multilateral peace initiatives remain constrained by non-negotiable core sovereignty demands."
            )

        # Section 4: Key Supporting Evidence
        if supporting_docs:
            sections.append(
                f"#### ?? Corroborating Intelligence Sources\n" +
                "\n".join([f"- **{d['title']}** ({d['entity_type'].upper()}): {d['content'][:140]}..." for d in supporting_docs])
            )

        return "\n\n".join(sections)

    def _generate_followups(self, query: str, docs: List[Dict[str, Any]]) -> List[str]:
        """Generates dynamic follow-up strategic questions based on retrieved entities."""
        followups = []
        if not docs:
            return [
                "What are the top 3 global conflict flashpoints right now?",
                "Which maritime chokepoints are most vulnerable to blockade?",
                "Compare NATO and BRICS+ total military capabilities."
            ]

        top_type = docs[0].get("entity_type")
        top_title = docs[0].get("title", "")

        if top_type == "conflict":
            followups.append(f"What are the international peace proposals for {top_title}?")
            followups.append("How would external military intervention escalate this crisis?")
            followups.append("What are the global economic impacts if this conflict expands?")
        elif top_type == "chokepoint":
            followups.append(f"What are the alternative shipping routes if {top_title} is closed?")
            followups.append("How high would crude oil prices spike during an interdiction?")
            followups.append("Which naval task forces currently patrol this waterway?")
        elif top_type == "alliance":
            followups.append(f"Under what conditions would collective defense be activated for {top_title}?")
            followups.append("What are the internal political frictions within this bloc?")
            followups.append("How does this alliance compare in GDP and troop strength to its rivals?")
        elif top_type == "country":
            followups.append(f"What are {top_title}'s most critical border and maritime disputes?")
            followups.append(f"How much does {top_title} spend on defense relative to its GDP?")
            followups.append("Who are the primary weapons suppliers and defense partners?")
        else:
            followups.append("What are the earliest trigger indicators for this scenario?")
            followups.append("How would allied central banks respond to this economic shock?")
            followups.append("What diplomatic countermeasures could de-escalate this situation?")

        return followups[:3]

llm_service = GeopoliticalLLMService()
