# Vergleiche

Wir kennen viele Vergleichsoperatoren aus der Mathematik:

- Größer/kleiner: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Größer-gleich/kleiner-gleich: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Gleich: `a == b` (beachte bitte das doppelte Gleichheitszeichen `=`. Ein einfaches Gleichheitszeiten `a = b` würde eine Zuweisung bedeuten).
- Ungleich. In der Mathematik lautet die Notation <code>&ne;</code>, aber in JavaScript wird es als eine Zuweisung mit einem Ausrufezeichen davor geschrieben: <code>a != b</code>.

## Das Ergebnis ist Boolean

Wie alle anderen Operatoren liefert ein Vergleich einen Wert. In diesem Fall ist der Wert ein boolscher Wert.

- `true` (engl. "wahr") -- bedeutet "ja", "richtig" oder "die Wahrheit".
- `false` (engl. "unwahr") -- bedeutet "nein", "falsch" oder "nicht die Wahrheit".

Zum Beispiel:

```js run
alert( 2 > 1 );  // true (richtig)
alert( 2 == 1 ); // false (falsch)
alert( 2 != 1 ); // true (richtig)
```

Ein Vergleichsergebnis kann einer Variablen zugewiesen werden, genau wie jeder andere Wert:

```js run
let result = 5 > 4; // das Ergebnis des Vergleichs zuweisen
alert( result ); // true (wahr)
```

## String Vergleiche

Um zu sehen, ob ein String (Zeichenfolge) größer als ein anderer ist, verwendet JavaScript die so genannte "Wörterbuch-" oder "lexikografische" Reihenfolge.

Mit anderen Worten, die Strings werden Buchstabe für Buchstabe verglichen.

Zum Beispiel:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Der Algorithmus zum Vergleichen zweier Strings ist einfach:

1. Vergleiche das erste Zeichen der beiden Strings.
2. Wenn das erste Zeichen aus dem ersten String größer (oder kleiner) als das des anderen String ist, dann ist der erste String größer (oder kleiner) als der zweite. Das war's.
3. Andernfalls, wenn die ersten Zeichen beider Strings gleich sind, vergleiche die zweiten Zeichen auf die gleiche Weise.
4. Wiederhole dies bis zum Ende einer der beiden Strings.
5. Wenn beide Strings mit der gleichen Länge enden, dann sind sie gleich. Andernfalls ist der längere String größer.

In den obigen Beispielen führt der Vergleich `'Z' > 'A'` im ersten Schritt zu einem Ergebnis, während die Zeichenketten `"Glow"` und `"Glee"` zeichenweise verglichen werden:

1. `G` ist gleich wie `G`.
2. `l` ist gleich wie `l`.
3. `o` ist größer als `e`. Halte hier an. Der erste String ist größer.

```smart header="Kein echtes Wörterbuch, aber Unicode-Reihenfolge"
Der oben angegebene Vergleichsalgorithmus entspricht in etwa dem, der in Wörterbüchern oder Telefonbüchern verwendet wird, aber er ist nicht genau derselbe.

Zum Beispiel, Groß/Kleinschreibung ist wichtig. Ein Großbuchstabe `"A"` ist nicht gleich dem Kleinbuchstaben `"a"`. Welcher ist größer? Der Kleinbuchstabe `"a"`. Und warum? Weil das Kleinbuchstabenzeichen einen größeren Index in der internen Codierungstabelle hat, die JavaScript verwendet (Unicode). Wir werden im Kapitel <info:string> auf die spezifischen Details und die Konsequenzen dieser Tatsache zurückkommen.
```

## Vergleiche von verschiedenen Datentypen

Beim Vergleich von Werten verschiedener Datentypen wandelt JavaScript die Werte in `number` (Zahlen) um.

Zum Beispiel:

```js run
alert( '2' > 1 ); // true, der String '2' wird zu number 2
alert( '01' == 1 ); // true, der String '01' wird zu number 1
```

Bei boolschen Werten wird `true` zu `1` und `false` zu `0`.

Zum Beispiel:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Eine lustige Auswirkung"
Es ist möglich, dass zur gleichen Zeit:

- zwei Werte gleich sind.
- einer von denen als Boolean `true` und der andere als Boolean `false` ist.

Zum Beispiel:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Aus der Sicht von JavaScript ist dieses Ergebnis ganz normal. Eine Gleichheitsprüfung konvertiert Werte mit Hilfe der numerischen Datentypumwandlung (daher wird `"0"` zu `0`), während die explizite Umwandlung in `Boolean` andere Regeln verwendet.
````

## Strikte Gleichheit

Die normale Gleichheitsprüfung mit `==` hat ein Problem. Sie kann `0` nicht von `false` unterscheiden:

```js run
alert( 0 == false ); // true
```

Dasselbe geschieht mit einem leeren String:

```js run
alert( '' == false ); // true
```

Dies geschieht, weil Operanden unterschiedlichen Typs mit dem Gleichheitsoperator `==` in `number` umgewandelt werden. Ein leerer String wird, genau wie bei `false`, zu einer numerischen Null.

Was ist zu tun, wenn wir `0` von `false` unterscheiden wollen?

**Der strikte Gleichheitsoperator `===` überprüft auf Gleichheit ohne Datentypumwandlung.**

Mit anderen Worten, wenn `a` und `b` von unterschiedlichem Datentyp sind, dann gibt `a === b` sofort `false` zurück, ohne einen Versuch, sie zu konvertieren.

Versuchen wir es:

```js run
alert( 0 === false ); // false, weil die Datentypen verschieden sind
```

Es gibt auch einen "strikten Ungleichheits"-Operator `!==` analog zu `!=`.

Der Operator für strikte Gleichheit ist etwas länger zu schreiben, macht aber deutlich, was vor sich geht, und lässt weniger Raum für Fehler.

## Vergleiche mit null und undefined

Es gibt ein nicht-intuitives Verhalten, wenn `null` oder `undefined` mit anderen Werten verglichen wird.

Für die strikte Gleichheitsprüfung `===`
: sind diese Werte unterschiedlich, weil jeder von ihnen ein verschiedener Datentyp ist.

    ```js run
    alert( null === undefined ); // false
    ```

Für die nicht-strikte Gleichheitsprüfung `==`
: gibt es eine besondere Regel. Diese beiden sind ein "süßes Pärchen": sie sind gleich (im Sinne von `==`), aber nicht irgendeinem anderen Wert.

    ```js run
    alert( null == undefined ); // true
    ```

Für mathematische und andere Vergleiche `< > <= >=`
: werden `null/undefined` umgewandelt in number (Zahlen): `null` wird zu `0`, während `undefined` zu `NaN` wird.

Jetzt wollen wir sehen, was bei der Anwendung dieser Regeln passiert. Und, was noch wichtiger ist, wie man damit nicht in eine Falle tappt.

### Seltsames Ergebnis: null vs 0

Lass uns `null` mit `0` vergleichen:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Mathematisch gesehen ist das seltsam. Das letzte Ergebnis besagt, dass "`null` größer oder gleich `0` ist", so dass es in einem der obigen Vergleiche `true` sein muss, aber beide sind `false`.

Der Grund ist, dass die Gleichheitsprüfung `==` und vergleichende Operatoren `> < >= <=` verschieden funktionieren. Vergleichende Operatoren wandeln `null` in eine `number` um, behandeln es als `0`. Deshalb ist (3) `null >= 0` `true` und (1) `null > 0` `false`.

Auf der anderen Seite ist die Gleichheitsprüfung `==` für `undefined` und `null` so definiert, dass sie ohne Umwandlung einander gleich sind, aber nichts anderem. Deshalb ist (2) `null == 0` `false`.

### undefined ist nicht vergleichbar

Der Wert `undefined` sollte nicht mit anderen Werten verglichen werden:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Warum mag es die Null so wenig? Immer `false`!

Wir erhalten diese Ergebnisse, weil:

- Vergleiche `(1)` und `(2)` ergeben `false`, weil `undefined` wird zu `NaN` umgewandelt und `NaN` ist ein spezieller numerischer Wert, der für alle Vergleiche `false` ergibt.
- Die Gleichheitsprüfung `(3)` ergibt `false`, weil `undefined` nur gleich `null` ist, und keinem anderen Wert.

### Probleme vermeiden

Warum sind wir diese Beispiele durchgegangen? Sollten wir uns ständig an diese Besonderheiten erinnern? Nun, nicht wirklich. Mit der Zeit werden diese kniffligen Dinge allmählich vertraut werden, aber es gibt einen soliden Weg, um Problemen damit auszuweichen:

Behandele einfach jeden Vergleich mit `undefined/null` mit Ausnahme der strikten Gleichheit `====` mit besonderer Vorsicht.

Verwende keine Vergleiche `>= > < <=` mit einer Variablen, die `null/undefined` sein kann, es sei denn, du bist dir wirklich sicher, was du tust. Wenn eine Variable diese Werte haben kann, überprüfe sie separat.

## Zusammenfassung

- Vergleichende Operatoren geben einen boolschen Wert zurück.
- Strings (Zeichenfolgen) werden Buchstabe für Buchstabe in der "Wörterbuch"-Reihenfolge verglichen.
- Wenn Werte unterschiedlichen Typs verglichen werden, werden sie in Zahlen (`number`) umgewandelt (außer bei der strikten Gleichheitsprüfung).
- Die Werte `null` und `undefined` sind gleich `==`, aber ansonsten ist nichts gleich den zwei Werten.
- Sei vorsichtig, wenn du Vergleiche wie `>` oder `<` mit Variablen verwendest, die gelegentlich `null/undefined` sein können. Es ist eine gute Idee, `null/undefined` separat zu prüfen.
