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

        // === NAVBAARI (erittäin aggressiivinen skaalaus mobiilissa/tabletissa) ===
        if (navbar) {
            if (width < 480) {
                navbar.style.padding = '0.28rem 0.5rem';
                navbar.style.height = 'auto';

                const logo = navbar.querySelector('.logo');
                if (logo) {
                    logo.style.fontSize = '0.95rem';
                    logo.style.flexShrink = '0';
                }

                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.style.gap = '0.25rem';
                    navLinks.style.justifyContent = 'flex-end';
                }

                navbar.querySelectorAll('.nav-pill').forEach(pill => {
                    pill.style.padding = '0.22rem 0.5rem';
                    pill.style.fontSize = '0.68rem';
                    pill.style.whiteSpace = 'nowrap';
                });
            } else if (width < 768) {
                navbar.style.padding = '0.38rem 0.7rem';

                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.1rem';

                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks) navLinks.style.gap = '0.35rem';

                navbar.querySelectorAll('.nav-pill').forEach(pill => {
                    pill.style.padding = '0.3rem 0.6rem';
                    pill.style.fontSize = '0.78rem';
                });
            } else if (width < 1100) {
                navbar.style.padding = '0.55rem 1.4rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.45rem';
            } else {
                navbar.style.padding = '0.65rem 2rem';
                const logo = navbar.querySelector('.logo');
                if (logo) logo.style.fontSize = '1.55rem';
            }
        }

        // === HERO + KARUSELLI + OTSIKKO (dynaaminen hitbox-pohjainen sijoitus) ===
        if (hero && navbar) {
            if (width < 600) {
                setTimeout(() => {
                    const headerHeight = navbar.offsetHeight;
                    const extraSpace = 32;

                    hero.style.paddingTop = `${headerHeight + extraSpace}px`;
                    hero.style.minHeight = '380px';
                }, 90);

                const h1 = hero.querySelector('h1');
                if (h1) {
                    h1.style.fontSize = '2.05rem';
                    h1.style.lineHeight = '1.08';
                }

                const carouselBg = document.getElementById('carousel-bg');
                if (carouselBg) carouselBg.style.opacity = '0.52';
            } else if (width < 900) {
                hero.style.minHeight = '420px';
                hero.style.paddingTop = '4.8rem';
            } else {
                hero.style.minHeight = '480px';
                hero.style.paddingTop = '1.8rem';
            }
        }

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

        if (bottomHeader) {
            if (width < 600) {
                bottomHeader.style.padding = '0.75rem 0.9rem';
                const locText = bottomHeader.querySelector('.location-text');
                if (locText) locText.style.fontSize = '1.05rem';
            }
        }

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

    applyResponsiveAdjustments();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(applyResponsiveAdjustments, 120);
    });

    const portfolioImages = document.querySelectorAll('#changing-grid img');
    portfolioImages.forEach(img => {
        img.addEventListener('error', () => {
            if (!img.dataset.fallbackApplied) {
                img.src = 'https://picsum.photos/id/1015/600/400';
                img.dataset.fallbackApplied = 'true';
            }
        });
    });

    // =====================================================
    // ALAHEADER NÄKYVIIN VAIN KUVAUSPAKETIT-OSIOSSA
    // =====================================================
    const packagesSection = document.getElementById('paketit');
    const bottomHeaderEl = document.getElementById('bottom-header');

    if (packagesSection && bottomHeaderEl) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bottomHeaderEl.classList.add('visible');
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        bottomHeaderEl.classList.remove('visible');
                    }
                }
            });
        }, {
            threshold: 0.15
        });

        observer.observe(packagesSection);
    }

    console.log('%c[responsive.js] Parannettu mobiilituki + alaheader-logiikka aktivoitu', 'color:#4ade80');
});