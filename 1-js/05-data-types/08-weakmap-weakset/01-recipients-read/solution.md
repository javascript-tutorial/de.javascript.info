Lass uns gelesene Nachrichten in `WeakSet` speichern:

```js run
let messages = [
  {text: "Hallo", from: "John"},
  {text: "Wie läuft's?", from: "John"},
  {text: "Bis bald", from: "Alice"}
];

let readMessages = new WeakSet();

// Zwei Nachrichten wurden gelesen
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages hat 2 Elemente

// ...lass uns die erste Nachricht nochmal lesen!
readMessages.add(messages[0]);
// readMessages hat immer noch 2 einzigartige Elemente

// Antwort: Wurde die Nachricht[0] gelesen?
alert("Gelesene Nachricht 0: " + readMessages.has(messages[0])); // true

messages.shift();
// jetzt hat readMessages 1 Element (technisch gesehen, könnte der Speicher später bereinigt werden)
```

Das `WeakSet` ermöglicht es, eine Menge von Nachrichten zu speichern und einfach zu überprüfen, ob eine Nachricht darin existiert.

Es bereinigt sich automatisch. Der Kompromiss ist, dass wir nicht darüber iterieren können, wir können "alle gelesenen Nachrichten" daraus nicht direkt erhalten. Aber wir können dies erreichen, indem wir über alle Nachrichten iterieren und diejenigen filtern, die in der Menge sind.

Eine andere, unterschiedliche Lösung könnte sein, einer Nachricht eine Eigenschaft wie `message.isRead=true` hinzuzufügen, nachdem sie gelesen wurde. Da Nachrichtenobjekte von anderem Code verwaltet werden, ist das allgemein nicht empfohlen, aber wir können eine symbolische Eigenschaft verwenden, um Konflikte zu vermeiden.

So wie hier:
```js
// die symbolische Eigenschaft ist nur unserem Code bekannt
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Jetzt wird Code von dritten unsere zusätzliche Eigenschaft wahrscheinlich nicht sehen.

Obwohl Symbole die Wahrscheinlichkeit von Problemen verringern, ist die Verwendung von `WeakSet` aus architektonischer Sicht besser.
