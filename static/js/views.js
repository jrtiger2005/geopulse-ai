// GeoPulse AI - Views Rendering Controller (Bright & Vibrant Theme)
function renderAllViews() {
    renderConflictsView();
    renderAlliancesView();
    renderChokepointsView();
    renderCountriesView();
    renderNewsView();
    renderScenariosView();
}

function renderConflictsView() {
    const container = document.getElementById('conflicts-grid');
    if (!container) return;

    let items = state.conflicts;
    if (state.filterRegion !== 'All') {
        items = items.filter(c => c.region === state.filterRegion);
    }
    if (state.filterSeverity !== 'All') {
        items = items.filter(c => c.severity === state.filterSeverity);
    }

    container.innerHTML = items.map(c => {
        const isCritical = c.severity === 'Critical';
        const badgeColor = isCritical ? 'bg-red-100 text-red-700 border-red-300' : 'bg-amber-100 text-amber-800 border-amber-300';
        return `
            <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-500 transition duration-200 flex flex-col justify-between shadow-sm hover:shadow-md">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full border ${badgeColor}">
                            ${c.severity} Severity
                        </span>
                        <span class="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                            ${c.region}
                        </span>
                    </div>

                    <h3 class="text-base font-bold text-slate-900 hover:text-sky-600 transition cursor-pointer mb-2" onclick="openConflictDrawer('${c.id}')">
                        ${c.name}
                    </h3>

                    <div class="mb-3">
                        <div class="flex justify-between text-xs text-slate-600 mb-1">
                            <span class="font-medium">Escalation Probability</span>
                            <span class="font-mono font-bold text-sky-700">${c.escalation_risk}%</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div class="h-2.5 rounded-full ${c.escalation_risk > 80 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}" style="width: ${c.escalation_risk}%"></div>
                        </div>
                    </div>

                    <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        ${c.background}
                    </p>

                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 text-xs space-y-1.5">
                        <div class="text-slate-600"><strong class="text-slate-900">Combatants:</strong> ${c.primary_parties.slice(0, 3).join(', ')}</div>
                        <div class="text-slate-600"><strong class="text-slate-900">Casualties:</strong> ${c.casualty_estimate}</div>
                        ${c.nuclear_shadow ? '<div class="text-amber-700 font-bold flex items-center gap-1">?? Nuclear Deterrence Posture Active</div>' : ''}
                    </div>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div class="flex flex-wrap gap-1">
                        ${c.tags.slice(0, 2).map(t => `<span class="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">#${t}</span>`).join('')}
                    </div>
                    <button onclick="openConflictDrawer('${c.id}')" class="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                        Intelligence Briefing &rarr;
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderAlliancesView() {
    const container = document.getElementById('alliances-grid');
    if (!container) return;

    container.innerHTML = state.alliances.map(a => {
        return `
            <div class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 transition duration-200 shadow-sm hover:shadow-md">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="w-3.5 h-3.5 rounded-full shadow-sm" style="background-color: ${a.color};"></span>
                            <span class="text-xs font-mono font-bold text-sky-700">${a.acronym}</span>
                            <span class="text-[11px] text-slate-500 font-medium">Est. ${a.founded}</span>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900">${a.name}</h3>
                    </div>
                    ${a.collective_defense ? '<span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">Mutual Defense</span>' : '<span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Strategic Alignment</span>'}
                </div>

                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                    ${a.description}
                </p>

                <div class="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 text-center">
                    <div>
                        <div class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Total GDP</div>
                        <div class="text-sm font-bold text-sky-700 font-mono">$${a.total_gdp_trillions} T</div>
                    </div>
                    <div>
                        <div class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Population</div>
                        <div class="text-sm font-bold text-emerald-700 font-mono">${a.total_population_billions} B</div>
                    </div>
                    <div>
                        <div class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Defense Budget</div>
                        <div class="text-sm font-bold text-amber-700 font-mono">$${a.total_military_budget_billions} B</div>
                    </div>
                </div>

                <div class="mb-4">
                    <div class="text-xs font-bold text-slate-700 mb-1.5">Key Anchor Powers:</div>
                    <div class="flex flex-wrap gap-1.5">
                        ${a.key_powers.map(p => `<span class="text-xs bg-slate-100 border border-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded-lg">${p}</span>`).join('')}
                    </div>
                </div>

                <div class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong class="text-slate-800">Core Doctrine:</strong> ${a.core_clause}
                </div>
            </div>
        `;
    }).join('');
}

function renderChokepointsView() {
    const container = document.getElementById('chokepoints-grid');
    if (!container) return;

    container.innerHTML = state.chokepoints.map(cp => {
        const isCritical = cp.vulnerability_level === 'Critical';
        return `
            <div class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-cyan-500 transition duration-200 shadow-sm hover:shadow-md">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl">?</span>
                        <h3 class="text-base font-bold text-slate-900">${cp.name}</h3>
                    </div>
                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full border ${isCritical ? 'bg-red-100 text-red-700 border-red-300' : 'bg-cyan-100 text-cyan-800 border-cyan-300'}">
                        ${cp.vulnerability_level} Vulnerability
                    </span>
                </div>

                <div class="text-xs font-mono text-cyan-700 font-semibold mb-3">${cp.waterway}</div>

                <p class="text-xs text-slate-600 leading-relaxed mb-4">
                    ${cp.description}
                </p>

                <div class="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4 text-xs">
                    <div>
                        <span class="text-slate-500 block text-[10px] uppercase font-semibold">Daily Oil Flow</span>
                        <strong class="text-amber-700 font-mono text-sm">${cp.oil_transit_bpd}</strong>
                    </div>
                    <div>
                        <span class="text-slate-500 block text-[10px] uppercase font-semibold">Global Impact</span>
                        <strong class="text-sky-700 font-semibold">${cp.lng_transit_pct}</strong>
                    </div>
                </div>

                <div class="text-xs text-slate-600 mb-3">
                    <strong class="text-slate-800">Littoral States:</strong> ${cp.littoral_states.join(', ')}
                </div>

                <div class="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
                    <strong class="text-slate-800">Detour/Alternative:</strong> ${cp.alternatives}
                </div>
            </div>
        `;
    }).join('');
}

function renderCountriesView() {
    const container = document.getElementById('countries-grid');
    if (!container) return;

    let items = state.countries;
    if (state.filterAlignment !== 'All') {
        items = items.filter(c => c.alignment === state.filterAlignment);
    }

    container.innerHTML = items.map(c => {
        return `
            <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-400 transition duration-200 shadow-sm hover:shadow-md flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2.5">
                            <span class="text-3xl">${c.flag}</span>
                            <div>
                                <h4 class="font-bold text-slate-900 leading-snug">${c.name}</h4>
                                <span class="text-[11px] text-slate-500 font-mono font-semibold">${c.iso} &bull; ${c.capital}</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-xs font-mono font-bold text-sky-700">PWR ${c.power_score}</div>
                            <span class="text-[10px] text-slate-400 uppercase font-semibold">Index</span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            ${c.alignment}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 text-xs">
                        <div>
                            <span class="text-slate-500 block text-[10px] font-semibold uppercase">Nominal GDP</span>
                            <span class="font-mono font-bold text-slate-800">$${c.gdp_nominal_billions.toLocaleString()} B</span>
                        </div>
                        <div>
                            <span class="text-slate-500 block text-[10px] font-semibold uppercase">Defense Budget</span>
                            <span class="font-mono font-bold text-amber-700">$${c.defense_budget_billions} B (${c.defense_pct_gdp}%)</span>
                        </div>
                    </div>

                    <div class="text-xs text-slate-600 mb-2">
                        <strong class="text-slate-800">Active Troops:</strong> ${c.active_military_personnel.toLocaleString()}
                    </div>

                    <div class="text-xs text-purple-800 font-mono mb-3 font-semibold">
                        <strong>Nuclear:</strong> ${c.nuclear_status}
                    </div>
                </div>

                <button onclick="openCountryDrawer('${c.iso}')" class="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-xs font-bold text-slate-700 transition text-center border border-slate-200 shadow-sm">
                    Open Strategic Profile
                </button>
            </div>
        `;
    }).join('');
}

function renderNewsView() {
    const container = document.getElementById('news-feed-container');
    if (!container) return;

    let items = state.news;
    if (state.filterNewsCat !== 'All') {
        items = items.filter(n => n.category === state.filterNewsCat);
    }

    container.innerHTML = items.map(n => {
        const isCritical = n.urgency === 'Critical';
        const urgencyClass = isCritical ? 'bg-red-100 text-red-700 border-red-300' : (n.urgency === 'High' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-600 border-slate-200');
        
        return `
            <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition duration-150 shadow-sm hover:shadow">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold px-2.5 py-0.5 rounded-full border ${urgencyClass}">${n.urgency}</span>
                        <span class="text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">${n.category}</span>
                        <span class="text-xs text-slate-500 font-medium">&bull; ${n.region}</span>
                    </div>
                    <span class="text-xs text-slate-400 font-mono font-semibold">${n.timestamp}</span>
                </div>

                <h3 class="text-base font-bold text-slate-900 mb-2 leading-snug">${n.title}</h3>
                
                <p class="text-xs text-slate-600 leading-relaxed mb-3">${n.summary}</p>

                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div class="text-slate-600">
                        <strong class="text-slate-900">Strategic Impact:</strong> ${n.impact}
                    </div>
                    <span class="text-[11px] text-slate-500 italic ml-2 whitespace-nowrap font-medium">Source: ${n.source}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderScenariosView() {
    const listContainer = document.getElementById('scenarios-list');
    const detailContainer = document.getElementById('scenario-detail');
    if (!listContainer || !detailContainer) return;

    listContainer.innerHTML = state.scenarios.map(s => {
        const isSelected = s.id === state.selectedScenarioId;
        return `
            <div onclick="selectScenario('${s.id}')" class="p-4 rounded-2xl cursor-pointer transition duration-150 border ${isSelected ? 'bg-sky-50 border-sky-500 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}">
                <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs font-mono text-sky-700 font-bold">${s.timeframe}</span>
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">${s.probability_score}</span>
                </div>
                <h4 class="font-bold text-slate-900 text-sm leading-snug">${s.title}</h4>
            </div>
        `;
    }).join('');

    const current = state.scenarios.find(s => s.id === state.selectedScenarioId) || state.scenarios[0];
    if (!current) return;

    detailContainer.innerHTML = `
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-4 mb-4 gap-2">
                <div>
                    <span class="text-xs font-mono text-sky-700 font-bold uppercase tracking-wider">War-Game Crisis Simulation</span>
                    <h2 class="text-xl font-bold text-slate-900">${current.title}</h2>
                </div>
                <div class="text-right">
                    <div class="text-xs text-slate-500 font-medium">Projected Economic Shock</div>
                    <div class="text-lg font-bold text-red-600 font-mono">${current.global_economic_shock}</div>
                </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Catalyst / Triggering Event</h4>
                <p class="text-sm text-slate-800 leading-relaxed font-medium">${current.trigger_event}</p>
            </div>

            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Step-by-Step Escalation Sequence</h4>
            <div class="space-y-3 mb-6">
                ${current.escalation_stages.map((stage, idx) => `
                    <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div class="w-6 h-6 rounded-full bg-sky-600 text-white font-mono text-xs flex items-center justify-center font-bold shrink-0 shadow-sm">
                            ${idx + 1}
                        </div>
                        <div>
                            <strong class="text-xs font-bold text-sky-800 block mb-0.5">${stage.phase}</strong>
                            <p class="text-xs text-slate-600">${stage.action}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h5 class="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">??? Allied Military Contingencies</h5>
                    <p class="text-xs text-slate-600 leading-relaxed">${current.military_response}</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h5 class="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">?? Geopolitical & Sanctions Fallout</h5>
                    <p class="text-xs text-slate-600 leading-relaxed">${current.diplomatic_consequences}</p>
                </div>
            </div>
        </div>
    `;
}

function selectScenario(id) {
    state.selectedScenarioId = id;
    renderScenariosView();
}
