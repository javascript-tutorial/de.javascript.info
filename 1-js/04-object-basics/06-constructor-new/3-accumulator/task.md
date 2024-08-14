# Neuen Akkumulator erstellen

Erstelle eine Konstruktorfunktion `Accumulator(startingValue)`.

Das Objekt, das es erstellt, sollte:

- Den "aktuellen Wert" in der Eigenschaft `value` speichern. Der Anfangswert wird auf den Argumentwert des Konstruktors `startingValue` gesetzt.
- Die `read()` Methode sollte `prompt` verwenden, um eine neue Zahl zu lesen und diese zu `value` hinzuzufügen.

Anders ausgedrückt, die Eigenschaft `value` ist die Summe aller von Benutzern eingegebenen Werte mit dem Anfangswert `startingValue`.

Hier ist eine Demo des Codes:

```js
let accumulator = new Accumulator(1); // Anfangswert 1

accumulator.read(); // addiert den vom Benutzer eingegebenen Wert
accumulator.read(); // addiert den vom Benutzer eingegebenen Wert

alert(accumulator.value); // zeigt die Summe dieser Werte
```

[demo]
