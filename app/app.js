// app/app.js
// Entry point (thin) kept to avoid requiring changes to HTML script tags.
// This file dynamically imports the modularized code and runs main().
//
// We use a dynamic import so this file can still be included as a non-module
// script in HTML. Modern browsers support import() in scripts.

import { orchestrate } from './search.js';
import { setViewMode } from './view.js';

function main() {
  orchestrate();
  setViewMode('table');

  document.getElementById('show-table')
    .addEventListener('click', () => setViewMode('table'));

  document.getElementById('show-map')
    .addEventListener('click', () => setViewMode('map'));

  document.getElementById('show-both')
    .addEventListener('click', () => setViewMode('both'));
}


main();