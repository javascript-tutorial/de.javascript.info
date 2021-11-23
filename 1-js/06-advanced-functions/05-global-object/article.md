
# Globales Objekt

Das globale Objekt stellt Variablen und Funktionen bereit, die überall verfügbar sind. Standardmäßig diejenigen, die in die Sprache oder die Umgebung integriert sind.

In einem Browser heißt es `window`, für Node.js ist es `global`, für andere Umgebungen kann es einen anderen Namen haben.

Vor kurzem wurde der Sprache `globalThis` als standardisierter Name für ein globales Objekt hinzugefügt, das in allen Umgebungen unterstützt werden soll. In einigen Browsern, insbesondere Nicht-Chromium Edge, wird `globalThis` noch nicht unterstützt, kann aber leicht mit Polyfills umgangen werden.

Wir verwenden hier `window`, vorausgesetzt, unsere Umgebung ist ein Browser. Wenn dein Skript in anderen Umgebungen ausgeführt werden kann, ist es besser, stattdessen `globalThis` zu verwenden.

Auf alle Eigenschaften des globalen Objekts kann direkt zugegriffen werden:

```js run
alert("Hallo");
// ist das selbe wie
window.alert("Halllo");
```

In einem Browser werden mit `var` (nicht `let/const`!) deklarierte globale Funktionen und Variablen Eigentum des globalen Objekts:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (wurde Eigentum des globalen Objekts)
```

Bitte nicht darauf verlassen! Dieses Verhalten existiert aus Kompatibilitätsgründen. Moderne Skripte verwenden [JavaScript-Module](info:modules), wo so etwas nicht passiert.

Wenn wir stattdessen `let` verwenden, würde so etwas nicht passieren:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (wird nicht Eigentum des globalen Objekts)
```

Wenn ein Wert so wichtig ist, dass du ihn global verfügbar machen möchtest, schreibe ihn direkt als Eigenschaft:

```js run
*!*
// aktuelle Benutzerinformationen global machen, damit alle Skripte darauf zugreifen können
window.currentUser = {
  name: "John"
};
*/!*

// woanders im Code
alert(currentUser.name);  // John

// oder, wenn wir eine lokale Variable mit dem Namen "currentUser" haben
// Holen Sie es explizit aus dem Fenster (sicher!)
alert(window.currentUser.name); // John
```

Von der Verwendung globaler Variablen wird jedoch im Allgemeinen abgeraten. Es sollten möglichst wenige globale Variablen vorhanden sein. Der Codeentwurf, bei dem eine Funktion "Eingabe"-Variablen erhält und bestimmte "Ergebnisse" erzeugt, ist klarer, weniger fehleranfällig und einfacher zu testen, als wenn du äußere oder globale Variablen verwendest.

## Verwendung für Polyfills

Wir verwenden das globale Objekt, um die Unterstützung moderner Sprachfunktionen zu testen.

Testen Sie zum Beispiel, ob ein eingebautes `Promise`-Objekt existiert (in wirklich alten Browsern nicht):
```js run
if (!window.Promise) {
  alert("Dein Browser ist wirklich alt!");
}
```

Wenn es keine gibt (sagen wir, wir befinden uns in einem alten Browser), können wir "Polyfills" erstellen: Funktionen hinzufügen, die von der Umgebung nicht unterstützt werden, aber im modernen Standard vorhanden sind.

```js run
if (!window.Promise) {
  window.Promise = ... // benutzerdefinierte Implementierung der modernen Sprachfunktion
}
```

## Zusammenfassung

- Das globale Objekt enthält Variablen, die überall verfügbar sein sollten.

    Dazu gehören JavaScript-Einbauten wie "Array" und umgebungsspezifische Werte wie `window.innerHeight` -- die Fensterhöhe im Browser.
- Das globale Objekt hat einen universellen Namen `globalThis`.

    ...Aber häufiger wird mit umgebungsspezifischen Namen der "alten Schule" wie `window` (Browser) und `global` (Node.js) bezeichnet. Da `globalThis` ein neuer Vorschlag ist, wird es in Nicht-Chromium Edge nicht unterstützt (kann aber mit Polyfills umgangen werden).
- Wir sollten Werte im globalen Objekt nur speichern, wenn sie wirklich global für unser Projekt sind. Und halten Sie ihre Anzahl auf ein Minimum.
- Im Browser werden globale Funktionen und Variablen, die mit `var` deklariert sind, zu einer Eigenschaft des globalen Objekts, es sei denn, wir verwenden [modules](info:modules).
- Um unseren Code zukunftssicher und verständlicher zu machen, sollten wir direkt auf die Eigenschaften des globalen Objekts zugreifen, als `window.x`.
