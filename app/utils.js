// app/utils.js
// Small utility helpers used across modules (date formatting etc.)

/**
 * formatDatetime
 * Convert a Date object into a human-readable UTC timestamp used in table cells.
 * Keeps the same output format as original code: "YYYY-MM-DD hh:mm UTC"
 *
 * Example: 2020-04-01 08:30 UTC
 */
export function formatDatetime(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    ("0" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getUTCDate()).slice(-2) +
    " " +
    ("0" + date.getUTCHours()).slice(-2) +
    ":" +
    ("0" + date.getUTCMinutes()).slice(-2) +
    " UTC"
  );
}