// SatakuntaValokuvaus/SKRIPTIT/responsive.js
// Parannettu mobiili- ja responsiivisuustuki

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const bottomHeader = document.getElementById('bottom-header');
    const servicePills = document.querySelectorAll('.service-pill');
    const locationModal = document.getElementById('location-modal');

    function applyResponsiveAdjustments() {
        const width = window.innerWidth;

        // === NAVBAARI (pienempi mobiilissa) ===
        if (navbar) {
            if (width < 600) {
                navbar.style.padding = '0.5rem 0.9rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.35rem';

                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.style.gap = '0.6rem';
                }
            } else if (width < 900) {
                navbar.style.padding = '0.7rem 1.3rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.6rem';
            } else {
                navbar.style.padding = '1rem 2rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.85rem';
            }
        }

        // === HERO + KARUSELLI + OTSIKKO ===
        if (hero) {
            if (width < 500) {
                hero.style.minHeight = '380px';
                hero.style.paddingTop = '4.5rem';
                hero.style.paddingBottom = '2rem';

                const h1 = hero.querySelector('h1');
                if (h1) h1.style.fontSize = '2.35rem';
                if (h1) h1.style.lineHeight = '1.15';

                // Karuselli alemmas mobiilissa
                const carouselBg = document.getElementById('carousel-bg');
                if (carouselBg) carouselBg.style.opacity = '0.65';
            } else if (width < 768) {
                hero.style.minHeight = '420px';
                hero.style.paddingTop = '3.8rem';
            } else {
                hero.style.minHeight = '480px';
                hero.style.paddingTop = '0';
            }
        }

        // === SERVICE PILLS ===
        servicePills.forEach(pill => {
            if (width < 480) {
                pill.style.padding = '0.5rem 1rem';
                pill.style.fontSize = '0.88rem';
            } else if (width < 700) {
                pill.style.padding = '0.6rem 1.25rem';
                pill.style.fontSize = '0.95rem';
            } else {
                pill.style.padding = '0.75rem 1.65rem';
                pill.style.fontSize = '1.05rem';
            }
        });

        // === ALAHEADER ===
        if (bottomHeader) {
            if (width < 600) {
                bottomHeader.style.padding = '0.75rem 0.9rem';
                const locText = bottomHeader.querySelector('.location-text');
                if (locText) locText.style.fontSize = '1.05rem';
            }
        }

        // === KARUSELLI KUVAT ===
        const carouselRows = document.querySelectorAll('.carousel-row');
        carouselRows.forEach(row => {
            if (width < 500) {
                row.style.gap = '5px';
                row.querySelectorAll('img').forEach(img => {
                    img.style.width = '155px';
                    img.style.height = '92px';
                });
            } else if (width < 768) {
                row.style.gap = '6px';
                row.querySelectorAll('img').forEach(img => {
                    img.style.width = '195px';
                    img.style.height = '116px';
                });
            } else {
                row.style.gap = '8px';
                row.querySelectorAll('img').forEach(img => {
                    img.style.width = '260px';
                    img.style.height = '155px';
                });
            }
        });

        // === LOCATION MODAL - MOBIILI SKROLLAUS ===
        if (locationModal && width < 600) {
            const modalContent = locationModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxHeight = '78vh';
                modalContent.style.overflowY = 'auto';
                modalContent.style.padding = '1.8rem 1.4rem';
            }
        } else if (locationModal) {
            const modalContent = locationModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxHeight = '';
                modalContent.style.overflowY = '';
            }
        }
    }

    // Suorita heti
    applyResponsiveAdjustments();

    // Resize-kuuntelu
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(applyResponsiveAdjustments, 120);
    });

    // Portfolio-changer kuvien mobiili fallback (jos WebP ei lataudu)
    const portfolioImages = document.querySelectorAll('#changing-grid img');
    portfolioImages.forEach(img => {
        img.addEventListener('error', () => {
            // Jos kuva ei lataudu (esim. WebP Safari-ongelma), vaihdetaan kevyeen placeholderiin
            if (!img.dataset.fallbackApplied) {
                img.src = 'https://picsum.photos/id/1015/600/400';
                img.dataset.fallbackApplied = 'true';
            }
        });
    });

    console.log('%c[responsive.js] Parannettu mobiilituki aktivoitu', 'color:#4ade80');
});