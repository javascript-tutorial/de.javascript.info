Antwort: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

Die Präzedenz von UND `&&` ist höher als die von `||`, deswegen wird UND zuerst ausgeführt.

Das Ergebnis von `2 && 3` lautet `3`, damit wird der Ausdruck zu:

```
null || 3 || 4
```

Das Ergebnis ist dann der erste effektiv wahre Wert: `3`.

