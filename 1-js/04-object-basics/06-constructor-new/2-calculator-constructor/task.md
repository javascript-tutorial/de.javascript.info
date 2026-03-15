# Erstelle einen neuen Taschenrechner

Erstelle eine Konstruktorfunktion `Calculator`, die Objekte mit 3 Methoden erstellt:

- `read()` fordert zwei Werte an und speichert diese als Objekteigenschaften mit den Namen `a` und `b` entsprechend.
- `sum()` gibt die Summe dieser Eigenschaften zurück.
- `mul()` gibt das Produkt der Multiplikation dieser Eigenschaften zurück.

Zum Beispiel:

```js
let calculator = new Calculator();
calculator.read();

alert( "Summe=" + calculator.sum() );
alert( "Produkt=" + calculator.mul() );
```

[demo]
