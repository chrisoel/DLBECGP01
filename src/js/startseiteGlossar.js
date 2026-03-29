/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Rendert auf der Startseite die A-Z-Filterleiste und die tabellarische Glossarübersicht.
- Nutzt dafür die bereits geladenen JSON-Daten und die gemeinsame Vorlesefunktion.

Abhängigkeiten:
- `window.glossarDatenPromise` aus `begriffeDaten.js`
- `window.vorlesenHelfer` aus `vorlesen.js`
*/

document.addEventListener("DOMContentLoaded", async () => {
    const alphabetNavigation = document.getElementById("alphabet-nav");
    const glossaryTableBody = document.getElementById("glossary-table-body");

    if (!alphabetNavigation || !glossaryTableBody || !window.glossarDatenPromise || !window.vorlesenHelfer) {
        return;
    }

    const glossarDaten = await window.glossarDatenPromise;
    const { navigation, begriffe, getGruppe, getGruppenId, sortiereBegriffe } = glossarDaten;
    const sortierteBegriffe = sortiereBegriffe(begriffe);
    const aktiveGruppen = new Set(sortierteBegriffe.map((begriff) => getGruppe(begriff.name)));
    const ausgewaehlteGruppen = new Set();
    const { kannVorlesen, erstelleVorlesenButton } = window.vorlesenHelfer;

    // Zeigt Rückmeldungen direkt im Tabellenbereich an, ohne ein separates Hinweisfeld zu benötigen.
    function renderHinweis(text) {
        glossaryTableBody.innerHTML = "";

        const zeile = document.createElement("tr");
        const zelle = document.createElement("td");

        zelle.textContent = text;
        zeile.appendChild(zelle);
        glossaryTableBody.appendChild(zeile);
    }

    if (glossarDaten.ladefehler) {
        renderHinweis("Glossardaten konnten nicht geladen werden.");
        return;
    }

    // Baut die Tabelle jedes Mal neu auf, damit Mehrfachfilter konsistent angewendet werden.
    function renderTabelle() {
        const sichtbareBegriffe = sortierteBegriffe.filter((begriff) => {
            if (ausgewaehlteGruppen.size === 0) {
                return true;
            }

            return ausgewaehlteGruppen.has(getGruppe(begriff.name));
        });

        let aktuelleGruppe = "";
        glossaryTableBody.innerHTML = "";

        if (sichtbareBegriffe.length === 0) {
            renderHinweis("Keine Begriffe für die aktuelle Auswahl vorhanden.");
            return;
        }

        sichtbareBegriffe.forEach((begriff) => {
            const gruppe = getGruppe(begriff.name);

            if (gruppe !== aktuelleGruppe) {
                const gruppenZeile = document.createElement("tr");
                const gruppenZelle = document.createElement("th");

                gruppenZeile.id = getGruppenId(gruppe);
                gruppenZeile.className = "glossary-letter-row";
                gruppenZelle.colSpan = 1;
                gruppenZelle.textContent = gruppe;
                gruppenZeile.appendChild(gruppenZelle);
                glossaryTableBody.appendChild(gruppenZeile);

                aktuelleGruppe = gruppe;
            }

            // Jede Tabellenzeile enthält den Link zum Begriff und den Vorlese-Button.
            const zeile = document.createElement("tr");
            const begriffsZelle = document.createElement("th");
            const begriffsInhalt = document.createElement("div");
            const link = document.createElement("a");
            const vorlesenButton = erstelleVorlesenButton({
                text: begriff.name,
                ariaLabel: `${begriff.name} vorlesen`
            });

            begriffsZelle.scope = "row";
            begriffsInhalt.className = "glossary-entry";
            link.href = begriff.link;
            link.textContent = begriff.name;
            vorlesenButton.disabled = !kannVorlesen;

            begriffsInhalt.appendChild(link);
            begriffsInhalt.appendChild(vorlesenButton);
            begriffsZelle.appendChild(begriffsInhalt);

            zeile.appendChild(begriffsZelle);
            glossaryTableBody.appendChild(zeile);
        });
    }

    navigation.forEach((gruppe) => {
        const element = document.createElement(aktiveGruppen.has(gruppe) ? "button" : "span");

        element.textContent = gruppe;
        element.className = aktiveGruppen.has(gruppe) ? "alphabet-link" : "alphabet-label";

        if (aktiveGruppen.has(gruppe)) {
            element.type = "button";
            element.setAttribute("aria-pressed", "false");

            // Mehrfachauswahl bleibt aktiv, bis ein Buchstabe erneut angeklickt wird.
            element.addEventListener("click", () => {
                if (ausgewaehlteGruppen.has(gruppe)) {
                    ausgewaehlteGruppen.delete(gruppe);
                    element.classList.remove("is-active");
                    element.setAttribute("aria-pressed", "false");
                } else {
                    ausgewaehlteGruppen.add(gruppe);
                    element.classList.add("is-active");
                    element.setAttribute("aria-pressed", "true");
                }

                renderTabelle();
            });
        } else {
            element.setAttribute("aria-disabled", "true");
        }

        alphabetNavigation.appendChild(element);
    });

    renderTabelle();
});
