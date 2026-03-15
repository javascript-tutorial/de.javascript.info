importance: 5

---

# Summe der Eigenschaften

Es gibt ein `salaries` Objekt mit einer beliebigen Anzahl von Gehältern.

Schreibe die Funktion `sumSalaries(salaries)`, die die Summe aller Gehälter zurückgibt, indem sie `Object.values` und die Schleife `for..of` verwendet.

Wenn `salaries` leer ist, dann muss das Ergebnis `0` sein.

Zum Beispiel:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
