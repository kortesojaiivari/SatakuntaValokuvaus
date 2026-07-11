// SatakuntaValokuvaus/SKRIPTIT/darkmode.js
// Tumma/vaalea tila + ikonin vaihto + localStorage

(function() {
  const toggleBtn = document.getElementById('darkmode-toggle');
  if (!toggleBtn) return;

  function setDarkMode(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️';
      toggleBtn.setAttribute('aria-label', 'Vaihda vaalea tila');
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.textContent = '🌙';
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