


var map = L.map('dataframe-map')

export function setViewMode(mode) {

    const layout = document.getElementById('app-layout');

    layout.classList.remove('mode-table', 'mode-map', 'mode-both');
    layout.classList.add(`mode-${mode}`);
    
    
    map.invalidateSize();
}

export function addProjectCentroids(centroids) {
    L.geoJSON(centroids, {
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                // Example: show a property as popup
                const popupContent = `
                    <strong>ID:</strong> #${feature.properties.projectId}
                `;
                layer.bindPopup(popupContent).openPopup();
            }
        }
    }).addTo(map);
    return;
}

export function initializeLeaflet() {
    
    map.setView([30.0, 20], 3);
    
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors. Tiles courtesy of <a href="https://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>'
    }).addTo(map);

}



