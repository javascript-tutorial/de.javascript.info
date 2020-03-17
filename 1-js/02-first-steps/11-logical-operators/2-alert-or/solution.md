Die Antwort: zuerst `1`, dann `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Der Aufruf von `alert` liefert keinen Wert zurück. Genauer formuliert liefert er `undefined`.

1. Das erste ODER `||` wertet seinen linke Operanden `alert(1)` aus. Das führt zur Anzeige der ersten Nachricht `1`.
2. Der Aufruf von `alert` liefert `undefined`, also setzt ODER die Suche nach einen effektiv wahren Wert mit dem zweiten Operanden fort.
3. Der zweite Operand `2` ist effektiv wahr, die Ausführung wird gestoppt, `2` wird zurückgegeben und mittels des äußeren `alert` angezeigt.

`3` wird nicht angezeigt, da die Auswertung `alert(3)` nicht erreicht.
