Der Grund liegt darin, dass promt Nutzereingaben als string zurückgibt.

Somit haben die Variablen die Were `"1"`beziehungsweise `"2"`.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

Was wir stattdessen tun sollten ist die Strings zu Zahlen zu konvertieren, bevor wir sie mit `+` addieren, z.B, durch `Number()` , oder indem man den String vorne ein `+` hinzufügt.

Zum Beispiel kurz vor `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

Oder in `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

Wir benutzen hier sowohl das unäre als auch das binäre `+`. Sieht komisch aus, oder?
