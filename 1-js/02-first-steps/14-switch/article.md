# Die "switch" Anweisung

Eine `switch` Anweisung kann mehrere `if` Prüfungen ersetzen.

Es bietet eine anschaulichere Möglichkeit, einen Wert mit mehreren Varianten zu vergleichen.

## Der Syntax

Die `switch` Anweisung hat eine oder mehrere `case` Blöcke und einen optionalen default-Block.

Es sieht wie folgt aus:

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

- Der Wert von `x` wird auf eine strikte Gleichheit mit dem Wert aus dem ersten `case` geprüft. (das ist, `value1`) dann mit dem zweiten (`value2`) und so weiter.
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
`switch` und `case` erlauben willkürliche Ausdrücke.

Zum Beispiel:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("Das funktioniert, weil +a entspricht 1, und darum genau gleich wie b+1 ist");
    break;
*/!*

  default:
    alert("Wird nicht durchlaufen");
}
```
Hier ergibt `+a` den Wert `1`, welcher im `case` mit `b + 1` verglichen wird, und der entsprechende Code ausgeführt wird.
````

## Grupieren von "case"

Mehrere Varianten von `case`, die den gleichen Code teilen, können gruppiert werden.

Wenn wir zum Beispiel denselben Code für `case 3` und `case 5` ausführen wollen:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Richtig!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Falsch!');
    alert("Warum besuchst du nicht einen Mathekurs?");
    break;
*/!*

  default:
    alert('Das Result ist komisch. Wirklich.');
}
```

Now both `3` and `5` show the same message.

The ability to "group" cases is a side-effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.

## Type matters

Let's emphasize that the equality check is always strict. The values must be of the same type to match.

For example, let's consider the code:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. For `0`, `1`, the first `alert` runs.
2. For `2` the second `alert` runs.
3. But for `3`, the result of the `prompt` is a string `"3"`, which is not strictly equal `===` to the number `3`. So we've got a dead code in `case 3`! The `default` variant will execute.
