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
alert( 1 || 0 ); // 1 (1 is truthy)
alert( true || 'egal was' ); // (true ist effektiv wahr)

alert( null || 1 ); // 1 (1 ist der erste effektiv wahre Wert)
alert( null || 0 || 1 ); // 1 (der erste effektiv wahre Wert)
alert( undefined || null || 0 ); // 0 (alle effektiv nicht wahr, gibt letzten Wert zurück)
```

Das führt im Vergleich zu einem "reinen, klassischen, nur-Booleschen ODER" zu einigen interessanten Anwendungen:

1. **Bestimme den ersten effektiv wahren Wert aus einer Liste von Variablen bzw. Ausdrücken.**

    Nehmen wir an wir hätten eine Liste von Variablen, die entweder Daten beinhalten oder `null/undefined` sind. Wie finden wir die erste Variable mit Inhalt ?

    Wir können ODER `||` nutzen:

    ```js run
    let currentUser = null;
    let defaultUser = "John";

    *!*
    let name = currentUser || defaultUser || "unbenannt";
    */!*

    alert( name ); // Gibt "John" aus – den ersten effektiv wahren Wert
    ```

    Wären sowohl `currentUser` als auch `defaultUser` effektiv nicht wahr, lautete das Ergebnis `"unbenannt"`.
2. **Partielle Auswertung ( Short-circuit evaluation ).**

    Operanden können nicht nur Werte sondern beliebige Ausdrücke sein. ODER führt deren Auswertung und Test in der Reihenfolge von links nach rechts aus. Die Auswertung endet, wenn ein effektiv wahrer Wert erreicht wird, und dieser Wert wird zurückgegeben. Dieses Prinzip nennt man "partielle Auswertung" ( "short-circuit evaluation" ), da sie von links nach rechts fortschreitend frühestmöglich abbricht und ggf. nicht alle Operanden berücksichtigt.
    
    Das kann man klar erkennen, wenn der als zweites Argument gegebene Ausdruck einen Seiteneffekt produziert, wie etwa eine Variablenzuweisung.
    
    Im folgenden Beispiel wird `x` nicht zugewiesen:

    ```js run no-beautify
    let x;

    *!*true*/!* || (x = 1);

    alert(x); // undefined, denn (x = 1) wird nicht ausgewertet
    ```

    It hingegen das erste Argument `false`, wertet `||` das zweite aus und führt die Zuweisung durch:

    ```js run no-beautify
    let x;

    *!*false*/!* || (x = 1);

    alert(x); // 1
    ```

    Eine Zuweisung ist ein einfacher Fall. Es kann Seiteneffekte geben, deren Ausbleiben sich nicht unmittelbar manifestiert, wenn die Auswertung sie nicht erreicht.

    Wir wir erkennen ist ein solcher Anwendungsfall eine verlürzte Fallunterschiedung mit `if`. Der erste Operand wird in einen Booleschen Wert konvertiert. Ist er `false`, wird der zweite Operand ausgewertet.
    
    Meistens ist ein "normales" `if` vorzuziehen, um den Code möglichst verständlich zu halten, manchmal kann die Kurzvariante aber ganz praktisch sein.

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

arbeitet der Operator UND `&&` wie folgt:

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

So wie ODER kann auch der Operator UND `&&` manchmal eine Fallunterscheidung (`if`) ersetzen.

Beispiel:

```js run
let x = 1;

(x > 0) && alert( 'Größer 0!' );
```

Die Aktion im rechten Zweig von `&&` kommt nur zur Ausführung, wenn die Auswertung des Ausdrucks sie erreicht. Also nur falls  `(x > 0)` wahr ist.

Damit haben wir im Prinzip ein Pendant zu:

```js run
let x = 1;

if (x > 0) {
  alert( 'Größer 0!' );
}
```

Die Variante mit `&&` wirkt knapper. Aber `if` ist leichter zu identifizieren und tendenziell eines kleines bißchen verständlicher.

Daher empfehlen wir, jedes Konstrukt gemäß seinem Zweck einzusetzen: `if` nutzen, wenn wir eine Fallunterscheidung haben wollen, `&&` für die logische Operation UND.

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
