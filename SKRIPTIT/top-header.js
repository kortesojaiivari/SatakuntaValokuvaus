// SatakuntaValokuvaus/SKRIPTIT/top-header.js
// Yläheaderin (navbar) dynaaminen luonti – pitää index.html siistimpänä

(function() {
    // Luo navbar-elementti
    const navbarHTML = `
        <nav class="navbar">
            <div class="nav-content">
                <!-- Ylä rivi: Logo (mobiilissa koko leveys) -->
                <a href="#" class="logo">Satakunta Valokuvaus</a>
                
                <!-- Ala rivi mobiilissa: Nappulat -->
                <div class="nav-links">
                    <a href="#yhteystiedot" class="nav-pill">Yhteystiedot</a>
                    <a href="#videokuvaus" class="nav-pill">Videokuvaus</a>
                    <a href="https://iivarikortesoja.media" target="_blank" rel="noopener" class="nav-pill" style="background:#c5a030; color:white; font-weight:700;">Yrityksille</a>
                </div>
            </div>
        </nav>
    `;

    // Lisää navbar heti body:n alkuun
    document.addEventListener('DOMContentLoaded', () => {
        const mountPoint = document.getElementById('top-header-mount');
        if (mountPoint) {
            mountPoint.outerHTML = navbarHTML;
        } else {
            // Jos ei mount pointia, lisää body:n alkuun
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        }
    });
})();