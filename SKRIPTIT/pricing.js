// SatakuntaValokuvaus/SKRIPTIT/pricing.js

(function() {
  const basePrices = {
    h1: 800, h2: 1300, h3: 300, f1: 300, f2: 600, t3: 350
  };

  const distancesKm = {
    "Eura": 65, "Eurajoki": 55, "Harjavalta": 40, "Huittinen": 80,
    "Jämijärvi": 25, "Kankaanpää": 0, "Karvia": 30, "Kokemäki": 70,
    "Merikarvia": 60, "Nakkila": 45, "Pomarkku": 20, "Pori": 53,
    "Rauma": 100, "Siikainen": 35, "Säkylä": 75, "Ulvila": 50
  };

  let currentCity = "Harjavalta";

  function calculateTravelFee(city) {
    return Math.round((distancesKm[city] || 0) * 0.65 * 2);
  }

  function animatePrice(el, newValue) {
    if (!el) return;
    const start = parseInt(el.textContent) || newValue;
    if (start === newValue) {
      el.textContent = newValue + " €";
      return;
    }
    const duration = 650;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(start + (newValue - start) * eased);
      el.textContent = val + " €";
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  window.selectCityAndUpdatePrices = function(city) {
    currentCity = city;
    const fee = calculateTravelFee(city);

    const ids = ['price-h1','price-h2','price-h3','price-f1','price-f2','price-t3'];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) {
        const base = Object.values(basePrices)[i];
        animatePrice(el, base + fee);
      }
    });

    const textEl = document.getElementById('bottom-location-text');
    if (textEl) textEl.innerHTML = `Kuvauspaikka: <strong>${city}</strong>`;
  };

  function init() {
    const fee = calculateTravelFee("Harjavalta");
    const ids = ['price-h1','price-h2','price-h3','price-f1','price-f2','price-t3'];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = (Object.values(basePrices)[i] + fee) + " €";
    });

    const textEl = document.getElementById('bottom-location-text');
    if (textEl) textEl.innerHTML = `Kuvauspaikka: <strong>Harjavalta</strong>`;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();