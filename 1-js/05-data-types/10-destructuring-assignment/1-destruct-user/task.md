importance: 5

---

# Zuweisung mit Destrukturierung

Wir haben ein Objekt:

```js
let user = {
  name: "John",
  years: 30
};
```

Schreibe die Zuweisung mit Destrukturierung, die folgendes liest:

- `name` Eigenschaft in die Variable `name`.
- `years` Eigenschaft in die Variable `age`.
- `isAdmin` Eigenschaft in die Variable `isAdmin` (false, falls keine solche Eigenschaft existiert)

Hier ist ein Beispiel von den Werten nach deiner Zuweisung:

```js
let user = { name: "John", years: 30 };

// dein Code auf der linken Seite:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
