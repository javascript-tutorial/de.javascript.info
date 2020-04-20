**Error**!

Man versuche es einfach:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
```

Die Fehlermedlung in den meisten Browsern liefert einen nicht wirklich ein Verständnis dafür was schief lief. 

**Der Fehler erscheint, da ein Semikolon nach `user = {...}` fehlt.**

JavaScript fügt automatisch kein Semikolon vor einer Klammer ein, weshalb das Skript den Code wie folgt liest: 

```js no-beautify
let user = { go:... }(user.go)()
```

Wir können zudem sehen, das solch eine zusammenhängende Expression syntakitisch gesehen der Aufruf des Objekt `{ go: ... }` ist, als eine Funktion mit dem Argument `(user.go)`. Und genau das passiert in der selben Zeile mit `let user`, sodass das Objekt `user` nicht einmal definiert wurde. Darum der Fehler. 

Wenn wir ein Semikolon einfügen läuft alles wie gewollt: 

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Man beachte, dass die Parenthesen um `(user.go)` nichts bewirken. Normalerweise stellen sie die Reihenfolge der Operationen auf, aber hier agiert der Punkt `.` zuerst, weshalb sie keine Wirkung haben. Nur die Sache mit dem Semikolon zählt.
