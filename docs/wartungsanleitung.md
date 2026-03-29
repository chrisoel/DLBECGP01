# Wartungsanleitung

Diese Anleitung ist für Mitarbeitende gedacht, die Inhalte pflegen möchten, ohne tief in HTML, CSS oder JavaScript einzusteigen.

Das Wichtigste vorab:

- Für neue oder geänderte Begriffe müssen in der Regel nur zwei Stellen bearbeitet werden.
- Sie müssen normalerweise **kein** JavaScript und **kein** CSS ändern.
- Arbeiten Sie langsam und speichern Sie nach jedem Schritt.

## Was Sie für die Pflege brauchen

- Einen Texteditor, zum Beispiel Notepad.
- Zugriff auf den Projektordner.
- Etwas Sorgfalt beim Schreiben von Dateinamen.

## Welche Dateien wichtig sind

Für die Inhaltspflege sind fast immer nur diese Dateien wichtig:

- `src/begriffe/_vorlage.html`
- `src/begriffe.json`
- die einzelne Begriffsdatei im Ordner `src/begriffe/`, zum Beispiel `src/begriffe/testfall.html`

Diese Dateien sollten Sie für normale Inhaltspflege **nicht** ändern:

- `src/js/*.js`
- `src/style.css`

## Wann Sie was bearbeiten müssen

Wenn Sie nur den Text eines vorhandenen Begriffs ändern wollen:

1. Öffnen Sie die passende HTML-Datei im Ordner `src/begriffe/`.
2. Passen Sie den Text an.
3. Speichern Sie die Datei.
4. Wenn sich auch der Name des Begriffs geändert hat, passen Sie zusätzlich den Eintrag in `src/begriffe.json` an.

Wenn Sie einen komplett neuen Begriff anlegen wollen:

1. Erstellen Sie eine neue HTML-Datei auf Basis der Vorlage.
2. Tragen Sie den neuen Begriff in `src/begriffe.json` ein.
3. Prüfen Sie im Browser, ob der Begriff auf der Startseite und in der Suche erscheint.

## Neuer Begriff: Schritt für Schritt

### Schritt 1: Vorlage kopieren

Öffnen Sie die Datei `src/begriffe/_vorlage.html`.

Erstellen Sie davon eine Kopie im selben Ordner `src/begriffe/`.

Vergeben Sie für die neue Datei einen **einfachen Dateinamen**:

- nur Kleinbuchstaben
- keine Leerzeichen
- keine Sonderzeichen
- Umlaute umschreiben: `ae`, `oe`, `ue`
- `ss` statt `ß`

Gute Beispiele:

- `regressionstest.html`
- `teststrategie.html`
- `ueberwachung.html`

Schlechte Beispiele:

- `Regressionstest Neu.html`
- `Teststrategie!.html`
- `Überwachung.html`

## Schritt 2: Neue HTML-Datei inhaltlich füllen

Öffnen Sie Ihre neue Datei, zum Beispiel `src/begriffe/regressionstest.html`.

Suchen Sie in der Datei nach dem Platzhalter `Neuer Begriff` und ersetzen Sie ihn durch Ihren echten Begriff.

Arbeiten Sie diese Stellen der Reihe nach durch:

1. Im `<title>` ganz oben.
2. In der großen Überschrift `<h1>`.
3. Im Abschnitt `Definition`.
4. Im Abschnitt `Weitere Informationen`.

In der Datei müssen Sie vor allem diesen Bereich anpassen:

```html
<title>Neuer Begriff - Glossar</title>
...
<h1>Neuer Begriff</h1>
...
<h2>Definition</h2>
<p class="highlight">
    Hier steht die Definition des neuen Begriffs.
</p>
...
<h2>Weitere Informationen</h2>
<p>
    Quelle oder weiterführende Informationen hier ergänzen.
</p>
```

## Schritt 3: Interne Verlinkung setzen

Jede Begriffsseite sollte mindestens auf einen anderen Glossarbegriff verweisen. Dadurch können Nutzer zwischen passenden Begriffen springen.

Ein interner Link sieht so aus:

```html
<a href="testfall.html">Testfall</a>
```

Wichtig:

- Auf einer Begriffsseite im Ordner `src/begriffe/` wird **ohne** `../` verlinkt.
- Der Dateiname im Link muss genau stimmen.

Beispiel:

```html
<p class="highlight">
    Ein Regressionstest prüft, ob bestehende Funktionen nach Änderungen weiterhin korrekt
    arbeiten. Er wird oft als <a href="testfall.html">Testfall</a> beschrieben oder geplant.
</p>
```

## Schritt 4: Externe Quelle eintragen

Im Abschnitt `Weitere Informationen` sollte eine externe Fachquelle stehen.

Beispiel:

```html
<p>
    Weiterführende Quelle:
    <a href="https://example.org">
        Externe Fachquelle
    </a>
</p>
```

Wenn Sie keine gute externe Quelle haben, lassen Sie den Abschnitt trotzdem nicht leer. Tragen Sie dann wenigstens einen kurzen Hinweis ein, dass die Quelle später nachgetragen werden muss.

## Schritt 5: Begriff in `src/begriffe.json` eintragen

Öffnen Sie `src/begriffe.json`.

Dort gibt es eine Liste mit allen Begriffen unter `begriffe`.

Für jeden neuen Begriff kommt dort **ein neuer Block** hinein.

Ein Eintrag sieht so aus:

```json
{
    "name": "Regressionstest",
    "link": "begriffe/regressionstest.html",
    "beschreibung": "Test zur Prüfung, ob bestehende Funktionen nach einer Änderung weiterhin korrekt arbeiten."
}
```

Wichtig:

- `name` ist der sichtbare Begriff.
- `link` ist der Pfad zur HTML-Datei.
- `beschreibung` sollte gepflegt werden, auch wenn sie aktuell nicht an allen Stellen sichtbar ist.

## Schritt 6: Kommas in der JSON-Datei richtig setzen

Das ist die häufigste Fehlerquelle.

In `src/begriffe.json` gilt:

- Zwischen zwei Einträgen steht ein Komma.
- Nach dem **letzten** Eintrag steht **kein** Komma.

Richtig:

```json
"begriffe": [
    {
        "name": "Testfall",
        "link": "begriffe/testfall.html",
        "beschreibung": "Beschreibung ..."
    },
    {
        "name": "Regressionstest",
        "link": "begriffe/regressionstest.html",
        "beschreibung": "Beschreibung ..."
    }
]
```

Falsch:

```json
"begriffe": [
    {
        "name": "Testfall",
        "link": "begriffe/testfall.html",
        "beschreibung": "Beschreibung ..."
    },
    {
        "name": "Regressionstest",
        "link": "begriffe/regressionstest.html",
        "beschreibung": "Beschreibung ..."
    },
]
```

## Schritt 7: Alles speichern

Speichern Sie immer beide Dateien:

- die neue Begriffsseite in `src/begriffe/`
- `src/begriffe.json`

Wenn nur eine von beiden gespeichert ist, erscheint der Begriff später entweder nicht oder führt ins Leere.

## Schritt 8: Im Browser prüfen

Wichtig:

Die Startseite sollte **nicht nur per Doppelklick** direkt als Datei geöffnet werden, weil die Glossardaten aus `begriffe.json` geladen werden. Die Seite braucht dafür einen Webserver.

Die einfachste Prüfung ist:

1. Stellen Sie sicher, dass das Projekt wie üblich über die vorhandene Firmen- oder Entwicklungsumgebung gestartet wird.
2. Öffnen Sie dann `src/index.html` über diese Umgebung im Browser.
3. Suchen Sie auf der Startseite nach Ihrem neuen Begriff.
4. Klicken Sie den Begriff an.
5. Prüfen Sie, ob die neue Seite korrekt geladen wird.

Wenn im Team Visual Studio Code mit der Erweiterung `Live Server` verwendet wird, ist der Ablauf oft:

1. Öffnen Sie das Projekt in Visual Studio Code.
2. Öffnen Sie `src/index.html`.
3. Machen Sie einen Rechtsklick in die Datei.
4. Wählen Sie `Open with Live Server` aus.

Wenn diese Option bei Ihnen nicht vorhanden ist, fragen Sie die zuständige Person im Team. Für die Inhaltspflege selbst müssen Sie **keinen Code** anpassen.

## Checkliste nach jeder Änderung

Prüfen Sie diese Punkte nacheinander:

1. Die neue HTML-Datei liegt im Ordner `src/begriffe/`.
2. Der Dateiname ist einfach und ohne Leerzeichen geschrieben.
3. Der Begriff steht in `src/begriffe.json`.
4. Der `link` in der JSON-Datei zeigt auf die richtige Datei.
5. Die Startseite zeigt den neuen Begriff an.
6. Die Suche findet den Begriff.
7. Die neue Seite lässt sich öffnen.
8. Auf der neuen Seite gibt es mindestens einen internen Link.
9. Auf der neuen Seite gibt es einen Abschnitt `Weitere Informationen`.
10. Im Footer sind weiterhin die Links und die letzte Speicherung sichtbar.

## Bestehenden Begriff umbenennen

Wenn sich nur der Name ändert, zum Beispiel von `Alte Bezeichnung` auf `Neue Bezeichnung`, dann müssen mindestens diese Stellen angepasst werden:

1. In der passenden HTML-Datei den `<title>` anpassen.
2. In der passenden HTML-Datei die `<h1>`-Überschrift anpassen.
3. In der passenden HTML-Datei bei Bedarf den Definitionstext anpassen.
4. In `src/begriffe.json` den Wert bei `name` anpassen.
5. In `src/begriffe.json` bei Bedarf auch `beschreibung` anpassen.

Wenn sich auch der Dateiname ändert, muss zusätzlich geprüft werden:

1. `link` in `src/begriffe.json`
2. alle internen Links von anderen Begriffsseiten auf diese Datei

Wenn Sie unsicher sind, benennen Sie den Dateinamen lieber **nicht** um. Ändern Sie dann nur den sichtbaren Namen.

## Bestehenden Begriff löschen

Zum Löschen eines Begriffs sind immer zwei Schritte nötig:

1. Den passenden Eintrag aus `src/begriffe.json` entfernen.
2. Die zugehörige HTML-Datei im Ordner `src/begriffe/` entfernen.

Danach sollten Sie noch prüfen, ob andere Begriffsseiten auf die gelöschte Datei verlinken. Falls ja, müssen diese Links ebenfalls entfernt oder ersetzt werden.

## Typische Fehler und ihre einfache Lösung

### Der neue Begriff erscheint nicht auf der Startseite

Mögliche Ursache:

- Der Eintrag fehlt in `src/begriffe.json`.
- Die JSON-Datei ist durch ein falsches Komma kaputt.
- Die Seite wurde nicht über einen Webserver geöffnet.

Lösung:

1. JSON-Eintrag kontrollieren.
2. Kommas kontrollieren.
3. Seite über die übliche Team-Umgebung oder `Live Server` öffnen.

### Der Begriff steht auf der Startseite, aber der Klick führt ins Leere

Mögliche Ursache:

- Der `link` in `src/begriffe.json` stimmt nicht.
- Der Dateiname der HTML-Datei stimmt nicht.

Lösung:

1. Den Dateinamen in `src/begriffe/` kontrollieren.
2. Den `link` in `src/begriffe.json` kontrollieren.
3. Auf exakte Schreibweise achten.

### Die Suche findet den Begriff nicht

Mögliche Ursache:

- Der Begriff wurde in `src/begriffe.json` nicht eingetragen.
- `name` ist leer oder falsch geschrieben.

Lösung:

1. JSON-Eintrag öffnen.
2. `name` kontrollieren.
3. Seite neu laden.

### Die Seite sieht komisch aus

Mögliche Ursache:

- In der neuen HTML-Datei wurde versehentlich ein bestehender HTML-Tag gelöscht.

Lösung:

1. Vergleichen Sie Ihre Datei mit `src/begriffe/_vorlage.html`.
2. Stellen Sie den Aufbau der Vorlage wieder her.
3. Passen Sie danach nur den Inhalt an.

## Was Sie für neue Begriffe normalerweise nicht anfassen müssen

Für einen neuen Begriff brauchen Sie normalerweise **keine** Änderung in:

- `src/style.css`
- `src/js/suche.js`
- `src/js/footer.js`
- `src/js/logo.js`
- `src/js/startseiteGlossar.js`

Die Startseite, Suche, Navigation und der Footer ziehen sich die nötigen Daten automatisch aus `src/begriffe.json`.

## Empfohlene Arbeitsweise für sehr sichere Pflege

Arbeiten Sie immer in dieser Reihenfolge:

1. Vorlage kopieren.
2. Neue HTML-Datei sauber füllen.
3. JSON-Eintrag anlegen.
4. Alles speichern.
5. Im Browser prüfen.
6. Erst danach die Änderung weitergeben oder veröffentlichen.

## Mini-Beispiel: kompletter neuer Begriff

Angenommen, Sie möchten den Begriff `Regressionstest` einfügen.

Dann wäre der Ablauf:

1. Kopieren Sie `src/begriffe/_vorlage.html`.
2. Legen Sie die neue Datei `src/begriffe/regressionstest.html` an.
3. Ersetzen Sie in der Datei `Neuer Begriff` durch `Regressionstest`.
4. Tragen Sie die Definition ein.
5. Setzen Sie mindestens einen internen Link, zum Beispiel auf `testfall.html`.
6. Tragen Sie eine externe Quelle ein.
7. Fügen Sie in `src/begriffe.json` diesen Block hinzu:

```json
{
    "name": "Regressionstest",
    "link": "begriffe/regressionstest.html",
    "beschreibung": "Test zur Prüfung, ob bestehende Funktionen nach einer Änderung weiterhin korrekt arbeiten."
}
```

8. Speichern Sie alles.
9. Prüfen Sie das Ergebnis im Browser.

## Schlussregel

Wenn Sie bei einer Änderung an den Punkt kommen, an dem Sie `src/js/` oder `src/style.css` bearbeiten müssten, dann geht es sehr wahrscheinlich **nicht mehr** nur um Inhaltspflege, sondern um eine technische Änderung. In diesem Fall sollte die zuständige technische Person eingebunden werden.
