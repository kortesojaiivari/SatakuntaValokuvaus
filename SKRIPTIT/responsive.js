// SatakuntaValokuvaus/SKRIPTIT/responsive.js
// Dynaaminen responsiivisuus mobiilille, tableteille ja eri resoluutioille

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const bottomHeader = document.getElementById('bottom-header');
    const servicePills = document.querySelectorAll('.service-pill');

    function applyResponsiveAdjustments() {
        const width = window.innerWidth;

        // === NAVBAARI ===
        if (navbar) {
            if (width < 768) {
                navbar.style.padding = '0.6rem 1rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.45rem';
                
                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks) navLinks.style.gap = '0.9rem';
            } else {
                navbar.style.padding = '1rem 2rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.85rem';
                
                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks) navLinks.style.gap = '2.1rem';
            }
        }

        // === HERO ===
        if (hero) {
            if (width < 600) {
                hero.style.height = 'auto';
                hero.style.minHeight = '420px';
                hero.style.padding = '3.5rem 1rem';
            } else if (width < 900) {
                hero.style.height = '58vh';
                hero.style.minHeight = '460px';
            } else {
                hero.style.height = '62vh';
                hero.style.minHeight = '480px';
                hero.style.padding = '0';
            }
        }

        // === SERVICE PILLS (Hero) ===
        if (servicePills.length > 0) {
            servicePills.forEach(pill => {
                if (width < 480) {
                    pill.style.padding = '0.55rem 1.1rem';
                    pill.style.fontSize = '0.92rem';
                } else {
                    pill.style.padding = '0.75rem 1.65rem';
                    pill.style.fontSize = '1.05rem';
                }
            });
        }

        // === ALAHEADER ===
        if (bottomHeader) {
            if (width < 600) {
                bottomHeader.style.padding = '0.9rem 1rem';
                const locationText = bottomHeader.querySelector('.location-text');
                if (locationText) locationText.style.fontSize = '1.1rem';
            } else {
                bottomHeader.style.padding = '1.2rem 2rem';
            }
        }

        // === KARUSELLI (Hero) ===
        const carouselRows = document.querySelectorAll('.carousel-row');
        carouselRows.forEach(row => {
            if (width < 600) {
                row.style.gap = '6px';
                const imgs = row.querySelectorAll('img');
                imgs.forEach(img => {
                    img.style.width = '180px';
                    img.style.height = '108px';
                });
            } else {
                row.style.gap = '8px';
                const imgs = row.querySelectorAll('img');
                imgs.forEach(img => {
                    img.style.width = '260px';
                    img.style.height = '155px';
                });
            }
        });
    }

    // Suorita heti
    applyResponsiveAdjustments();

    // Kuuntele koon muutoksia
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(applyResponsiveAdjustments, 150);
    });

    // Lisäparannus: estä hero-karusellin leikkaantuminen mobiilissa
    if (hero) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.innerWidth < 600) {
                    hero.style.height = 'auto';
                }
            });
        });
        observer.observe(hero);
    }

    console.log('%c[responsive.js] Responsiiviset säädöt aktivoitu', 'color:#4ade80');
});