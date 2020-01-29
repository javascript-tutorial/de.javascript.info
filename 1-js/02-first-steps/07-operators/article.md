# Operatoren

Wir kennen viele Operatoren aus der Schule. Es sind Dinge wie Addition `+`, Multiplikation `*`, Subtraktion `-` und so weiter.

In diesem Kapitel konzentrieren wir uns auf Aspekte von Operatoren, die nicht durch Schularithmetik abgedeckt sind.

## Begriffe: "unär", "binär", "Operand"

Bevor wir weitermachen, wollen wir uns mit einigen gängigen Begriffen befassen.

- *Ein Operand* -- ist das, worauf Operatoren angewendet werden. Zum Beispiel gibt es bei der Multiplikation von `5 * 2` zwei Operanden: Der linke Operand ist `5` und der rechte Operand ist `2`. Manchmal nennen die Leute diese "Argumente" anstelle von "Operanden".
- Ein Operator ist *unär*, wenn er einen einzelnen Operanden hat. Zum Beispiel kehrt die unäre Negation `-` das Vorzeichen einer Zahl um:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unäres Minus wurde angewendet
    ```
- Ein Operator ist *binär*, wenn er zwei Operanden hat. Das gleiche Minus gibt es auch in binärer Form:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binäres Minus subtrahiert Werte
    ```

Formal haben wir in den obigen Beispielen zwei verschiedene Operatoren, die dasselbe Symbol verwenden: den Negationsoperator, einen unären Operator, der das Vorzeichen umkehrt, und den Subtraktionsoperator, einen binären Operator, der eine Zahl von einer anderen subtrahiert.

## String-Verkettung, binär +

Sehen wir uns nun die Besonderheiten von JavaScript-Operatoren an, die über das Rechnen in der Schule hinausgehen.

Normalerweise summiert der Plus-Operator `+` Zahlen.

Wenn das binäre `+` jedoch auf Strings angewendet wird, werden diese zusammengeführt (verkettet):

```js
let s = "mein" + "String";
alert(s); // meinString
```

Beachten Sie, dass wenn einer der Operanden ein String ist, die andere ebenfalls in einen String konvertiert wird.

Beispielsweise:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Es spielt keine Rolle, ob der erste oder zweite Operand ein String ist. Die Regel ist einfach: Wenn einer der Operanden ein String ist, wird der andere ebenfalls in einen String umgewandelt.

Beachte jedoch, dass die Operationen von links nach rechts ausgeführt werden. Wenn zwei Zahlen gefolgt von einen String vorhanden sind, werden die Zahlen hinzugefügt, bevor sie in eine Zeichenfolge konvertiert werden:


```js run
alert(2 + 2 + '1' ); // "41" und nicht "221"
```

Die Verkettung und Konvertierung von Strings ist eine Besonderheit des binären Pluszeichens `+`. Andere arithmetische Operatoren arbeiten nur mit Zahlen und konvertieren ihre Operanden immer in Zahlen.

Zum Beispiel Subtraktion und Division:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Numerische Umwandlung, unär +

Das Pluszeichen `+` gibt es in zwei Formen: der oben verwendeten binären Form und der unären Form.

Das unäre Plus oder mit anderen Worten der Plus-Operator `+`, der auf einen einzelnen Wert angewendet wird, hat keine Auswirkung auf Zahlen. Wenn der Operand jedoch keine Zahl ist, konvertiert das unäre Plus ihn in eine Zahl.

Beispielsweise:

```js run
// Keine Auswirkung auf Zahlen
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Konvertiert Nicht-Zahlen
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Es macht eigentlich dasselbe wie `Number (...)`, ist aber kürzer.

Die Notwendigkeit, Strings in Zahlen umzuwandeln, tritt sehr häufig auf. Wenn wir beispielsweise Werte aus HTML-Formularfeldern abrufen, handelt es sich normalerweise um Zeichenketten. Was ist, wenn wir sie zusammenfassen wollen?

Das binäre Plus würde sie als String hinzufügen:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", das binäre Plus verkettet Strings
```

Wenn wir sie als Zahlen behandeln wollen, müssen wir sie konvertieren und dann summieren:

```js run
let apples = "2";
let oranges = "3";

*!*
// Beide Werte werden vor dem binären Plus in Zahlen umgewandelt
alert( +apples + +oranges ); // 5
*/!*

// die längere Variante
// alert( Number(apples) + Number(oranges) ); // 5
```

Aus der Sicht eines Mathematikers mag die Fülle an Pluspunkten merkwürdig erscheinen. Vom Standpunkt eines Programmierers aus gibt es jedoch nichts Besonderes: Unäre Pluszeichen werden zuerst angewendet, sie konvertieren Strings in Zahlen und das binäre Plus summiert sie dann.

Warum werden unäre Pluszeichen auf Werte vor den binären angewendet? Wie wir sehen werden, liegt das an ihrer *höheren Priorität*.

## Operator-Vorrang

Wenn ein Ausdruck mehr als einen Operator hat, wird die Ausführungsreihenfolge durch ihre *Priorität* oder, mit anderen Worten, die Standardprioritätsreihenfolge von Operatoren definiert.

Aus der Schule wissen wir alle, dass die Multiplikation im Ausdruck `1 + 2 * 2` vor der Addition berechnet werden sollte. Das ist genau das, was Vorrang hat. Die Multiplikation soll *eine höhere Priorität* haben als die Addition.

Klammern überschreiben alle Prioritäten. Wenn wir mit der Standardreihenfolge nicht zufrieden sind, können wir sie zum Ändern verwenden. Schreib beispielsweise `(1 + 2) * 2`.

In JavaScript gibt es viele Operatoren. Jeder Operator hat eine entsprechende Vorrangsnummer. Der mit der größeren Nummer wird zuerst ausgeführt. Bei gleicher Rangfolge erfolgt die Ausführung von links nach rechts.

Hier ist ein Auszug aus der [Ranglistentabelle](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (Du musst dir das nicht merken, aber beachte, dass unäre Operatoren höher sind als entsprechende binäre):

| Vorrang | Name | Zeichen |
|------------|------|------|
| ... | ... | ... |
| 16 | Unäres Plus | `+` |
| 16 | Unäres Minus | `-` |
| 14 | Multiplikation | `*` |
| 14 | Division | `/` |
| 13 | Addition | `+` |
| 13 | Subtraction | `-` |
| ... | ... | ... |
| 3 | Zuweisung | `=` |
| ... | ... | ... |

Wie wir sehen können, hat das "unäre Plus" eine Priorität von `16`, die höher ist als die `13` von "Addition" (binäres Plus). Aus diesem Grund arbeiten im Ausdruck `"+apples + +oranges"` unäre Pluszeichen vor der Addition.

## Zuweisung

Beachten wir, dass eine Zuweisung `=` auch ein Operator ist. Es ist in der Ranglistentabelle mit der sehr niedrigen Priorität `3` aufgeführt.

Wenn wir also eine Variable wie `x = 2 * 2 + 1` zuweisen, werden zuerst die Berechnungen durchgeführt und dann das `=` ausgewertet, wobei das Ergebnis in `x` gespeichert wird.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

Es ist möglich, Zuordnungen zu verketten:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Verkettete Zuordnungen werden von rechts nach links ausgewertet. Zuerst wird der äußerste rechte Ausdruck `2 + 2` ausgewertet und dann den Variablen auf der linken Seite zugewiesen: `c`, `b` und `a`. Am Ende teilen sich alle Variablen einen einzigen Wert.

````smart header="Der Zuweisungsoperator `\"=\"` gibt einen Wert zurück"
Ein Operator gibt immer einen Wert zurück. Das ist für die meisten von ihnen offensichtlich, wie Addition `+` oder Multiplikation `*`. Der Zuweisungsoperator folgt auch dieser Regel.

Der Aufruf `x = Wert` schreibt den `Wert` in `x` *und gibt ihn dann zurück*.

Hier ist eine Demo, die eine Zuweisung als Teil eines komplexeren Ausdrucks verwendet:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Im obigen Beispiel ist das Ergebnis des Ausdrucks `(a = b + 1)` der Wert, der `a` zugewiesen wurde (d.h. `3`). Es wird dann für weitere Auswertungen verwendet.

Lustiger Code, nicht wahr? Wir sollten verstehen, wie es funktioniert, weil wir es manchmal in JavaScript-Bibliotheken sehen, aber nicht selbst so etwas schreiben sollten. Solche Tricks machen Code definitiv nicht klarer oder lesbarer.
````

## Divisionsrest %

Der Divisionsrestoperator `%` ist trotz seines Erscheinungsbilds nicht prozentual verknüpft.

Das Ergebnis von `a % b` ist der Rest der ganzzahligen Division von `a` durch `b`.

Zum Beispiel:

```js run
alert( 5 % 2 ); // 1 ist ein Rest von 5 geteilt durch 2
alert( 8 % 3 ); // 2 ist ein Rest von 8 geteilt durch 3
alert( 6 % 3 ); // 0 ist ein Rest von 6 geteilt durch 3
```

## Potenzierung **

Der Potenzierungsoperator `**` ist eine neue Erweiterung der Sprache.

Für eine natürliche Zahl `b` ist das Ergebnis von `a ** b`, `a` `b`-Mal mit sich selbst multipliziert.

Zum Beispiel:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

Der Operator funktioniert auch für nicht ganzzahlige Zahlen.

Zum Beispiel:

```js run
alert( 4 ** (1/2) ); // 2 (Potenz von 1/2 ist das Gleiche wie eine Quadratwurzel, das ist Mathematik)
alert( 8 ** (1/3) ); // 2 (Potenz von 1/3 entspricht der dritten Wurzel)
```

## Inkrementieren/Dekrementieren

<!-- Can't use -- in title, because built-in parse turns it into – -->

Das Erhöhen oder Verringern einer Zahl um eins gehört zu den häufigsten numerischen Operationen.

Es gibt also spezielle Operatoren dafür:

- **Inkrement** `++` erhöht eine Variable um 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // funktioniert genauso wie counter = counter + 1, ist aber kürzer
    alert( counter ); // 3
    ```
- **Dekrement** `--` verringert eine Variable um 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // funktioniert genauso wie counter = counter - 1, ist aber kürzer
    alert( counter ); // 1
    ```

```warn
Inkrementieren/Dekrementieren kann nur auf Variablen angewendet werden. Der Versuch, es bei einen Wert wie `5++` anzuwenden, führt zu einem Fehler.
```

Die Operatoren `++` und `--` können entweder vor oder nach einer Variablen stehen.

- Wenn der Operator hinter der Variablen steht, liegt er in "Postfix-Form" vor: `counter++`.
- Die "Präfix-Form" liegt vor, wenn der Operator vor der Variablen steht: `++counter`.

Beide Anweisungen tun dasselbe: erhöhen `counter` um `1`.

Gibt es da einen Unterschied? Ja, aber wir können es nur sehen, wenn wir den zurückgegebenen Wert von `++/-` verwenden.

Lass uns klären. Wie wir wissen, geben alle Operatoren einen Wert zurück. Inkrementieren/Dekrementieren ist keine Ausnahme. Die Präfix-Form gibt den neuen Wert zurück, während die Postfix-Form den alten Wert zurück gibt (vor dem Inkrementieren/Dekrementieren).

Um den Unterschied zu sehen, hier ein Beispiel:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

In der Zeile `(*)` erhöht die *Präfix*-Form von `++counter` den Wert von `counter` und gibt den neuen Wert `2` zurück. Der `alert` zeigt also `2`.

Verwenden wir nun die Postfix-Form:

```js run
let counter = 1;
let a = counter++; // (*) ++counter zu counter++ geändert

alert(a); // *!*1*/!*
```

In der Zeile `(*)` erhöht die *Postfix*-Form `counter++` ebenfalls `counter`, gibt aber den *alten* Wert (vor dem Inkrementieren) zurück. Der `alert` zeigt also `1`.

Zusammenfassend:

- Wenn das Ergebnis des Inkrementierens/Dekrementierens nicht verwendet wird, gibt es keinen Unterschied in der zu verwendenden Form:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, die obigen Zeilen haben dasselbe getan
    ```
- Wenn wir einen Wert erhöhen *und* sofort das Ergebnis des Operators verwenden möchten, benötigen wir die Präfix-Formu:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Wenn wir einen Wert erhöhen, aber seinen vorherigen Wert verwenden möchten, benötigen wir die Postfix-Form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Inkrementieren/Dekrementieren unter anderen Operatoren"
Die Operatoren `++/--` können auch in Ausdrücken verwendet werden. Ihre Priorität ist höher als die der meisten anderen Rechenoperationen.

Zum Beispiel:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Vergleiche mit:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, weil counter ++ den "alten" Wert zurückgibt
```

Obwohl technisch in Ordnung, macht eine solche Notation Code normalerweise weniger lesbar. Eine Zeile macht mehrere Dinge -- nicht gut.

Beim Lesen von Code kann ein schneller "vertikaler" Augenscan leicht etwas wie `counter++` übersehen, und es ist nicht offensichtlich, dass die Variable größer wird.

Wir empfehlen den Stil "eine Zeile -- eine Aktion":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitweise Operatoren

Bitweise Operatoren behandeln Argumente als 32-Bit-Ganzzahlen und arbeiten auf der Ebene ihrer Binärdarstellung.

Diese Operatoren sind nicht JavaScript-spezifisch. Sie werden in den meisten Programmiersprachen unterstützt.

Die Liste der Operatoren:

- UND ( `&` )
- ODER ( `|` )
- XOR ( `^` )
- Negation ( `~` )
- Linksverschiebung ( `<<` )
- Rechtsverschiebung ( `>>` )
- Null füllende Rechtsverschiebung ( `>>>` )

Diese Operatoren werden sehr selten verwendet. Um sie zu verstehen, müssen wir uns mit der Darstellung von Zahlen auf niedriger Ebene befassen, und es wäre nicht optimal, dies jetzt zu tun, zumal wir sie nicht so schnell brauchen. Wenn du neugierig bist, kannst du den Artikel [Bitweise Operatoren](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Bitwise_Operatoren) auf MDN lesen. Es wäre praktischer, dies zu tun, wenn ein wirklicher Bedarf entsteht.

## An Ort und Stelle ändern

Wir müssen oft einen Operator auf eine Variable anwenden und das neue Ergebnis in derselben Variablen speichern.

Zum Beispiel:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Diese Notation kann mit den Operatoren `+=` und `*=` gekürzt werden:

```js run
let n = 2;
n += 5; // jetzt ist n = 7 (gleich wie n = n + 5)
n *= 2; // jetzt ist n = 14 (gleich wien = n * 2)

alert( n ); // 14
```

Kurz, Operatoren für "ändern und zuweisen" gibt es für alle arithmetischen und bitweisen Operatoren: `/=`, `-=`, usw.

Solche Operatoren haben die gleiche Priorität wie eine normale Zuweisung und werden daher nach den meisten anderen Berechnungen ausgeführt:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (rechter Teil wird zuerst ausgewertet, gleich wie n *= 8)
```

## Komma

Der Komma-Operator `,` ist einer der seltensten und ungewöhnlichsten Operatoren. Manchmal wird damit kürzerer Code geschrieben, sodass wir ihn kennen müssen, um zu verstehen, was vor sich geht.

Mit dem Komma-Operator können wir mehrere Ausdrücke auswerten und durch ein Komma `,` trennen. Jeder von ihnen wird ausgewertet, aber nur das Ergebnis des letzten wird zurückgegeben.

Zum Beispiel:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (das Ergebnis von 3 + 4)
```

Hier wird der erste Ausdruck `1 + 2` ausgewertet und sein Ergebnis verworfen. Dann wird `3 + 4` ausgewertet und als Ergebnis zurückgegeben.

```smart header="Komma hat eine sehr geringe Priorität"
Bitte beachten Sie, dass der Komma-Operator eine sehr niedrige Priorität hat, niedriger als `=`, daher sind Klammern im obigen Beispiel wichtig.

Ohne sie: `a = 1 + 2, 3 + 4` wertet zuerst `+` aus, summiert die Zahlen zu `a = 3, 7`, dann weist der Zuweisungsoperator `=` `a = 3` zu, und der Rest ist ignoriert. Es ist wie `(a = 1 + 2), 3 + 4`.
```

Warum brauchen wir einen Operator, der alles außer dem letzten Ausdruck wegwirft?

Manchmal wird es in komplexeren Konstrukten verwendet, um mehrere Aktionen in eine Zeile zu setzen.

Zum Beispiel:

```js
// drei Operationen in einer Zeile
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Solche Tricks werden in vielen JavaScript-Frameworks verwendet. Deshalb erwähnen wir sie. In der Regel verbessern sie jedoch nicht die Lesbarkeit des Codes, daher sollten wir vor der Verwendung gut überlegen.
