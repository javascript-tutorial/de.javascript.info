importance: 5

---

# Lesezeitpunkte speichern

Es gibt ein Array von Nachrichten, wie in der [vorherigen Aufgabe](info:task/recipients-read). Die Situation ist ähnlich.

```js
let messages = [
  {text: "Hallo", from: "John"},
  {text: "Wie läuft's?", from: "John"},
  {text: "Bis bald", from: "Alice"}
];
```

Die Frage lautet nun: Welche Datenstruktur würdest Du vorschlagen, um die Information zu speichern: "Wann wurde die Nachricht gelesen?".

In der vorherigen Aufgabe mussten wir nur die Tatsache "ja/nein" speichern. Jetzt müssen wir das Datum speichern, und es sollte nur so lange im Speicher bleiben, bis die Nachricht vom Garbage Collector gelöscht wird.

P.S. Daten können als Objekte der eingebauten `Date`-Klasse gespeichert werden, die wir später behandeln werden.
