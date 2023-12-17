Um ein Datum zu speichern, können wir `WeakMap` verwenden:

```js
let messages = [
  {text: "Hallo", from: "John"},
  {text: "Wie läuft's?", from: "John"},
  {text: "Bis bald", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date-Objekt, das wir später betrachten werden
```
