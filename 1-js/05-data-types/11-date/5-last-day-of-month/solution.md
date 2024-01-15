Lass uns ein Datum erstellen, indem wir den nächsten Monat nehmen, aber als Tag eine Null übergeben:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Normalerweise beginnen Daten ab der Zahl 1, technisch gesehen können wir aber jede Zahl übergeben, das Datum wird sich selbst automatisch anpassen. Also, wenn wir 0 übergeben, dann bedeutet das "ein Tag vor dem ersten Tag des Monats", anders ausgedrückt: "der letzte Tag des vorherigen Monats".
