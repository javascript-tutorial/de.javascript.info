importance: 5

---

# Der Gebrauch von "this" bei literalen Objekten

Hier gibt die Funktion `makeUser` ein Objekt aus. 

Was ist das Resultat wenn man auf dessen `ref` zugreift und weshalb? 

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Was ist das Resultat?
```

