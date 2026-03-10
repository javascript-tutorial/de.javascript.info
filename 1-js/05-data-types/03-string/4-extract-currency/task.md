importance: 4

---

# Extrahiere den Geldbetrag

Wir haben Kosten in der Form `"$120"`. Das heißt: das Dollarzeichen steht zuerst, und dann die Zahl.

Erstelle eine Funktion `extractCurrencyValue(str)`, die den numerischen Wert aus einem solchen String extrahiert und ihn zurückgibt.

Das Beispiel:

```js
alert( extractCurrencyValue('$120') === 120 ); // true
```
