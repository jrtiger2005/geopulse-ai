// GeoPulse AI - Drawers, Search & Navigation Controller (Bright Theme)

function initClock() {
    const clockEl = document.getElementById('utc-clock');
    function update() {
        const now = new Date();
        if (clockEl) {
            clockEl.textContent = now.toUTCString().replace('GMT', 'UTC');
        }
    }
    update();
    setInterval(update, 1000);
}

function setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.dataset.tab;
            switchTab(targetTab);
        });
    });
}

function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(t => {
        if (t.dataset.tab === tabId) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    document.querySelectorAll('.view-section').forEach(view => {
        if (view.id === `view-${tabId}`) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });

    if (tabId === 'map' && state.map) {
        setTimeout(() => {
            state.map.invalidateSize();
        }, 200);
    }
}

function renderOverviewHUD() {
    if (!state.overview) return;
    const o = state.overview;

    const tensionScoreEl = document.getElementById('tension-score');
    const tensionBarEl = document.getElementById('tension-bar');
    const defconBadgeEl = document.getElementById('defcon-badge');
    
    if (tensionScoreEl) tensionScoreEl.textContent = `${o.global_tension_index} / 100`;
    if (tensionBarEl) tensionBarEl.style.width = `${o.global_tension_index}%`;
    if (defconBadgeEl) {
        defconBadgeEl.textContent = o.defcon_status;
        defconBadgeEl.style.borderColor = o.defcon_color;
        defconBadgeEl.style.color = o.defcon_color;
    }

    const countConflicts = document.getElementById('count-conflicts');
    const countChokepoints = document.getElementById('count-chokepoints');
    const countAlliances = document.getElementById('count-alliances');
    const countNuclear = document.getElementById('count-nuclear');

    if (countConflicts) countConflicts.textContent = o.active_conflicts_count;
    if (countChokepoints) countChokepoints.textContent = o.monitored_chokepoints_count;
    if (countAlliances) countAlliances.textContent = o.tracked_alliances_count;
    if (countNuclear) countNuclear.textContent = o.nuclear_armed_states_count;
}

function openConflictDrawer(id) {
    const c = state.conflicts.find(item => item.id === id);
    if (!c) return;

    const drawer = document.getElementById('side-drawer');
    const content = document.getElementById('drawer-content');
    if (!drawer || !content) return;

    content.innerHTML = `
        <div class="space-y-4 text-slate-800">
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                    ${c.severity} Threat Level
                </span>
                <span class="text-xs text-slate-500 font-mono font-semibold">${c.region}</span>
            </div>

            <div>
                <h3 class="text-xl font-bold text-slate-900">${c.name}</h3>
                <span class="text-xs font-mono text-sky-700 font-semibold">Status: ${c.status}</span>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div class="flex justify-between text-xs text-slate-700 font-medium mb-1.5">
                    <span>Escalation Risk Index</span>
                    <span class="font-mono font-bold text-red-600">${c.escalation_risk} / 100</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-red-500 h-2.5 rounded-full" style="width: ${c.escalation_risk}%"></div>
                </div>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Conflict Background</h4>
                <p class="text-xs text-slate-700 leading-relaxed">${c.background}</p>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Latest Operational Status</h4>
                <p class="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">${c.latest_developments}</p>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Geopolitical Stakes</h4>
                <ul class="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    ${c.key_stakes.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>

            <div class="text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div><strong class="text-slate-800">Casualties:</strong> ${c.casualty_estimate}</div>
                ${c.nuclear_shadow ? '<div class="text-amber-700 mt-1 font-bold">?? Nuclear Deterrence Threshold Active</div>' : ''}
            </div>
        </div>
    `;

    drawer.classList.remove('translate-x-full');
}

function openCountryDrawer(iso) {
    const c = state.countries.find(item => item.iso.toUpperCase() === iso.toUpperCase());
    if (!c) return;

    const drawer = document.getElementById('side-drawer');
    const content = document.getElementById('drawer-content');
    if (!drawer || !content) return;

    content.innerHTML = `
        <div class="space-y-4 text-slate-800">
            <div class="flex items-center justify-between border-b border-slate-200 pb-3">
                <div class="flex items-center gap-2.5">
                    <span class="text-3xl">${c.flag}</span>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900">${c.name}</h3>
                        <span class="text-xs text-slate-500 font-mono font-semibold">${c.capital} &bull; ${c.region}</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-bold text-sky-700 font-mono">${c.power_score}</div>
                    <span class="text-[10px] text-slate-400 uppercase font-semibold">Power Score</span>
                </div>
            </div>

            <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase font-semibold">Nominal GDP</span>
                    <strong class="text-slate-800 font-mono text-sm">$${c.gdp_nominal_billions.toLocaleString()} B</strong>
                </div>
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase font-semibold">Defense Budget</span>
                    <strong class="text-amber-700 font-mono text-sm">$${c.defense_budget_billions} B (${c.defense_pct_gdp}%)</strong>
                </div>
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase font-semibold">Active Personnel</span>
                    <strong class="text-slate-800 font-mono">${c.active_military_personnel.toLocaleString()}</strong>
                </div>
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase font-semibold">Reserve Forces</span>
                    <strong class="text-slate-800 font-mono">${c.reserve_personnel.toLocaleString()}</strong>
                </div>
            </div>

            <div class="text-xs bg-purple-50 p-3 rounded-xl border border-purple-200">
                <div class="text-purple-800 font-bold uppercase tracking-wider text-[10px] mb-1">?? Nuclear Capability Status</div>
                <div class="text-slate-800 font-mono font-semibold">${c.nuclear_status}</div>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Core Geostrategic Priorities</h4>
                <p class="text-xs text-slate-700 leading-relaxed">${c.key_interests}</p>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Primary Rivals & Friction</h4>
                <div class="text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200 font-medium">
                    ${Array.isArray(c.strategic_rivals) ? c.strategic_rivals.join(', ') : c.strategic_rivals}
                </div>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Disputes</h4>
                <p class="text-xs text-slate-600">${c.territorial_disputes}</p>
            </div>
        </div>
    `;

    drawer.classList.remove('translate-x-full');
}

function closeDrawer() {
    const drawer = document.getElementById('side-drawer');
    if (drawer) drawer.classList.add('translate-x-full');
}

function setupSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) return;

        const matchedCountry = state.countries.find(c => c.name.toLowerCase().includes(query) || c.iso.toLowerCase() === query);
        if (matchedCountry) {
            openCountryDrawer(matchedCountry.iso);
            if (state.map) {
                state.map.flyTo([matchedCountry.lat, matchedCountry.lng], 5);
            }
            return;
        }

        const matchedConflict = state.conflicts.find(c => c.name.toLowerCase().includes(query) || c.tags.some(t => t.toLowerCase().includes(query)));
        if (matchedConflict) {
            openConflictDrawer(matchedConflict.id);
            if (state.map) {
                state.map.flyTo([matchedConflict.lat, matchedConflict.lng], 5);
            }
        }
    });
}

function setConflictRegionFilter(region) {
    state.filterRegion = region;
    document.querySelectorAll('.btn-conflict-reg').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === region);
    });
    renderConflictsView();
}

function setCountryAlignmentFilter(alignment) {
    state.filterAlignment = alignment;
    document.querySelectorAll('.btn-country-align').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === alignment);
    });
    renderCountriesView();
}

function setNewsCategoryFilter(cat) {
    state.filterNewsCat = cat;
    document.querySelectorAll('.btn-news-cat').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === cat);
    });
    renderNewsView();
}
