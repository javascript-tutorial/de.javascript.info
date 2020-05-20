importance: 3

---

# Numerische Properties mit Faktor 2 multiplizieren

Man schaffe eine Funktion `multiplyNumeric(obj)`, die alle numerischen Properties von `obj` mit `2` multipliziert. 

Zum Beispiel: 

```js
// vor dem Aufruf 
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// nach dem Aufruf 
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

Man beachte, dass `multiplyNumeric` nichts auszugeben hat. Es sollte eher das Objekt modifizieren. 

P.S. Man nutze hier `typeof` um nach einer Nummer zu prüfen. 


