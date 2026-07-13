// SatakuntaValokuvaus/SKRIPTIT/location.js
// Paikkakuntavalikko (vain 16 Satakunnan kuntaa) + mobiili scroll-indikaatio

(function() {
  // Vain alkuperäiset 16 Satakunnan kuntaa (ei lisätä uusia)
  const satakuntaCities = [
    "Eura", "Eurajoki", "Harjavalta", "Huittinen", "Jämijärvi",
    "Kankaanpää", "Kokemäki", "Merikarvia", "Nakkila", "Pomarkku",
    "Pori", "Rauma", "Siikainen", "Säkylä", "Ulvila", "Kauhajoki"
  ].sort();

  function createCityButtons(container) {
    if (!container) return;

    container.innerHTML = '';

    let currentSelected = "Harjavalta";
    if (typeof window.getCurrentCity === 'function') {
      currentSelected = window.getCurrentCity();
    } else {
      const locText = document.getElementById('bottom-location-text');
      if (locText) {
        const strong = locText.querySelector('strong');
        if (strong) currentSelected = strong.textContent.trim();
      }
    }

    satakuntaCities.forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'city-btn';
      btn.textContent = city;

      if (city === currentSelected) {
        btn.style.border = '2px solid #d4af37';
        btn.style.fontWeight = '600';
      }

      btn.onclick = () => {
        btn.classList.add('clicked');
        setTimeout(() => {
          btn.classList.remove('clicked');
          if (typeof window.selectCityAndUpdatePrices === 'function') {
            window.selectCityAndUpdatePrices(city);
          }
        }, 180);
      };

      container.appendChild(btn);
    });
  }

  window.showLocationModal = function() {
    const modal = document.getElementById('location-modal');
    if (!modal) return;

    let cityList = document.getElementById('city-list-container');
    if (!cityList) {
      cityList = document.createElement('div');
      cityList.id = 'city-list-container';
      cityList.style.cssText = 'display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.6rem; margin: 1.2rem 0;';
      
      const closeBtn = modal.querySelector('button[onclick*="closeModal"]');
      if (closeBtn && closeBtn.parentNode) {
        closeBtn.parentNode.insertBefore(cityList, closeBtn);
      } else {
        modal.querySelector('.modal-content').appendChild(cityList);
      }
    }

    createCityButtons(cityList);

    // Mobiilissa / tabletissa: näytä että listaa voi skrollata
    // Scrollaa ensin alas, sitten takaisin ylös (animaatio)
    if (window.innerWidth < 768 && cityList) {
      // Varmistetaan että elementti on scrollattava
      cityList.style.maxHeight = '65vh';
      cityList.style.overflowY = 'auto';

      setTimeout(() => {
        // Mene ensin pohjaan
        cityList.scrollTop = cityList.scrollHeight;

        // Sitten sulava animaatio ylös
        setTimeout(() => {
          cityList.scrollTo({
            top: 40,
            behavior: 'smooth'
          });
        }, 220);
      }, 420);
    }

    modal.style.display = 'flex';
  };

  window.closeModal = function() {
    const modal = document.getElementById('location-modal');
    if (modal) modal.style.display = 'none';
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      const modal = document.getElementById('location-modal');
      if (modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    }
  });
})();