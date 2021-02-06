
# Optionale Verkettung '?.'

[recent browser="new"]

Der Optionale-Verkettungs-Operator `?.` ermöglicht es, auf einen Wert einer verschachtelten
Objekteigenschaft zuzugreifen, ohne dass jede Eigenschaft existieren muss.

## Das Problem

Personen, die erst gerade dabei sind, JavaScript zu lernen, kamen wahrscheinlich mit diesem
Problem noch nicht in Berührung, allerdings tritt dieses sehr häufig in der Praxis auf.

Beispielsweise haben einige unserer Benutzer eine Adresse, allerdings fehlt diese bei manchen.
Dadurch ist die Verwendung von `user.address.street` nicht sicher:

```js run
let user = {}; // Benutzer ohne Adresse

alert(user.address.street); // Fehler!
```

Oder man möchte in der Webentwicklung auf ein bestimmtes Element auf der Webseite zugreifen,
das aber möglicherweise gar nicht existiert:

```js run
// Fehler, wenn das Ergebnis von querySelector(...) null ist
let html = document.querySelector('.my-element').innerHTML;
```

Vor der Einführung von `?.` in die Sprache wurde oft der `&&` Operator verwendet, um das
Problem zu umgehen.

Zum Beispiel:

```js run
let user = {}; // Benutzer hat keine Adresse

alert( user && user.address && user.address.street ); // undefined (kein Fehler)
```

Den gesamten Pfad und die Eigenschaft mit UND zu verknüpfen stellt sicher, dass alle Komponenten
existieren. Allerdings ist dies sehr umständlich.

## Optionale Verkettung

Der Optionale-Verkettungs-Operator (Optional Chaining) `?.` stoppt die Auswertung und gibt
`undefined` zurück, sobald der Teil vor `?.` zu `undefined` oder `null` evaluiert.

**Aus Platzgründen verwenden wir im weiteren Verlauf dieses Artikels den Begriff
"etwas existiert", wenn etwas nicht `null` oder `undefined` ist.**

Hier die sichere Variante um auf `user.address.street` zuzugreifen:

```js run
let user = {}; // Benutzer hat keine Adresse

alert( user?.address?.street ); // undefined (kein Fehler)
```

Es ist sogar möglich, die Adresse von `user?.address` zu lesen, obwohl das Objekt `user`
gar nicht existiert:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Hinweis: Die Syntax mit `?.` macht nur den Wert davor optional, nicht den Wert der danach kommt.

Im oberen Beispiel `user?.` darf also nur `user` den Wert `null/undefined` haben.

Wenn `user` allerdings existiert, so muss das Objekt die Eigenschaft `user.address` besitzen,
sonst liefert `user?.address.street` beim zweiten Punkt einen Fehler.

```warn header="Optional Chaining nicht übertreiben"
Der Operator `?.` sollte nur verwendet werden, wenn es erlaubt ist, dass etwas nicht existiert.

Wenn zum Beispiel laut unserer Geschäftslogik das Objekt `user` existieren muss, aber `address` ist optional, dann wäre es besser `user.address?.street` zu verwenden.

Wenn dann `user` fälschlicherweise nicht definiert ist, merken wir es und können den Fehler beheben. Sonst passieren Programmierfehler im Hintergrund und können nur schwer behoben werden.
```

````warn header="Die Variable vor `?.` muss deklariert sein"
Existiert die Variable `user` nicht, so liefert `user?.anything` einen Fehler:

```js run
// ReferenceError: user is not defined
user?.address;
```
Es muss ein `let/const/var user` irgendwo geben. Die optionale Verkettung funktioniert nur bei deklarierten Variablen.
````

## Kurzschlussverfahren

Wie schon erwähnt stoppt der Operator `?.` die Ausführung sobald der linke Teil nicht existiert.

Mögliche Funktionsaufrufe oder Nebeneffekte werden also nicht ausgeführt:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // nichts passiert

alert(x); // 0, Wert hat sich nicht erhöht
```

## Weitere Formen: ?.(), ?.[]

Der Optionale-Verkettungs-Operatorr `?.` ist in Wahrheit gar kein Operator sondern ein besonderes Syntax-Konstrukt, das auch mit Funktionen und eckigen Klammern funktioniert.

Beispielsweise lässt sich `?.()` zum Aufruf einer Funktion nutzen die es möglicherweise nicht gibt.

Im folgenden Codeausschnitt haben manche Benutzer die Methode `admin` und manche nicht:

```js run
let user1 = {
  admin() {
    alert("Ich bin Administrator");
  }
}

let user2 = {};

*!*
user1.admin?.(); // Ich bin Administrator
user2.admin?.();
*/!*
```

In beiden Zeilen verwenden wir zuerst die Punktnotation `.` um die Eigenschaft `admin` abzurufen. Da es das Objekt `user` geben muss, ist es sicher darauf zuzugreifen.

Dann prüft `?.()` die linke Seite: wenn die admin Funktion existiert, dann wird diese ausgeführt (für `user1`). Sonst (für `user2`) stoppt die Ausführung ohne Fehler.

Die Syntax `?.[]` funktioniert auch, wenn man mit eckigen Klammern anstatt mit der Punktnotation auf eine Objekteigenschaft zugreifen möchte. Ähnlich wie vorher ist es möglich, eine Eigenschaft auf sichere Art und Weise zu lesen, die es vielleicht nicht gibt.

```js run
let user1 = {
  firstName: "Johannes"
};

let user2 = null; // Benutzer konnte möglicherweise nicht authorisiert werden

let key = "firstName";

alert( user1?.[key] ); // Johannes
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

Wir können `?.` auch mit `delete` verwenden:

```js run
delete user?.name; // lösche user.name wenn der Benutzer existiert
```

```warn header="Wir können `?.` für sicheres Lesen und Löschen verwenden, aber nicht bei Zuweisungen"
Der Optionale-Verkettungs-Operator `?.` findet keine Anwendung auf der linken Seite eines Statements:

```js run
// der Name soll an user.name zugewiesen werden, wenn der Benutzer existiert

user?.name = "Johannes"; // Fehler, funktioniert nicht
// weil es zu undefined = "Johannes" evaluiert wird
```

## Zusammenfassung

Die `?.` Syntax hat drei Formen:

1. `obj?.prop` -- liefert `obj.prop` wenn `obj` existiert, sonst `undefined`.
2. `obj?.[prop]` -- liefert `obj[prop]` wenn `obj` existiert, sonst `undefined`.
3. `obj?.method()` -- ruft `obj.method()` auf wenn `obj` existiert, sonst wird `undefined` zurückgegeben.

Wie wir sehen können sind alle drei Formen unkompliziert und leicht zu verwenden. Das `?.` prüft die linke Seite auf `null/undefined` und erlaubt die weitere Ausführung wenn dies nicht der Fall ist.

Eine Verkettung von `?.` erlaubt den sicheren Zugriff auf verschachtelte Objekteigenschaften.

Trotzdem sollten wir `?.` mit Vorsicht genießen und nur dann benutzen, wenn es beabsichtigt ist, dass der linke Teil nicht existiert.

Dann werden mögliche Programmierfehler auch angezeigt, wenn diese auftreten.