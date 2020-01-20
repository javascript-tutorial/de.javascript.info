importance: 4

---

# const in Großbuchstaben?

Betrachte den folgenden Code:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Hier haben wir ein konstantes Geburtsdatum `birthday` und das Alter `age`, welches berechnet wird aus `birthday` mittels eines gewissen Codes (dieser wird der Kürze wegen  nicht angegeben und weil Details hier keine Rolle spielen).

Wäre es richtig, für `birthday` Großbuchstaben zu verwenden? Für `age`? der sogar für beide

```js
const BIRTHDAY = '18.04.1982'; // in Großbuchstaben?

const AGE = someCode(BIRTHDAY); // in Großbuchstaben?
```

