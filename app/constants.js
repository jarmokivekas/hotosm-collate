// app/constants.js
// Exports constants used across the application: color maps and service URLs.

/**
 * HOTOSM_COLORMAP:
 * Array mapping integer percentage values to color strings.
 * Kept as an array to preserve the original coloring logic.
 */
export const HOTOSM_COLORMAP = [
  "#d73f3f","#d73f3f","#d73f3f","#d73f3f","#d73f3f","#da493b","#da493b","#da493b","#da493b","#da493b",
  "#de5438","#de5438","#de5438","#de5438","#de5438","#e25f34","#e25f34","#e25f34","#e25f34","#e25f34",
  "#e86a30","#e86a30","#e86a30","#e86a30","#e86a30","#ee7530","#ee7530","#ee7530","#ee7530","#ee7530",
  "#f3852f","#f3852f","#f3852f","#f3852f","#f3852f","#f7922f","#f7922f","#f7922f","#f7922f","#f7922f",
  "#fb9f31","#fb9f31","#fb9f31","#fb9f31","#fb9f31","#ffb93a","#ffb93a","#ffb93a","#ffb93a","#ffb93a",
  "#ffd64d","#ffd64d","#ffd64d","#ffd64d","#ffd64d","#f4e16f","#f4e16f","#f4e16f","#f4e16f","#f4e16f",
  "#d7e57e","#d7e57e","#d7e57e","#d7e57e","#d7e57e","#b7dd85","#b7dd85","#b7dd85","#b7dd85","#b7dd85",
  "#99d98b","#99d98b","#99d98b","#99d98b","#99d98b","#78d48e","#78d48e","#78d48e","#78d48e","#78d48e",
  "#53ae62","#53ae62","#53ae62","#53ae62","#53ae62"
];

/**
 * HOTOSM_COLORS: named palette used in the UI
 */
export const HOTOSM_COLORS = {
  red: "#D73F3F",
  red_dark: "#6C2020",
  red_light: "#FFEDED",
  orange: "#FAA71E",
  tan: "#F0EFEF",
  blue_dark: "#2C3038",
  blue_grey: "#68707F",
  blue_light: "#929DB3",
  grey_light: "#E1E0E0",
  green: "#53AE62"
};

/**
 * Default Tasking Manager instance base URL used to build project links.
 */
export const HOTOSM_TM_INSTANCE_URL = "https://tasks.hotosm.org";