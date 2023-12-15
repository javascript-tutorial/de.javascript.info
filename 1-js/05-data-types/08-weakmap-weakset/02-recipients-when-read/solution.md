Um ein Datum zu speichern, können wir `WeakMap` verwenden:

```js
let nachrichten = [
  {text: "Hallo", from: "John"},
  {text: "Wie läuft's?", from: "John"},
  {text: "Bis bald", from: "Alice"}
];

let leseMap = new WeakMap();

leseMap.set(nachrichten[0], new Date(2017, 1, 1));
// Date-Objekt, das wir später betrachten werden
```
