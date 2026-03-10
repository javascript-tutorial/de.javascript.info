Der `new Date` Konstruktor verwendet die lokale Zeitzone. Das Einzige, woran du dich erinnern musst, ist, dass die Zählung der Monate bei Null beginnt.

Also hat der Februar die Nummer 1.

Hier ist ein Beispiel mit Zahlen als Datumskomponenten:

```js run
// new Date(Jahr, Monat, Tag, Stunde, Minute, Sekunde, Millisekunde)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
Wir könnten auch ein Datum aus einem String erstellen, so wie hier:

```js run
//new Date(Datenstring)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
```
