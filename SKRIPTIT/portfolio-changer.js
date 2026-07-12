// SatakuntaValokuvaus/SKRIPTIT/portfolio-changer.js
// Valokuvausprojektien vaihtuva showcase (sovellettu tälle sivulle)

document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            title: "TuplaKupla - Teatterikuvaus",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus40.webp", alt: "Teatterikuvaus 40" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus41.webp", alt: "Teatterikuvaus 41" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus42.webp", alt: "Teatterikuvaus 42" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus43.webp", alt: "Teatterikuvaus 43" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus44.webp", alt: "Teatterikuvaus 44" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus45.webp", alt: "Teatterikuvaus 45" }
            ]
        },
        {
            title: "Combat Camera",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus13.webp", alt: "Combat 13" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus3.webp", alt: "Combat 3" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus14.webp", alt: "Combat 14" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus1.webp", alt: "Combat 1" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus5.webp", alt: "Combat 5" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus21.webp", alt: "Combat 21" }
            ]
        },
        {
            title: "Laura Voutilainen - Kerran Keväällä",
            media: [
                { src: "MEDIA/VALOKUVAUS/Valokuvaus62.webp", alt: "Laura Voutilainen 62" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus68.webp", alt: "Laura Voutilainen 68" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus73.webp", alt: "Laura Voutilainen 73" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus54.webp", alt: "Laura Voutilainen 54" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus76.webp", alt: "Laura Voutilainen 76" },
                { src: "MEDIA/VALOKUVAUS/Valokuvaus65.webp", alt: "Laura Voutilainen 65" }
            ]
        }
    ];

    const titleElement = document.getElementById('changing-title');
    const gridElement = document.getElementById('changing-grid');
    const dotsContainer = document.getElementById('category-dots');

    let currentCategoryIndex = 0;
    let currentImageOffset = 0;
    let lastDisplayedCategoryIndex = -1;
    let autoCycleInterval;

    function resetAutoCycle() {
        clearInterval(autoCycleInterval);
        autoCycleInterval = setInterval(updateDisplay, 5000);
    }

    // Luo kategoriapisteet
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        categories.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'category-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                currentCategoryIndex = i;
                currentImageOffset = 0;
                updateDisplay();
                resetAutoCycle();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.category-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCategoryIndex);
        });
    }

    function updateDisplay() {
        const category = categories[currentCategoryIndex];
        const isNewCategory = currentCategoryIndex !== lastDisplayedCategoryIndex;

        if (gridElement) gridElement.style.opacity = '0';

        setTimeout(() => {
            if (isNewCategory && titleElement) {
                titleElement.textContent = category.title;
                lastDisplayedCategoryIndex = currentCategoryIndex;
            }

            const imagesToShow = category.media.slice(currentImageOffset, currentImageOffset + 3);

            if (gridElement) {
                gridElement.innerHTML = imagesToShow.map(img => `
                    <div class="group">
                        <img src="${img.src}" alt="${img.alt || ''}">
                    </div>
                `).join('');
                gridElement.style.opacity = '1';
            }

            updateDots();

            currentImageOffset += 3;
            if (currentImageOffset >= category.media.length) {
                currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
                currentImageOffset = 0;
            }
        }, 300);
    }

    if (gridElement) {
        updateDisplay();
        resetAutoCycle();
    }
});