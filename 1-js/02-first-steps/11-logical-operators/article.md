# Logische Operatoren

Es gibt drei logische Operatoren in JavaScript: `||` (ODER), `&&` (UND), `!` (NICHT).

Obgleich sie "logisch" genannt werden, lassen sie sich auf Werte eines beliebigen Typs anwenden, nicht nur 'boolean'. Genauso kann ihr Ergebnis jedweden Typ haben.

Werfen wir einen Blick auf die Details.

## || (ODER)

Der Operator "ODER" wird mit zwei senkrechten Strichen repräsentiert:

```js
result = a || b;
```

In der klasssischen Programmierung dient das logische ODER nur zur Verarbeitung Boolescher Werte. Falls eines seiner Argumente `true` ist, liefert es `true`, andernfalls `false`.

In JavaScript ist der Operator mächtiger und in der Anwendung etwas diffiziler. Aber schauen wir uns zuerst an, was mit Booleschen Werten passiert.

Es gibt vier mögliche logische Kombinationen:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Wir stellen fest, das Ergbenis ist immer `true` mit Ausnahme des Falls, daß beide Operanden `false` sind.

Falls ein Operand kein Boolescher Wert ist, wird er für die Auswertung in den Typ `boolean` konvertiert.

Beispielsweise wird die Zahl `1` als `true` interpretiert, die Zahl `0` als `false`:

```js run
if (1 || 0) { // Gleichwertig zu if( true || false )
  alert( 'Effektiv wahr!' );
}
```

Meistens wird ODER `||` in einem `if`-Statement genutzt um zu prüfen, ob *irgendeine* der vorgegebenen Bedingungen `true` ist.

Beispiel:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'Das Büro ist geschlossen.' );
}
```

Wir können weitere Bedingungen ergänzen:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'Das Büro ist geschlossen.' ); // Es ist Wochenende
}
```

## ODER "||" findet den ersten effektiv wahren Wert

Die oben beschriebene Logik ist sozusagen die klassische Variante. Nehmen wir jetzt die "speziellen" Features von JavaScript hinzu.

Der erweiterte Algorithmus arbeitet wie folgt:

Für mehrere mit ODER verknüpfte Werte:

```js
result = value1 || value2 || value3;
```

arbeitet der Operator ODER `||` wie folgt:

- Wertet Operanden von links nach rechts aus.
- Konvertiert jeden Operand in einen Booleschen Wert. Ist das Ergebnis `true`, endet seine Auswertung und er gibt den ursprünglichen Wert dieses Operanden zurück.
- Sind alle Operanden ausgewertet ( d.h. alle waren `false` ), gibt er den letzten Operanden zurück.

Ein Wert wird in seiner ursprünglichen Form zurückgegeben, ohne die Konvertierung.

Mit anderen Worten, eine Folge von ODER `"||"` gibt den ersten effektiv wahren Wert zurück oder - sofern kein solcher gefunden wird - den letzten Wert.

Beispiel:

```js run
alert( 1 || 0 ); // 1 (1 ist wahr)

alert( null || 1 ); // 1 (1 ist der erste wahre Wert)
alert( null || 0 || 1 ); // 1 (der erste wahre Wert)

alert( undefined || null || 0 ); // 0 (alle falsch, gibt den letzten Wert zurück)
```

Das führt im Vergleich zu einem "reinen, klassischen, nur-Booleschen ODER" zu einigen interessanten Anwendungen:

1. **Bestimme den ersten effektiv wahren Wert aus einer Liste von Variablen bzw. Ausdrücken.**

    Haben wir zum Beispiel die Variablen `firstName`, `lastName` und `nickName`, die alle optional sind.

    Benutzen wir ODER `||`, um denjenigen auszuwählen, der Daten enthält und geben sie aus (oder `Anonym` wenn nichts gesetzt ist):

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonym"); // SuperCoder
    */!*
    ```

    Wenn alle Variablen falsch sind, würde `Anonym` herauskommen.

2. **Short-circuit evaluation.**

    Ein weiteres Merkmal des ODER-Operators `||` ist die sogenannte "Kurzschluss"-Auswertung.

    Das bedeutet, dass `||` die Argumente so lange verarbeitet, bis der erste wahrheitsgemäße Wert erreicht ist, und dann wird der Wert sofort zurückgegeben, ohne andere Argument zu berühren.

    Die Bedeutung dieses Merkmals wird deutlich, wenn ein Operand nicht nur ein Wert, sondern ein Ausdruck mit Nebeneffekt ist, wie z.B. eine Variablenzuweisung oder ein Funktionsaufruf.

    Im folgenden Beispiel wird nur die zweite Nachricht gedruckt:

    ```js run no-beautify
    *!*true*/!* || alert("nicht gedruckt");
    *!*false*/!* || alert("gedruckt");
    ```

    In der ersten Zeile stoppt der Operator ODER `||` die Auswertung sofort, wenn er `true` sieht, so dass der `alert` nicht ausgeführt wird.

    Manchmal verwenden Leute diese Funktion, um Befehle nur dann auszuführen, wenn die Bedingung im linken Teil falsch ist.

## && (UND)

Der Operator "UND" wird mit zwei kaufmännischen Und-Symbolen (Ampersands) repräsentiert:

```js
result = a && b;
```

In der klasssischen Programmierung gibt UND `true` zurück, wenn beide Operanden effektiv wahr sind, ansonsten `false`:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Ein beispiel mit `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'Es ist 12:30 Uhr' );
}
```

Genau wie bei ODER ist jeder Wert als Operand von UND zulässig:

```js run
if (1 && 0) { // Interpretiert als true && false
  alert( "Nie zu sehen, denn das Ergebnis war effektiv nicht wahr." );
}
```


## UND "&&" findet den ersten effektiv nicht wahren Wert

Für mehrere mit UND verknüpfte Werte:

```js
result = value1 && value2 && value3;
```

Der Operator UND `&&` arbeitet wie folgt:

- Wertet Operanden von links nach rechts aus.
- Konvertiert jeden Operand in einen Booleschen Wert. Ist das Ergebnis `false`, endet seine Auswertung und er gibt den ursprünglichen Wert dieses Operanden zurück.
- Sind alle Operanden ausgewertet ( d.h. alle waren effektiv wahr ), gibt er den letzten Operanden zurück.

Mit anderen Worten, UND gibt den ersten effektiv nicht wahren Wert zurück oder - sofern kein solcher gefunden wird - den letzten Wert.

Die Regeln sind ähnlich denen für ODER. Der Unterschied besteht darin, daß UND den ersten *effektiv nicht wahren* Wert zurückgibt, während es bei ODER der erste *effektiv whare* ist.

Beispiele:

```js run
// Ist der erste Operand effektiv wahr,
// gibt UND den zweiten Operanden zurück:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// Ist der erste Operand effektiv nicht wahr,
// gibt ihn UND zurück. Der zweite Operand wird ignoriert.
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

Wir können auch mehrere Werte am Stück verknüpfen. Hier sehen wir, wie der erste effektiv nicht wahre Wert zurückgegeben wird.

```js run
alert( 1 && 2 && null && 3 ); // null
```

Wenn alle Werte effektiv wahr sind, wird der letzte Wert zurückgegeben:

```js run
alert( 1 && 2 && 3 ); // 3, der letzte Wert
```

````smart header="Präzedenz von UND `&&` ist höher als von ODER `||`"
Die Präzedenz der Operators UND  `&&` ist höher als die von ODER `||`.

Der Code `a && b || c && d` verhält sich daher i.w. so, als ob die Ausdrücke mit `&&` in Klammern gesetzt würden: `(a && b) || (c && d)`.
````

````warn header="Ersetze `if` nicht durch || oder &&"
Manchmal wird der Operator UND `&&` als "Kürzel zum Schreiben von `if`" verwendet.

Beispiel:

```js run
let x = 1;

(x > 0) && alert( 'Größer 0!' );
```

Die Aktion im rechten Zweig von `&&` kommt nur zur Ausführung, wenn die Auswertung des Ausdrucks sie erreicht. Also nur falls  `(x > 0)` wahr ist.

Damit haben wir im Prinzip ein Pendant zu:

```js run
let x = 1;

if (x > 0) alert( 'Größer als Null!' );
```

Obwohl die Variante mit `&&` kürzer erscheint, ist `if` offensichtlicher und tendenziell etwas lesbarer. Daher empfehlen wir, jedes Konstrukt für seinen Zweck zu verwenden: Verwende `if`, wenn wir eine Bedingung wollen, und verwende `&&`, wenn wir UND wollen.
````


## ! (NICHT)

Der Boolsche Operator NICHT wird durch ein Ausrufezeichen `!` repräsentiert

Die Syntax ist einfach genug:

```js
result = !value;
```

Der Operator akzeptiert ein einzelnes Argument und erledigt folgendes:

1. Konvertiert den Operand in einen Booleschen Wert: `true/false`.
2. Gibt den negierten Wert zurück.

Beispiel:

```js run
alert( !true ); // false
alert( !0 ); // true
```

Ein doppeltes NICHT `!!` verwendet man gelegentlich zur Konvertierung in einen Booleschen Wert:

```js run
alert( !!"Nicht-leere Zeichenkette" ); // true
alert( !!null ); // false
```

Das erste NICHT konvertiert den Wert in einen Booleschen Wert und gibt den negierten Wert zurück, während das zweite NICHT ein weiteres Mal negiert. Als Ergebnis erhalten wir die elementare Konvertierung eines Werts in einen Booleschen Wert.

Eine etwas ausführlichere Notation bewerkstelligt das gleiche -- die vordefinierte Funktion `Boolean`:

```js run
alert( Boolean("Nicht-leere Zeichenkette") ); // true
alert( Boolean(null) ); // false
```

Die Präzedenz von NOT `!` ist die höchste aller logischen Operatoren, damit wird sie immer zuerst ausgeführt, vor `&&` oder `||`.
