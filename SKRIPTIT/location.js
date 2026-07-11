// SatakuntaValokuvaus/SKRIPTIT/location.js

(function() {
  const satakuntaCities = [
    "Eura", "Eurajoki", "Harjavalta", "Huittinen", "Jämijärvi",
    "Kankaanpää", "Karvia", "Kokemäki", "Merikarvia", "Nakkila",
    "Pomarkku", "Pori", "Rauma", "Siikainen", "Säkylä", "Ulvila"
  ];

  function createCityButtons(container) {
    if (!container) return;
    container.innerHTML = '';

    satakuntaCities.forEach(city => {
      const btn = document.createElement('button');
      btn.className = 'city-btn';
      btn.textContent = city;

      if (city === "Harjavalta") {
        btn.style.border = '2px solid #d4af37';
        btn.style.fontWeight = '700';
      }

      btn.onclick = () => {
        if (typeof window.selectCityAndUpdatePrices === 'function') {
          window.selectCityAndUpdatePrices(city);
        }
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