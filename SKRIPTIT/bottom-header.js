// SatakuntaValokuvaus/SKRIPTIT/bottom-header.js
// Alaheaderin (bottom-header) dynaaminen luonti + sijainnin päivitys

(function() {
    const bottomHeaderHTML = `
        <div id="bottom-header" class="bottom-header">
            <div class="bottom-content">
                <span id="bottom-location-text" class="location-text">
                    Kuvauspaikka: <strong>Harjavalta</strong>
                </span>
                <button id="select-location-btn" onclick="showLocationModal()" class="select-location-btn" aria-label="Vaihda paikkakunta">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 0.4rem;"><path d="M12 21.5C12 21.5 20 14 20 9C20 5.13401 16.866 2 13 2C9.13401 2 6 5.13401 6 9C6 14 12 21.5 12 21.5Z" fill="currentColor"/><circle cx="12" cy="9" r="3" fill="#ffffff"/></svg>
                    Vaihda paikkakunta
                </button>
            </div>
        </div>
    `;

    document.addEventListener('DOMContentLoaded', () => {
        const mountPoint = document.getElementById('bottom-header-mount');
        if (mountPoint) {
            mountPoint.outerHTML = bottomHeaderHTML;
        } else {
            // Lisää ennen skriptejä tai body:n loppuun
            const scripts = document.querySelector('script[src*="SKRIPTIT"]');
            if (scripts && scripts.parentNode) {
                scripts.parentNode.insertBefore(
                    document.createRange().createContextualFragment(bottomHeaderHTML),
                    scripts
                );
            } else {
                document.body.insertAdjacentHTML('beforeend', bottomHeaderHTML);
            }
        }
    });
})();