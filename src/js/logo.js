/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Baut die gemeinsame Topbar mit Logo und Suche auf.

Voraussetzung:
- Die HTML-Seite enthält ein Element `#site-topbar`.
- Über `data-base` wird das passende Pfadpräfix für Root- und Unterordnerseiten gesetzt.
*/

document.addEventListener("DOMContentLoaded", () => {
    const topbarHost = document.getElementById("site-topbar");

    if (!topbarHost) {
        return;
    }

    const basePath = topbarHost.dataset.base || "";

    // Logo und Suche werden gemeinsam erzeugt, damit der obere Seitenbereich nur einmal gepflegt wird.
    topbarHost.classList.add("site-topbar");
    topbarHost.innerHTML = `
        <a class="site-logo" href="${basePath}index.html" aria-label="Zur Startseite">
            <img class="site-logo-image" src="${basePath}logo.png" alt="Log7-Consult">
        </a>
        <div class="search-box">
            <input type="text" id="search" placeholder="Begriff suchen..." autocomplete="off">
            <ul id="results"></ul>
        </div>
    `;
});
