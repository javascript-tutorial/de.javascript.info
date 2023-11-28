# Konstruktor, Operator "new"

Die reguläre Syntax `{...}` erlaubt es uns, ein einzelnes Objekt zu erstellen. Aber oft müssen wir viele ähnliche Objekte erstellen, wie mehrere Benutzer oder Menüpunkte und so weiter.

Das kann mit Konstruktorfunktionen und dem `"new"`-Operator erreicht werden.

## Konstruktorfunktion

Technisch gesehen sind Konstruktorfunktionen normale Funktionen. Es gibt jedoch zwei Konventionen:

1. Sie beginnen mit einem Großbuchstaben.
2. Sie sollten nur mit dem `"new"`-Operator ausgeführt werden.

Zum Beispiel:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Wenn eine Funktion mit `new` ausgeführt wird, geschieht Folgendes:

1. Ein neues leeres Objekt wird erstellt und `this` zugewiesen.
2. Der Funktionskörper wird ausgeführt. Normalerweise modifiziert er `this` und fügt neue Eigenschaften hinzu.
3. Der Wert von `this` wird zurückgegeben.

Anders ausgedrückt, `new User(...)` macht so etwas wie:

```js
function User(name) {
*!*
  // this = {};  (implizit)
*/!*

  // Eigenschaften zu this hinzufügen
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (implizit)
*/!*
}
```

Also gibt `let user = new User("Jack")` das gleiche Ergebnis wie:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Wenn wir nun andere Benutzer erstellen wollen, können wir `new User("Ann")`, `new User("Alice")` usw. aufrufen. Viel kürzer als jedes Mal Literale zu verwenden, und auch einfach zu lesen.

Das ist der Hauptzweck von Konstruktoren - wiederverwendbaren Code zur Objekterstellung zu implementieren.

Lassen Sie uns noch einmal festhalten - technisch gesehen kann jede Funktion (außer Pfeilfunktionen, da sie kein `this` haben) als Konstruktor verwendet werden. Sie kann mit `new` ausgeführt werden und wird das oben beschriebene Verfahren durchführen. „Beginnt mit Großbuchstaben“ ist eine allgemeine Vereinbarung, um klarzustellen, dass eine Funktion mit `new` ausgeführt werden soll.

````smart header="new function() { ... }"
Wenn wir viele Zeilen Code haben, die sich alle um die Erstellung eines einzigen komplexen Objekts drehen, können wir sie in eine sofort aufgerufene Konstruktorfunktion einpacken:

```js
// eine Funktion erstellen und sofort mit new aufrufen
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...anderer Code für die Benutzererstellung
  // vielleicht komplexe Logik und Anweisungen
  // lokale Variablen etc.
};
```

Dieser Konstruktor kann nicht erneut aufgerufen werden, weil er nirgendwo gespeichert ist, gerade erstellt und aufgerufen wurde. Also zielt dieser Trick darauf ab, den Code, der das einzelne Objekt konstruiert, einzukapseln, ohne weitere Wiederverwendung.
````

## Test des Konstruktormodus: new.target

```smart header="Fortgeschrittenes Thema"
Die Syntax aus diesem Abschnitt wird selten verwendet, überspringen Sie ihn, es sei denn, Sie wollen alles wissen.
```

Innerhalb einer Funktion können wir überprüfen, ob sie mit `new` oder ohne aufgerufen wurde, indem wir eine spezielle `new.target`-Eigenschaft verwenden.

Sie ist undefiniert bei normalen Aufrufen und entspricht der Funktion, wenn sie mit `new` aufgerufen wird:

```js run
function User() {
  alert(new.target);
}

// ohne "new":
*!*
User(); // undefined
*/!*

// mit "new":
*!*
new User(); // function User { ... }
*/!*
```

Das kann innerhalb der Funktion verwendet werden, um herauszufinden, ob sie im "Konstruktormodus" mit `new` oder im "normalen Modus" ohne `new` aufgerufen wurde.

Wir können auch ermöglichen, dass sowohl `new` als auch normale Aufrufe das Gleiche tun:

```js run
function User(name) {
  if (!new.target) { // wenn Du mich ohne new aufrufst
    return new User(name); // ... füge ich new für Dich hinzu
  }

  this.name = name;
}

let john = User("John"); // leitet den Aufruf zu new User um
alert(john.name); // John
```

Dieser Ansatz wird manchmal in Bibliotheken verwendet, um die Syntax flexibler zu machen. So können Personen die Funktion mit oder ohne `new` aufrufen, und es funktioniert trotzdem.

Wahrscheinlich ist es aber keine gute Sache, diese überall zu verwenden, denn das Weglassen von `new` macht es etwas weniger offensichtlich, was vor sich geht. Mit `new` wissen wir alle, dass ein neues Objekt erstellt wird.

## Rückgabe aus Konstruktoren

Normalerweise haben Konstruktoren keine `return`-Anweisung. Ihre Aufgabe ist es, alles Notwendige in `this` zu schreiben, und das wird automatisch zum Ergebnis.

Aber wenn es eine `return`-Anweisung gibt, dann ist die Regel einfach:

- Wenn `return` mit einem Objekt aufgerufen wird, dann wird das Objekt anstelle von `this` zurückgegeben.
- Wenn `return` mit einem Primitiv aufgerufen wird, wird es ignoriert.

Anders ausgedrückt, `return` mit einem Objekt gibt dieses Objekt zurück, in allen anderen Fällen wird `this` zurückgegeben.

Zum Beispiel, hier überschreibt `return` `this`, indem ein Objekt zurückgegeben wird:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- gibt dieses Objekt zurück
}

alert( new BigUser().name );  // Godzilla, dieses Objekt erhalten
```

Und hier ist ein Beispiel mit einer leeren `return`-Anweisung (oder wir könnten ein Primitiv danach setzen, spielt keine Rolle):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- gibt dies zurück
}

alert( new SmallUser().name );  // John
```

Normalerweise haben Konstruktoren keine `return`-Anweisung. Hier erwähnen wir das spezielle Verhalten mit der Rückgabe von Objekten hauptsächlich der Vollständigkeit halber.

````smart header="Weglassen von Klammern"
Übrigens, wir können Klammern nach `new` weglassen:

```js
let user = new User; // <-- keine Klammern
// entspricht
let user = new User();
```

Das Weglassen von Klammern wird hier nicht als "guter Stil" betrachtet, aber die Syntax wird durch die Spezifikation zugelassen.
````

## Methoden im Konstruktor

Die Verwendung von Konstruktorfunktionen zur Objekterstellung bietet eine große Flexibilität. Die Konstruktorfunktion kann Parameter haben, die definieren, wie das Objekt konstruiert werden soll und was eingefügt wird.

Natürlich können wir `this` nicht nur Eigenschaften, sondern auch Methoden hinzufügen.

Ein Beispiel, `new User(name)` unten erstellt ein Objekt mit dem gegebenen `name` und der Methode `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "Mein Name ist: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // Mein Name ist: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

Um komplexe Objekte zu erstellen, gibt es eine fortgeschrittenere Syntax, [Klassen](info:classes), die wir später behandeln werden.

## Zusammenfassung

- Konstruktorfunktionen oder kurz Konstruktoren sind reguläre Funktionen, aber es gibt eine allgemeine Vereinbarung, sie mit dem ersten Großbuchstaben zu benennen.
- Konstruktorfunktionen sollten nur mit `new` aufgerufen werden. Ein solcher Aufruf impliziert die Erstellung eines leeren `this` am Anfang und die Rückgabe des ausgefüllten am Ende.

Wir können Konstruktorfunktionen verwenden, um mehrere ähnliche Objekte zu erstellen.

JavaScript bietet Konstruktorfunktionen für viele eingebaute Sprachobjekte: wie `Date` für Datumsobjekte, `Set` für Mengen und andere, die wir noch behandeln werden.

```smart header="Objekte, wir kommen zurück!"
In diesem Kapitel decken wir nur die Grundlagen über Objekte und Konstruktoren ab. Sie sind wesentlich, um mehr über Datentypen und Funktionen in den nächsten Kapiteln zu lernen.

Nachdem wir das gelernt haben, kehren wir zu Objekten zurück und behandeln sie vertieft in den Kapiteln <info:prototypes> und <info:classes>.
```
