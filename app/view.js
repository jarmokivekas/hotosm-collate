

export function setViewMode(mode) {

    if (mode == 'map') {
        document.getElementById("dataframe-container").style.display = "none";
        document.getElementById("dataframe-map").style.display = "block";
    }
    else if (mode == 'table') {
        document.getElementById("dataframe-container").style.display = "block";
        document.getElementById("dataframe-map").style.display = "none";
    }
    else if (mode == 'both') {
        document.getElementById("dataframe-container").style.display = "block";
        document.getElementById("dataframe-map").style.display = "block";
    }
}