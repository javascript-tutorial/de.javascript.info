# Umwandlung von Datentypen

Meistens wandeln die Operatoren und Funktionen die Werte, die ihnen übergeben werden automatisch in den richtigen Datentyp um.

Zum Beispiel wandelt `alert` automatisch jeden Wert in den Datentyp "String" um (Zeichenkette), um ihn anzuzeigen. Mathematische Operationen wandeln Werte in Zahlen um.

Es gibt auch Fälle, in denen wir einen Wert explizit in den erwarteten Datentyp umwandeln müssen.

```smart header="Noch nicht von Objekten sprechen"
In diesem Kapitel werden wir keine Objekte behandeln. Im Moment werden wir nur über Primitive sprechen.

Später, nachdem wir etwas über Objekte gelernt haben, werden wir im Kapitel <info:objekt-toprimitive> sehen, wie Objekte hineinpassen.
```

## String Umwandlung

String Umwandlung passiert immer dann, wann wir den Wert in Form einer Zeichenkette ("String") benötigen.

Zum Beispiel, `alert(value)` verwendet die String Umwandlung, um den Wert anzuzeigen.

Wir können auch die Funktion `String(value)` aufrufen, um einen Wert in einen String zu konvertieren:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // jetzt ist der Wert ein String "true"
alert(typeof value); // string
*/!*
```

Die String Umwandlung ist meist offensichtlich. Ein `false` wird zu `"false"`, `null` wird zu `"null"`, usw.

## Numerische Umwandlungen

Numerische Umwandlung passiert automatisch in mathematischen Funktionen und Ausdrücken.

Zum Beispiel, wenn die Division `/` an Werten angewendet wird, die keine Zahlen ("Number") sind:

```js run
alert( "6" / "2" ); // 3, weil die Strings zu Zahlen (Number) umgewandelt werden
```

Wir können explizit die Funktion `Number(value)` aufrufen, um einen Wert in eine Number (Zahl) zu konvertieren:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // wird zu Number 123

alert(typeof num); // number
```

Eine explizite Umwandlung ist normalerweise erforderlich, wenn wir einen Wert aus einer String-basierten Quelle wie einem Textfeld lesen, aber die Eingabe einer Zahl erwarten.

Wenn der String keine valide Zahl ("number") ist, dann ist das Ergebnis einer solchen Umwandlung `NaN`. Zum Beispiel:

```js run
let age = Number("ein beliebiger String anstatt einer Zahl");

alert(age); // NaN, Umwandlung fehlgeschlagen
```

Regeln zur numerischen Umwandlung:

| Wert  |  Wird zu... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;und&nbsp;false</code> | `1` und `0` |
| `string` | Leerzeichen am Anfang und am Ende werden entfernt. Wenn der verbleibende String leer ist, ist das Ergebnis `0`. Andernfalls wird die Zahl aus dem String "gelesen". Ein Fehler ergibt `NaN`. |

Beispiele:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (Fehler beim Einlesen einer Zahl "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Bitte beachte, dass sich `null` und `undefined` hier unterschiedlich verhalten: Aus `null` wird 0, während aus `undefined` `NaN` wird.

Die meisten mathematischen Operatoren führen auch solche Umwandlungen durch, wir werden das im nächsten Kapitel sehen.

## Boolean Umwandlung

Boolean Umwandlung ist die einfachste.

Sie geschieht in logischen Operationen (später treffen wir auf bedingte Anweisungen und ähnliche Dinge), kann aber auch mit `Boolean(value)` explizit aufgerufen werden.

Umwandlungsregel:

- Werte, die intuitiv "leer" sind, wie `0`, ein leerer string, `null`, `undefined`, und `NaN`, werden zu `false`.
- Alle anderen Werte werden zu `true`.

Zum Beispiel:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Beachte: der string mit einer Null `\"0\"` ist `true`"
Einige Sprachen (namentlich PHP) behandeln die `"0"` als `false`. Aber in JavaScript ist ein nicht leerer String immer `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // Leerzeichen, auch true (jeder nicht leere String ist true)
```
````

## Zusammenfassung

Die drei am weitesten verbreiteten Umwandlungen von Datentypen sind in String, in Number und in Boolean.

**`String Umwandlung`** -- Tritt auf, wenn wir etwas ausgeben. Kann mit `String(value)` durchgeführt werden. Die Umwandlung in String ist für primitive Werte normalerweise offensichtlich.

**`Numerische Umwandlung`** -- Tritt in mathematischen Operationen auf. Kann mit `Number(value)` ausgeführt werden.

Die Umwandlung folgt diesen Regeln:

| Wert  |  Wird zu... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | Der String wird  "als solches" gelesen, Leerzeichen auf beiden Seiten werden ignoriert. Ein leerer String wird zu `0`. Ein Fehler ergibt `NaN`. |

**`Boolean Umwandlung`** -- Tritt in logischen Operationen auf. Kann mit `Boolean(value)` explizit ausgeführt werden.

Folgt den Regeln:

| Wert |  Wird zu... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|jeder andere Wert| `true` |


Die meisten dieser Regeln sind leicht zu verstehen und zu merken. Die bemerkenswerten Ausnahmen, bei denen normalerweise Fehler gemacht werden, sind:

- `undefined` ist `NaN` als number, nicht `0`.
- `"0"` und Leerzeichen-Strings wie `"   "` sind als boolean `true`.

Objekte werden hier nicht abgedeckt. Wir werden später, im Kapitel <info:object-toprimitive>, darauf zurückkommen, wenn wir mehr grundlegende Dinge über JavaScript gelernt haben. Dieses Kapitel ist ausschließlich den Objekten gewidmet.
