// app/table.js
// DOM table creation and data-to-DOM mapping.
// Exports addTableRows(searchResults, page)

/**
 * Responsibilities:
 * - Build the main results table rows from a page of project results.
 * - Apply color mapping and link construction for specific columns.
 *
 * This module imports constants and utility functions to keep logic small and testable.
 */

import { HOTOSM_COLORMAP, HOTOSM_TM_INSTANCE_URL } from "./constants.js";
import { formatDatetime } from "./utils.js";

/**
 * addTableRows
 * Create rows in the #dataframe-body element for each result in searchResults.
 *
 * Parameters:
 * - searchResults: array of project objects (from TM API)
 * - page: integer page number (kept for compatibility with prior signature)
 */
export function addTableRows(searchResults, page) {
  // The original set of columns that are rendered in the table.
  const columns = [
    "projectId",
    "name",
    "percentMapped",
    "percentValidated",
    "priority",
    "difficulty",
    "status",
    "organisationName",
    "lastUpdated",
    "dueDate",
  ];

  const tableBody = document.getElementById("dataframe-body");
  if (!tableBody) {
    console.warn("addTableRows: #dataframe-body not found in DOM");
    return;
  }

  for (const result of searchResults) {
    const tr = tableBody.insertRow();
    for (const column of columns) {
      const td = tr.insertCell();
      const fieldValue = result[column];

      // apply modifications and color maps to datafields
      switch (column) {
        case "percentMapped":
        case "percentValidated":
          // Use the percent value as an index into HOTOSM_COLORMAP (as previously)
          if (typeof fieldValue === "number" && HOTOSM_COLORMAP[fieldValue]) {
            td.style["background-color"] = HOTOSM_COLORMAP[fieldValue];
          }
          td.appendChild(document.createTextNode(fieldValue));
          break;

        case "projectId":
          const link = document.createElement("a");
          link.href = HOTOSM_TM_INSTANCE_URL + "/projects/" + fieldValue;
          const a = td.appendChild(link);
          a.appendChild(document.createTextNode("#" + fieldValue));
          break;

        case "lastUpdated":
        case "dueDate":
          if (fieldValue == null) {
            break;
          }
          let date = new Date(fieldValue);
          date = formatDatetime(date);
          td.appendChild(document.createTextNode(date));
          break;

        default:
          td.appendChild(document.createTextNode(fieldValue));
          break;
      }
    }
  }
}