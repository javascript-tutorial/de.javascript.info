---
importance: 4

---

# Anagramme filtern

[Anagramme](https://de.wikipedia.org/wiki/Anagramm) sind Wörter, die die gleiche Anzahl von Buchstaben haben, aber in einer anderen Reihenfolge.

Zum Beispiel:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Schreibe eine Funktion `aclean(arr)`, die ein Array zurückgibt, das von Anagrammen bereinigt ist.

Zum Beispiel:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" oder "PAN,cheaters,era"
```

Von jeder Anagrammgruppe sollte nur ein Wort übrig bleiben, egal welches.
