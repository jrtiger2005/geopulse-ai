// Main Application Entrypoint
document.addEventListener('DOMContentLoaded', async () => {
    initClock();
    setupNavigation();
    setupSearch();
    await loadInitialData();
    initMap();
    renderAllViews();
});
