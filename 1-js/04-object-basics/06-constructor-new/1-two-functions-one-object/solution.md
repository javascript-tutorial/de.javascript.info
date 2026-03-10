Ja, es ist möglich.

Wenn eine Funktion ein Objekt zurückgibt, dann gibt `new` dieses statt `this` zurück.

So können sie zum Beispiel dasselbe extern definierte Objekt `obj` zurückgeben:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
