// app/app.js
// Entry point (thin) kept to avoid requiring changes to HTML script tags.
// This file dynamically imports the modularized code and runs main().
//
// We use a dynamic import so this file can still be included as a non-module
// script in HTML. Modern browsers support import() in scripts.

(async () => {
  try {
    const searchModule = await import("./search.js");
    if (searchModule && typeof searchModule.main === "function") {
      searchModule.main();
    } else {
      console.error("search.main not found after dynamic import");
    }
  } catch (err) {
    console.error("Failed to initialize application:", err);
  }
})();