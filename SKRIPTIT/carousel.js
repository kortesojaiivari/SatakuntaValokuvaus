// SatakuntaValokuvaus/SKRIPTIT/carousel.js
// Oma dedikoitu 3-rivinen infinite scroll kuvakaruselli
// Eri kuvat jokaiselle riville + saumaton loop + fallback

(function() {
  // === MÄÄRITELTÄVÄT KUVAT RIVEITTÄIN ===
  // Ylä rivi (row-1)
  const topRow = [13,3,14,1,5,21,4,77,10,6,7,12,18,24,26,9,37,30,11,33,34,2,16,22,23,27];

  // Keskirivi (row-2) - liikkuu vastakkaiseen suuntaan
  const middleRow = [40,41,42,43,44,45,62,68,73,54,76,65,70,74,72,56,59];

  // Alarivi (row-3)
  const bottomRow = [85,83,82,80,88,94,91,90,93,101,102,103,111,113,114,105,106,118,116,117,119,112,110];

  const basePath = "MEDIA/VALOKUVAUSARKISTO/Valokuvaus";

  function createCarouselRow(container, imageNumbers, rowClass, direction) {
    const row = document.createElement('div');
    row.className = `carousel-row ${rowClass}`;

    // Tuplataan lista saumattoman loopin takia
    const doubled = [...imageNumbers, ...imageNumbers];

    doubled.forEach(num => {
      const img = document.createElement('img');
      img.src = `${basePath}${num}.webp`;
      img.alt = `Satakunta Valokuvaus - kuva ${num}`;
      img.loading = 'lazy';

      // Fallback jos kuvaa ei löydy
      img.onerror = function() {
        this.src = `https://picsum.photos/id/${(num % 50) + 10}/600/400`;
        this.style.opacity = '0.7';
      };

      row.appendChild(img);
    });

    container.appendChild(row);
  }

  function initCarousel() {
    const container = document.getElementById('carousel-bg');
    if (!container) return;

    // Tyhjennä mahdolliset vanhat rivit
    container.innerHTML = '';

    // Ylä rivi
    createCarouselRow(container, topRow, 'row-1', 'right');

    // Keskirivi (vastakkaiseen suuntaan)
    createCarouselRow(container, middleRow, 'row-2', 'left');

    // Alarivi
    createCarouselRow(container, bottomRow, 'row-3', 'right');
  }

  // Käynnistä
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }

  // Mahdollisuus kutsua uudelleen tarvittaessa
  window.reinitCarousel = initCarousel;
})();
