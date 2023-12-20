# Destrukturierende Zuweisung

Die beiden am häufigsten verwendeten Datenstrukturen in JavaScript sind `Object` und `Array`.

- Objekte ermöglichen es uns, eine einzelne Entität zu erstellen, die Datenpunkte anhand von Schlüsseln speichert.
- Arrays erlauben es uns, Datenpunkte in einer geordneten Liste zusammenzufassen.

Dennoch, wenn wir diese an eine Funktion übergeben, wird möglicherweise nicht das komplette Objekt/Array als Ganzes benötigt. Sie könnte einzelne Teile benötigen.

Die *destrukturierende Zuweisung* ist eine spezielle Syntax, die es uns ermöglicht, Arrays oder Objekte in eine Reihe von Variablen "auszupacken", da dies manchmal bequemer ist.

Destrukturierung funktioniert auch hervorragend bei komplexen Funktionen mit vielen Parametern, Default-Werten und so weiter. Gleich werden wir das sehen.

## Array-Destrukturierung

Hier ist ein Beispiel, wie ein Array in Variablen destrukturiert wird:

```js
// wir haben ein Array mit dem Namen und dem Nachnamen
let arr = ["John", "Smith"]

*!*
// destrukturierende Zuweisung
// setzt firstName = arr[0]
// und surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Nun können wir mit Variablen statt mit Array-Elementen arbeiten.

Es sieht großartig aus, wenn es mit `split` oder anderen Array-Rückgabemethoden kombiniert wird:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

Wie man sieht, ist die Syntax einfach. Es gibt jedoch einige Besonderheiten. Lass uns weitere Beispiele ansehen, um es besser zu verstehen.

````smart header="\"Destrukturierung\" bedeutet nicht \"destruktiv\"."
Sie wird "destrukturierende Zuweisung" genannt, weil sie "destrukturiert", indem sie Elemente in Variablen kopiert. Aber das Array selbst wird nicht verändert.

Sie ist einfach eine kürzere Art zu schreiben:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Elemente ignorieren mit Kommas"
Unerwünschte Elemente des Arrays können auch über ein zusätzliches Komma verworfen werden:

```js run
*!*
// das zweite Element wird nicht benötigt
let [firstName, , title] = ["Julius", "Caesar", "Konsul", "der Römischen Republik"];
*/!*

alert( title ); // Konsul
```

Im obigen Code wird das zweite Element des Arrays übersprungen, das dritte wird `title` zugewiesen und die restlichen Array-Elemente werden ebenfalls übersprungen (da es keine Variablen für sie gibt).
````

````smart header="Funktioniert mit jedem Iterierbaren auf der rechten Seite"

...Tatsächlich können wir sie mit jedem iterierbaren Objekt verwenden, nicht nur Arrays:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
Das funktioniert, weil intern eine Zuweisung über Destrukturierung durch Iterieren über den rechten Wert arbeitet. Es ist eine Art syntaktischer Zucker für den Aufruf von `for..of` über den Wert rechts von `=` und die Zuweisung der Werte.
````

````smart header="Zuweisen an alles auf der linken Seite"
Wir können jede "zuweisbare" Sache auf der linken Seite verwenden.

Zum Beispiel, eine Objekteigenschaft:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="Schleifen mit .entries()"
Im vorherigen Kapitel haben wir die Methode [Object.entries(obj)](mdn:js/Object/entries) gesehen.

Wir können sie mit Destrukturierung verwenden, um über Schlüssel-Wert-Paare eines Objekts zu iterieren:

```js run
let user = {
  name: "John",
  age: 30
};

// Schleife über Schlüssel-Wert-Paare
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, dann age:30
}
```

Der ähnliche Code für eine `Map` ist einfacher, da sie iterierbar ist:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map iteriert als [key, value]-Paare, sehr praktisch für Destrukturierung
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, dann age:30
}
```
````

````smart header="Trick zum Tauschen von Variablen"
Es gibt einen bekannten Trick, um die Werte zweier Variablen mithilfe einer Zuweisung über Destrukturierung zu tauschen:

```js run
let guest = "Jane";
let admin = "Pete";

// Lassen Sie uns die Werte tauschen: make guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (erfolgreich getauscht!)
```

Hier erstellen wir ein temporäres Array aus zwei Variablen und destrukturieren es sofort in vertauschter Reihenfolge.

Wir können auf diese Weise mehr als zwei Variablen tauschen.
````

### Der Rest '...'

Normalerweise, wenn das Array länger ist als die Liste auf der linken Seite, werden die "zusätzlichen" Elemente weggelassen.

Zum Beispiel werden hier nur zwei Elemente genommen, und der Rest wird einfach ignoriert:

```js run
let [name1, name2] = ["Julius", "Caesar", "Konsul", "der Römischen Republik"];

alert(name1); // Julius
alert(name2); // Caesar
// Weitere Elemente werden nirgendwo zugewiesen
```

Wenn wir auch alles sammeln möchten, was folgt – können wir einen weiteren Parameter hinzufügen, der "den Rest" bekommt, indem wir drei Punkte `"..."` verwenden:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Konsul", "der Römischen Republik"*/!*];

*!*
// rest ist ein Array von Elementen, beginnend mit dem dritten
alert(rest[0]); // Konsul
alert(rest[1]); // der Römischen Republik
alert(rest.length); // 2
*/!*
```

Der Wert von `rest` ist das Array der verbleibenden Array-Elemente.

Wir können jeden anderen Variablennamen anstelle von `rest` verwenden, achte nur darauf, dass ihm drei Punkte vorangestellt sind und dass er am Ende der destrukturierenden Zuweisung steht.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Konsul", "der Römischen Republik"];
// nun ist titles = ["Konsul", "der Römischen Republik"]
```

### Default-Werte

Wenn das Array kürzer ist als die Liste der Variablen auf der linken Seite, gibt es keine Fehler. Fehlende Werte werden als undefined angesehen:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Wenn wir einen "Default-Wert" als Ersatz für den fehlenden Wert möchten, können wir ihn mit `=` angeben:

```js run
*!*
// Default-Werte
let [name = "Gast", surname = "Anonym"] = ["Julius"];
*/!*

alert(name);    // Julius (aus dem Array)
alert(surname); // Anonym (Default-Wert verwendet)
```

Default-Werte können komplexere Ausdrücke oder sogar Funktionsaufrufe sein. Sie werden nur ausgewertet, wenn der Wert nicht bereitgestellt wird.

Zum Beispiel verwenden wir hier die `prompt`-Funktion für zwei Defaults:

```js run
// prompt wird nur für surname ausgeführt
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (aus dem Array)
alert(surname); // was auch immer prompt erhält
```

Bitte beachte: Der `prompt` wird nur für den fehlenden Wert (`surname`) ausgeführt.

## Objekt-Destrukturierung

Die destrukturierende Zuweisung funktioniert auch mit Objekten.

Die grundlegende Syntax ist:

```js
let {var1, var2} = {var1:…, var2:…}
```

Wir sollten ein bestehendes Objekt auf der rechten Seite haben, das wir in Variablen aufteilen möchten. Die linke Seite enthält ein objektähnliches "Muster" für entsprechende Eigenschaften. Im einfachsten Fall ist das eine Liste von Variablennamen in `{...}`.

Zum Beispiel:

```js run
let options = {
  title: "Menü",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menü
alert(width);  // 100
alert(height); // 200
```

Die Eigenschaften `options.title`, `options.width` und `options.height` sind den entsprechenden Variablen zugewiesen.

Die Reihenfolge spielt keine Rolle. Das funktioniert auch:

```js
// geänderte Reihenfolge in let {...}
let {height, width, title} = { title: "Menü", height: 200, width: 100 }
```

Das Muster auf der linken Seite kann komplexer sein und die Zuordnung zwischen Eigenschaften und Variablen festlegen.

Wenn wir beispielsweise eine Eigenschaft einem Variablennamen mit einem anderen Namen zuweisen möchten, zum Beispiel `options.width` in die Variable `w`, dann können wir den Variablennamen mit einem Doppelpunkt festlegen:

```js run
let options = {
  title: "Menü",
  width: 100,
  height: 200
};

*!*
// { Quelleigenschaft: Zielvariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menü
alert(w);      // 100
alert(h);      // 200
```

Der Doppelpunkt zeigt "was : wohin geht". Im obigen Beispiel geht die Eigenschaft `width` zu `w`, die Eigenschaft `height` zu `h` und `title` wird dem gleichen Namen zugewiesen.

Für potenziell fehlende Eigenschaften können wir Default-Werte mit `"="` festlegen, wie hier:

```js run
let options = {
  title: "Menü"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menü
alert(width);  // 100
alert(height); // 200
```

Genau wie bei Arrays oder Funktionsparametern können Default-Werte beliebige Ausdrücke oder sogar Funktionsaufrufe sein. Sie werden ausgewertet, wenn der Wert nicht bereitgestellt wird.

Im nachfolgenden Code fragt `prompt` nach `width`, aber nicht nach `title`:

```js run
let options = {
  title: "Menü"
};

*!*
let {width = prompt("Breite?"), title = prompt("Titel?")} = options;
*/!*

alert(title);  // Menü
alert(width);  // (was auch immer das Ergebnis von prompt ist)
```

Wir können auch sowohl den Doppelpunkt als auch die Gleichheit kombinieren:

```js run
let options = {
  title: "Menü"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menü
alert(w);      // 100
alert(h);      // 200
```

Wenn wir ein komplexes Objekt mit vielen Eigenschaften haben, können wir nur das extrahieren, was wir brauchen:

```js run
let options = {
  title: "Menü",
  width: 100,
  height: 200
};

// Nur den Titel als Variable extrahieren
let { title } = options;

alert(title); // Menü
```

### Das Rest-Pattern "..."

Was ist, wenn das Objekt mehr Eigenschaften hat, als wir Variablen? Können wir einige nehmen und dann den "Rest" irgendwo zuweisen?

Wir können das Rest-Pattern verwenden, genau wie bei Arrays. Es wird von einigen älteren Browsern nicht unterstützt (IE, hier kann Babel für ein Polyfill verwendet werden), aber es funktioniert in modernen Browsern.

Es sieht folgendermaßen aus:

```js run
let options = {
  title: "Menü",
  height: 200,
  width: 100
};

*!*
// title = Eigenschaft namens title
// rest = Objekt mit dem Rest der Eigenschaften
let {title, ...rest} = options;
*/!*

// jetzt ist title="Menü", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="Aufgepasst, wenn kein `let` vorhanden ist"
In den obigen Beispielen wurden Variablen direkt in der Zuweisung deklariert: `let {…} = {…}`. Natürlich könnten wir auch vorhandene Variablen ohne `let` verwenden. Es gibt aber einen Haken.

Das wird nicht funktionieren:
```js run
let title, width, height;

// Fehler in dieser Zeile
{title, width, height} = {title: "Menü", width: 200, height: 100};
```

Das Problem ist, dass JavaScript `{...}` im Hauptcodefluss (nicht innerhalb eines anderen Ausdrucks) als Codeblock behandelt. Solche Codeblöcke können verwendet werden, um Anweisungen zu gruppieren, wie hier:

```js run
{
  // ein Codeblock
  let message = "Hallo";
  // ...
  alert( message );
}
```

Hier nimmt JavaScript also an, dass wir einen Codeblock haben, deshalb gibt es einen Fehler. Wir wollen stattdessen Destrukturierung.

Um JavaScript zu zeigen, dass es kein Codeblock ist, können wir den Ausdruck in Klammern `(...)` einpacken:

```js run
let title, width, height;

// jetzt ist es okay
*!*(*/!*{title, width, height} = {title: "Menü", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menü
```
````

## Geschachtelte Destrukturierung

Wenn ein Objekt oder ein Array andere eingebettete Objekte und Arrays enthält, können wir komplexere Muster auf der linken Seite verwenden, um tiefer liegende Teile zu extrahieren.

Im nachfolgenden Code enthält `options` ein weiteres Objekt in der Eigenschaft `size` und ein Array in der Eigenschaft `items`. Das Muster auf der linken Seite der Zuweisung hat die gleiche Struktur, um Werte daraus zu extrahieren:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Kuchen", "Donut"],
  extra: true
};

// Zuweisung über Destrukturierung in mehreren Zeilen für bessere Übersicht aufgeteilt
let {
  size: { // Größe hier einfügen
    width,
    height
  },
  items: [item1, item2], // Gegenstände hier zuweisen
  title = "Menü" // nicht im Objekt vorhanden (Default-Wert verwendet)
} = options;

alert(title);  // Menü
alert(width);  // 100
alert(height); // 200
alert(item1);  // Kuchen
alert(item2);  // Donut
```

Alle Eigenschaften des `options` Objekts außer `extra`, die im linken Teil nicht vorhanden sind, werden den entsprechenden Variablen zugewiesen:

![](destructuring-complex.svg)

Letztendlich haben wir `width`, `height`, `item1`, `item2` und `title` aus dem Default-Wert.

Zu beachten ist, dass es keine Variablen für `size` und `items` gibt, da wir stattdessen deren Inhalt nehmen.

## Intelligente Funktionenparameter

Es gibt Zeiten, in denen eine Funktion viele Parameter hat, von denen die meisten optional sind. Das trifft besonders auf Benutzeroberflächen zu. Stelle Dir eine Funktion vor, die ein Menü erstellt. Sie könnte eine Breite, eine Höhe, einen Titel, eine Liste von Elementen und so weiter haben.

Hier ist eine schlechte Möglichkeit, eine solche Funktion zu schreiben:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

Im wirklichen Leben ist das Problem, sich die Reihenfolge der Argumente zu merken. In der Regel versuchen IDEs uns zu helfen, besonders wenn der Code gut dokumentiert ist, aber trotzdem... Ein weiteres Problem ist, wie eine Funktion aufgerufen werden soll, wenn die meisten Parameter per Default in Ordnung sind.

Zum Beispiel so?

```js
// undefined, wo Standardwerte passen
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Das ist hässlich. Und es wird unlesbar, wenn wir es mit mehreren Parametern zu tun haben.

Destrukturierung kommt zur Rettung!

Wir können Parameter als Objekt übergeben, und die Funktion destrukturiert sie sofort in Variablen:

```js run
// wir übergeben ein Objekt an die Funktion
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...und es entfaltet sich sofort in Variablen
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – entnommen aus options,
  // width, height – Standardwerte verwendet
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

Wir können auch komplexere Destrukturierung mit verschachtelten Objekten und Zuordnungen mit Doppelpunkt verwenden:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // Breite geht zu w
  height: h = 200, // Höhe geht zu h
  items: [item1, item2] // erstes Element von items geht zu item1, zweites zu item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

Die vollständige Syntax entspricht einer destrukturierenden Zuweisung:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

Dann gibt es für ein Objekt an Parametern eine Variable `varName` für die Eigenschaft `incomingProperty`, per Default mit `defaultValue`.

Bitte beachte, dass eine solche Destrukturierung voraussetzt, dass `showMenu()` ein Argument hat. Wenn wir alle Werte als Default möchten, dann sollten wir ein leeres Objekt übergeben:

```js
showMenu({}); // ok, alle Werte sind Default

showMenu(); // das würde einen Fehler verursachen
```

Wir können dies beheben, indem wir `{}` als Default-Wert für das gesamte Objekt an Parametern machen:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

Im obigen Code ist das ganze Argumentobjekt per Default `{}`, so dass es immer etwas zum Destrukturieren gibt.

## Zusammenfassung

- Die destrukturierende Zuweisung ermöglicht eine sofortige Zuordnung eines Objekts oder Arrays auf viele Variablen.
- Die vollständige Objektsyntax:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Das bedeutet, dass die Eigenschaft `prop` in die Variable `varName` gehen sollte, und wenn eine solche Eigenschaft nicht existiert, dann sollte der Wert `default` verwendet werden.

    Eigenschaften des Objekts, die nicht zugeordnet sind, werden auf das Objekt `rest` kopiert.

- Die vollständige Array-Syntax:

    ```js
    let [item1 = standard, item2, ...rest] = array
    ```

    Das erste Element geht zu `item1`; das zweite zu `item2`, alle weiteren bilden das Array `rest`.

- Es ist möglich, Daten aus verschachtelten Arrays/Objekten zu extrahieren, dafür muss die linke Seite dieselbe Struktur wie die rechte haben.
