Das liegt daran, dass `map.keys()` ein iterierbares Objekt zurückgibt, aber kein Array.

Wir können es mit `Array.from` in ein Array umwandeln:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
