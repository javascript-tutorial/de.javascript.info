
Backticks binden den Ausdruck innerhalb von `${...}` in den String ein.

```js run
let name = "Ilya";

// Der Ausdruck ist eine Zahl 1
alert( `Hallo ${1}` ); // Hallo 1

// Der Ausdruck ist ein String "name"
alert( `Hallo ${"name"}` ); // Hallo name

// Der Ausdruck bindet eine Variable ein
alert( `Hallo ${name}` ); // Hallo Ilya
```
