// SatakuntaValokuvaus/SKRIPTIT/location.js
// Paikkakuntavalikko (aakkosjärjestyksessä) + keskitetty modaali + integrointi hinnoitteluun

(function() {
  // Vain alkuperäiset 16 Satakunnan kuntaa (ei lisätä uusia)
  const satakuntaCities = [
    "Eura", "Eurajoki", "Harjavalta", "Huittinen", "Jämijärvi",
    "Kankaanpää", "Kokemäki", "Merikarvia", "Nakkila", "Pomarkku",
    "Pori", "Rauma", "Siikainen", "Säkylä", "Ulvila", "Kauhajoki"
  ].sort();

  function createCityButtons(container) {
    if (!container) return;

    container.innerHTML = ''; // Tyhjennä vanhat

    // Hae nykyinen valittu paikkakunta (ensisijaisesti pricing.js:stä, fallback DOM)
    let currentSelected = "Harjavalta";
    if (typeof window.getCurrentCity === 'function') {
      currentSelected = window.getCurrentCity();
    } else {
      const locText = document.getElementById('bottom-location-text');
      if (locText) {
        const strong = locText.querySelector('strong');
        if (strong) {
          currentSelected = strong.textContent.trim();
        } else {
          const match = locText.textContent.match(/:\s*([A-Za-zäöåÄÖÅ]+)/);
          if (match) currentSelected = match[1];
        }
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

          // SULJE MODAALI AINA (myös jos pricing.js ei vastaa)
          const modal = document.getElementById('location-modal');
          if (modal) modal.style.display = 'none';

          if (typeof window.selectCityAndUpdatePrices === 'function') {
            window.selectCityAndUpdatePrices(city);
          } else {
            // Vahva fallback: päivittää alaheader + yritä päivittää hinnat manuaalisesti
            console.warn('selectCityAndUpdatePrices ei löytynyt - käytetään vahvaa fallbackia');

            const locationText = document.getElementById('bottom-location-text');
            if (locationText) {
              locationText.innerHTML = `Kuvauspaikka: <strong>${city}</strong>`;
            }

            const selectBtn = document.getElementById('select-location-btn');
            if (selectBtn) {
              const svg = selectBtn.querySelector('svg');
              if (svg) {
                selectBtn.innerHTML = '';
                selectBtn.appendChild(svg);
                selectBtn.appendChild(document.createTextNode(' ' + city));
              } else {
                selectBtn.textContent = city;
              }
            }

            // Manuaalinen hintapäivitys (jos pricing.js ei latautunut)
            if (typeof window.calculateTravelFee === 'function' && typeof window.getBasePrices === 'function') {
              const travelFee = window.calculateTravelFee(city);
              const bases = window.getBasePrices();
              const priceIds = ['price-h1','price-h2','price-h3','price-f1','price-f2','price-t3'];
              priceIds.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const key = id.replace('price-', '');
                if (bases[key] !== undefined) {
                  el.textContent = (bases[key] + travelFee) + ' €';
                }
              });
            }
          }
        }, 180); // Lyhyt viive efektille
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

    // Mobiilissa / tabletissa: vain listan skrollaus (ei kahta scrollia)
    const modalContent = modal.querySelector('.modal-content');
    if (window.innerWidth < 768 && modalContent && cityList) {
      modalContent.style.maxHeight = '78vh';
      modalContent.style.overflowY = 'auto';
      cityList.style.paddingTop = '8px';
      cityList.style.paddingBottom = '8px';
    }

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