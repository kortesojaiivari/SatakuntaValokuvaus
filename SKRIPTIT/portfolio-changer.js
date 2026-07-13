// SatakuntaValokuvaus/SKRIPTIT/portfolio-changer.js
// 1. Dokumentaarinen kuvaus -osion vaihtuva kuva (20s intervalli + random järjestys)
// 2. Valokuvausprojektien vaihtuva showcase

document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // 1. DOKUMENTAARINEN KUVAUS - VAIHTUVA KUVA (20 sekuntia)
    // =====================================================
    const dokumentaarinenImages = [
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus1.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus2.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus6.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus13.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus16.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus18.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus23.webp",
        "MEDIA/VALOKUVAUSARKISTO/Valokuvaus27.webp"
    ];

    const docImage = document.getElementById('dokumentaarinen-image');

    if (docImage) {
        // Sekoita kuvat satunnaiseen järjestykseen
        let shuffledImages = [...dokumentaarinenImages].sort(() => Math.random() - 0.5);
        let currentIndex = 0;

        // Aseta ensimmäinen kuva satunnaisesti
        docImage.src = shuffledImages[currentIndex];

        // Vaihda kuvaa 20 sekunnin välein
        setInterval(() => {
            currentIndex = (currentIndex + 1) % shuffledImages.length;
            docImage.style.transition = 'opacity 0.6s ease';
            docImage.style.opacity = '0';

            setTimeout(() => {
                docImage.src = shuffledImages[currentIndex];
                docImage.style.opacity = '1';
            }, 600);
        }, 25000);
    }

    // =====================================================
    // 2. VALOKUVAUSPROJEKTIT (Portfolio Changer)
    // =====================================================
    const categories = [
        {
            title: "TuplaKupla - Teatterikuvaus",
            media: [
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus40.webp", alt: "Teatterikuvaus 40" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus41.webp", alt: "Teatterikuvaus 41" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus42.webp", alt: "Teatterikuvaus 42" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus43.webp", alt: "Teatterikuvaus 43" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus44.webp", alt: "Teatterikuvaus 44" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus45.webp", alt: "Teatterikuvaus 45" }
            ]
        },
        {
            title: "Combat Camera",
            media: [
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus13.webp", alt: "Combat 13" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus3.webp", alt: "Combat 3" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus14.webp", alt: "Combat 14" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus1.webp", alt: "Combat 1" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus5.webp", alt: "Combat 5" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus21.webp", alt: "Combat 21" }
            ]
        },
        {
            title: "Laura Voutilainen - Kerran Keväällä",
            media: [
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus62.webp", alt: "Laura Voutilainen 62" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus68.webp", alt: "Laura Voutilainen 68" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus73.webp", alt: "Laura Voutilainen 73" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus54.webp", alt: "Laura Voutilainen 54" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus76.webp", alt: "Laura Voutilainen 76" },
                { src: "MEDIA/VALOKUVAUSARKISTO/Valokuvaus65.webp", alt: "Laura Voutilainen 65" }
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