importance: 5

---

# Speicherung von "ungelesen"-Markierungen

Gegeben sei ein Array von Nachrichten:

```js
let messages = [
  {text: "Hallo", from: "John"},
  {text: "Wie läuft's?", from: "John"},
  {text: "Bis bald", from: "Alice"}
];
```

Dein Code kann darauf zugreifen, aber die Nachrichten werden von anderem Code verwaltet. Neue Nachrichten werden hinzugefügt, alte regelmäßig entfernt, und du weißt nicht genau, in welchen Momenten das passiert.

Welche Datenstruktur könntest du nun verwenden, um Informationen darüber zu speichern, ob die Nachricht "gelesen wurde"? Die Struktur muss gut geeignet sein, um die Frage "wurde es gelesen?" für das gegebene Nachrichtenobjekt zu beantworten.

P.S. Wenn eine Nachricht aus `messages` entfernt wird, sollte sie auch aus deiner Struktur verschwinden.

P.P.S. Wir sollten die Nachrichtenobjekte nicht modifizieren oder unsere Eigenschaften hinzufügen. Da sie von anderem Code verwaltet werden, könnte das zu schlechten Konsequenzen führen.
