/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Verknüpft das Suchfeld in der Topbar mit den Glossarbegriffen aus der JSON.
- Erstellt die Trefferliste live während der Eingabe.

Abhängigkeit:
- `window.glossarDatenPromise` aus `begriffeDaten.js`
*/

const appBaseUrl = new URL("../", document.currentScript.src);

// Wandelt relative Pfade so um, dass Suche im Root und im Begriffsordner gleich funktioniert.
function resolveAppPath(path) {
    return new URL(path, appBaseUrl).toString();
}

document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("search");
    const resultsList = document.getElementById("results");

    if (!searchInput || !resultsList || !window.glossarDatenPromise) {
        return;
    }

    // Blendet einen sichtbaren Fehlerhinweis direkt unter dem Suchfeld ein.
    function zeigeSucheFehler(text) {
        const searchBox = searchInput.closest(".search-box");

        if (!searchBox) {
            return;
        }

        let fehlerHinweis = searchBox.querySelector(".search-error");

        if (!fehlerHinweis) {
            fehlerHinweis = document.createElement("p");
            fehlerHinweis.className = "search-error";
            fehlerHinweis.setAttribute("role", "alert");
            searchBox.appendChild(fehlerHinweis);
        }

        fehlerHinweis.textContent = text;
    }

    // Die Suche wartet auf die JSON-Daten, damit Begriffe nur an einer Stelle gepflegt werden.
    const glossarDaten = await window.glossarDatenPromise;
    const begriffe = glossarDaten.begriffe;

    if (glossarDaten.ladefehler) {
        searchInput.disabled = true;
        searchInput.placeholder = "Suche derzeit nicht verfügbar";
        zeigeSucheFehler("Glossardaten konnten nicht geladen werden.");
        return;
    }

    // Gefiltert wird nur live nach dem sichtbaren Begriffsnamen.
    searchInput.addEventListener("input", function() {
        const query = this.value.trim().toLocaleLowerCase("de-DE");
        resultsList.innerHTML = "";

        if (query.length === 0) {
            return;
        }

        const filtered = begriffe.filter((begriff) =>
            begriff.name.toLocaleLowerCase("de-DE").includes(query)
        );

        // Treffer werden als normale Links aufgebaut, damit Besuchszustände per CSS sichtbar bleiben.
        filtered.forEach((begriff) => {
            const li = document.createElement("li");
            const link = document.createElement("a");

            link.href = resolveAppPath(begriff.link);
            link.textContent = begriff.name;
            li.appendChild(link);
            resultsList.appendChild(li);
        });
    });
});
