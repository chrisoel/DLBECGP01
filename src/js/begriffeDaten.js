/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Lädt die zentrale Datei `src/begriffe.json`.
- Bereinigt und sortiert die Glossarbegriffe für Startseite und Suche.
- Stellt die Daten gebündelt über `window.glossarDaten` und `window.glossarDatenPromise` bereit.

Abhängigkeiten:
- `begriffe.json` muss per Webserver erreichbar sein.
- Die JSON darf nur Links im Format `begriffe/*.html` enthalten.
*/

// Lädt die zentrale JSON-Datei und ergänzt sie um die gemeinsamen Hilfsfunktionen.
const navigation = [
    "A", "Ä", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "Ö", "P", "Q", "R", "S", "T", "U", "Ü", "V", "W", "X", "Y",
    "Z", "0-9", "#"
];

const glossarCollator = new Intl.Collator("de-DE", {
    sensitivity: "base",
    numeric: true
});

const gruppenReihenfolge = new Map(
    navigation.map((gruppe, index) => [gruppe, index])
);

const datenUrl = new URL("../begriffe.json", document.currentScript.src);
const begriffLinkPattern = /^begriffe\/[^/?#]+\.html$/u;

// Ordnet einen Begriff anhand seines Anfangszeichens einer sichtbaren Navigationsgruppe zu.
function getGlossarGruppe(name) {
    const initial = name.trim().charAt(0).toLocaleUpperCase("de-DE");

    if (!initial) {
        return "#";
    }

    if (/\d/.test(initial)) {
        return "0-9";
    }

    if (["Ä", "Ö", "Ü"].includes(initial)) {
        return initial;
    }

    if (/[A-Z]/.test(initial)) {
        return initial;
    }

    return "#";
}

// Liefert eine stabile ID für Sprungmarken und Filtergruppen auf der Startseite.
function getGlossarGruppenId(gruppe) {
    const gruppenIds = {
        "Ä": "gruppe-ae",
        "Ö": "gruppe-oe",
        "Ü": "gruppe-ue",
        "0-9": "gruppe-0-9",
        "#": "gruppe-sonderzeichen"
    };

    return gruppenIds[gruppe] || `gruppe-${gruppe.toLowerCase()}`;
}

// Sortiert zuerst nach definierter Gruppierung und innerhalb der Gruppe nach deutscher Alphabetisierung.
function sortiereBegriffe(begriffListe) {
    return [...begriffListe].sort((erstesElement, zweitesElement) => {
        const ersteGruppe = getGlossarGruppe(erstesElement.name);
        const zweiteGruppe = getGlossarGruppe(zweitesElement.name);
        const ersterIndex = gruppenReihenfolge.get(ersteGruppe) ?? navigation.length;
        const zweiterIndex = gruppenReihenfolge.get(zweiteGruppe) ?? navigation.length;

        if (ersterIndex !== zweiterIndex) {
            return ersterIndex - zweiterIndex;
        }

        return glossarCollator.compare(erstesElement.name, zweitesElement.name);
    });
}

// Schützt die Anwendung davor, beliebige oder externe Links aus der JSON zu übernehmen.
function istGueltigerBegriffLink(link) {
    return begriffLinkPattern.test(link);
}

// Aus der JSON werden nur vollständige Einträge übernommen, damit Suche und Startseite stabil bleiben.
function normalisiereBegriffe(begriffListe) {
    const bereinigteBegriffe = [];
    let verworfeneEintraege = 0;

    begriffListe.forEach((begriff) => {
        if (
            !begriff
            || typeof begriff.name !== "string"
            || typeof begriff.link !== "string"
        ) {
            verworfeneEintraege += 1;
            return;
        }

        const name = begriff.name.trim();
        const link = begriff.link.trim();

        if (!name || !istGueltigerBegriffLink(link)) {
            verworfeneEintraege += 1;
            return;
        }

        bereinigteBegriffe.push({
            name,
            link,
            beschreibung: typeof begriff.beschreibung === "string"
                ? begriff.beschreibung.trim()
                : ""
        });
    });

    if (verworfeneEintraege > 0) {
        console.warn(
            `${verworfeneEintraege} Glossareintrag/Glossareinträge wurden verworfen, weil Pflichtfelder fehlten oder der Link nicht dem Muster "begriffe/*.html" entsprach.`
        );
    }

    return bereinigteBegriffe;
}

// Bündelt die Rohdaten mit allen Hilfsfunktionen in einem Objekt für die übrigen Skripte.
function erstelleGlossarDaten(begriffListe, ladefehler = false) {
    return {
        navigation,
        begriffe: sortiereBegriffe(normalisiereBegriffe(begriffListe)),
        getGruppe: getGlossarGruppe,
        getGruppenId: getGlossarGruppenId,
        sortiereBegriffe,
        ladefehler
    };
}

// Lädt die Glossarbegriffe einmalig und erstellt daraus das gemeinsame Datenobjekt.
async function ladeGlossarDaten() {
    const response = await fetch(datenUrl);

    if (!response.ok) {
        throw new Error(`Glossardaten konnten nicht geladen werden: ${response.status}`);
    }

    const rohdaten = await response.json();
    const begriffe = Array.isArray(rohdaten.begriffe) ? rohdaten.begriffe : [];

    return erstelleGlossarDaten(begriffe);
}

// Andere Skripte warten auf dieses Promise, damit die JSON nur einmal geladen wird.
window.glossarDatenPromise = ladeGlossarDaten()
    .then((daten) => {
        window.glossarDaten = daten;
        return daten;
    })
    .catch((error) => {
        console.error("Fehler beim Laden der Glossardaten.", error);

        const fallbackDaten = erstelleGlossarDaten([], true);
        window.glossarDaten = fallbackDaten;
        return fallbackDaten;
    });
