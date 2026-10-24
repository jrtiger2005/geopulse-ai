// GeoPulse AI - RAG & Voice Assistant Chatbot Controller (Bright Theme)

const chatState = {
    messages: [
        {
            role: 'assistant',
            content: `### ?? GeoPulse AI Voice & Strategic Advisor Online\n\nI am your **Voice-Enabled Geopolitical Strategic Advisor**, powered by real-time RAG indexing across active conflict flashpoints, maritime chokepoints, military alliances, and defense budgets.\n\nAsk me anything by typing below or tapping the ?? **Microphone** button!`,
            citations: [],
            followups: [
                "What happens if the Strait of Hormuz is closed?",
                "Compare NATO and BRICS+ total military capabilities",
                "What is the escalation risk in the Taiwan Strait?",
                "Analyze India's strategic alignment and disputes"
            ]
        }
    ],
    isGenerating: false,
    isDockOpen: false,
    config: {
        provider: localStorage.getItem('geopulse_provider') || 'builtin',
        apiKey: localStorage.getItem('geopulse_apikey') || '',
        model: localStorage.getItem('geopulse_model') || 'gpt-4o-mini',
        baseUrl: localStorage.getItem('geopulse_baseurl') || ''
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initChatUI();
});

function initChatUI() {
    renderChatMessages('tab');
    renderChatMessages('dock');
    setupChatInputs();
    updateConfigDisplay();
}

function setupChatInputs() {
    // Tab inputs
    const tabInput = document.getElementById('chat-tab-input');
    const tabSend = document.getElementById('chat-tab-send');
    if (tabInput && tabSend) {
        tabSend.addEventListener('click', () => sendChatMessage(tabInput.value, 'tab'));
        tabInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage(tabInput.value, 'tab');
            }
        });
    }

    // Dock inputs
    const dockInput = document.getElementById('chat-dock-input');
    const dockSend = document.getElementById('chat-dock-send');
    if (dockInput && dockSend) {
        dockSend.addEventListener('click', () => sendChatMessage(dockInput.value, 'dock'));
        dockInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage(dockInput.value, 'dock');
            }
        });
    }
}

async function sendChatMessage(text, source = 'tab') {
    if (!text || !text.trim() || chatState.isGenerating) return;
    const query = text.trim();

    // Clear input
    const tabInput = document.getElementById('chat-tab-input');
    const dockInput = document.getElementById('chat-dock-input');
    if (tabInput) tabInput.value = '';
    if (dockInput) dockInput.value = '';

    // Add user message
    chatState.messages.push({
        role: 'user',
        content: query,
        citations: []
    });

    chatState.isGenerating = true;
    renderChatMessages('tab');
    renderChatMessages('dock');

    try {
        const payload = {
            query: query,
            history: chatState.messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            config: {
                provider: chatState.config.provider,
                api_key: chatState.config.apiKey,
                model: chatState.config.model,
                base_url: chatState.config.baseUrl
            }
        };

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            throw new Error(`Server returned HTTP ${res.status}`);
        }

        const data = await res.json();
        const newMsgIndex = chatState.messages.length;
        chatState.messages.push({
            role: 'assistant',
            content: data.answer,
            citations: data.citations || [],
            followups: data.suggested_followups || [],
            modelUsed: data.model_used
        });

        // If Auto-Voice is enabled, speak briefing automatically!
        if (typeof voiceState !== 'undefined' && voiceState.autoSpeak && typeof speakBriefing === 'function') {
            setTimeout(() => {
                speakBriefing(data.answer, newMsgIndex);
            }, 300);
        }

    } catch (err) {
        chatState.messages.push({
            role: 'assistant',
            content: `?? **Intelligence Dispatch Error**: Unable to contact strategic reasoning engine: ${err.message}`,
            citations: []
        });
    } finally {
        chatState.isGenerating = false;
        renderChatMessages('tab');
        renderChatMessages('dock');
    }
}

function renderChatMessages(target = 'tab') {
    const containerId = target === 'tab' ? 'chat-tab-messages' : 'chat-dock-messages';
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    chatState.messages.forEach((msg, idx) => {
        const isUser = msg.role === 'user';
        html += `
            <div class="flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in">
                ${!isUser ? `
                    <div class="w-8 h-8 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-xs shrink-0 text-sky-700 font-bold shadow-sm">
                        ?
                    </div>
                ` : ''}

                <div class="max-w-[85%] rounded-2xl p-4 ${isUser ? 'bg-sky-600 text-white rounded-br-none shadow-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}">
                    ${!isUser ? `
                        <div class="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                            <div class="text-[10px] font-mono text-sky-700 font-bold flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>${msg.modelUsed || 'GeoPulse Strategic Engine'}</span>
                            </div>
                            <button id="btn-speak-${idx}" onclick="speakBriefing('${escapeHtml(msg.content)}', ${idx})" class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-700 border border-slate-200 transition flex items-center gap-1">
                                <span>?? Listen</span>
                            </button>
                        </div>
                    ` : ''}

                    <div class="prose prose-sm leading-relaxed text-xs">
                        ${formatMarkdown(msg.content)}
                    </div>

                    ${msg.citations && msg.citations.length > 0 ? `
                        <div class="mt-3 pt-2.5 border-t border-slate-100">
                            <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-1.5">Retrieved Intelligence Sources:</span>
                            <div class="flex flex-wrap gap-1.5">
                                ${msg.citations.map(c => `
                                    <button onclick="handleCitationClick('${c.entity_type}', '${c.entity_id}', ${c.lat || 'null'}, ${c.lng || 'null'})" class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 hover:bg-sky-50 text-sky-800 hover:text-sky-900 border border-slate-200 hover:border-sky-300 transition flex items-center gap-1 shadow-sm font-medium">
                                        <span>${getEntityIcon(c.entity_type)}</span>
                                        <span>${c.title}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${msg.followups && msg.followups.length > 0 ? `
                        <div class="mt-3 pt-2.5 border-t border-slate-100">
                            <span class="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-1.5">Suggested Strategic Probes:</span>
                            <div class="flex flex-wrap gap-1.5">
                                ${msg.followups.map(f => `
                                    <button onclick="sendChatMessage('${f.replace(/'/g, "\\'")}', '${target}')" class="text-[11px] text-left px-2.5 py-1 rounded bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 transition font-medium">
                                        &bull; ${f}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                ${isUser ? `
                    <div class="w-8 h-8 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-xs shrink-0 text-slate-700 font-bold font-mono">
                        USR
                    </div>
                ` : ''}
            </div>
        `;
    });

    if (chatState.isGenerating) {
        html += `
            <div class="flex items-start gap-3 justify-start animate-pulse">
                <div class="w-8 h-8 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center text-xs text-sky-700 font-bold shrink-0">
                    ?
                </div>
                <div class="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3.5 text-xs text-slate-600 font-mono flex items-center gap-2 shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
                    <span>Querying RAG Vector Index & Synthesizing Strategic Intelligence...</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
    return (str || '')
        .replace(/'/g, "\\'")
        .replace(/"/g, '&quot;')
        .replace(/\n/g, ' ');
}

function getEntityIcon(type) {
    switch (type) {
        case 'conflict': return '??';
        case 'chokepoint': return '?';
        case 'alliance': return '???';
        case 'country': return '??';
        case 'scenario': return '?';
        default: return '??';
    }
}

function handleCitationClick(type, id, lat, lng) {
    if (lat && lng && state.map) {
        state.map.flyTo([lat, lng], 5);
    }

    if (type === 'conflict') {
        openConflictDrawer(id);
    } else if (type === 'country') {
        openCountryDrawer(id);
    } else if (type === 'chokepoint') {
        switchTab('chokepoints');
    } else if (type === 'alliance') {
        switchTab('alliances');
    } else if (type === 'scenario') {
        switchTab('scenarios');
        selectScenario(id);
    }
}

function formatMarkdown(text) {
    if (!text) return '';
    let t = text;

    // Headers
    t = t.replace(/^### (.*$)/gim, '<h4 class="font-bold text-sm text-sky-800 mt-2 mb-1">$1</h4>');
    t = t.replace(/^#### (.*$)/gim, '<h5 class="font-bold text-xs text-slate-800 mt-2 mb-1">$1</h5>');

    // Bold & italics
    t = t.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>');
    t = t.replace(/\*(.*?)\*/g, '<em class="text-slate-700">$1</em>');

    // Code inline
    t = t.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-sky-800 px-1 py-0.5 rounded font-mono text-[11px] font-semibold">$1</code>');

    // Lists
    t = t.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700">$1</li>');

    // Linebreaks
    t = t.replace(/\n\n/g, '<div class="h-2"></div>');

    return t;
}

// Floating Dock Toggle
function toggleChatDock() {
    const dock = document.getElementById('chat-dock-panel');
    const orb = document.getElementById('chat-orb-btn');
    chatState.isDockOpen = !chatState.isDockOpen;

    if (dock && orb) {
        if (chatState.isDockOpen) {
            dock.classList.remove('hidden');
            orb.classList.add('scale-90', 'opacity-80');
            renderChatMessages('dock');
        } else {
            dock.classList.add('hidden');
            orb.classList.remove('scale-90', 'opacity-80');
        }
    }
}

// Settings Modal
function openChatSettings() {
    const modal = document.getElementById('chat-settings-modal');
    if (modal) modal.classList.remove('hidden');

    const providerEl = document.getElementById('setting-provider');
    const keyEl = document.getElementById('setting-apikey');
    const modelEl = document.getElementById('setting-model');

    if (providerEl) providerEl.value = chatState.config.provider;
    if (keyEl) keyEl.value = chatState.config.apiKey;
    if (modelEl) modelEl.value = chatState.config.model;
}

function closeChatSettings() {
    const modal = document.getElementById('chat-settings-modal');
    if (modal) modal.classList.add('hidden');
}

function saveChatSettings() {
    const provider = document.getElementById('setting-provider')?.value || 'builtin';
    const apiKey = document.getElementById('setting-apikey')?.value || '';
    const model = document.getElementById('setting-model')?.value || 'gpt-4o-mini';

    chatState.config.provider = provider;
    chatState.config.apiKey = apiKey;
    chatState.config.model = model;

    localStorage.setItem('geopulse_provider', provider);
    localStorage.setItem('geopulse_apikey', apiKey);
    localStorage.setItem('geopulse_model', model);

    updateConfigDisplay();
    closeChatSettings();
}

function updateConfigDisplay() {
    const badge = document.getElementById('chat-engine-badge');
    if (badge) {
        if (chatState.config.provider === 'builtin') {
            badge.textContent = 'Engine: RAG Strategic';
            badge.className = 'text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold';
        } else {
            badge.textContent = `Engine: ${chatState.config.provider.toUpperCase()} (${chatState.config.model})`;
            badge.className = 'text-[10px] font-mono px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 border border-sky-300 font-bold';
        }
    }
}
