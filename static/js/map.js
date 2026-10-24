// GeoPulse AI - CartoDB Voyager Bright Map Controller
function initMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    state.map = L.map('map-container', {
        center: [24, 25],
        zoom: 2.5,
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true
    });

    // High-vibrancy CartoDB Voyager Bright Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO &copy; OpenStreetMap',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(state.map);

    state.layers.conflicts = L.layerGroup().addTo(state.map);
    state.layers.chokepoints = L.layerGroup().addTo(state.map);
    state.layers.alliances = L.layerGroup().addTo(state.map);
    state.layers.nuclear = L.layerGroup().addTo(state.map);

    populateMapLayers();
    setupLayerControls();
}

function populateMapLayers() {
    // 1. Conflict flashpoints
    state.layers.conflicts.clearLayers();
    state.conflicts.forEach(c => {
        const isCritical = c.severity === 'Critical';
        const color = isCritical ? '#ef4444' : (c.severity === 'High' ? '#f97316' : '#f59e0b');
        const pulseClass = isCritical ? 'pulse-marker-critical' : 'pulse-marker-high';

        const customIcon = L.divIcon({
            className: 'custom-map-icon',
            html: `
                <div class="relative flex items-center justify-center w-8 h-8 cursor-pointer">
                    <span class="absolute w-7 h-7 rounded-full ${pulseClass}" style="background-color: ${color}50;"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-white text-xs font-bold text-white shadow-md" style="background-color: ${color};">
                        ??
                    </span>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const marker = L.marker([c.lat, c.lng], { icon: customIcon });
        marker.bindPopup(`
            <div class="p-1 min-w-[260px] text-slate-800">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span class="text-xs font-bold px-2 py-0.5 rounded ${isCritical ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}">${c.severity}</span>
                    <span class="text-xs text-slate-500 font-mono font-semibold">Risk: ${c.escalation_risk}%</span>
                </div>
                <h4 class="font-bold text-sm text-sky-700 mb-1 leading-snug">${c.name}</h4>
                <p class="text-xs text-slate-600 mb-2 leading-relaxed">${c.background.substring(0, 130)}...</p>
                <div class="text-[11px] text-slate-600 mb-3 bg-slate-50 p-2 rounded border border-slate-200">
                    <strong class="text-slate-800">Parties:</strong> ${c.primary_parties.join(' vs ')}
                </div>
                <button onclick="openConflictDrawer('${c.id}')" class="w-full py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white transition flex items-center justify-center gap-1 shadow-sm">
                    <span>View Flashpoint Briefing</span> &rarr;
                </button>
            </div>
        `);
        state.layers.conflicts.addLayer(marker);
    });

    // 2. Chokepoints
    state.layers.chokepoints.clearLayers();
    state.chokepoints.forEach(cp => {
        const customIcon = L.divIcon({
            className: 'custom-map-icon',
            html: `
                <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-cyan-600 border-2 border-white text-xs shadow-md text-white cursor-pointer hover:scale-110 transition">
                    ?
                </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        const marker = L.marker([cp.lat, cp.lng], { icon: customIcon });
        marker.bindPopup(`
            <div class="p-1 min-w-[250px] text-slate-800">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span class="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-200">Chokepoint</span>
                    <span class="text-xs text-amber-700 font-mono font-bold">Vulnerability: ${cp.vulnerability_level}</span>
                </div>
                <h4 class="font-bold text-sm text-cyan-800 mb-1">${cp.name}</h4>
                <p class="text-xs text-slate-600 mb-2">${cp.description.substring(0, 120)}...</p>
                <div class="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg mb-2 border border-slate-200 space-y-0.5">
                    <div><strong>Oil Flow:</strong> ${cp.oil_transit_bpd}</div>
                    <div><strong>Littorals:</strong> ${cp.littoral_states.join(', ')}</div>
                </div>
                <button onclick="switchTab('chokepoints')" class="w-full py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition text-center shadow-sm">
                    Examine Chokepoint Dossier
                </button>
            </div>
        `);
        state.layers.chokepoints.addLayer(marker);
    });

    // 3. Nuclear Powers
    state.layers.nuclear.clearLayers();
    state.countries.filter(c => c.nuclear_status && !c.nuclear_status.includes('Non-Nuclear') && !c.nuclear_status.includes('Denuclearized')).forEach(nc => {
        const customIcon = L.divIcon({
            className: 'custom-map-icon',
            html: `
                <div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-purple-600 border-2 border-white text-xs shadow-md text-white cursor-pointer hover:scale-110 transition">
                    ??
                </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        const marker = L.marker([nc.lat, nc.lng], { icon: customIcon });
        marker.bindPopup(`
            <div class="p-1 min-w-[240px] text-slate-800">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span class="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200">Nuclear Arsenal</span>
                    <span class="text-xs text-slate-500 font-bold">${nc.flag} ${nc.iso}</span>
                </div>
                <h4 class="font-bold text-sm text-purple-800 mb-1">${nc.name}</h4>
                <div class="text-xs font-mono text-purple-900 bg-purple-50 p-2 rounded mb-2 border border-purple-200 font-semibold">
                    ${nc.nuclear_status}
                </div>
                <button onclick="openCountryDrawer('${nc.iso}')" class="w-full py-1 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-sm">
                    Country Strategic Profile &rarr;
                </button>
            </div>
        `);
        state.layers.nuclear.addLayer(marker);
    });
}

function setupLayerControls() {
    const toggles = {
        'layer-conflicts': 'conflicts',
        'layer-chokepoints': 'chokepoints',
        'layer-nuclear': 'nuclear'
    };

    for (const [elementId, layerKey] of Object.entries(toggles)) {
        const el = document.getElementById(elementId);
        if (el) {
            el.addEventListener('change', (e) => {
                const checked = e.target.checked;
                state.layerVisibility[layerKey] = checked;
                if (checked) {
                    state.map.addLayer(state.layers[layerKey]);
                } else {
                    state.map.removeLayer(state.layers[layerKey]);
                }
            });
        }
    }
}
