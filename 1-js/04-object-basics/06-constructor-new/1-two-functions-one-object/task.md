importance: 2

---

# Zwei Funktionen – ein Objekt

Ist es möglich, Funktionen `A` und `B` zu erstellen, sodass `new A() == new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Wenn es möglich ist, gib bitte ein Beispiel für deren Code.