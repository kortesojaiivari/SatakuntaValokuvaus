// SatakuntaValokuvaus/SKRIPTIT/header.js

(function() {
  const navbar = document.querySelector('.navbar');
  const bottomHeader = document.getElementById('bottom-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  if (!navbar) return;

  function updateHeaders() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    if (bottomHeader) {
      if (currentScrollY > 380) {
        bottomHeader.classList.add('visible');
      } else {
        bottomHeader.classList.remove('visible');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaders);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  setTimeout(() => {
    if (bottomHeader && window.scrollY > 380) {
      bottomHeader.classList.add('visible');
    }
  }, 300);
})();