/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Verleiht dem Zurück-Pfeil auf Begriffsseiten ein browserbasiertes Zurück-Verhalten.

Fallback:
- Wenn kein sinnvoller Verlauf vorhanden ist, bleibt der normale Link zur Startseite aktiv.
*/

document.addEventListener("DOMContentLoaded", () => {
    const backLink = document.querySelector("[data-back-link]");

    if (!backLink) {
        return;
    }

    // Mit Verlauf geht es wirklich zurück, ohne Verlauf greift einfach der normale Link zur Startseite.
    backLink.addEventListener("click", (event) => {
        if (document.referrer || window.history.length > 1) {
            event.preventDefault();
            window.history.back();
        }
    });
});
