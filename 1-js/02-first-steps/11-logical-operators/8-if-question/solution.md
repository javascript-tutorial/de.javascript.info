Antwort: Erster und dritter Aufruf werde ausgeführt.

Details:

```js run
// Ausgeführt.
// The result of -1 || 0 = -1, effektiv wahr
if (-1 || 0) alert( 'Erster' );

// Nicht ausgeführt
// -1 && 0 = 0, effektiv nicht wahr
if (-1 && 0) alert( 'Zweiter' );

// Ausgeführt
// Operator && hat höhere Präzedenz als ||,
// damit wird -1 && 1 zuerst ausgewertet, mit der Auswertereihung:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'Dritter' );
```

