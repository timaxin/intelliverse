document.addEventListener('DOMContentLoaded', () => {
    const results = new URLSearchParams(window.location.search).get('results');
    if (results) {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerText = results;
    }
});