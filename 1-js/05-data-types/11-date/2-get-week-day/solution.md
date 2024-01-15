Die Methode `date.getDay()` gibt die Zahl des Wochentags zurück, beginnend mit Sonntag.

Lass uns ein Array von Wochentagen erstellen, damit wir den richtigen Namen des Tages anhand seiner Nummer erhalten können:

```js run demo
function getWeekDay(date) {
  let days = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3. Jan 2014
alert( getWeekDay(date) ); // FR
```
