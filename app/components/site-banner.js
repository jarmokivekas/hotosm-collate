  
class SiteBanner extends HTMLElement {
    connectedCallback() {
        // Read attribute (default to "." if not provided)
        const base = this.getAttribute('base') || '.';

        this.innerHTML = `


        <div id="banner">
            <h1>Activation Overview</h1>

            <a href="${base}app/">COLLATE PROJECTS</a>
            <a href="${base}app/help.html">HELP</a>
            <a href="${base}app/about.html">ABOUT</a>
        </div>
        `;
    }
}

customElements.define('site-banner', SiteBanner);