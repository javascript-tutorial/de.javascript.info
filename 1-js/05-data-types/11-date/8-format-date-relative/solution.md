Um die Zeit von `date` bis jetzt zu bekommen -- lass uns die Daten subtrahieren.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // der Unterschied in Millisekunden

  if (diff < 1000) { // weniger als 1 Sekunde
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // diff in Sekunden umwandeln

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // diff in Minuten umwandeln
  if (min < 60) {
    return min + ' min. ago';
  }

  // das Datum formatieren
  // führende Nullen zu einstelligen Tagen/Monaten/Stunden/Minuten hinzufügen
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // die letzten 2 Ziffern jeder Komponente nehmen

  // die Komponenten zu einem Datum zusammenfügen
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// das gestrige Datum wie 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

Alternative Lösung:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // Formatierung
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';  
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```

