# Pfeilfunktionen, die Grundlagen

Es gibt eine sehr einfache verkürzte Schreibweise für das Erstellen von Funktionen. Diese sind oftmals besser als Funktionsausdrücke.

Sie werden Pfeilfunktionen genannt, weil sie so aussehen:

```js
let func = (arg1, arg2, ...argN) => expression
```

...Es wird eine Funktion `func` erzeugt, welche die Argumente `arg1..argN` akzeptiert. Danach wird der Ausdruck `expression` auf der rechten Seite ausgewertet und das Ergebnis zurückgegeben.

In anderen Worten, es ist die verkürzte Version von:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

Sehen wir uns ein konkretes Beispiel an:

```js run
let sum = (a, b) => a + b;

/* Die Pfeilfunktion oben ist die verkürzte Form von:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Wie man sehen kann, hat `(a, b) => a + b` die Bedeutung einer Funktion, die zwei Argumente `a` and `b` akzeptiert. Bei der Ausführung wird der Wert `a + b` ausgewertet und das Ergebnis zurückgegegeben.

- Wenn nur ein Argument vorhanden ist, können die Klammern um den Parameter wegelassen werden, was den Ausdruck noch weiter verkürzt.

    Zum Beispiel:

    ```js run
    *!*
    let double = n => n * 2;
    // ist in etwa dasselbe wie: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Wenn keine Argument vorhanden sind, ist die Klammer leer (aber sie sollte vorhanden sein):

    ```js run
    let sayHi = () => alert("Hallo!");

    sayHi();
    ```

Pfeilfunktion können benutzt werden als Funktion innerhalb eines Ausdrucks:

Ein Beispiel wie dynamisch eine Funktion erzeugt wird:

```js run
let age = prompt("Wie alt bist Du", 18);

let welcome = (age < 18) ?
  () => alert('Hallo') :
  () => alert("Willkommen!");

welcome(); // ok now
```

Pfeilfunktion mögen auf den ersten Blick ungewohnt sein. Das ändert sich aber schnell, wenn sich die Augen erst daran gewöhnt haben.

Sie sind sehr bequem für Einzeiler, wenn wir zu faul sind viele Worte zu schreiben.

## Mehrzeilige Pfeilfunktionen

Die Beispiele oben nahmen Argumente von der linken Seite `=>` und werteten den Ausdruck auf der rechten Seite damit aus.

Manchmal brauchen wir etwas Komplizierteres, wie mehrfache Ausdrücke oder Anweisungen. Das ist möglich, aber sie sollten in geschweifte Klammern gesetzt werden und darin explizit `return` benutzt werden.

Zum Beispiel so:

```js run
let sum = (a, b) => {  // geschweifte Klammern öffnen eine mehrzeilige Funktion
  let result = a + b;
*!*
  return result; // wenn geschweifte Klammer benutzt werden, wird ein "return" benötigt
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Noch mehr später"
Wir haben Pfeilfunktionen für ihre Kürze gelobt. Aber das ist nicht alles!

Pfeilfunktionen haben noch andere interessante Möglichkeiten.

Um diese zu verstehen, müssen wir erst einige weitere Aspekte von JavaScript kennenlernen. Wir werden im Kapitel <info:arrow-functions> zu Pfeilfunktion zurückkehren.

Bis hierher können wir die Pfeilfunktionen bereits für einzeilige Aktionen und Callback-Methoden benutzen.
```

## Zusammenfassung

Pfeilfunktionen sind praktisch für Einzeiler und haben folgende Besonderheiten:

1. Ohne geschweifte Klammern: `(...args) => expression` -- die rechte Seite ist ein Ausdruck: die Funktion wertet diesen aus und gibt das Ergebnis zurück
2. Mit geschweiften Klammern: `(...args) => { body }` -- Klammern erlauben es mehrere Anweisungen zu schreiben, aber es braucht ein explizites `return` um etwas zurückzugeben.
