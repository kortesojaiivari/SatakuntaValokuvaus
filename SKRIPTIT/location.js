// SatakuntaValokuvaus/SKRIPTIT/location.js
// Paikkakunnan valinta + hintojen päivitys

let currentCity = 'Harjavalta';

// Kaupungit aakkosjärjestyksessä
const cities = [
    'Harjavalta', 'Kankaanpää', 'Pori', 'Rauma', 'Ulvila',
    'Eura', 'Eurajoki', 'Honkajoki', 'Huittinen', 'Isojoki',
    'Jämijärvi', 'Kauhajoki', 'Kaustinen', 'Kokemäki', 'Kristiinankaupunki',
    'Kullaa', 'Lappi', 'Lavia', 'Länsi-Turunmaa', 'Merikarvia',
    'Nakkila', 'Noormarkku', 'Pomarkku', 'Siikainen', 'Sastamala',
    'Vammala', 'Vesilahti', 'Ylistaro'
];

function getCurrentCity() {
    return currentCity;
}

function getDistanceFromHarjavalta(city) {
    const distances = {
        'Harjavalta': 0,
        'Kankaanpää': 45,
        'Pori': 35,
        'Rauma': 55,
        'Ulvila': 25,
        'Eura': 30,
        'Eurajoki': 40,
        'Honkajoki': 60,
        'Huittinen': 50,
        'Isojoki': 75,
        'Jämijärvi': 55,
        'Kauhajoki': 80,
        'Kaustinen': 95,
        'Kokemäki': 20,
        'Kristiinankaupunki': 85,
        'Kullaa': 15,
        'Lappi': 70,
        'Lavia': 65,
        'Länsi-Turunmaa': 110,
        'Merikarvia': 50,
        'Nakkila': 18,
        'Noormarkku': 42,
        'Pomarkku': 48,
        'Siikainen': 58,
        'Sastamala': 45,
        'Vammala': 52,
        'Vesilahti': 78,
        'Ylistaro': 88
    };
    return distances[city] || 60;
}

function updatePricesForCity(city) {
    currentCity = city;

    const distance = getDistanceFromHarjavalta(city);
    const travelCost = Math.round(distance * 0.65 * 2);

    const priceElements = {
        'price-h1': 800,
        'price-h2': 1300,
        'price-h3': 300,
        'price-f1': 300,
        'price-f2': 600
    };

    Object.keys(priceElements).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const basePrice = priceElements[id];
            const finalPrice = basePrice + travelCost;
            el.textContent = finalPrice + ' €';
        }
    });

    const bottomLocationText = document.getElementById('bottom-location-text');
    if (bottomLocationText) {
        bottomLocationText.innerHTML = `Kuvauspaikka: <strong>${city}</strong>`;
    }

    const selectBtn = document.getElementById('select-location-btn');
    if (selectBtn) {
        selectBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" style="vertical-align: middle; margin-right: 0.4rem;">
                <path d="M12 21.5C12 21.5 20 14 20 9C20 5.13401 16.866 2 13 2C9.13401 2 6 5.13401 6 9C6 14 12 21.5 12 21.5Z" fill="currentColor"/>
                <circle cx="12" cy="9" r="3" fill="#ffffff"/>
            </svg>
            ${city}
        `;
    }
}

function createCityButtons(container) {
    container.innerHTML = '';

    cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'city-btn';
        btn.textContent = city;

        if (city === currentCity) {
            btn.classList.add('clicked');
            btn.style.border = '2px solid #d4af37';
            btn.style.background = '#fff8e1';
        }

        btn.addEventListener('click', () => {
            container.querySelectorAll('.city-btn').forEach(b => {
                b.classList.remove('clicked');
                b.style.border = '';
                b.style.background = '';
            });

            btn.classList.add('clicked');
            btn.style.border = '2px solid #d4af37';
            btn.style.background = '#fff8e1';

            setTimeout(() => {
                updatePricesForCity(city);
                closeModal();
            }, 180);
        });

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
        cityList.style.cssText = 'display:grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 0.55rem; margin-bottom: 1.4rem;';

        const closeBtn = modal.querySelector('button[onclick*="closeModal"]');
        if (closeBtn && closeBtn.parentNode) {
            closeBtn.parentNode.insertBefore(cityList, closeBtn);
        } else {
            modal.querySelector('.modal-content').appendChild(cityList);
        }
    }

    createCityButtons(cityList);

    // Ei enää automaattista skrollausta hinnastoon
    modal.style.display = 'flex';
};

window.closeModal = function() {
    const modal = document.getElementById('location-modal');
    if (modal) modal.style.display = 'none';
};