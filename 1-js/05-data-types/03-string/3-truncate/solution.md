Die maximale Länge muss `maxlength` sein, daher müssen wir den Text ein wenig kürzen, um Platz für die Auslassungspunkte zu schaffen.

Beachte, dass es tatsächlich ein einzelnes Unicode-Zeichen für eine Auslassung gibt. Das sind nicht drei Punkte.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
