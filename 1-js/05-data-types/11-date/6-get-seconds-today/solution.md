Um die Anzahl der Sekunden zu ermitteln, können wir ein Datum unter Verwendung des aktuellen Tages und der Uhrzeit 00:00:00 generieren und dieses von "jetzt" subtrahieren.

Die Differenz ist die Anzahl der Millisekunden seit Beginn des Tages, die wir durch 1000 teilen sollten, um Sekunden zu erhalten:

```js run
function getSecondsToday() {
  let now = new Date();

  // erstelle ein Objekt mit dem aktuellen Tag/Monat/Jahr
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms Differenz
  return Math.round(diff / 1000); // mache Sekunden
}

alert( getSecondsToday() );
```

Eine alternative Lösung wäre, Stunden/Minuten/Sekunden zu ermitteln und diese in Sekunden umzurechnen:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
