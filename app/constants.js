// app/constants.js
// Exports constants used across the application: color maps and service URLs.

/**
 * HOTOSM_COLORMAP:
 * Array mapping integer percentage values to color strings.
 * The array has 101 entries, one for each integer in range [0..100]
 */
export const HOTOSM_COLORMAP = [
  "#d73f3f","#d73f3f","#d73f3f","#d73f3f","#d73f3f","#da493b","#da493b","#da493b","#da493b","#da493b",
  "#de5438","#de5438","#de5438","#de5438","#de5438","#e25f34","#e25f34","#e25f34","#e25f34","#e25f34",
  "#e56a31","#e56a31","#e56a31","#e56a31","#e56a31","#e9752d","#e9752d","#e9752d","#e9752d","#e9752d",
  "#ed802a","#ed802a","#ed802a","#ed802a","#ed802a","#f08b26","#f08b26","#f08b26","#f08b26","#f08b26",
  "#f49623","#f49623","#f49623","#f49623","#f49623","#f8a11f","#f8a11f","#f8a11f","#f8a11f","#f8a11f",
  "#f1a721","#f1a721","#f1a721","#f1a721","#f1a721","#dfa828","#dfa828","#dfa828","#dfa828","#dfa828",
  "#cea82f","#cea82f","#cea82f","#cea82f","#cea82f","#bca937","#bca937","#bca937","#bca937","#bca937",
  "#aaaa3e","#aaaa3e","#aaaa3e","#aaaa3e","#aaaa3e","#99ab45","#99ab45","#99ab45","#99ab45","#99ab45",
  "#87ab4c","#87ab4c","#87ab4c","#87ab4c","#87ab4c","#76ac53","#76ac53","#76ac53","#76ac53","#76ac53",
  "#64ad5a","#64ad5a","#64ad5a","#64ad5a","#64ad5a","#53ae62","#53ae62","#53ae62","#53ae62","#53ae62",
  "#53ae62",
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