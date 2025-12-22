// app/search.js
// Search form handling, datalist population and paginated API fetching.
//
// Exports:
// - main(): orchestrates initial UI setup and starts the first search request.
//
// Internal module-level variable `urlParams` mirrors original behavior so other
// functions can read parameters easily.

import { getApiDataV2 } from "./api.js";


/**
 * updateSearchParameters
 * Read window.location.search into a URLSearchParams object and populate
 * the search/filter form fields so the UI reflects query-string parameters.
 *
 * Returns: the URLSearchParams object.
 */
export function updateSearchParameters() {
  let urlParams = new URLSearchParams(window.location.search);

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


export function getSearchProjectsParams() {

  const urlParams = new URLSearchParams(window.location.search);

  const searchProjectsParams = {
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
  };

  return searchProjectsParams;
}
/**
 * presetNullFilters
 * Ensure certain <select> elements have a default value even if not present in URL.
 */
export function presetNullFilters() {

  const urlParams = new URLSearchParams(window.location.search);
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

