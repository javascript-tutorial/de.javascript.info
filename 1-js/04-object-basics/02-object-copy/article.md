# Objektreferenzen und Kopieren

Einer der grundlegenden Unterschiede zwischen Objekten und primitiven Werten besteht darin, dass Objekte "per Referenz" gespeichert und kopiert werden, während primitive Werte wie Strings, Zahlen, Booleans usw. immer als "vollständiger Wert" kopiert werden.

Das ist leicht zu verstehen, wenn wir uns ansehen, was beim Kopieren eines Wertes passiert.

Beginnen wir mit einem primitiven Wert, wie einem String.

Hier kopieren wir `message` nach `phrase`:

```js
let message = "Hello!";
let phrase = message;
```

Als Ergebnis haben wir zwei unabhängige Variablen, jede speichert den String `"Hello!"`.

![](variable-copy-value.svg)

Ein ziemlich offensichtliches Ergebnis, oder?

Bei Objekten ist das nicht so.

**Eine Variablenzuweisung mit einem Objekt speichert nicht das Objekt selbst, sondern seine "Adresse im Speicher" -- anders ausgedrückt "eine Referenz" darauf.**

Sehen wir uns ein Beispiel einer solchen Variable an:

```js
let user = {
  name: "John"
};
```

Und so wird es tatsächlich im Speicher abgelegt:

![](variable-contains-reference.svg)

Das Objekt wird irgendwo im Speicher abgelegt (rechts im Bild), während die `user`-Variable (links) eine "Referenz" darauf hat.

Wir können uns eine Objektvariable wie `user` als ein Blatt Papier vorstellen, auf dem die Adresse des Objekts steht.

Wenn wir Aktionen mit dem Objekt durchführen, z.B. eine Eigenschaft `user.name` anfordern, schaut die JavaScript-Engine nach, was sich an dieser Adresse befindet und führt die Operation am eigentlichen Objekt durch.

Nun hier ist, warum das wichtig ist.

**Wenn eine Objektvariable kopiert wird, wird die Referenz kopiert, aber das Objekt selbst wird nicht dupliziert.**

Zum Beispiel:

```js no-beautify
let user = { name: "John" };

let admin = user; // kopiere die Referenz
```

Jetzt haben wir zwei Variablen, jede speichert eine Referenz auf dasselbe Objekt:

![](variable-copy-reference.svg)

Wie du sehen kannst, gibt es immer noch nur ein Objekt, aber jetzt mit zwei Variablen, die darauf verweisen.

Wir können entweder die Variable verwenden, um auf das Objekt zuzugreifen und dessen Inhalt zu ändern:

```js run
let user = { name: 'John' };

let admin = user;

*!*
admin.name = 'Pete'; // geändert durch die "admin"-Referenz
*/!*

alert(*!*user.name*/!*); // 'Pete', Änderungen sind von der "user"-Referenz aus sichtbar
```

Es ist, als hätten wir einen Schrank mit zwei Schlüsseln und benutzen einen davon (`admin`), um hineinzukommen und Änderungen vorzunehmen. Dann, wenn wir später einen anderen Schlüssel (`user`) benutzen, öffnen wir immer noch denselben Schrank und können auf den geänderten Inhalt zugreifen.

## Vergleich per Referenz

Zwei Objekte sind nur dann gleich, wenn sie dasselbe Objekt sind.

Zum Beispiel sind hier `a` und `b` Referenzen auf dasselbe Objekt, also sind sie gleich:

```js run
let a = {};
let b = a; // kopiere die Referenz

alert( a == b ); // wahr, beide Variablen verweisen auf dasselbe Objekt
alert( a === b ); // wahr
```

Und hier sind zwei unabhängige Objekte nicht gleich, auch wenn sie gleich aussehen (beide sind leer):

```js run
let a = {};
let b = {}; // zwei unabhängige Objekte

alert( a == b ); // falsch
```

Für Vergleiche wie `obj1 > obj2` oder für einen Vergleich mit einem primitiven Wert `obj == 5` werden Objekte in primitive Werte umgewandelt. Wir werden bald untersuchen, wie Objektumwandlungen funktionieren, aber um ehrlich zu sein, solche Vergleiche werden sehr selten benötigt -- normalerweise treten sie als Ergebnis eines Programmierfehlers auf.

````smart header="Const-Objekte können verändert werden"
Eine wichtige Nebenwirkung der Speicherung von Objekten als Referenzen ist, dass ein `const` deklariertes Objekt verändert werden kann.

Zum Beispiel:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

Es mag scheinen, dass die Zeile `(*)` einen Fehler verursacht, aber das tut sie nicht. Der Wert von `user` ist konstant, dieser muss immer auf dasselbe Objekt verweisen, aber Eigenschaften dieses Objekts können sich ändern.

Anders ausgedrückt, die `const user` verursacht nur dann einen Fehler, wenn wir versuchen `user=...` als ganzes zu setzen.

Das heißt aber auch, wenn wir wirklich konstante Objekteigenschaften benötigen, ist das auch möglich, jedoch mit völlig anderen Methoden. Das werden wir im Kapitel <info:property-descriptors> erwähnen.
````

## Klonen und Zusammenfügen, Object.assign [#cloning-and-merging-object-assign]

Das Kopieren einer Objektvariablen schafft also eine weitere Referenz auf dasselbe Objekt.

Aber was ist, wenn wir ein Objekt duplizieren müssen?

Wir können ein neues Objekt erstellen und die Struktur des bestehenden Objekts nachbilden, indem wir über seine Eigenschaften iterieren und diese auf der primitiven Ebene kopieren.

Das geht so:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = {}; // das neue leere Objekt

// lass uns alle Eigenschaften von user hineinkopieren
for (let key in user) {
  clone[key] = user[key];
}
*/!*

// jetzt ist clone ein vollständig unabhängiges Objekt mit demselben Inhalt
clone.name = "Pete"; // geänderte Daten darin

alert( user.name ); // immer noch John im Originalobjekt
```

Wir können auch die Methode [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) verwenden.

Die Syntax lautet:

```js
Object.assign(dest, ...sources)
```

- Das erste Argument `dest` ist ein Zielobjekt.
- Die weiteren Argumente sind eine Liste von Quellobjekten.

Es kopiert die Eigenschaften aller Quellobjekte in das Ziel `dest` und gibt es dann als Ergebnis zurück.

Zum Beispiel wenn wir ein `user`-Objekt haben, dann fügen wir ihm ein paar Berechtigungen hinzu:

```js run
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
// kopiert alle Eigenschaften von permissions1 und permissions2 in user
Object.assign(user, permissions1, permissions2);
*/!*

// jetzt user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // wahr
alert(user.canEdit); // wahr
```

Wenn der kopierte Eigenschaftsname bereits existiert, wird er überschrieben:

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // jetzt user = { name: "Pete" }
```

Wir können `Object.assign` auch verwenden, um eine einfache Objektkopie zu erstellen:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

Hier kopiert es alle Eigenschaften von `user` in ein leeres Objekt und gibt es zurück.

Es gibt auch andere Methoden, um ein Objekt zu klonen, z.B. unter Verwendung der [Spread-Syntax](info:rest-parameters-spread) `clone = {...user}`, die später im Tutorial behandelt wird.

## Geschachteltes Klonen

Bis jetzt sind wir davon ausgegangen, dass alle Eigenschaften von `user` primitiv sind. Aber Eigenschaften können auch Referenzen auf andere Objekte sein.

So wie hier:
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

Jetzt reicht es nicht aus `clone.sizes = user.sizes` zu kopieren, denn `user.sizes` ist ein Objekt und wird per Referenz kopiert, sodass `clone` und `user` dieselben Größen teilen:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // wahr, gleiches Objekt

// user und clone teilen sizes
user.sizes.width = 60;    // ändere eine Eigenschaft an einer Stelle
alert(clone.sizes.width); // 60, bekomme das Ergebnis von der anderen
```

Um das zu beheben und `user` und `clone` wirklich zu separaten Objekten zu machen, sollten wir eine Klon-Schleife verwenden, die jeden Wert von `user[key]` überprüft und, wenn es ein Objekt ist, dann auch dessen Struktur repliziert. Das wird als "tiefes Klonen" oder "strukturiertes Klonen" bezeichnet. Es gibt die [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)-Methode, die tiefes Klonen implementiert.


### structuredClone

Der Aufruf `structuredClone(object)` klont das `object` mit all seinen geschachtelten Eigenschaften.

So sieht es aus, wie wir es in unserem Beispiel nutzen können:

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

*!*
let clone = structuredClone(user);
*/!*

alert( user.sizes === clone.sizes ); // falsch, unterschiedliche Objekte

// user und clone stehen jetzt in keiner Beziehung mehr
user.sizes.width = 60;    // ändere eine Eigenschaft an einer Stelle
alert(clone.sizes.width); // 50, nicht verwandt
```

Die `structuredClone`-Methode kann die meisten Datentypen klonen, wie Objekte, Arrays, primitive Werte.

Sie unterstützt auch zirkuläre Referenzen, wenn eine Objekteigenschaft auf das Objekt selbst verweist (direkt oder über eine Kette von Referenzen).

Zum Beispiel:

```js run
let user = {};
// erstellen wir eine zirkuläre Referenz:
// user.me verweist auf das user selbst
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // wahr
```

Wie du sehen kannst, verweist `clone.me` auf den `clone`, nicht auf den `user`! Die zirkuläre Referenz wurde also korrekt geklont.

Allerdings gibt es Fälle, in denen `structuredClone` fehlschlägt.

Zum Beispiel, wenn ein Objekt eine Funktionseigenschaft hat:

```js run
// Fehler
structuredClone({
  f: function() {}
});
```

Funktionseigenschaften werden nicht unterstützt.

Um solche komplexen Fälle zu handhaben, müssen wir möglicherweise eine Kombination von Klonmethoden verwenden, benutzerdefinierten Code schreiben oder, um das Rad nicht neu zu erfinden, eine vorhandene Implementierung verwenden, zum Beispiel [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) aus der JavaScript-Bibliothek [lodash](https://lodash.com).

## Zusammenfassung

Objekte werden per Referenz zugewiesen und kopiert. Anders ausgedrückt, eine Variable speichert nicht den "Objektwert", sondern eine "Referenz" (Adresse im Speicher) auf den Wert. Das Kopieren einer solchen Variablen oder das Übergeben als Funktionsargument kopiert diese Referenz, nicht das Objekt selbst.

Alle Operationen über kopierte Referenzen (wie das Hinzufügen/Entfernen von Eigenschaften) werden am selben einzigen Objekt durchgeführt.

Um eine "echte Kopie" (ein Klon) zu erstellen, können wir `Object.assign` für die sogenannte "flache Kopie" (geschachtelte Objekte werden per Referenz kopiert) oder eine "tiefes Klonen" Funktion `structuredClone` verwenden oder eine benutzerdefinierte Klonimplementierung wie [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) nutzen.
