# WeakMap und WeakSet

Wie wir aus dem Kapitel <info:garbage-collection> wissen, verwaltet die JavaScript-Engine einen Wert im Speicher, solange er "erreichbar" ist und potenziell verwendet werden könnte.

Zum Beispiel:

```js
let john = { name: "John" };

// Das Objekt kann aufgerufen werden, john ist die Referenz darauf

// Überschreibe die Referenz
john = null;

*!*
// Das Objekt wird aus dem Speicher entfernt
*/!*
```

Normalerweise werden Eigenschaften eines Objekts oder Elemente eines Arrays bzw. einer anderen Datenstruktur als erreichbar betrachtet und bleiben im Speicher solange diese Datenstruktur im Speicher ist.

Beispielsweise, wenn wir ein Objekt in ein Array stecken, dann wird das Objekt so lange existieren, wie das Array existiert, auch wenn es keine weiteren Referenzen darauf gibt.

So wie hier:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // Überschreibe die Referenz

*!*
// Das zuvor von john referenzierte Objekt wird innerhalb des Arrays gespeichert
// deshalb wird es nicht vom Garbage-Collector entfernt
// wir können es als array[0] abrufen
*/!*
```

Ähnlich verhält es sich, wenn wir ein Objekt als Schlüssel in einer regulären `Map` nutzen, dann existiert das Objekt so lange wie die `Map`. Es belegt Speicher und wird möglicherweise nicht vom Garbage-Collector entfernt.

Zum Beispiel:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // Überschreibe die Referenz

*!*
// Das Objekt john wird innerhalb der Map gespeichert,
// wir können es erhalten, indem wir map.keys() verwenden
*/!*
```

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) ist in diesem Aspekt grundsätzlich anders. Es verhindert nicht die Garbage-Collection von Schlüsselobjekten.

Lass uns anhand von Beispielen anschauen, was das bedeutet.

## WeakMap

Der erste Unterschied zwischen [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) und [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) ist, dass Schlüssel Objekte sein müssen, keine primitiven Werte:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // funktioniert (Objekt als Schlüssel)

*!*
// kann keine Zeichenkette als Schlüssel verwenden
weakMap.set("test", "Hoppla"); // Fehler, weil "test" kein Objekt ist
*/!*
```

Wenn wir nun ein Objekt als Schlüssel darin verwenden und es keine anderen Referenzen auf dieses Objekt gibt, wird es automatisch aus dem Speicher (und aus der Map) entfernt.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // Überschreibe die Referenz

// john wird aus dem Speicher entfernt!
```

Vergleich das mit dem regulären `Map`-Beispiel oben. Wenn `john` jetzt nur als Schlüssel einer `WeakMap` existiert -- wird es automatisch aus der Map (und dem Speicher) gelöscht.

`WeakMap` unterstützt keine Iteration und die Methoden `keys()`, `values()`, `entries()`, es gibt also keine Möglichkeit, alle Schlüssel oder Werte daraus zu holen.

`WeakMap` hat nur die folgenden Methoden:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

Warum solche Einschränkungen? Das liegt an technischen Gründen. Wenn ein Objekt alle anderen Referenzen verloren hat (wie `john` im Code oben), dann soll es automatisch vom Garbage-Collector entfernt werden. Aber technisch ist nicht genau festgelegt *wann die Bereinigung stattfindet*.

Die JavaScript-Engine entscheidet darüber. Sie kann wählen, die Speicherbereinigung sofort durchzuführen oder zu warten und die Reinigung später durchzuführen, wenn mehr Löschvorgänge stattfinden. Daher ist die aktuelle Elementanzahl einer `WeakMap` nicht bekannt. Die Engine könnte sie bereits bereinigt haben oder nicht, oder nur teilweise. Aus diesem Grund werden Methoden, die auf alle Schlüssel/Werte zugreifen, nicht unterstützt.

Nun, wo brauchen wir eine solche Datenstruktur?

## Anwendungsfall: zusätzliche Daten

Das Hauptanwendungsgebiet für `WeakMap` ist ein *zusätzlicher Datenspeicher*.

Wenn wir mit einem Objekt arbeiten, das zu einem anderen Code "gehört", vielleicht sogar zu einer Drittanbieter-Bibliothek, und wir möchten einige Daten speichern, die damit verbunden sind, die aber nur existieren sollen, so lange das Objekt lebt - dann ist `WeakMap` genau das, was wir brauchen.

Wir legen die Daten in eine `WeakMap`, indem wir das Objekt als Schlüssel verwenden, und wenn das Objekt vom Garbage Collector abgerufen wird, verschwinden diese Daten ebenfalls automatisch.

```js
weakMap.set(john, "geheime Dokumente");
// wenn john eliminiert wird, werden die geheimen Dokumente automatisch zerstört
```

Schauen wir uns ein Beispiel an.

Zum Beispiel haben wir Code, der die Besucherzahl für Benutzer zählt. Die Informationen werden in einer Map gespeichert: Ein Benutzerobjekt ist der Schlüssel und die Besucherzahl ist der Wert. Wenn ein Benutzer die Seite verlässt (sein Objekt wird vom Garbage Collector entfernt), möchten wir seine Besucherzahl nicht mehr speichern.

Hier ein Beispiel für eine Zählfunktion mit `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: Benutzer => Besucherzählung

// erhöhe die Besucherzahl
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Und hier ist ein anderer Teil des Codes, vielleicht eine andere Datei, die ihn verwendet:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // zähle seine Besuche

// später verlässt uns john
john = null;
```

Jetzt sollte das `john` Objekt vom Garbage Collector entfernt werden, aber bleibt im Speicher, da es ein Schlüssel in `visitsCountMap` ist.

Wir müssen `visitsCountMap` aufräumen, wenn wir Benutzer entfernen, sonst wächst die Map im Speicher unendlich. Eine solche Reinigung kann zu einer mühsamen Aufgabe in komplexen Architekturen werden.

Wir können dies vermeiden, indem wir auf `WeakMap` umsteigen:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: Benutzer => Besucherzählung

// erhöhe die Besucherzahl
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Jetzt müssen wir `visitsCountMap` nicht aufräumen. Nachdem das `john` Objekt unerreichbar wird, auf alle Weisen außer als Schlüssel der `WeakMap`, wird es zusammen mit den Informationen zu diesem Schlüssel aus der `WeakMap` aus dem Speicher entfernt.

## Anwendungsfall: Caching

Ein weiteres häufiges Beispiel ist Caching. Wir können Ergebnisse einer Funktion speichern ("cachen"), so dass spätere Aufrufe für dasselbe Objekt es wiederverwenden können.

Um das zu erreichen, könnten wir `Map` verwenden (kein optimales Szenario):

```js run
// 📁 cache.js
let cache = new Map();

// Berechne und merke das Ergebnis
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* Berechnungen des Ergebnisses für */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// Jetzt verwenden wir process() in einer anderen Datei:
*/!*

// 📁 main.js
let obj = {/* sagen wir, wir haben ein Objekt */};

let result1 = process(obj); // berechnet

// ...später, von einem anderen Teil des Codes...
let result2 = process(obj); // Ergebnis aus dem Cache genommen

// ...später, wenn das Objekt nicht mehr benötigt wird:
obj = null;

alert(cache.size); // 1 (Autsch! Das Objekt ist immer noch im Cache und verbraucht Speicher!)
```

Für mehrere Aufrufe von `process(obj)` mit demselben Objekt berechnet es das Ergebnis nur das erste Mal und nimmt es dann aus dem `cache`. Der Nachteil ist, dass wir `cache` aufräumen müssen, wenn das Objekt nicht mehr benötigt wird.

Wenn wir `Map` durch `WeakMap` ersetzen, verschwindet dieses Problem. Das gecachte Ergebnis wird automatisch aus dem Speicher entfernt, nachdem das Objekt vom Garbage Collector entfernt wird.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// Berechne und merke das Ergebnis
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* Berechnungen des Ergebnisses für */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* irgendein Objekt */};

let result1 = process(obj);
let result2 = process(obj);

// ...später, wenn das Objekt nicht mehr benötigt wird:
obj = null;

// Wir können cache.size nicht erhalten, da es sich um eine WeakMap handelt,
// aber es ist 0 oder wird bald 0 sein
// Wenn obj vom Garbage Collector abgerufen wird, werden die gecachten Daten ebenfalls entfernt
```

## WeakSet

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) verhält sich ähnlich:

- Es ist analog zu `Set`, aber wir können nur Objekte zu `WeakSet` hinzufügen (keine Primitiven).
- Ein Objekt existiert im Set, solange es von irgendwo anders aus erreichbar ist.
- Wie bei `Set`, unterstützt es [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) und [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete), aber nicht `size`, `keys()` und keine Iterationen.

Als "schwach" dient es ebenfalls als zusätzlicher Speicher. Aber nicht für beliebige Daten, sondern für "Ja/Nein"-Fakten. Die Mitgliedschaft in einem `WeakSet` könnte etwas über das Objekt aussagen.

Zum Beispiel können wir Benutzer zu `WeakSet` hinzufügen, um diejenigen zu verfolgen, die unsere Seite besucht haben:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John hat uns besucht
visitedSet.add(pete); // Dann Pete
visitedSet.add(john); // John noch einmal

// visitedSet hat jetzt 2 Benutzer

// überprüfen, ob John besucht hat?
alert(visitedSet.has(john)); // wahr

// überprüfen, ob Mary besucht hat?
alert(visitedSet.has(mary)); // falsch

john = null;

// visitedSet wird automatisch bereinigt
```

Die auffälligste Einschränkung von `WeakMap` und `WeakSet` ist das Fehlen von Iterationen und die Unfähigkeit, alle aktuellen Inhalte zu erhalten. Das mag unpraktisch erscheinen, verhindert aber nicht, dass `WeakMap/WeakSet` ihre Hauptaufgabe erfüllen -- ein "zusätzlicher" Speicher von Daten für Objekte, die an anderer Stelle gespeichert/verwaltet werden.

## Zusammenfassung

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) ist eine `Map`-ähnliche Sammlung, die nur Objekte als Schlüssel erlaubt und diese zusammen mit dem zugehörigen Wert entfernt, sobald sie anderweitig unzugänglich werden.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) ist eine `Set`-ähnliche Sammlung, die nur Objekte speichert und diese entfernt, sobald sie anderweitig unzugänglich werden.

Ihre Hauptvorteile sind, dass sie eine schwache Referenz zu Objekten haben, sodass diese leicht vom Garbage Collector entfernt werden können.

Das geht einher mit dem Nachteil, dass sie keine Unterstützung haben für `clear`, `size`, `keys`, `values`...

`WeakMap` und `WeakSet` werden als "sekundäre" Datenstrukturen in Verbindung mit der "primären" Objektspeicherung verwendet. Sobald das Objekt aus dem primären Speicher entfernt wird, und es nur als Schlüssel einer `WeakMap` oder in einem `WeakSet` gefunden wird, wird es automatisch aufgeräumt.
