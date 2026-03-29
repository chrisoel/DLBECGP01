/*
Autor: Christopher Oelschläger
Erstelldatum: 29.03.2026
Änderungshistorie:
- Version 1.0: Initiale Version
*/

/*
Zweck:
- Stellt die gemeinsame Vorlesefunktion auf Basis der Browser-Sprachausgabe bereit.
- Ergänzt Vorlese-Buttons auf der Startseite und auf den Begriffsseiten.

Bereitgestellte Schnittstelle:
- `window.vorlesenHelfer.kannVorlesen`
- `window.vorlesenHelfer.liesVor(text)`
- `window.vorlesenHelfer.erstelleVorlesenButton(optionen)`
*/

(function() {
    const kannVorlesen = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

    // Entfernt unnötige Zeilenumbrüche, damit die Sprachausgabe natürlicher klingt.
    function bereinigeText(text) {
        return text.replace(/\s+/g, " ").trim();
    }

    // Vor jeder neuen Ausgabe wird die laufende Sprachausgabe gestoppt.
    function liesVor(text) {
        if (!kannVorlesen) {
            return;
        }

        window.speechSynthesis.cancel();

        const ausgabe = new SpeechSynthesisUtterance(bereinigeText(text));
        ausgabe.lang = "de-DE";
        ausgabe.rate = 0.95;

        window.speechSynthesis.speak(ausgabe);
    }

    // Der Button-Aufbau ist zentralisiert, damit Startseite und Begriffsseiten identisch bleiben.
    function erstelleVorlesenButton(optionen) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = optionen.className || "read-aloud-button";
        button.innerHTML = "&#128266;";
        button.setAttribute("aria-label", optionen.ariaLabel);
        button.title = optionen.title || optionen.ariaLabel;
        button.disabled = !kannVorlesen;

        button.addEventListener("click", () => {
            liesVor(optionen.text);
        });

        return button;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const titleGroup = document.querySelector(".title-group");
        const title = titleGroup ? titleGroup.querySelector("h1") : null;
        const begriffName = title ? bereinigeText(title.textContent) : "";

        // Auf Begriffsseiten wird der Seitentitel separat vorlesbar gemacht.
        if (titleGroup && title && !titleGroup.querySelector(".title-read-button")) {
            title.insertAdjacentElement("afterend", erstelleVorlesenButton({
                text: begriffName,
                ariaLabel: `${begriffName} vorlesen`,
                className: "read-aloud-button title-read-button"
            }));
        }

        document.querySelectorAll(".highlight").forEach((definition) => {
            const definitionText = bereinigeText(definition.textContent);
            const definitionHeading = definition.previousElementSibling;

            // Der Definitions-Button sitzt an der H2, damit die Aktion sofort erkennbar bleibt.
            if (definitionHeading && definitionHeading.matches("h2")) {
                if (definitionHeading.querySelector(".definition-read-button")) {
                    return;
                }

                definitionHeading.classList.add("definition-heading");
                definitionHeading.appendChild(erstelleVorlesenButton({
                    text: `Definition von ${begriffName}. ${definitionText}`,
                    ariaLabel: `Definition von ${begriffName} vorlesen`,
                    className: "read-aloud-button definition-read-button"
                }));
            }
        });
    });

    // Diese globale Hilfsschnittstelle wird von `startseiteGlossar.js` wiederverwendet.
    window.vorlesenHelfer = {
        kannVorlesen,
        liesVor,
        erstelleVorlesenButton
    };
})();
