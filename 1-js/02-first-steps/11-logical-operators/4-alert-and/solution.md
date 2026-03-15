Antwort: `1`, anschließend `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Der Aufruf von `alert` gibt `undefined` zurück (Die Funktion gibt nur eine Nachricht aus, ohne Rückgabewert).

Deswegen wertet `&&` den linken Operanden aus (Ausgabe von `1`) und terminiert unmittelbar, da `undefined` ein effektiv nicht wahrer Wert ist. `&&` wiederum sucht nach einem effektiv nicht wahren Wert und gibt ihn zurück, das beendet somit die Auswertung.

