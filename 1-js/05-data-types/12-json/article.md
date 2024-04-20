# JSON methods, toJSON

Wir stellen uns vor wir haben ein komplexes Objekt und wir würden es gern in eine Zeichenkette umwandeln, um es über ein Netzwerk zu senden oder es einfach nur für Dokumentationszwecke auszugeben.

Natürlicherweise sollte solch ein String alle wichtigen Eigenschaften besitzen.

Wir könnten die Unterhaltung folgendermaßen implementieren:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...Aber in dem Prozess der Entwicklung werden neue Eigenschaften hinzugefügt, alte werden umbenannt oder entfernt. Solch einen `toString` jedes mal zu aktualisieren ist nervig. Wir könnten versuchen in einer Schleife über die Eigenschaften zu gehen, aber was ist wenn das Objekt komplex ist und verschachtelte Objekt in seinen Eigenschaften hat? Wir müssten ihre Konversation auch implementieren.

Glücklicherweise müssen wir den Code nicht schreiben der das alles regelt. Die Aufgabe wurde bereits gelöst.

## JSON.stringify

Die [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) ist ein generelles Format um Werte und Objekte zu repräsentieren. Es ist als [RFC 4627](https://tools.ietf.org/html/rfc4627) Standard beschrieben. Ursprünglich wurde es für JavaScript gemacht, aber andere Sprachen haben auch Bibliotheken um so etwas zu regeln. Also ist es einfach JSON für den Datenaustausch zu benutzen wenn der Klient JavaScript benutzt und der Server in Ruby, PHP, Java oder was auch immer geschrieben ist.

JavaScript stellt Methoden bereit:

- `JSON.stringify` um Objekte in JSON zu konvertieren.
- `JSON.parse` um JSON zurück in Objekte zu konvertieren.

Zum Beispiel, hier benutzen wir `JSON.stringify` für einen Schüler:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // wir haben eine zeichenkette!

alert(json);
*!*
/* JSON-codiertes Objekt:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

Die Methode `JSON.stringify(student)` nimmt das Objekt und konvertiert es in eine Zeichenkette.

Die daraus resultierende `json` Zeichenkette wir als *JSON-codiertes* oder *serialisiertes* oder *stringifiziertes* oder *eingeteiltes* Objekt bezeichnet. Wir sind bereit es über ein Kabel zu verschicken oder es in als puren Text in einen Datenspeicher zu packen.


Bitte beachte, dass ein JSON-codiertes Objekt mehrere wichtige Unterschiede gegenüber einem wörtlichen Objekt besitzt:

- Zeichenketten benutzen doppelte Anführungszeichen. Keine einfachen Anführungsstricke oder Gravis in JSON. Aus `'John'` wird `"John"`.
- Namen von Objekt Eigenschaften haben auch doppelte Anführungszeichen. Das ist obligatorisch. Aus `age:30` wird `"age":30`.

`JSON.stringify` kann auch auf primitive Datentypen angewendet werden.

JSON unterstützt folgende Datentypen:

- Objekte `{ ... }`
- Arrays `[ ... ]`
- Primitive:
    - Zeichenketten,
    - Nummern,
    - bool'sche Werte `true/false`,
    - `null`.

Zum Beispiel:

```js run
// Eine Nummer in JSON ist nur eine Nummer
alert( JSON.stringify(1) ) // 1

// Eine Zeichenkette in JSON ist auch eine Zeichenkette, aber mit doppelten Anführungszeichen
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON ist eine nur Daten, Sprachen unabhängige Spezifikation, deshalb werden manche JavaScript-spezifische Objekt Eigenschaften von `JSON.stringify` übersprungen.

Hauptsächlich:

- Funktionseigenschaften (Methoden).
- Symbolische Schlüssel und Werte.
- Eigenschaften welche `undefined` speichern.

```js run
let user = {
  sayHi() { // ignoriert
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignoriert
  something: undefined // ignoriert
};

alert( JSON.stringify(user) ); // {} (leeres Objekt)
```

Typischerweise ist das ok. Wenn das nicht ist was wir wollen, dann werden wir bald sehen wie wir den Prozess anpassen.

Das gute ist, dass verschachtelte Objekte unterstützt werden und automatisch konvertiert werden.

Zum Beispiel:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* Die ganze Struktur ist stringifiziert:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Die wichtige Limitation: Es darf keine kreisförmigen Referenzen geben.

Zum Beispiel:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup referenziert room
room.occupiedBy = meetup; // room referenziert meetup

*!*
JSON.stringify(meetup); // Fehler: Kreisförmige Referenzen können nicht in JSON konvertiert werden.
*/!*
```

Here versagt die Umformung, wegen kreisförmigen Referenzen: `room.occupiedBy` referenziert `meetup`, und `meetup.place` referenziert `room`:

![](json-meetup.svg)


## Ausschließen und transformieren: replacer

Die vollständige Syntax für `JSON.stringify` ist:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Ein Wert zum codieren.

replacer
: Ein Array an Eigenschaften zum codieren oder einer Funktion zuweisen `function(key, value)`.

space
: Menge des Platzes welcher für das formatieren genutzt wird.

In den meisten Fällen wird `JSON.stringify` nur mit dem ersten Argument verwendet. Aber wenn wir den Austauschprozess verfeinern müssen, z.B. um kreisförmige Referenzen heraus zu filtern, können wir das zweite Argument von `JSON.stringify` nutzen.

Wenn wir ein Array von Eigenschaften übergeben werden nur diese Eigenschaften codiert.

Zum Beispiel:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referenziert room
};

room.occupiedBy = meetup; // room referenziert meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Hier sind wir wahrscheinlich zu strikt. Die Eigenschaftsliste wird auf die komplette Objekt Struktur angewendet. Deshalb sind die Objekte in `participants` leer, weil `name` nicht in der Liste ist.

Lass uns jede Eigenschaft einbinden außer `room.occupiedBy` welches eine kreisförmige Referenz bilden würde:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referenziert room
};

room.occupiedBy = meetup; // room referenziert meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Jetzt ist alles außer `occupiedBy` serialisiert. Aber die Liste an Eigenschaften ist recht lang.

Glücklicherweise können wir eine Funktion als `replacer` anstatt eines Arrays verwenden.

Die Funktion wird für jedes `(key, value)` Paar aufgerufen und sollte den "ersetzten" Wert zurückgeben, welcher anstelle für den originalen genutzt wird. Oder `undefined` wenn der Wert übersprungen werden soll.

In unserem Fall können wir `value` wie er ist für alles außer `occupiedBy`. Um `occupiedBy` zu ignorieren gibt der Code stattdessen `undefined` zurück:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup referenziert room
};

room.occupiedBy = meetup; // room referenziert meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value Paare die zu replacer kommen:
:             [objekt Objekt]
title:        Conference
participants: [objekt Objekt],[objekt Objekt]
0:            [objekt Objekt]
name:         John
1:            [objekt Objekt]
name:         Alice
place:        [objekt Objekt]
number:       23
occupiedBy: [objekt Objekt]
*/
```

Bitte beachte, dass das die `replacer` Funktion alle Schlüssel/Wert Paare einschließlich verschaltelter Objekte und Array Einträge kriegt. Es wird rekursiv angewendet. Der Wert von `this` in `replacer` ist das Objekt, das die aktuelle Eigenschaft beinhaltet.

Der erste Aufruf ist speziell. Er wird mithilfe eines speziellen "Wrapper Objekts" gemacht: `{"": meetup}`. In anderen Worten, das erste `(key, value)` Paar hat einen leeren Schlüssel und der Wert ist das Ziel Objekt als ganzes. Das ist der Grund warum die erste Zeile im Beispiel `":[object Object]"` ist.

Die Idee ist es `replacer` soviel Macht wie möglich zu geben: es hat eine Chance auch das ganze Objekt zu analysieren und zu ersetzen/überspringen wenn nötig.


## Formatieren: space

Das dritte Argument von `JSON.stringify(value, replacer, space)` ist die Anzahl an Leerzeichen die für schönes Formatieren genutzt werden soll.

Vorher hatten alle stringifizierten Objekte keine Einzüge und extra Leerzeichen. Das ist ok wenn wir ein Objekt über ein Netzwerk senden wollen. Das `space` Argument wird ausschließlich für eine schöne Ausgabe verwendet.

Hier sagt `space = 2` JavaScript verschachtelte Objekte auf mehreren Zeilen anzuzeigen mit einem Einzug von 2 Leerzeichen in einem Objekt:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* Zwei Leerzeichen Einzüge:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* für JSON.stringify(user, null, 4) würde das Ergebnis mehr eingerückt sein:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

Das dritte Argument kann auch eine Zeichenkette sein. In diesem Fall wird die Zeichenkette für als Einzug verwendet anstatt einer Anzahl von Leerzeichen.

Der `space` Parameter wird ausschließlich für Protokollierung und schöne Ausgaben verwendet.

## Benutzerdefinierte "toJSON"

Wie `toString` für Zeichenketten Umwandlung kann ein Objekt `toJSON` für zu-JSON Umwandlung nutzen. `JSON.stringify` ruft es automatisch auf, wenn verfügbar.

Zum Beispiel:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Hier können wir sehen, dass `date` `(1)` eine Zeichenkette geworden ist. Das liegt daran, dass alle Daten eine eingebautte `toJSON` Methode haben, die solch eine Zeichenkette zurückgibt.

Lasst uns nun eine benutzerdefinierte `toJSON` für unser Objekt `room` `(2)` hinzufügen:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

Wie wir sehen können wird `toJSON` für den direkten Aufruf von `JSON.stringify(room)` und wenn `room` in einem anderen codierten Objekt verschachtelt ist genutzt.


## JSON.parse

Um eine JSON-Zeichenkette zu decodieren brauchen wir eine andere Methode names [JSON.parse](mdn:js/JSON/parse).

Die Syntax:
```js
let value = JSON.parse(str, [reviver]);
```

str
: Zu übergebende JSON-Zeichenkette.

reviver
: Optionale Funktion(Schlüssel, Wert), die für jedes `(key, value)` Paar aufgerufen wird und den Wert verändern kann.

Zum Beispiel:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Oder für verschachtelte Objekte:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

Die JSON kann so komplex wie nötig sein, Objekte und Arrays können andere Objekte und Arrays enthalten. Aber sie müssen sich an das selbe JSON format halten.

Hier sind typische Fehler in handschriftlichen JSON (manchmal müssen wir es für Fehlersuche schreiben):

```js
let json = `{
  *!*name*/!*: "John",                     // Fehler: Eigenschaftsname ohne Anführungszeichen
  "surname": *!*'Smith'*/!*,               // Fehler: Einfache Anführungszeichen im Wert (müssen doppelt sein)
  *!*'isAdmin'*/!*: false                  // Fehler: Einfache Anführungszeichen im Schlüssel (müssen doppelt sein)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // Fehler: Kein "new" ist erlaubt, nur nackte Werte
  "friends": [0,1,2,3]              // Hier ist alles gut
}`;
```

Außerdem unterstützt JSON keine Kommentare. Einen Kommentar zu JSON hinzuzufügen macht es ungültig.

Es gibt ein anderes Format names [JSON5](https://json5.org/), welches Schlüssel ohne Anführungszeichen, Kommentare etc. erlaubt. Aber dies ist eine alleinstehende Bibliothek, nicht in der Spezifikation der Sprache.

Das normale JSON ist nicht deshalb so strikt, weil seine Entwickler faul sind, aber um einfache, zuverlässige und sehr schnelle Implementation für den Übergabe Algorithmus zu erlauben.

## reviver benutzen

Stell dir vor wir haben ein stringifiziertes Objekt `meetup` vom Server.

Es sieht so aus:

```js
// title: (meetup Titel), date: (meetup Datum)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...Und jetzt müssen wir es *deserialisieren* um es wieder zu einem JavaScript Objekt zu machen.

Lass uns das tun indem wir `JSON.parse` aufrufen:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Fehler!
*/!*
```

Oops! Ein Fehler!

Der Wert von `meetup.date` ist eine Zeichenkette und kein `Date` Objekt. Wie könnte `JSON.parse` wissen, dass es diese Zeichenkette in ein `Datum` umwandeln sollte?

Lass uns die Wiederbelebungsfunktion als zweites Argument an `JSON.parse` übergeben, die alle Werte so wie sie sind wiedergibt, aber `date` wird ein `Datum` :

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // funktioniert jetzt!
```

Übrigens, das funktioniert auch für verschachtelte Objekte:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // funktioniert!
*/!*
```



## Zusammenfassung

- JSON ist ein Datenformat, dass seinen eigenen unabhängigen Standard und eigene Bibliotheken für die meisten Programmiersprachen hat.
- JSON unterstützt einfache Objekte, Arrays, Zeichenketten, Nummern, Booleans und `null`.
- JavaScript stellt die Methoden [JSON.stringify](mdn:js/JSON/stringify) um zu JSON zu serialisieren und [JSON.parse](mdn:js/JSON/parse) um JSON auszulesen.
- Beide Methoden unterstützen Transformatorfunktionen für schlaues lesen/schreiben.
- Wenn ein Objekt `toJSON` hat, dann wird es mit `JSON.stringify` aufgerufen.
