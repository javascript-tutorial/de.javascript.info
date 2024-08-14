importance: 4

---

# Das relative Datum formatieren

Schreibe eine Funktion `formatDate(date)`, die das Datum `date` wie folgt formatieren soll:

- Wenn seit `date` weniger als 1 Sekunde vergangen ist, dann `"right now"`.
- Ansonsten, wenn seit `date` weniger als 1 Minute vergangen ist, dann `"n sec. ago"`.
- Ansonsten, wenn weniger als eine Stunde vergangen ist, dann `"m min. ago"`.
- Andernfalls das vollständige Datum im Format `"TT.MM.JJ HH:mm"`. Das heißt: `"Tag.Monat.Jahr Stunden:Minuten"`, alles im 2-Ziffern-Format, z.B. `31.12.16 10:00`.

Zum Beispiel:

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// Das Datum von gestern wie 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
