importance: 4

---

# const in Großbuchstaben?

Betrachte den folgenden Code:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Hier haben wir ein konstantes Geburtsdatum `birthday` und das Alter `age`, welches berechnet wird aus `birthday` mittels eines gewissen Codes (dieser wird der Kürze wegen  nicht angegeben und weil Details hier keine Rolle spielen).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

Wäre es richtig, für `birthday` Großbuchstaben zu verwenden? Für `age`? der sogar für beide

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // in Großbuchstaben?

const AGE = someCode(BIRTHDAY); // in Großbuchstaben?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043
```
