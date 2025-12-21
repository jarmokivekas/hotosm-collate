// app/search.js
// Search form handling, datalist population and paginated API fetching.
//
// Exports:
// - main(): orchestrates initial UI setup and starts the first search request.
//
// Internal module-level variable `urlParams` mirrors original behavior so other
// functions can read parameters easily.

import { getApiDataV2 } from "./api.js";
import { tableCreate } from "./table.js";

/**
 * Module-level URLSearchParams object used to read query parameters.
 * Assigned in updateSearchParameters() during main() initialization.
 */
let urlParams = new URLSearchParams(window.location.search);

/**
 * updateSearchParameters
 * Read window.location.search into a URLSearchParams object and populate
 * the search/filter form fields so the UI reflects query-string parameters.
 *
 * Returns: the URLSearchParams object.
 */
export function updateSearchParameters() {
  urlParams = new URLSearchParams(window.location.search);

  const formInputs = [
    "textSearch",
    "country",
    "campaign",
    "interest",
    "organisationName",
    "orderBy",
    "orderByType",
    "projectStatuses",
  ];

  for (const formInput of formInputs) {
    const el = document.getElementById(formInput);
    if (el) {
      el.value = urlParams.get(formInput) || "";
    }
  }

  return urlParams;
}

/**
 * presetNullFilters
 * Ensure certain <select> elements have a default value even if not present in URL.
 */
export function presetNullFilters() {
  const selectIds = ["projectStatuses", "orderBy", "orderByType"];

  for (const selectId of selectIds) {
    const select = document.getElementById(selectId);
    if (!select) continue;

    const value = urlParams.get(selectId);
    if (!value) {
      const defaultValue = select.firstElementChild ? select.firstElementChild.value : "";
      select.value = defaultValue;
    }
  }
}

/**
 * populateDatalist
 * Populate a <datalist> element with values fetched from the TM API.
 *
 * - datalistId: id of a datalist element in the DOM
 * - apiEndpoint: endpoint to call (campaigns, organisations, interests, countries)
 */
export async function populateDatalist(datalistId, apiEndpoint) {
  try {
    const response = await getApiDataV2(apiEndpoint);

    let optionValues = [];
    switch (apiEndpoint) {
      case "campaigns":
        optionValues = (response.campaigns || []).map((a) => a.name);
        break;
      case "organisations":
        optionValues = (response.organisations || []).map((a) => a.name);
        break;
      case "interests":
        optionValues = (response.interests || []).map((a) => a.name);
        break;
      case "countries":
        optionValues = response.tags || [];
        break;
      default:
        return;
    }

    const datalist = document.getElementById(datalistId);
    if (!datalist) return;

    // Append options, preserving any existing ones (same behavior as original).
    for (const optionValue of optionValues) {
      const option = document.createElement("option");
      option.value = optionValue;
      datalist.appendChild(option);
    }
  } catch (err) {
    console.error("populateDatalist error", err);
  }
}

/**
 * getSearchResults
 * Fetch paginated project search results from the API and render them in the table.
 *
 * Uses the module-level urlParams for building the API call parameters.
 *
 * This implementation fetches pages iteratively to reproduce original behavior
 * (original used repeated calls if pagination.hasNext is true).
 *
 * Parameters:
 * - startPage: integer page number to start from (1-based)
 */
export async function getSearchResults(startPage = 1) {
  let page = startPage;

  while (true) {
    const apiCallParams = {
      textSearch: urlParams.get("textSearch"),
      campaign: urlParams.get("campaign"),
      country: urlParams.get("country"),
      interest: urlParams.get("interest"),
      organisationName: urlParams.get("organisationName"),
      projectStatuses: urlParams.get("projectStatuses")
        ? urlParams.get("projectStatuses")
        : "ARCHIVED,PUBLISHED,DRAFT",
      orderBy: urlParams.get("orderBy") ? urlParams.get("orderBy") : "id",
      orderByType: urlParams.get("orderByType") ? urlParams.get("orderByType") : "ASC",
      page: page,
    };

    try {
      const singlePageData = await getApiDataV2("projects", apiCallParams);

      const searchResults = singlePageData.results || [];
      tableCreate(searchResults, page);

      if (singlePageData.pagination && singlePageData.pagination.hasNext === true) {
        page = page + 1;
        // continue the loop to fetch the next page
        continue;
      }
      // No more pages - exit loop
      break;
    } catch (err) {
      console.error("getSearchResults error", err);
      break;
    }
  }
}

/**
 * orchestrate
 * Orchestrate initial population of datalists and start the first search.
 * This mirrors the original main() function in behavior and order.
 */
export async function orchestrate() {
  // Parallelize datalist population to speed startup
  await Promise.all([
    populateDatalist("campaignList", "campaigns"),
    populateDatalist("countryList", "countries"),
    populateDatalist("organisationNameList", "organisations"),
    populateDatalist("interestList", "interests"),
  ]);

  updateSearchParameters();
  presetNullFilters();

  // Start fetching search results from page 1
  await getSearchResults(1);

  // Retain the commented DataTable initialization placeholder
  // let table = new DataTable('#dataframe-table');
}