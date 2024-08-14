importance: 4

---

# Welcher Tag des Monats war vor vielen Tagen?

Erstelle eine Funktion `getDateAgo(date, days)`, um den Tag des Monats vor `days` Tagen ab dem Datum `date` zu ermitteln.

Beispiel: Wenn heute der 20. ist, dann sollte `getDateAgo(new Date(), 1)` den 19. zurückgeben und `getDateAgo(new Date(), 2)` den 18.

Die Funktion sollte auch zuverlässig für `days=365` oder mehr funktionieren:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1. Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31. Dez 2014)
alert( getDateAgo(date, 365) ); // 2, (2. Jan 2014)
```

P.S. Die Funktion sollte das übergebene `date` nicht verändern.
