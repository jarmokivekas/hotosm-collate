// app/api.js
// API access utilities for the HOT OSM Tasking Manager.
//
// Exports:
// - getApiDataV2(apiEndpoint, parameters, instance, v2ApiRoot)
//
// This module centralizes network access and response parsing so the rest of the
// app does not have to embed fetch details.

const TM_PRODUCTION_API_URL = 'https://tasking-manager-production-api.hotosm.org';
const TM_STAGING_API_URL = 'https://tasking-manager-staging-api.hotosm.org';
const TM_DEV_API_URL = 'https://tasking-manager-dev-api.hotosm.org';
const V2_API_ROOT = '/api/v2';

function getApiBaseUrl() {
  // Check if we're on localhost, and use the dev api if we are
  console.log(window.location.hostname)
  if (window.location.hostname === "localhost" || window.location.hostname === '127.0.0.1') {
    console.log("choosing dev api");
    return TM_STAGING_API_URL;
  } else {
    console.log("choosing production api");
    return TM_PRODUCTION_API_URL;
  }
}

console.log("setting TM_API_BASE")
const TM_API_BASE = getApiBaseUrl();

/**
 * getApiDataV2
 * Generic function to call Tasking Manager v2 endpoints.
 *
 * Parameters:
 * - apiEndpoint: string - name of the endpoint, e.g. "projects", "campaigns"
 * - parameters: object - query parameters to append to the request
 * - instance: string - base host for the API (defaults to production)
 * - v2ApiRoot: string - root path for the v2 API
 *
 * Returns: parsed JSON response
 */
export async function getApiDataV2(
  apiEndpoint,
  parameters = {},
  instance = TM_API_BASE,
  v2ApiRoot = V2_API_ROOT,
) {
  const url = new URL(instance + v2ApiRoot + "/" + apiEndpoint + "/");
  url.search = new URLSearchParams(parameters);

  // Keeping the console logging to preserve existing visibility during development
  console.log("fetching from API: " + url.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  // Let errors bubble (caller can catch). Parse JSON as before.
  return response.json();
}

/**
 * fetchProjectsDataPage
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
export async function* fetchProjectsDataPage(startPage = 1, searchProjectsParams) {
  let page = startPage;

  while (true) {
    searchProjectsParams.page = page;

    try {
      const singleProjectsDataPage = await getApiDataV2("projects", searchProjectsParams);
      yield singleProjectsDataPage;

      if (singleProjectsDataPage.pagination && singleProjectsDataPage.pagination.hasNext === true) {
        page = page + 1;
        // continue the loop to fetch the next page
        continue;
      }
      // No more pages - exit loop
      break;
    } catch (err) {
      console.error("fetchProjectsDataPage error", err);
      break;
    }
  }
}

