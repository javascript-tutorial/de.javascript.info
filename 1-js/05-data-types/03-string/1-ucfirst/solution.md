Wir können das erste Zeichen nicht "ersetzen", da Strings in JavaScript unveränderlich sind.

Wir können jedoch einen neuen String basierend auf dem bestehenden erstellen, mit einem großgeschriebenen ersten Buchstaben:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Es gibt jedoch ein kleines Problem. Wenn `str` leer ist, dann ist `str[0]` `undefined`, und da `undefined` nicht die Methode `toUpperCase()` besitzt, erhalten wir einen Fehler.

Der einfachste Ausweg ist, eine Überprüfung auf einen leeren String hinzuzufügen, so wie hier:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
