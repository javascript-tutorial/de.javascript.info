# Datentypen

<<<<<<< HEAD
Eine Variable in JavaScript kann beliebige Daten enthalten. Eine Variable kann in einem Moment eine Zeichenkette und in einem anderen eine Zahl sein:
=======
A value in JavaScript is always of a certain type. For example, a string or a number.

There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
// kein Fehler
let message = "Hallo";
message = 123456;
```

<<<<<<< HEAD
Programmiersprachen, die solche Dinge erlauben, werden als "dynamisch typisiert" bezeichnet, was bedeutet, dass es Datentypen gibt, aber Variablen an keine von ihnen gebunden sind.

Es gibt acht grundlegende Datentypen in JavaScript. Hier werden wir sie allgemein behandeln und in den nächsten Kapiteln detailliert auf sie eingehen.
=======
Programming languages that allow such things, such as JavaScript, are called "dynamically typed", meaning that there exist data types, but variables are not bound to any of them.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Number

```js
let n = 123;
n = 12.345;
```

Der Typ *number* repräsentiert sowohl Ganzzahl, als auch Gleitkommazahlen.

Es gibt viele Operationen für Zahlen, z.B. Multiplikation `*`, Division `/`, Addition `+`, Subtraktion `-` und so weiter.

Neben regulären Zahlen gibt es sogenannte "numerische Sonderwerte", die ebenfalls zu diesem Datentyp gehören: `Infinity`, `-Infinity` und `NaN`.

- `Infinity` repräsentiert die mathematische [Unendlichkeit](https://de.wikipedia.org/wiki/Unendlichkeit) ∞. Es ist ein spezieller Wert, der größer als jede Zahl ist.

    Wir können es als Ergebnis der Division durch Null erhalten:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Oder verweise einfach direkt darauf:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` repräsentiert einen Rechenfehler. Es ist das Ergebnis einer falschen oder undefinierten mathematischen Operation, zum Beispiel:

    ```js run
    alert( "keine Zahl" / 2 ); // NaN, eine solche Teilung ist falsch
    ```

    `NaN` ist starr. Jede weitere Operation an `NaN` gibt` NaN` zurück:

    ```js run
    alert( "keine Zahl" / 2 + 5 ); // NaN
    ```

    Wenn sich also irgendwo in einem mathematischen Ausdruck ein `NaN` befindet, wird es zum gesamten Ergebnis weitergegeben.

```smart header="Mathematische Operationen sind sicher"
Mathematik ist in JavaScript "sicher". Wir können alles tun: durch Null dividieren, nicht numerische Zeichenfolgen als Zahlen behandeln usw.

Das Skript wird niemals mit einem schwerwiegenden Fehler ("Programmabbruch") beendet. Im schlimmsten Fall erhalten wir als Ergebnis `NaN`.
```

Spezielle numerische Werte gehören formal zum Typ "number". Natürlich sind sie keine Zahlen im üblichen Sinne.

Mehr über das Arbeiten mit Zahlen erfahren wir in diesem Kapitel <info:number>.

## BigInt

<<<<<<< HEAD
In JavaScript kann der Typ "number" keine Ganzzahlwerte darstellen, die größer als <code>2<sup>53</sup></code> (oder kleiner als <code>-2<sup>53</sup></code> für Negative), sind. Das ist eine technische Einschränkung, die durch ihre interne Darstellung verursacht wird. Das sind ungefähr 16 Dezimalstellen, daher ist die Beschränkung für die meisten Zwecke kein Problem, aber manchmal benötigen wir wirklich große Zahlen, z.B. für Verschlüsselungen oder Zeitstempel mit Mikrosekundengenauigkeit.
=======
In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(-2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.

For most purposes that's quite enough, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

Der Typ `BigInt` wurde kürzlich der Sprache hinzugefügt, um Ganzzahlen beliebiger Länge darzustellen.

<<<<<<< HEAD
Ein `BigInt` wird durch Anhängen von `n` an das Ende einer Ganzzahl erstellt:
=======
A `BigInt` value is created by appending `n` to the end of an integer:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
// Das "n" am Ende bedeutet, dass es ein BigInt ist
const bigInt = 1234567890123456789012345678901234567890n;
```

<<<<<<< HEAD
Da `BigInt`-Zahlen selten benötigt werden, haben wir ihnen ein eigenes Kapitel gewidmet <info:bigint>.

```smart header="Kompatibilitätsprobleme"
Derzeit wird `BigInt` in Firefox und Chrome unterstützt, nicht jedoch in Safari/IE/Edge.
=======
As `BigInt` numbers are rarely needed, we don't cover them here, but devoted them a separate chapter <info:bigint>. Read it when you need such big numbers.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox/Chrome/Edge, but not in Safari/IE.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```

## String

Ein String in JavaScript muss in Anführungszeichen gesetzt werden.

```js
let str = "Hallo";
let str2 = 'Einfache Anführungszeichen sind auch in Ordnung';
let phrase = `kann einen anderen ${str} einbetten`;
```

In JavaScript gibt es drei Arten von Anführungszeichen.

1. Doppelte Anführungszeichen: `"Hallo"`.
2. Einfache Anführungszeichen: `'Hallo'`.
3. Backticks: <code>&#96;Hallo&#96;</code>.

Doppelte und einfache Anführungszeichen sind "simple" Anführungszeichen. In JavaScript gibt es praktisch keinen Unterschied zwischen ihnen.

Backticks sind Anführungszeichen mit "erweiterter Funktionalität". Sie ermöglichen es uns, Variablen und Ausdrücke in einen String einzubetten, indem wir sie in `${…}` einschließen, zum Beispiel:

```js run
let name = "John";

// Einbetten einer Variable
alert( `Hallo, *!*${name}*/!*!` ); // Hallo, John!

// Einbetten eines Ausdrucks
alert( `Das Ergebnis ist *!*${1 + 2}*/!*` ); // Das Ergebnis ist 3
```

Der Ausdruck in `${…}` wird ausgewertet und das Ergebnis wird Teil des Strings. Wir können alles hineinstecken: eine Variable wie `name` oder einen arithmetischen Ausdruck wie `1 + 2` oder etwas komplexeres.

Bitte beachte, dass dies nur bei Backticks möglich ist. Andere Anführungszeichen haben diese Einbettungsfunktion nicht!
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)
```

In diesem Kapitel werden wir uns eingehender mit Strings befassen <info:string>.

```smart header="Es gibt keinen *Zeichen*-Typ."
In einigen Sprachen gibt es einen speziellen "Zeichen"-Typ für ein einzelnes Zeichen. In der C-Sprache und in Java heißt er beispielsweise "char".

In JavaScript gibt es so einen Typ nicht. Es gibt nur einen Typ: `string`. Eine Zeichenfolge kann aus nur einem oder mehreren Zeichen bestehen.
```

## Boolean (logische Werte)

Ein Boolean hat nur zwei Werte: `true` und `false`.

Dieser Typ wird häufig zum Speichern von Ja/Nein-Werten verwendet: `true` bedeutet "ja, richtig" und `false` bedeutet "nein, falsch".

Zum Beispiel:

```js
let nameFieldChecked = true; // ja, Feld (Name) ist markiert
let ageFieldChecked = false; // nein, Feld (Alter) ist nicht markiert
```

Boolesche Werte ergeben sich auch aus Vergleichen:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (das Vergleichsergebnis ist "richtig")
```

Wir werden uns im Kapitel <info:logical-operators> eingehender mit loglischen Werten befassen.

## Der Wert "null"

Der spezielle `null`-Wert gehört zu keinem der oben beschriebenen Typen.

Er bildet einen eigenen Typ, der nur den Wert `null` enthält:

```js
let age = null;
```

In JavaScript ist `null` kein "Verweis auf ein nicht vorhandenes Objekt" oder ein "Nullzeiger" wie in einigen anderen Sprachen.

Es ist nur ein spezieller Wert, der "nichts", "leer" oder "Wert unbekannt" darstellt.

<<<<<<< HEAD
Der obige Code besagt, dass `age` aus irgendeinem Grund unbekannt oder leer ist.
=======
The code above states that `age` is unknown.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Der Wert "undefined"

Der spezielle Wert `undefined` steht ebenfalls abseits. Er bildet einen eigenen Typ, genau wie `null`.

Die Bedeutung von `undefined` ist "Wert ist nicht zugewiesen".

Wenn eine Variable deklariert, aber nicht zugewiesen ist, ist ihr Wert `undefined`:

```js run
let age;

<<<<<<< HEAD
alert(x); // zeigt "undefined"
```

Technisch gesehen ist es möglich, jeder Variablen ein `undefined` zuzuweisen:
=======
alert(age); // shows "undefined"
```

Technically, it is possible to explicitly assign `undefined` to a variable:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

<<<<<<< HEAD
...Aber wir empfehlen das nicht. Normalerweise verwenden wir `null`, um einer Variablen einen "leeren" oder "unbekannten" Wert zuzuweisen, und `undefined`, um zu überprüfen, ob eine Variable zugewiesen wurde.
=======
...But we don't recommend doing that. Normally, one uses `null` to assign an "empty" or "unknown" value to a variable, while `undefined` is reserved as a default initial value for unassigned things.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Objekte und Symbole

Der Typ `object` ist etwas Besonderes.

<<<<<<< HEAD
Alle anderen Typen werden als "primitive" (skalare) Datentypen bezeichnet, da ihre Werte nur ein einzelnes Element enthalten können (sei es eine Zeichenfolge oder eine Zahl oder was auch immer). Im Gegensatz dazu werden Objekte zum Speichern von Datensammlungen und komplexeren Einheiten verwendet. Wir werden später im Kapitel <info:object> darauf eingehen, nachdem wir mehr über skalare Datentypen erfahren haben.

Der Typ `symbol` wird verwendet, um eindeutige Bezeichner für Objekte zu erstellen. Der Vollständigkeit halber erwähnen wir es hier, aber wir werden ihn nach den Objekten untersuchen.
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

Being that important, objects deserve a special treatment. We'll deal with them later in the chapter <info:object>, after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Der Operator typeof [#type-typeof]

Der Operator `typeof` gibt den Typ des Arguments zurück. Dies ist nützlich, wenn wir Werte verschiedener Typen unterschiedlich verarbeiten oder nur eine schnelle Überprüfung durchführen möchten.

Es werden zwei Syntaxformen unterstützt:

1. Als Operator: `typeof x`.
2. Als Funktion: `typeof(x)`.

Mit anderen Worten, es funktioniert mit oder ohne Klammern. Das Ergebnis ist das Gleiche.

Der Aufruf von `typeof x` gibt einen String mit dem Typ zurück:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Die letzten drei Zeilen bedürfen möglicherweise einer zusätzlichen Erläuterung:

<<<<<<< HEAD
1. `Math` ist ein eingebautes Objekt, das mathematische Operationen liefert. Wir werden es im Kapitel <info:number> lernen. Hier dient es nur als Beispiel für ein Objekt.
2. Das Ergebnis von `typeof null` ist `"object"`. Das ist falsch. Es ist ein offiziell anerkannter Fehler, der aus Kompatibilitätsgründen erhalten wurde. Natürlich ist `null` kein Objekt. Es ist ein besonderer Wert mit einem eigenen Typ. Also, nochmal, es ist ein Fehler der Sprache.
3. Das Ergebnis von `typeof alert` ist `"function"`, da `alert` eine Funktion ist. Wir werden Funktionen in den nächsten Kapiteln untersuchen, in denen wir auch feststellen werden, dass es in JavaScript keinen speziellen "Funktionstyp" gibt. Funktionen gehören zum Objekttyp. Aber `typeof` behandelt sie anders und gibt `"function"` zurück. Das ist nicht ganz richtig, aber in der Praxis sehr nützlich.
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof` behavior, coming from the early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

## Zusammenfassung

Es gibt 8 grundlegende Datentypen in JavaScript.

<<<<<<< HEAD
- `number` für Zahlen jeglicher Art: Ganzzahl oder Gleitkommazahl, ganze Zahlen werden begrenzt durch ±2<sup>53</sup>.
- `bigint` steht für ganzzahlige Zahlen beliebiger Länge.
- `string` für Zeichenketten. Eine String kann aus einem oder mehreren Zeichen bestehen. Es gibt keine separaten Einzelzeichen.
- `boolean` für `true`/`false`.
- `null` für unbekannte Werte -- ein eigenständiger Typ mit einem einzelnen Wert `null`.
- `undefined` für nicht zugewiesene Werte -- ein eigenständiger Typ mit einem einzelnen Wert `undefined`.
- `object` für komplexere Datenstrukturen.
- `symbol` für eindeutige Kennungen.
=======
- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

Mit dem Operator `typeof` können wir sehen, welcher Typ in einer Variablen gespeichert ist.

- Zwei Formen: `typeof x` oder `typeof(x)`.
- Gibt einen String mit dem Namen des Typs zurück, wie `"string"`.
- Für `null` gibt es `"object"` zurück -- dies ist ein Fehler in der Sprache, es ist eigentlich kein Objekt.

In den nächsten Kapiteln werden wir uns auf skalare Datentypen konzentrieren und, sobald wir mit ihnen vertraut sind, zu Objekten übergehen.
