**Ja, die Meldung wird angezeigt.**

Jeder String außer einem leeren String (und `"0"` ist nicht leer) wird im logischen Kontext zu `true`.

Wir können das überprüfen:

```js run
if ("0") {
  alert( 'Hello' );
}
```

