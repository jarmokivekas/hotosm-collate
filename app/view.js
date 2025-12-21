

var map = L.map('dataframe-map')
    

export function setViewMode(mode) {
    const layout = document.getElementById('app-layout');

    layout.classList.remove('mode-table', 'mode-map', 'mode-both');
    layout.classList.add(`mode-${mode}`);
    map.invalidateSize();
}

export function initializeLeaflet() {
    
    map.setView([51.505, -0.09], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
}



