// Global State & Data Loading
const state = {
    activeTab: 'map',
    overview: null,
    conflicts: [],
    alliances: [],
    chokepoints: [],
    countries: [],
    news: [],
    scenarios: [],
    map: null,
    layers: {
        conflicts: null,
        chokepoints: null,
        alliances: null,
        nuclear: null
    },
    layerVisibility: {
        conflicts: true,
        chokepoints: true,
        alliances: true,
        nuclear: true
    },
    filterRegion: 'All',
    filterSeverity: 'All',
    filterAlignment: 'All',
    filterNewsCat: 'All',
    selectedScenarioId: 'taiwan-blockade'
};

async function loadInitialData() {
    try {
        const [overviewRes, conflictsRes, alliancesRes, chokepointsRes, countriesRes, newsRes, scenariosRes] = await Promise.all([
            fetch('/api/overview').then(r => r.json()),
            fetch('/api/conflicts').then(r => r.json()),
            fetch('/api/alliances').then(r => r.json()),
            fetch('/api/chokepoints').then(r => r.json()),
            fetch('/api/countries').then(r => r.json()),
            fetch('/api/news').then(r => r.json()),
            fetch('/api/scenarios').then(r => r.json())
        ]);

        state.overview = overviewRes;
        state.conflicts = conflictsRes;
        state.alliances = alliancesRes;
        state.chokepoints = chokepointsRes;
        state.countries = countriesRes;
        state.news = newsRes;
        state.scenarios = scenariosRes;

        renderOverviewHUD();
    } catch (err) {
        console.error('Failed to load geopolitical data:', err);
    }
}
