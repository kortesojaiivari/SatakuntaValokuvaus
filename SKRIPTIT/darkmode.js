// SatakuntaValokuvaus/SKRIPTIT/darkmode.js
// Tumma/vaalea tila + ikonin vaihto + localStorage

(function() {
  const toggleBtn = document.getElementById('darkmode-toggle');
  if (!toggleBtn) return;

  // Mustavalkoiset SVG-ikonit (currentColor seuraa teemaa)
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="vertical-align: middle;"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zM.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zM2.707 2.707a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 1 1-.707.707L2.707 3.414a.5.5 0 0 1 0-.707zm9.9 9.9a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 1 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707zM2.707 13.293a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707L3.414 13a.5.5 0 0 1-.707 0zm9.9-9.9a.5.5 0 0 1 0-.707L13.414 2.293a.5.5 0 1 1 .707.707l-1.414 1.414a.5.5 0 0 1-.707 0z"/></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="vertical-align: middle;"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>`;

  function setDarkMode(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      toggleBtn.innerHTML = sunIcon;   // Mustavalkoinen aurinko
      toggleBtn.setAttribute('aria-label', 'Vaihda vaalea tila');
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.innerHTML = moonIcon;   // Mustavalkoinen kuu
      toggleBtn.setAttribute('aria-label', 'Vaihda tumma tila');
    }
    localStorage.setItem('satakuntaDarkMode', isDark ? 'true' : 'false');
  }

  // Alustus
  const saved = localStorage.getItem('satakuntaDarkMode');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = saved === 'true' || (saved === null && prefersDark);
  setDarkMode(initialDark);

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isCurrentlyDark);
  });
})();