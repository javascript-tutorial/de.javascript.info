Probier es aus:

```js run
let str = 'Hallo';

str.test = 5; // (*)

alert(str.test);
```

Abhängig davon, ob du `use strict` verwendest oder nicht, kann das Ergebnis wie folgt aussehen:

1. `undefined` (kein strict mode)
2. Ein Fehler (strict mode).

Warum? Wiederholen wir, was in der Zeile `(*)` passiert:

1. Wenn auf eine Eigenschaft von`str` zugegriffen wird, wird ein " Wrapper-Objekt" erstellt.
2. Im strict mode, erzeugt eine Wertzuweisung einen Fehler.
3. Andernfalls wird die Bearbeitung der Eigenschaft fortgesetzt, das Objekt erhält die Eigenschaft `test`, aber danach verschwindet das "Wrapper-Objekt", so dass in der letzten Zeile `str` keine Rückschlüsse mehr auf die Eigenschaft hat.

**Dieses Beispiel zeigt deutlich, dass Primitive keine Objekte sind.**

Sie können keine zusätzlichen Daten speichern.
