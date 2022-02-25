importance: 5

---

# 'if..else' in '?' umschreiben

Schreibe `if..else` unter Verwendung mehrerer bedingter Operatoren `'?'` um.

Zur besseren Lesbarkeit empfiehlt sich, den Code in mehrere Zeilen aufzuteilen.

```js
let message;

if (login == 'Mitarbeiter') {
  message = 'Hallo';
} else if (login == 'Direktor') {
  message = 'Grüße';
} else if (login == '') {
  message = 'Kein Login';
} else {
  message = '';
}
```
