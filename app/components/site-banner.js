  
class SiteBanner extends HTMLElement {
    connectedCallback() {
        // Read attribute (default to "." if not provided)
        const base = this.getAttribute('base') || '.';

        this.innerHTML = `

        <div id="banner">
            <span>
                <img src="${base}app/icons/hot-logo-icon.svg" />
                <h1 class="hot-sitename">Collate</h1>
            </span>
            <nav>
                <a href="${base}app/">COLLATE PROJECTS</a>
                <a href="${base}app/help.html">HELP</a>
                <a href="${base}app/about.html">ABOUT</a>
            </nav>
            <span>
                <a target="#" href=https://github.com/jarmokivekas/hotosm-collate/><img src="${base}app/icons/github-mark.svg" /></a>
            </span>
        </div>
        `;
    }
}

customElements.define('site-banner', SiteBanner);