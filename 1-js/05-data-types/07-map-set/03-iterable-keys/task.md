importance: 5

---

# Iterierbare Schlüssel

Wir möchten ein Array von `map.keys()` in einer Variablen haben und dann darauf array-spezifische Methoden anwenden, z.B. `.push`.

Aber das funktioniert nicht:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Fehler: keys.push ist keine Funktion
keys.push("more");
*/!*
```

Warum? Wie können wir den Code korrigieren, damit `keys.push` funktioniert?

