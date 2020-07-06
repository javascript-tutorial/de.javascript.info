# Die "switch" Anweisung

Eine `switch` Anweisung kann mehrere `if` Anweisungen ersetzen.

Sie bietet eine anschauliche Möglichkeit, einen Wert mit mehreren Varianten zu vergleichen.

## Die Syntax

Die `switch` Anweisung hat eine oder mehrere `case` Marken und eine optionale default Marke.

Das sieht wie folgt aus:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- Der Wert von `x` wird auf strikte Gleichheit mit dem Wert aus dem ersten `case` verglichen, (das ist `value1`) dann mit dem zweiten (`value2`) und so weiter.
- Wenn eine Übereinstimmung gefunden wurde, führt `switch` den Code, ausgehend vom entsprechenden `case`, bis zum nächsten  `break` aus (oder bis zum Ende der `switch` Anweisung).
- Wenn kein `case` zutrifft, wird der Code im `default` Block ausgeführt (falls dieser existiert).

## Ein Beispiel

Ein Beispiel der `switch` Anweisung (der ausgeführte Code ist hervorgehoben):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Zu klein' );
    break;
*!*
  case 4:
    alert( 'Exakt!' );
    break;
*/!*
  case 5:
    alert( 'Zu gross' );
    break;
  default:
    alert( "Ich kenne keine solchen Werte" );
}
```

`switch` beginnt `a` mit der ersten `case` Alternative, welche `3` ist, zu vergleichen. Der Vergleich schlägt fehl.

Dann wird mit `4` verglichen. Übereinstimmung. Der Code zwischen `case 4` bis zum nächsten `break` wird ausgeführt.

**Wenn es keinen `break` gibt, wird die Ausführung mit dem nächsten `case`, ohne jegliche Überprüfung, fortgesetzt.**

Ein Beispiel ohne `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Zu klein' );
*!*
  case 4:
    alert( 'Exakt!' );
  case 5:
    alert( 'Zu gross' );
  default:
    alert( "Ich kenne keine solchen Werte" );
*/!*
}
```

Im obigen Beispiel sehen wir die sequentielle Ausführung von drei `alert`s:

```js
alert( 'Exakt!' );
alert( 'Zu gross' );
alert( "Ich kenne keine solchen Werte" );
```

````smart header="Jeder Ausdruck kann ein `switch/case` Argument sein"
`switch` und `case` erlauben beliebige Ausdrücke.

Zum Beispiel:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("Das funktioniert, weil +a gleich 1 ist, und damit genau gleich wie b+1");
    break;
*/!*

  default:
    alert("Wird nicht durchlaufen");
}
```
Hier ergibt `+a` den Wert `1`, welcher im `case` mit `b + 1` verglichen wird, worauf der entsprechende Code ausgeführt wird.
````

## Gruppieren von "case"

Mehrere Varianten von `case`, die den gleichen Code teilen, können gruppiert werden.

Wenn wir zum Beispiel denselben Code für `case 3` und `case 5` ausführen wollen:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Richtig!');
    break;

*!*
  case 3: // (*) zwei Fälle gruppiert
  case 5:
    alert('Falsch!');
    alert("Warum besuchst du nicht einen Mathekurs?");
    break;
*/!*

  default:
    alert('Das Result ist komisch. Wirklich.');
}
```

Nun zeigen `3` und `5` die selbe Nachricht.

Die Fähigkeit cases zu "grupieren" ist ein Seiteneffekt davon, wie `switch/case` ohne `break` funktioniert. Hier beginnt die Ausführung von `case 3` in der Zeile `(*)` und durchläuft `case 5`, weil dosich dort kein `break` befindet.

## Der Typ spielt eine Rolle

Wichtig ist, dass die Gleichheitsprüfung immer streng ist. Die Werte müssen vom gleichen Typ sein, damit sie übereinstimmen.

Betrachten wir zum Beispiel folgenden Code:

```js run
let arg = prompt("Wert eingeben?");
switch (arg) {
  case '0':
  case '1':
    alert( 'Eins oder null' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Wird niemals ausgeführt!' );
    break;
  default:
    alert( 'Ein unbekannter Wert' );
}
```

1. Für `0`, `1`, wird der erste `alert` ausgeführt.
2. Für `2` wird der zweite `alert` ausgeführt.
3. Aber für `3`, ist das Resultat des `prompt` ein String `"3"`, welcher nicht streng gleich `===` der Zahl `3` entspricht. Also haben wir toten Code in `case 3`! Die `default` Variante wird ausgeführt.
