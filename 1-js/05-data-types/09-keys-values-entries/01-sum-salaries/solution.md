```js run demo
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```
Oder optional könnten wir die Summe auch mit `Object.values` und `reduce` erhalten:

```js
// reduce iteriert über das Array von Gehältern,
// addiert diese
// und gibt das Ergebnis zurück
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
```
