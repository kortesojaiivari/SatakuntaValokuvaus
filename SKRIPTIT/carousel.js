// SatakuntaValokuvaus/SKRIPTIT/carousel.js
// 3-rivinen infinite scroll karuselli hero-taustaan (vastakkaissuunta keskellä)

(function() {
  function initCarousel() {
    const container = document.getElementById('carousel-bg');
    if (!container) return;

    // Omat kuvat (jos ei löydy, fallback picsum)
    // Voit korvata nämä omilla poluillasi: MEDIA/VALOKUVAUS/ValokuvausX.webp
    const imagePaths = [
      "MEDIA/VALOKUVAUS/Valokuvaus1.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus2.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus3.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus4.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus5.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus6.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus7.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus8.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus9.webp",
      "MEDIA/VALOKUVAUS/Valokuvaus10.webp"
    ];

    const rowsConfig = [
      { className: 'row-1', direction: 'right' },
      { className: 'row-2', direction: 'left' },   // Keskimmäinen vastakkaiseen suuntaan
      { className: 'row-3', direction: 'right' }
    ];

    rowsConfig.forEach((rowInfo, rowIndex) => {
      const row = document.createElement('div');
      row.className = `carousel-row ${rowInfo.className}`;

      // Tuplataan kuvat saumattomaan looppiin
      const imagesToShow = [...imagePaths, ...imagePaths];

      imagesToShow.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Dokumentaarinen valokuvaus ${((rowIndex * 10) + (i % 10)) + 1}`;
        img.loading = 'lazy';

        // Fallback jos omia kuvia ei ole
        img.onerror = function() {
          const seed = (rowIndex * 10 + i % 10) + 20;
          this.src = `https://picsum.photos/id/${seed}/600/400`;
          this.style.opacity = '0.85';
        };

        row.appendChild(img);
      });

      container.appendChild(row);
    });
  }

  // Käynnistä kun DOM valmis
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();