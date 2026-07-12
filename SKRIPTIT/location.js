// SatakuntaValokuvaus/SKRIPTIT/location.js
// Paikkakuntavalikko (aakkosjärjestyksessä) + keskitetty modaali + integrointi hinnoitteluun + dynaaminen klikkausefekti + dynaaminen korostus

(function() {
  const satakuntaCities = [
    "Eura", "Eurajoki", "Harjavalta", "Huittinen", "Jämijärvi",
    "Kankaanpää", "Karvia", "Kokemäki", "Merikarvia", "Nakkila",
    "Pomarkku", "Pori", "Rauma", "Siikainen", "Säkylä", "Ulvila"
  ].sort(); // Varmistetaan aakkosjärjestys (jo valmiiksi lähes)

  function createCityButtons(container) {
    if (!container) return;

    container.innerHTML = ''; // Tyhjennä vanhat

    // Hae nykyinen valittu paikkakunta alaheaderista (dynaaminen korostus)
    let currentSelected = "Harjavalta";
    const locText = document.getElementById('bottom-location-text');
    if (locText) {
      const strong = locText.querySelector('strong');
      if (strong) {
        currentSelected = strong.textContent.trim();
      } else {
        // fallback
        const match = locText.textContent.match(/:\s*([A-Za-zäöåÄÖÅ]+)/);
        if (match) currentSelected = match[1];
      }
    }

    satakuntaCities.forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'city-btn';
      btn.textContent = city;

      // Korosta dynaamisesti nykyinen valittu paikkakunta (ei aina Harjavalta)
      if (city === currentSelected) {
        btn.style.border = '2px solid #d4af37';
        btn.style.fontWeight = '600';
      }

      btn.onclick = () => {
        // Dynaaminen klikkausefekti responsiivisuuden tunteen luomiseksi
        btn.classList.add('clicked');
        setTimeout(() => {
          btn.classList.remove('clicked');
          // Kutsutaan pricing.js:n funktiota (menu sulkeutuu automaattisesti)
          if (typeof window.selectCityAndUpdatePrices === 'function') {
            window.selectCityAndUpdatePrices(city);
          } else {
            // Fallback jos pricing ei latautunut
            console.warn('selectCityAndUpdatePrices ei löytynyt');
            document.getElementById('selected-city') && (document.getElementById('selected-city').textContent = city);
          }
        }, 180); // Lyhyt viive efektille ennen sulkemista
      };

      container.appendChild(btn);
    });
  }

  // Näytä modaali
  window.showLocationModal = function() {
    const modal = document.getElementById('location-modal');
    if (!modal) return;

    const listContainer = modal.querySelector('#city-list-container') || modal.querySelector('.modal-content');
    
    // Jos ei ole valmista list containeria, luodaan dynaamisesti
    let cityList = document.getElementById('city-list-container');
    if (!cityList) {
      cityList = document.createElement('div');
      cityList.id = 'city-list-container';
      cityList.style.cssText = 'display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.6rem; margin: 1.2rem 0;';
      
      // Lisätään listaan modalin sisältöön (ennen sulje-nappia)
      const closeBtn = modal.querySelector('button[onclick*="closeModal"]');
      if (closeBtn && closeBtn.parentNode) {
        closeBtn.parentNode.insertBefore(cityList, closeBtn);
      } else {
        modal.querySelector('.modal-content').appendChild(cityList);
      }
    }

    createCityButtons(cityList);
    modal.style.display = 'flex';
  };

  // Sulje modaali
  window.closeModal = function() {
    const modal = document.getElementById('location-modal');
    if (modal) modal.style.display = 'none';
  };

  // Escape-näppäin sulkee modaal in
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      const modal = document.getElementById('location-modal');
      if (modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    }
  });

  // Alustetaan (valinnainen: jos halutaan default valinta)
  // document.addEventListener('DOMContentLoaded', () => { ... });
})();