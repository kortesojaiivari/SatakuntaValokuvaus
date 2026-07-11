// SatakuntaValokuvaus/SKRIPTIT/header.js
// Yläheaderin piilotus scroll down + alaheaderin näyttö + smooth slide up

(function() {
  const navbar = document.querySelector('.navbar');
  const bottomHeader = document.getElementById('bottom-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  if (!navbar) return;

  function updateHeaders() {
    const currentScrollY = window.scrollY;

    // Yläheader: piilota kun scrollataan alas (slide up)
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    // Alaheader: näytä kun scrollataan alas riittävästi
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

  // Alustetaan alaheaderin tila heti
  setTimeout(() => {
    if (bottomHeader && window.scrollY > 380) {
      bottomHeader.classList.add('visible');
    }
  }, 300);

  // Mahdollinen smooth napautus yläreunaan (valinnainen)
  navbar.addEventListener('click', (e) => {
    if (e.target.closest('.logo')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();