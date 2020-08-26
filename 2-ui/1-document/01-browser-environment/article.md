# Browser-Umgebung, Spezifikationen

Die Sprache JavaScript wurde ursprünglich für Webbrowser entwickelt.  Seitdem hat sie sich weiterentwickelt und ist zu einer Sprache mit vielen Einsatzmöglichkeiten und Plattformen geworden.

Eine Plattform kann ein Browser sein, oder ein Web-Server oder ein anderer *Host*, sogar eine intelligente Kaffeemaschine, wenn sie JavaScript ausführen kann.  Jede von ihnen bietet plattformspezifische Funktionalität.  Die JavaScript-Spezifikation nennt das eine *Host-Umgebung*.

Eine *Host-Umgebung* stellt zusätzlich zum Sprachkern eigene Objekte und Funktionen zur Verfügung.  Web-Browser bieten die Möglichkeit, Webseiten zu kontrollieren.  Node.js bietet serverseitige Funktionen usw.

Hier sehen Sie aus der Vogelperspektive, was wir haben, wenn JavaScript in einem Webbrowser ausgeführt wird:

![](windowObjects.svg)

Es gibt ein "Wurzel"-Objekt namens `Fenster`. Es hat zwei Rollen:

1. Erstens ist es ein globales Objekt für JavaScript-Code, wie im Kapitel <info:global-object> beschrieben.
2. Zweitens repräsentiert es das "Browser-Fenster" und stellt Methoden zu dessen Steuerung zur Verfügung.

Hier verwenden wir es zum Beispiel als globales Objekt:

```js run
function sagHi() {
  alert ("Hallo");
}

// Globale Funktionen sind Methoden des globalen Objekts:
fenster. sagHi();
```

Und hier benutzen wir es als Browserfenster, um die Fensterhöhe zu sehen:

```js run
alert(window.innerHeight); // innere Fensterhöhe
```

Es gibt weitere fensterspezifische Methoden und Eigenschaften, auf die wir später eingehen werden.

## DOM (Dokument-Objektmodell)

Document Object Model, kurz DOM, stellt den gesamten Seiteninhalt als Objekte dar, die modifiziert werden können.

Das "Document"-Objekt ist der wichtigste "Einstiegspunkt" zur Seite. Mit ihm können wir alles auf der Seite ändern oder erstellen.

Zum Beispiel
```js run
// ändern Sie die Hintergrundfarbe in rot
document.body.style.background = "red"; 

// ändern Sie es nach 1 Sekunde zurück
setTimeout(() => document.body.style.background = "", 1000);
```

Hier haben wir `document.body.style` verwendet, aber es gibt noch viel, viel mehr. Eigenschaften und Methoden sind in der Spezifikation beschrieben: [lebender Standard des DOM](https://dom.spec.whatwg.org).

### DOM ist nicht nur für Browser
Die DOM-Spezifikation erklärt die Struktur eines Dokuments und stellt Objekte zur Verfügung, mit denen es manipuliert werden kann.  
Es gibt auch Nicht-Browser-Instrumente, die DOM verwenden.

Beispielsweise können serverseitige Skripte, die HTML-Seiten herunterladen und verarbeiten, ebenfalls DOM verwenden. 
Sie unterstützen jedoch möglicherweise nur einen Teil der Spezifikation.

#### CSSOM für das Styling
Es gibt auch eine separate Spezifikation, [CSS Objektmodell (CSSOM)](https://www.w3.org/TR/cssom-1/) für CSS-Regeln und Stylesheets, 
die erklärt, wie sie als Objekte dargestellt werden und wie sie gelesen und geschrieben werden können.

CSSOM wird zusammen mit DOM verwendet, wenn wir Stilregeln für das Dokument ändern. 
In der Praxis wird CSSOM jedoch nur selten benötigt, da wir CSS-Regeln nur selten von JavaScript aus ändern müssen 
(normalerweise fügen wir nur CSS-Klassen hinzu/entfernen und ändern nicht ihre CSS-Regeln), aber auch das ist möglich.

## BOM (Browser-Objektmodell)

Das Browser-Objektmodell (BOM) stellt zusätzliche Objekte dar, die vom Browser (Host-Umgebung) für die Arbeit mit allem außer dem Dokument (`document`) zur Verfügung gestellt werden.

Zum Beispiel:

- Das Objekt [navigator](mdn:api/Window/navigator) liefert Hintergrundinformationen über den Browser und das Betriebssystem. Es gibt viele Eigenschaften, aber die beiden bekanntesten sind`navigator.userAgent` -- über den aktuellen Browser, und `navigator.platform` -- über die Plattform (hier müssen wir uns der Unterschiede zwischen Windows/Linux/Mac etc. bewusst sein).
- Das [location](mdn:api/Window/location)-Objekt erlaubt es uns, die aktuelle URL zu lesen und kann den Browser auf eine neue umleiten.

So können wir das `location'-Objekt verwenden:

```js run
alert(location.href); // zeigt die aktuelle URL
if (confirm("Gehe zu Wikipedia?")) {
  location.href = "https://wikipedia.org"; // den Browser auf eine andere URL umleiten
}
```

Auch die Funktionen `alert/confirm/prompt` sind Teil der BOM: Sie stehen nicht direkt mit `document` in Verbindung, sondern stellen reine Browser-Methoden zur Kommunikation mit dem Benutzer dar.

#### Spezifikationen
BOM ist ein Teil der allgemeinen [HTML-Spezifikation](https://html.spec.whatwg.org).

Ja, das haben Sie richtig gehört. In der HTML-Spezifikation unter <https://html.spec.whatwg.org> geht es nicht nur um die "HTML-Sprache" (Tags, Attribute), sondern auch um eine Reihe von Objekten, Methoden und browserspezifischen DOM-Erweiterungen.  Das ist "HTML in groben Zügen".  Einige Teile haben auch zusätzliche Spezifikationen, die unter <https://spec.whatwg.org> aufgeführt sind.

## Zusammenfassung

Wenn wir über Standards sprechen, haben wir das:

DOM-Spezifikation
: Beschreibt die Dokumentstruktur, Bearbeitungen und Ereignisse, siehe <https://dom.spec.whatwg.org>.

CSSOM-Spezifikation
: Beschreibt Stylesheets und Stilregeln, Bearbeitungen mit ihnen und ihre Bindung an Dokumente, siehe <https://www.w3.org/TR/cssom-1/>.

HTML-Spezifikation
: Beschreibt die HTML-Sprache (z.B. Tags) und auch die BOM (Browser-Objektmodell) -- verschiedene Browser-Funktionen: `setTimeout`, `alert`, `location` und so weiter, siehe <https://html.spec.whatwg.org>. Es nimmt die DOM-Spezifikation und erweitert sie um viele zusätzliche Eigenschaften und Methoden.

Zusätzlich werden einige Klassen separat unter <https://spec.whatwg.org/> beschrieben.

Bitte beachten Sie diese Links, da es so viel zu lernen gibt, dass es unmöglich ist, alles abzudecken und sich alles zu merken.

Wenn Sie über eine Eigenschaft oder eine Methode lesen möchten, ist auch das Mozilla-Handbuch unter <https://developer.mozilla.org/en-US/search> eine nette Ressource, aber die entsprechende Spezifikation ist vielleicht besser: sie ist komplexer und länger zu lesen, aber sie wird Ihr Grundwissen solide und vollständig machen.

Um etwas zu finden, ist es oft bequem, eine Internetsuche "WHATWG [Begriff]" oder "MDN [Begriff]" zu benutzen, z.B. <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Nun kommen wir zum Lernen von DOM, denn das Dokument spielt die zentrale Rolle in der Benutzeroberfläche.
