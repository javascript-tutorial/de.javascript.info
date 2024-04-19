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

Die [JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) ist ein generelles Format um Werte und Objekte zu repräsentieren. Es ist als [RFC 4627](https://tools.ietf.org/html/rfc4627) Standart beschrieben. Ursprünglich wurde es für JavaScript gemacht, aber andere Sprachen haben auch Bibliotheken um so etwas zu regeln. Also ist es einfach JSON für den Datenaustausch zu benutzen wenn der Klient JavaScript benutzt und der Server in Ruby, PHP, Java oder was auch immer geschrieben ist.

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

Here, the conversion fails, because of circular reference: `room.occupiedBy` references `meetup`, and `meetup.place` references `room`:

![](json-meetup.svg)


## Excluding and transforming: replacer

The full syntax of `JSON.stringify` is:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: A value to encode.

replacer
: Array of properties to encode or a mapping function `function(key, value)`.

space
: Amount of space to use for formatting

Most of the time, `JSON.stringify` is used with the first argument only. But if we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of `JSON.stringify`.

If we pass an array of properties to it, only these properties will be encoded.

For instance:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Here we are probably too strict. The property list is applied to the whole object structure. So the objects in `participants` are empty, because `name` is not in the list.

Let's include in the list every property except `room.occupiedBy` that would cause the circular reference:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Now everything except `occupiedBy` is serialized. But the list of properties is quite long.

Fortunately, we can use a function instead of an array as the `replacer`.

The function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one. Or `undefined` if the value is to be skipped.

In our case, we can return `value` "as is" for everything except `occupiedBy`. To ignore `occupiedBy`, the code below returns `undefined`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

Please note that `replacer` function gets every key/value pair including nested objects and array items. It is applied recursively. The value of `this` inside `replacer` is the object that contains the current property.

The first call is special. It is made using a special "wrapper object": `{"": meetup}`. In other words, the first `(key, value)` pair has an empty key, and the value is the target object as a whole. That's why the first line is `":[object Object]"` in the example above.

The idea is to provide as much power for `replacer` as possible: it has a chance to analyze and replace/skip even the whole object if necessary.


## Formatting: space

The third argument of `JSON.stringify(value, replacer, space)` is the number of spaces to use for pretty formatting.

Previously, all stringified objects had no indents and extra spaces. That's fine if we want to send an object over a network. The `space` argument is used exclusively for a nice output.

Here `space = 2` tells JavaScript to show nested objects on multiple lines, with indentation of 2 spaces inside an object:

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
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
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

The third argument can also be a string. In this case, the string is used for indentation instead of a number of spaces.

The `space` parameter is used solely for logging and nice-output purposes.

## Custom "toJSON"

Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available.

For instance:

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

Here we can see that `date` `(1)` became a string. That's because all dates have a built-in `toJSON` method which returns such kind of string.

Now let's add a custom `toJSON` for our object `room` `(2)`:

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

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and when `room` is nested in another encoded object.


## JSON.parse

To decode a JSON-string, we need another method named [JSON.parse](mdn:js/JSON/parse).

The syntax:
```js
let value = JSON.parse(str, [reviver]);
```

str
: JSON-string to parse.

reviver
: Optional function(key,value) that will be called for each `(key, value)` pair and can transform the value.

For instance:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Or for nested objects:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the same JSON format.

Here are typical mistakes in hand-written JSON (sometimes we have to write it for debugging purposes):

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

Besides, JSON does not support comments. Adding a comment to JSON makes it invalid.

There's another format named [JSON5](https://json5.org/), which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.

The regular JSON is that strict not because its developers are lazy, but to allow easy, reliable and very fast implementations of the parsing algorithm.

## Using reviver

Imagine, we got a stringified `meetup` object from the server.

It looks like this:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...And now we need to *deserialize* it, to turn back into JavaScript object.

Let's do it by calling `JSON.parse`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Whoops! An error!

The value of `meetup.date` is a string, not a `Date` object. How could `JSON.parse` know that it should transform that string into a `Date`?

Let's pass to `JSON.parse` the reviving function as the second argument, that returns all values "as is", but `date` will become a `Date`:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // now works!
```

By the way, that works for nested objects as well:

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
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## Summary

- JSON is a data format that has its own independent standard and libraries for most programming languages.
- JSON supports plain objects, arrays, strings, numbers, booleans, and `null`.
- JavaScript provides methods [JSON.stringify](mdn:js/JSON/stringify) to serialize into JSON and [JSON.parse](mdn:js/JSON/parse) to read from JSON.
- Both methods support transformer functions for smart reading/writing.
- If an object has `toJSON`, then it is called by `JSON.stringify`.
