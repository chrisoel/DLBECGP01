/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Erzeugt den gemeinsamen Footer zentral auf allen Seiten.

Voraussetzung:
- Die HTML-Seite enthält ein Element `#site-footer`.
- Über `data-base` wird gesteuert, ob die Seite im Root oder im Unterordner `begriffe/` liegt.
*/

document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("site-footer");

    if (!footer) {
        return;
    }

    const basePath = footer.dataset.base || "";

    // Der Footer wird zentral erzeugt, damit Links und Hinweise nur an einer Stelle gepflegt werden.
    footer.classList.add("page-footer");
    footer.innerHTML = `
        <p class="footer-links">
            <a href="${basePath}index.html">Startseite</a>
            <a href="${basePath}datenschutz.html">Datenschutz</a>
            <a href="${basePath}impressum.html">Impressum</a>
        </p>
        <p class="last-modified" data-last-modified></p>
        <p class="footer-copyright">&copy; 2026 Log7-Consult GmbH. Alle Rechte vorbehalten.</p>
    `;
});
