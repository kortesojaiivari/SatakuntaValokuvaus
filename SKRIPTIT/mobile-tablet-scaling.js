// SatakuntaValokuvaus/SKRIPTIT/mobile-tablet-scaling.js
// Dedikoitu skripti tabletti- ja mobiililaitteiden sivun skaalaukselle,
// elementtien toimivuudelle ja dynaamiselle hitbox-mittaukselle.
// Tämä pitää index.html:n siistimpänä.

(function() {
    'use strict';

    function initMobileTabletScaling() {
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        const bottomHeader = document.getElementById('bottom-header');
        const servicePills = document.querySelectorAll('.service-pill');

        function applyScaling() {
            const width = window.innerWidth;
            const isMobile = width < 600;
            const isTablet = width >= 600 && width < 1024;

            // === YLÄHEADERIN SKAALAUS (mobiili/tablet) ===
            if (navbar) {
                if (isMobile) {
                    navbar.style.padding = '0.35rem 0.6rem';
                    const logo = navbar.querySelector('.logo');
                    if (logo) logo.style.fontSize = '1.18rem';

                    const navLinks = navbar.querySelector('.nav-links');
                    if (navLinks) {
                        navLinks.style.gap = '0.35rem';
                        navLinks.style.justifyContent = 'center';
                    }

                    navbar.querySelectorAll('.nav-pill').forEach(pill => {
                        pill.style.padding = '0.32rem 0.6rem';
                        pill.style.fontSize = '0.78rem';
                        pill.style.flex = '1';
                    });
                } else if (isTablet) {
                    navbar.style.padding = '0.5rem 1rem';
                    const logo = navbar.querySelector('.logo');
                    if (logo) logo.style.fontSize = '1.4rem';

                    const navLinks = navbar.querySelector('.nav-links');
                    if (navLinks) navLinks.style.gap = '0.5rem';

                    navbar.querySelectorAll('.nav-pill').forEach(pill => {
                        pill.style.padding = '0.38rem 0.9rem';
                        pill.style.fontSize = '0.9rem';
                    });
                }
            }

            // === HERO + KARUSELLI (dynaaminen hitbox + padding) ===
            if (hero && navbar) {
                const headerHeight = navbar.offsetHeight || 70;

                if (isMobile) {
                    hero.style.paddingTop = `${headerHeight + 32}px`;
                    hero.style.minHeight = '360px';

                    const h1 = hero.querySelector('h1');
                    if (h1) {
                        h1.style.fontSize = '2.05rem';
                        h1.style.lineHeight = '1.08';
                    }

                    const carouselBg = document.getElementById('carousel-bg');
                    if (carouselBg) carouselBg.style.opacity = '0.52';
                } else if (isTablet) {
                    hero.style.paddingTop = `${headerHeight + 24}px`;
                    hero.style.minHeight = '420px';
                } else {
                    // Desktop
                    hero.style.paddingTop = '1.8rem';
                    hero.style.minHeight = '480px';
                }
            }

            // === SERVICE PILLS ===
            servicePills.forEach(pill => {
                if (isMobile) {
                    pill.style.padding = '0.48rem 0.95rem';
                    pill.style.fontSize = '0.85rem';
                } else if (isTablet) {
                    pill.style.padding = '0.58rem 1.2rem';
                    pill.style.fontSize = '0.95rem';
                }
            });

            // === ALAHEADER ===
            if (bottomHeader && isMobile) {
                bottomHeader.style.padding = '0.7rem 0.85rem';
                const locText = bottomHeader.querySelector('.location-text');
                if (locText) locText.style.fontSize = '1.02rem';
            }

            // === YLEINEN PADDING SIVULLE (mobiili/tablet) ===
            // Lisää hieman enemmän hengitystilaa sivuille
            if (isMobile || isTablet) {
                document.documentElement.style.setProperty('--section-padding', isMobile ? '10% 5%' : '8% 6%');
            }
        }

        // Alustus + resize-kuuntelija
        function init() {
            applyScaling();

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(applyScaling, 120);
            });

            // Varmistetaan hero-sijoitus myös kun navbar on valmis
            setTimeout(applyScaling, 350);
            setTimeout(applyScaling, 900);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    // Käynnistä
    initMobileTabletScaling();
})();