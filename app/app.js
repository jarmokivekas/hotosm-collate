// app/app.js
// Entry point (thin) kept to avoid requiring changes to HTML script tags.
// This file dynamically imports the modularized code and runs main().
//
// We use a dynamic import so this file can still be included as a non-module
// script in HTML. Modern browsers support import() in scripts.

import {
  initializeLeaflet,
  setViewMode,
  addProjectCentroids,
} from './view.js';

import {
  addTableRows,
} from './table.js'

import {
  populateDatalist,
  updateSearchParameters,
  presetNullFilters,
  getSearchProjectsParams,
} from './search.js';

import {
  fetchProjectsDataPage
} from './api.js'

const appState = {
    results: [],   // raw API results
    mapResults: {
        type: "FeatureCollection",
        features: [],
    },
};


async function main() {

  // tie callback functions to events in UI elements 
  document.getElementById('show-table')
    .addEventListener('click', () => setViewMode('table'));

  document.getElementById('show-map')
    .addEventListener('click', () => setViewMode('map'));

  document.getElementById('show-both')
    .addEventListener('click', () => setViewMode('both'));

  // Parallelize datalist population to speed startup
  // Here we call the  TM API to get the autocomletion options for each filter field
  await Promise.all([
    populateDatalist("campaignList", "campaigns"),
    populateDatalist("countryList", "countries"),
    populateDatalist("organisationNameList", "organisations"),
    populateDatalist("interestList", "interests"),
  ]);

  // we make sure that the content in the filter-card form matches the parameters in the GET url parameters
  updateSearchParameters();
  presetNullFilters();

  // set the tileset and view setting for the leaflet map
  initializeLeaflet()

  // Start fetching search results from page 1
 // Stream paginated results
  for await (const singleProjectsDataPage of fetchProjectsDataPage(1, getSearchProjectsParams())) {
    // 1. Update state
    console.log(singleProjectsDataPage)
    appState.results.push(...singleProjectsDataPage.results);
    appState.mapResults.features.push(...singleProjectsDataPage.mapResults.features);

    // 2. Render incrementally
    addTableRows(singleProjectsDataPage.results, singleProjectsDataPage.pagination.page);
    addProjectCentroids(singleProjectsDataPage.mapResults);
  }
}

main();