Um die Anzahl der Millisekunden bis zum morgigen Tag zu berechnen, können wir vom "morgigen Tag, 00:00:00" das aktuelle Datum subtrahieren.

Zuerst erzeugen wir das "morgige" Datum, und dann tun wir Folgendes:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // morgiges Datum
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // Differenz in ms
  return Math.round(diff / 1000); // umrechnen in Sekunden
}
```

Alternative Lösung:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Bitte beachte, dass viele Länder die Sommerzeit (DST) einführen, daher kann es Tage mit 23 oder 25 Stunden geben. Wir möchten solche Tage möglicherweise gesondert behandeln.
