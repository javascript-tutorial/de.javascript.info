# Datentypen

Ein Wert in JavaScript ist immer von einem bestimmten Typ. Zum Beispiel eine Zeichenfolge oder eine Zahl.

Es gibt acht grundlegende Datentypen in JavaScript. Hier werden wir sie allgemein behandeln, und in den nächsten Kapiteln werden wir auf jeden von ihnen im Detail eingehen.

Wir können jeden beliebigen Typ in eine Variable setzen. Zum Beispiel kann eine Variable in einem Moment eine Zeichenfolge sein und dann eine Zahl speichern:

```js
// kein Fehler
let message = "Hallo";
message = 123456;
```

Programmiersprachen, die solche Eigenschaften ermöglichen, wie z.B. JavaScript, werden als "dynamisch typisiert" bezeichnet, d.h. es gibt zwar Datentypen, aber die Variablen sind nicht an einen dieser Typen gebunden.

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

<<<<<<< HEAD
    `NaN` ist starr. Jede weitere Operation an `NaN` gibt` NaN` zurück:

    ```js run
    alert( "keine Zahl" / 2 + 5 ); // NaN
    ```

    Wenn sich also irgendwo in einem mathematischen Ausdruck ein `NaN` befindet, wird es zum gesamten Ergebnis weitergegeben.
=======
    `NaN` is sticky. Any further mathematical operation on `NaN` returns `NaN`:

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result (there's only one exception to that: `NaN ** 0` is `1`).
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```smart header="Mathematische Operationen sind sicher"
Mathematik ist in JavaScript "sicher". Wir können alles tun: durch Null dividieren, nicht numerische Zeichenfolgen als Zahlen behandeln usw.

Das Skript wird niemals mit einem schwerwiegenden Fehler ("Programmabbruch") beendet. Im schlimmsten Fall erhalten wir als Ergebnis `NaN`.
```

Spezielle numerische Werte gehören formal zum Typ "number". Natürlich sind sie keine Zahlen im üblichen Sinne.

Mehr über das Arbeiten mit Zahlen erfahren wir in diesem Kapitel <info:number>.

## BigInt [#bigint-type]

<<<<<<< HEAD
<<<<<<< HEAD
In JavaScript kann der Typ "Zahl" keine ganzzahligen Werte darstellen, die größer als <code>(2<sup>53</sup>-1)</code> (das ist `9007199254740991`) oder kleiner als <code>-(-2<sup>53</sup>-1)</code> für Negative sind. Es handelt sich um eine technische Einschränkung, die durch ihre interne Darstellung bedingt ist.
=======
In JavaScript, the "number" type cannot represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives. It's a technical limitation caused by their internal representation.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Für die meisten Zwecke reicht das völlig aus, aber manchmal brauchen wir wirklich große Zahlen, z.B. für die Kryptographie oder Zeitstempel mit Mikrosekunden-Genauigkeit.
=======
In JavaScript, the "number" type cannot safely represent integer values larger than <code>(2<sup>53</sup>-1)</code> (that's `9007199254740991`), or less than <code>-(2<sup>53</sup>-1)</code> for negatives.

To be really precise, the "number" type can store larger integers (up to <code>1.7976931348623157 * 10<sup>308</sup></code>), but outside of the safe integer range <code>±(2<sup>53</sup>-1)</code> there'll be a precision error, because not all digits fit into the fixed 64-bit storage. So an "approximate" value may be stored.

For example, these two numbers (right above the safe range) are the same:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

So to say, all odd integers greater than <code>(2<sup>53</sup>-1)</code> can't be stored at all in the "number" type.

For most purposes <code>±(2<sup>53</sup>-1)</code> range is quite enough, but sometimes we need the entire range of really big integers, e.g. for cryptography or microsecond-precision timestamps.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

Der Typ `BigInt` wurde kürzlich der Sprache hinzugefügt, um Ganzzahlen beliebiger Länge darzustellen.

Ein `BigInt`-Wert wird durch Anhängen von `n` an das Ende einer Ganzzahl erzeugt:

```js
// Das "n" am Ende bedeutet, dass es ein BigInt ist
const bigInt = 1234567890123456789012345678901234567890n;
```

Da `BigInt`-Zahlen selten benötigt werden, behandeln wir sie hier nicht, sondern widmen ihnen ein eigenes Kapitel <info:bigint>. Lies es, wenn du so große Zahlen brauchst.

<<<<<<< HEAD
```smart header="Compatability issues"
Im Moment wird `BigInt` in Firefox/Chrome/Edge unterstützt, aber nicht in Safari/IE.
=======

```smart header="Compatibility issues"
Right now, `BigInt` is supported in Firefox/Chrome/Edge/Safari, but not in IE.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
```

You can check [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) to know which versions of a browser are supported.

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

<<<<<<< HEAD
In JavaScript gibt es so einen Typ nicht. Es gibt nur einen Typ: `string`. Eine Zeichenfolge kann aus nur einem oder mehreren Zeichen bestehen.
=======
In JavaScript, there is no such type. There's only one type: `string`. A string may consist of zero characters (be empty), one character or many of them.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
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

Der oben genannte Code besagt, dass `age` unbekannt ist.

## Der Wert "undefined"
Der spezielle Wert `undefined` steht ebenfalls abseits. Er bildet einen eigenen Typ, genau wie `null`.

Die Bedeutung von `undefined` ist "Wert ist nicht zugewiesen".

Wenn eine Variable deklariert, aber nicht zugewiesen ist, ist ihr Wert `undefined`:

```js run
let age;

alert(age); // zeigt "undefined"
```

Technisch gesehen ist es möglich, jeder Variablen ein `undefined` zuzuweisen:

```js run
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

...Aber wir raten davon ab, das zu tun. Normalerweise verwendet man `null`, um einer Variablen einen "leeren" oder "unbekannten" Wert zuzuweisen, während `undefined` als Standard-Anfangswert für nicht zugewiesene Werte reserviert ist.

## Objekte und Symbole

Der Typ `object` ist etwas Besonderes.

Alle anderen Typen werden als "primitiv" bezeichnet, weil ihre Werte nur eine einzige Sache enthalten können (sei es eine Zeichenfolge oder eine Zahl oder was auch immer). Im Gegensatz dazu werden Objekte zur Speicherung von Datensammlungen und komplexeren Entitäten verwendet.

Da Objekte so wichtig sind, verdienen sie besondere Aufmerksamkeit. Wir werden sie später im Kapitel <info:object> behandeln, nachdem wir mehr über Primitive erfahren haben.

Der Typ `symbol` wird verwendet, um eindeutige Bezeichner für Objekte zu erstellen. Wir müssen es hier der Vollständigkeit halber erwähnen, aber auch die Details aufschieben, bis wir Objekte kennen.

## Der Operator typeof [#type-typeof]

Der Operator `typeof` gibt den Typ des Arguments zurück. Dies ist nützlich, wenn wir Werte verschiedener Typen unterschiedlich verarbeiten oder nur eine schnelle Überprüfung durchführen möchten.

<<<<<<< HEAD
<<<<<<< HEAD
Es werden zwei Syntaxformen unterstützt:
=======
The `typeof` operator returns the type of the operand. It's useful when we want to process values of different types differently or just want to do a quick check.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

1. Als Operator: `typeof x`.
2. Als Funktion: `typeof(x)`.

Mit anderen Worten, es funktioniert mit oder ohne Klammern. Das Ergebnis ist das Gleiche.

Der Aufruf von `typeof x` gibt einen String mit dem Typ zurück:
=======
A call to `typeof x` returns a string with the type name:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

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
2. Das Ergebnis von `typeof null` ist `"object"`. Das ist ein offiziell anerkannter Fehler im `typeof`-Verhalten, der aus den frühen Tagen von JavaScript stammt und aus Kompatibilitätsgründen beibehalten wurde. Definitiv ist `null` kein Objekt. Es ist ein besonderer Wert mit einem eigenen Typ.
3. Das Ergebnis von `typeof alert` ist `"function"`, denn `alert` ist eine Funktion. Wir werden Funktionen in den nächsten Kapiteln untersuchen, wo wir auch sehen werden, dass es keinen speziellen "Funktionstyp" in JavaScript gibt. Funktionen gehören zum Objekttyp. Aber `typeof` behandelt sie anders und gibt `"function"` zurück. Auch das stammt aus den frühen Tagen von JavaScript. Technisch gesehen ist ein solches Verhalten nicht korrekt, kann aber in der Praxis bequem sein.

## Zusammenfassung
=======
1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's an officially recognized error in `typeof`, coming from very early days of JavaScript and kept for compatibility. Definitely, `null` is not an object. It is a special value with a separate type of its own. The behavior of `typeof` is wrong here.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That also comes from the early days of JavaScript. Technically, such behavior isn't correct, but can be convenient in practice.

```smart header="The `typeof(x)` syntax"
You may also come across another syntax: `typeof(x)`. It's the same as `typeof x`.

To put it clear: `typeof` is an operator, not a function. The parentheses here aren't a part of `typeof`. It's the kind of parentheses used for mathematical grouping.

Usually, such parentheses contain a mathematical expression, such as `(2 + 2)`, but here they contain only one argument `(x)`. Syntactically, they allow to avoid a space between the `typeof` operator and its argument, and some people like it.

Some people prefer `typeof(x)`, although the `typeof x` syntax is much more common.
```

## Summary
<<<<<<< HEAD
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

Es gibt 8 grundlegende Datentypen in JavaScript.

<<<<<<< HEAD
- `number` für Zahlen jeglicher Art: Ganzzahl oder Gleitkommazahl, ganze Zahlen sind auf ±2<sup>53</sup> begrenzt.
- `bigint` steht für ganze Zahlen beliebiger Länge.
- `string` für Zeichenketten. Eine String kann aus null oder mehreren Zeichen bestehen. Es gibt keine separaten Einzelzeichentyp.
- `boolean` für `true`/`false`.
- `null` für unbekannte Werte -- ein eigenständiger Typ mit einem einzelnen Wert `null`.
- `undefined` für nicht zugewiesene Werte -- ein eigenständiger Typ mit einem einzelnen Wert `undefined`.
- `object` für komplexere Datenstrukturen.
- `symbol` für eindeutige Kennungen.
=======
- `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have zero or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
=======

There are 8 basic data types in JavaScript.

- Seven primitive data types:
    - `number` for numbers of any kind: integer or floating-point, integers are limited by <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` for integer numbers of arbitrary length.
    - `string` for strings. A string may have zero or more characters, there's no separate single-character type.
    - `boolean` for `true`/`false`.
    - `null` for unknown values -- a standalone type that has a single value `null`.
    - `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
    - `symbol` for unique identifiers.
- And one non-primitive data type:
    - `object` for more complex data structures.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

Mit dem Operator `typeof` können wir sehen, welcher Typ in einer Variablen gespeichert ist.

<<<<<<< HEAD
- Zwei Formen: `typeof x` oder `typeof(x)`.
- Gibt einen String mit dem Namen des Typs zurück, wie `"string"`.
- Für `null` gibt es `"object"` zurück -- dies ist ein Fehler in der Sprache, es ist eigentlich kein Objekt.
=======
- Usually used as `typeof x`, but `typeof(x)` is also possible.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

In den nächsten Kapiteln werden wir uns auf skalare Datentypen konzentrieren und, sobald wir mit ihnen vertraut sind, zu Objekten übergehen.
