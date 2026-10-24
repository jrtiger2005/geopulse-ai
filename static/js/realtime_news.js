// GeoPulse AI - Real-Time 60-Second Conflict News Engine

const realtimeState = {
    countdown: 60,
    intervalId: null,
    isUpdating: false,
    soundEnabled: localStorage.getItem('geopulse_alert_sound') !== 'false',
    lastAlertId: null,
    activeFilter: 'All'
};

document.addEventListener('DOMContentLoaded', () => {
    initRealtimeEngine();
});

function initRealtimeEngine() {
    startCountdownTimer();
    fetchRealtimeConflictNews(true);
    setupTickerClick();
    updateSoundButtonUI();
}

function startCountdownTimer() {
    if (realtimeState.intervalId) clearInterval(realtimeState.intervalId);

    realtimeState.intervalId = setInterval(() => {
        realtimeState.countdown--;

        // Update countdown HUD elements
        const countdownEl = document.getElementById('news-countdown-timer');
        const progressBar = document.getElementById('news-countdown-bar');

        if (countdownEl) {
            countdownEl.textContent = `${realtimeState.countdown}s`;
        }
        if (progressBar) {
            const pct = ((60 - realtimeState.countdown) / 60) * 100;
            progressBar.style.width = `${pct}%`;
        }

        if (realtimeState.countdown <= 0) {
            realtimeState.countdown = 60;
            fetchRealtimeConflictNews(false);
        }
    }, 1000);
}

async function fetchRealtimeConflictNews(initial = false) {
    if (realtimeState.isUpdating) return;
    realtimeState.isUpdating = true;

    const syncBtn = document.getElementById('btn-manual-sync');
    if (syncBtn) {
        syncBtn.classList.add('animate-spin');
    }

    try {
        const filterParam = realtimeState.activeFilter !== 'All' ? `?conflict=${encodeURIComponent(realtimeState.activeFilter)}` : '';
        const res = await fetch(`/api/news/realtime${filterParam}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        renderRealtimeNewsFeed(data.items);
        updateTopBreakingTicker(data.breaking_alert);

        // Check if there is a new breaking alert
        if (data.breaking_alert && data.breaking_alert.headline !== realtimeState.lastAlertId) {
            realtimeState.lastAlertId = data.breaking_alert.headline;
            if (!initial && realtimeState.soundEnabled) {
                playRadarChime();
            }
        }

        // Also update state.news cache
        if (typeof state !== 'undefined') {
            state.news = data.items;
        }

    } catch (err) {
        console.warn('Real-time conflict news update notice:', err.message);
    } finally {
        realtimeState.isUpdating = false;
        if (syncBtn) {
            syncBtn.classList.remove('animate-spin');
        }
    }
}

function manualSyncNow() {
    realtimeState.countdown = 60;
    fetchRealtimeConflictNews(false);
}

function updateTopBreakingTicker(alert) {
    const tickerContainer = document.getElementById('breaking-ticker-container');
    const tickerText = document.getElementById('breaking-ticker-headline');
    const tickerConflict = document.getElementById('breaking-ticker-conflict');
    const tickerTime = document.getElementById('breaking-ticker-time');

    if (!tickerContainer || !alert) return;

    if (tickerConflict) tickerConflict.textContent = alert.conflict || 'WORLD CONFLICT ALERT';
    if (tickerText) tickerText.textContent = alert.headline;
    if (tickerTime) tickerTime.textContent = alert.timestamp;

    tickerContainer.classList.remove('hidden');
    tickerContainer.classList.add('animate-fade-in');
}

function setupTickerClick() {
    const tickerContainer = document.getElementById('breaking-ticker-container');
    if (tickerContainer) {
        tickerContainer.addEventListener('click', () => {
            if (typeof switchTab === 'function') {
                switchTab('news');
            }
        });
    }
}

function renderRealtimeNewsFeed(items) {
    const container = document.getElementById('news-feed-container');
    if (!container) return;

    container.innerHTML = items.map((n, idx) => {
        const isCritical = n.urgency === 'Critical';
        const isBreaking = n.is_breaking || n.timestamp === 'Just now';
        
        const badgeColor = isCritical 
            ? 'bg-red-500 text-white shadow-sm shadow-red-500/30 font-bold' 
            : (n.urgency === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-300 font-bold' : 'bg-slate-100 text-slate-700 border border-slate-200');

        return `
            <div class="bg-white rounded-2xl p-5 border ${isBreaking ? 'border-red-300 ring-2 ring-red-500/10 shadow-md' : 'border-slate-200 shadow-sm'} hover:shadow-md transition duration-200">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div class="flex items-center gap-2 flex-wrap">
                        ${isBreaking ? `
                            <span class="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black animate-pulse">
                                <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                                <span>LIVE ALERT</span>
                            </span>
                        ` : ''}
                        <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeColor}">${n.urgency}</span>
                        <span class="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">${n.conflict || n.category}</span>
                        <span class="text-xs text-slate-500 font-medium">&bull; ${n.region}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-red-600 font-mono font-bold bg-red-50 px-2 py-0.5 rounded-md border border-red-100">${n.timestamp}</span>
                        <span class="text-[11px] text-slate-400 font-mono">${n.server_timestamp || ''}</span>
                    </div>
                </div>

                <h3 class="text-base font-bold text-slate-900 mb-2 leading-snug hover:text-sky-600 transition cursor-pointer" onclick="askAiAboutNews('${escapeSingleQuotes(n.title)}')">
                    ${n.title}
                </h3>
                
                <p class="text-xs text-slate-600 leading-relaxed mb-3.5">${n.summary}</p>

                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div class="text-slate-600">
                        <strong class="text-slate-800">Operational Impact:</strong> ${n.impact}
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <span class="text-[11px] text-slate-500 font-medium italic">Source: ${n.source}</span>
                        <button onclick="askAiAboutNews('${escapeSingleQuotes(n.title)}')" class="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-[11px] font-bold transition shadow-sm flex items-center gap-1" title="Analyze with GeoPulse AI">
                            <span>? Ask AI</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function escapeSingleQuotes(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function askAiAboutNews(title) {
    if (typeof switchTab === 'function') {
        switchTab('ai');
    }
    setTimeout(() => {
        if (typeof sendChatMessage === 'function') {
            sendChatMessage(`Analyze the strategic and escalation implications of this breaking conflict alert: "${title}"`, 'tab');
        }
    }, 200);
}

function setConflictNewsFilter(filterName) {
    realtimeState.activeFilter = filterName;
    document.querySelectorAll('.btn-conflict-filter').forEach(btn => {
        const isActive = btn.dataset.filter === filterName;
        btn.classList.toggle('active', isActive);
        if (isActive) {
            btn.className = 'btn-conflict-filter active px-3 py-1 rounded-full bg-sky-600 text-white font-bold text-xs shadow-sm';
        } else {
            btn.className = 'btn-conflict-filter px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200';
        }
    });
    fetchRealtimeConflictNews(false);
}

// Synthesized Tactical Radar Audio Blip
function playRadarChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
        // AudioContext autoplay restrictions handled silently
    }
}

function toggleAlertSound() {
    realtimeState.soundEnabled = !realtimeState.soundEnabled;
    localStorage.setItem('geopulse_alert_sound', realtimeState.soundEnabled);
    updateSoundButtonUI();
}

function updateSoundButtonUI() {
    const btn = document.getElementById('btn-sound-toggle');
    if (btn) {
        if (realtimeState.soundEnabled) {
            btn.innerHTML = `<span>?? Audio Radar: ON</span>`;
            btn.className = 'text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300';
        } else {
            btn.innerHTML = `<span>?? Audio Radar: MUTED</span>`;
            btn.className = 'text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200';
        }
    }
}
