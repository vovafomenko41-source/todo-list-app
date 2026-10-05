<h1 align="center">Meine To-Do-Liste</h1>
<p align="center">Eine Aufgabenverwaltung mit Prioritäten, Fälligkeit, Suche und lokal gespeicherten Aufgaben.</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="Ohne Framework" src="https://img.shields.io/badge/Framework-keines-334155?style=flat-square">
</p>


## Projektüberblick

Dieses Lernprojekt zeigt Grundlagen der Webentwicklung mit HTML, CSS und JavaScript. Es ist Teil eines Projektportfolios für die Bewerbung um eine Ausbildung im IT-Bereich. Die Anwendung benötigt kein Framework und keinen Build-Schritt.

## Funktionen

- Aufgaben hinzufügen, erledigen und löschen
- Datum und Uhrzeit als Fälligkeit hinterlegen
- Drei Prioritäten: hoch, mittel und niedrig
- Automatische Sortierung nach Priorität
- Textsuche und Filter für offene oder erledigte Aufgaben
- Fortschrittsbalken und Aufgabenzähler
- Erledigte Aufgaben gemeinsam nach Bestätigung löschen
- Helles und dunkles Farbschema
- Speicherung von Aufgaben und Farbschema im Browser

## Technische Umsetzung

| Bereich | Umsetzung |
| Datenmodell | Aufgaben als JavaScript-Objekte in einem Array |
| Persistenz | `localStorage` und JSON-Serialisierung |
| Listenverarbeitung | `filter`, `sort` und dynamisches Rendering |
| Interaktion | Event-Listener für Eingaben, Buttons und Filter |
| Darstellung | Responsive CSS, Fortschrittsanzeige und Dark Mode |

## Lokal starten

1. `index.html` im Browser öffnen.
2. Eine Aufgabe eingeben; Datum, Uhrzeit und Priorität bei Bedarf ergänzen.
3. **Hinzufügen** anklicken oder im Aufgabenfeld Enter drücken.
4. Auf den Aufgabentext klicken, um die Aufgabe als erledigt oder offen zu markieren.

Die Daten bleiben im verwendeten Browser. Es gibt keine Synchronisierung zwischen Geräten; beim Löschen der Browserdaten können die Aufgaben verloren gehen.

Alternativ kann der Projektordner mit einem lokalen Webserver geöffnet werden, zum Beispiel mit der Erweiterung **Live Server** in Visual Studio Code.

## Projektstruktur

| Datei | Aufgabe |
| --- | --- |
| `index.html` | Aufbau und Inhalte der Benutzeroberfläche |
| `style.css` | Layout, Farben und responsive Gestaltung |
| `script.js` | Anwendungslogik und Benutzerinteraktionen |
| `lokkkk.jpg` | Hintergrundbild |

## Weitere Projekte

- [Memory Game](https://github.com/vovafomenko41-source/memory-game)
- [Meine To-Do-Liste](https://github.com/vovafomenko41-source/todo-list-app)
- [Wetter App](https://github.com/vovafomenko41-source/weather-app)
