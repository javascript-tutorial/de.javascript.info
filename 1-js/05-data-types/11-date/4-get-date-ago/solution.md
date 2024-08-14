Die Idee ist einfach: eine gegebene Anzahl von Tagen von `date` abzuziehen:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Aber die Funktion sollte `date` nicht ändern. Das ist eine wichtige Sache, denn der äußere Code, der uns das Datum bereitstellt, erwartet nicht, dass es sich ändert.

Um das zu implementieren, sollten wir das Datum klonen, so wie hier:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1. Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31. Dez 2014)
alert( getDateAgo(date, 365) ); // 2, (2. Jan 2014)
```
