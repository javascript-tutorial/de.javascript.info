importance: 3

---

# Man erkläre die Werte von "this"

Im unten stehenden Code wollen wir die Methode `obj.go()` vier mal hintereinander aufrufen. 

Aber die Aufrufe `(1)` und `(2)`funktionieren ander als die von `(3)` und `(4)`. Warum?
But calls `(1)` and `(2)` works differently from `(3)` and `(4)`. Why?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

