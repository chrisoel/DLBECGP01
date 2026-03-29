/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Liest `document.lastModified` aus und schreibt den formatierten Wert in den Footer.

Voraussetzung:
- Der Footer wurde bereits aufgebaut und enthält ein Element mit `data-last-modified`.
*/

document.addEventListener("DOMContentLoaded", () => {
    const lastModified = new Date(document.lastModified);
    const lastModifiedElement = document.querySelector("[data-last-modified]");

    if (!lastModifiedElement || Number.isNaN(lastModified.getTime())) {
        return;
    }

    // Das Browser-/Serverdatum wird lokal formatiert und im gemeinsamen Footer angezeigt.
    const formatter = new Intl.DateTimeFormat("de-DE", {
        dateStyle: "long",
        timeStyle: "medium"
    });

    lastModifiedElement.textContent = `Letzte Speicherung: ${formatter.format(lastModified)}`;
});
