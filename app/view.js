

export function setViewMode(mode) {


    const layout = document.getElementById('app-layout');

    layout.classList.remove('mode-table', 'mode-map', 'mode-both');
    layout.classList.add(`mode-${mode}`);


    
}