// SatakuntaValokuvaus/SKRIPTIT/pricing.js
// Dynaamiset hinnat + matka-ajan laskenta (0,65 €/km × 2) + numeroiden animaatio

(function() {
  // Perushinnat Kankaanpäässä (kotipaikka)
  const basePrices = {
    h1: 800,   // Dokumentaarinen Hääkuvaus (max 6h, 200 kuvaa)
    h2: 1300,  // Kokopäivän Hääkuvaus
    h3: 300,   // Kevyt paketti: Potretit + Vihkiminen
    f1: 300,   // Hautaus / Muistotilaisuus (2h)
    f2: 600,   // Laajempi hautajaispaketti (4h)
    t3: 350    // Ajallinen paketti 3h
  };

  // Arvioidut ajomatkat Kankaanpäästä (yhteen suuntaan, km)
  // Perustuen tyypillisiin reitteihin Satakunnassa
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

  let currentCity = "Kankaanpää";
  let currentTravelFee = 0;

  // Matkakustannus = km × 0,65 € × 2 (edestakaisin)
  function calculateTravelFee(city) {
    const km = distancesKm[city] || 0;
    return Math.round(km * 0.65 * 2);
  }

  // Hinnan animaatio (ylös/alas riippuen muutoksesta)
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
      // Pehmeä easeOutCubic
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

  // Päivittää kaikki hinnat animaatiolla
  function updateAllPrices(newTravelFee) {
    const priceElements = {
      h1: document.getElementById('price-h1'),
      h2: document.getElementById('price-h2'),
      h3: document.getElementById('price-h3'),
      f1: document.getElementById('price-f1'),
      f2: document.getElementById('price-f2'),
      t3: document.getElementById('price-t3')  // Lisätty 3h paketille
    };

    Object.keys(basePrices).forEach(key => {
      const el = priceElements[key];
      if (!el) return;

      const newPrice = basePrices[key] + newTravelFee;
      const oldText = el.textContent;
      const oldPrice = parseInt(oldText.replace(' €', ''), 10) || basePrices[key];

      // Animaatio vain jos hinta todella muuttuu
      if (oldPrice !== newPrice) {
        animatePrice(el, newPrice);
      } else {
        el.textContent = newPrice + " €";
      }
    });
  }

  // Julkinen funktio paikkakunnan vaihtoon (kutsutaan location.js:stä)
  window.selectCityAndUpdatePrices = function(city) {
    if (!city || city === currentCity) return;

    currentCity = city;
    currentTravelFee = calculateTravelFee(city);

    // Päivitä hinnat animaatiolla
    updateAllPrices(currentTravelFee);

    // Päivitä alaheaderin teksti (ilman kotipaikka-mainintaa)
    const locationText = document.getElementById('bottom-location-text');
    if (locationText) {
      locationText.innerHTML = `Kuvauspaikka: <strong>${city}</strong>`;
    }

    // Dynaamisesti päivitä alaheaderin nappula valitun paikkakunnan nimeksi (responsivinen UX)
    const selectBtn = document.getElementById('select-location-btn');
    if (selectBtn) {
      // Säilytetään ikoni, vaihdetaan teksti paikkakunnan nimeksi
      const svg = selectBtn.querySelector('svg');
      if (svg) {
        selectBtn.innerHTML = '';
        selectBtn.appendChild(svg);
        selectBtn.appendChild(document.createTextNode(' ' + city));
      } else {
        selectBtn.textContent = city;
      }
      selectBtn.setAttribute('aria-label', `Vaihda paikkakunta (nykyinen: ${city})`);
    }

    // Sulje modaali jos auki
    const modal = document.getElementById('location-modal');
    if (modal) modal.style.display = 'none';

    // Valinnainen: näytä pieni vahvistus (voi poistaa)
    // console.log(`Paikkakunta vaihdettu: ${city} | Matkakustannus: ${currentTravelFee} €`);
  };

  // Alustetaan oletushinnat (Harjavalta oletuksena)
  function initPricing() {
    currentCity = "Harjavalta";
    currentTravelFee = calculateTravelFee(currentCity);

    // Aseta alkuhinnat heti (mukaan lukien matkakustannus)
    const priceEls = {
      h1: document.getElementById('price-h1'),
      h2: document.getElementById('price-h2'),
      h3: document.getElementById('price-h3'),
      f1: document.getElementById('price-f1'),
      f2: document.getElementById('price-f2')
    };

    Object.keys(priceEls).forEach(key => {
      const el = priceEls[key];
      if (el) {
        const newPrice = basePrices[key] + currentTravelFee;
        el.textContent = newPrice + " €";
      }
    });

    // 3h paketti
    const t3el = document.getElementById('price-t3');
    if (t3el) {
      t3el.textContent = (basePrices.t3 + currentTravelFee) + " €";
    }

    // Alusta alaheaderin teksti (ilman "kotipaikka" mainintaa)
    const locationText = document.getElementById('bottom-location-text');
    if (locationText) {
      locationText.innerHTML = `Kuvauspaikka: <strong>${currentCity}</strong>`;
    }
  }

  // Käynnistä
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricing);
  } else {
    initPricing();
  }

  // Vie myös etäisyyksien tarkasteluun (valinnainen debug)
  window.getSatakuntaDistances = () => distancesKm;
})();