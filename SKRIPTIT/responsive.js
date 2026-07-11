// SatakuntaValokuvaus/SKRIPTIT/responsive.js
// Mobiili- ja tablettioptimointi

(function() {
  function initResponsive() {
    // Mahdolliset dynaamiset mobiilitoiminnot tänne myöhemmin
    console.log('%c[Responsive] Mobiilioptimointi ladattu', 'color:#888');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResponsive);
  } else {
    initResponsive();
  }
})();