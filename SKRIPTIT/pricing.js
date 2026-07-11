// SatakuntaValokuvaus/SKRIPTIT/pricing.js

(function() {
  const basePrices = {
    h1: 800,
    h2: 1300,
    h3: 300,
    f1: 300,
    f2: 600,
    t3: 350
  };

  const distancesKm = {
    "Eura": 65,
    "Eurajoki": 55,
    "Harjavalta": 40,
    "Huittinen": 80,
    "Jämijärvi": 25,
    "Kankaanpää": 0,
    "Karvia": 30,
    "Kokemäki": 70,
    "Merikarvia": 60,
    "Nakkila": 45,
    "Pomarkku": 20,
    "Pori": 53,
    "Rauma": 100,
    "Siikainen": 35,
    "Säkylä": 75,
    "Ulvila": 50
  };

  let currentCity = "Harjavalta";
  let currentTravelFee = 0;

  function calculateTravelFee(city) {
    const km = distancesKm[city] || 0;
    return Math.round(km * 0.65 * 2);
  }

  function animatePrice(element, newValue, duration = 680) {
    if (!element) return;

    const currentText = element.textContent.replace(' €', '').replace(/\s/g, '');
    let startValue = parseInt(currentText, 10) || newValue;

    if (startValue === newValue) {
      element.textContent = newValue + " €";
      return;
    }

    const startTime = performance.now();
    const range = newValue - startValue;

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(startValue + range * easedProgress);
      element.textContent = currentVal + " €";

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = newValue + " €";
      }
    }

    requestAnimationFrame(step);
  }

  function updateAllPrices(newTravelFee) {
    const priceElements = {
      h1: document.getElementById('price-h1'),
      h2: document.getElementById('price-h2'),
      h3: document.getElementById('price-h3'),
      f1: document.getElementById('price-f1'),
      f2: document.getElementById('price-f2'),
      t3: document.getElementById('price-t3')
    };

    Object.keys(basePrices).forEach(key => {
      const el = priceElements[key];
      if (!el) return;

      const newPrice = basePrices[key] + newTravelFee;
      const oldText = el.textContent;
      const oldPrice = parseInt(oldText.replace(' €', ''), 10) || basePrices[key];

      if (oldPrice !== newPrice) {
        animatePrice(el, newPrice);
      } else {
        el.textContent = newPrice + " €";
      }
    });
  }

  window.selectCityAndUpdatePrices = function(city) {
    if (!city || city === currentCity) return;

    currentCity = city;
    currentTravelFee = calculateTravelFee(city);

    updateAllPrices(currentTravelFee);

    const locationText = document.getElementById('bottom-location-text');
    if (locationText) {
      locationText.innerHTML = `Kuvauspaikka: <strong>${city}</strong>`;
    }

    const modal = document.getElementById('location-modal');
    if (modal) modal.style.display = 'none';
  };

  function initPricing() {
    currentTravelFee = calculateTravelFee("Harjavalta");
    currentCity = "Harjavalta";

    const priceEls = {
      h1: document.getElementById('price-h1'),
      h2: document.getElementById('price-h2'),
      h3: document.getElementById('price-h3'),
      f1: document.getElementById('price-f1'),
      f2: document.getElementById('price-f2')
    };

    Object.keys(priceEls).forEach(key => {
      const el = priceEls[key];
      if (el) el.textContent = (basePrices[key] + currentTravelFee) + " €";
    });

    const t3el = document.getElementById('price-t3');
    if (t3el) t3el.textContent = (basePrices.t3 + currentTravelFee) + " €";

    const locationText = document.getElementById('bottom-location-text');
    if (locationText) {
      locationText.innerHTML = `Kuvauspaikka: <strong>Harjavalta</strong>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricing);
  } else {
    initPricing();
  }
})();