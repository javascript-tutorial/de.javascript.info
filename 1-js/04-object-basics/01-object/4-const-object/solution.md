Das funktioniert natürlich ohne weitere Probleme.

Die `const` schützt nur die Variabel selbst davon sich zu verändern. 

In anderen Worten gesagt speichert `user` eine Referenz zum Objekt. Und diese kann nicht geänder werden, derder Inhalt eines Objekt aber kann. 

```js run
const user = {
  name: "John"
};

*!*
// funktioniert
user.name = "Pete";
*/!*

// error
user = 123;
```
