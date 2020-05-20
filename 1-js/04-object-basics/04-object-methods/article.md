# Methoden des Objekt, "this"

Objekte erstellt man für gewöhnlich um Entitäten der realen Welt zu schaffen, wie Nutzer oder Bestellungen usw.:

```js
let user = {
  name: "John",
  age: 30
};
```

Und in der realen Welt kann ein Nutzer *agieren*: Etwas vom Einkaufswagen auswählen, sich ein- und ausloggen etc. 

Aktionen werden in JavaScript durch Funktionen in den Properties repräsentiert.

## Beispiele für Methoden 

Last uns zu Beginn den Nutzer lehren Hallo zu sagen: 

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hallo!");
};
*/!*

user.sayHi(); // Hallo!
```

Hier haben wir schlicht eine Function Expression genutzt um die Funktion zu kreieren und diese der Property `user.sayHi` des Objekt hinzugefügt. 

Dann können wir sie aufrufen. Der Nutzer kann jetzt sprechen!

Eine Funktion, welche die Property eines Objekt ist, nennt sich dessen *Methode*. 

Wir haben hier also die Methode `sayHi` des Objekt `user`.

Wir könnten natürlich auch eine zuvor definierte Funktion als eine Methode nutzen: 

```js run
let user = {
  // ...
};

*!*
// first, declare
function sayHi() {
  alert("Hallo!");
};

// diese als Methode hinzufügen 
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hallo!
```

```smart header="Objektorientiertes Programmieren"
Wenn wir unseren Code so schreiben, dass Objekte Entitäten repräsentieren, nennt sich das [objektorientierte Programmierung](https://de.wikipedia.org/wiki/Objektorientierte_Programmierung), kurz: "OOP".

OOP ist eine große Sache, eine Wissenschaft für sich. Wie wählt man die passende Entitäten? Wie organisiert man die Interaktion zwischen ihnen? Das ist Architektur und es gibt großartige Bücher über das Thema, wie "Design Patterns: Elements of Reusable Object-Oriented Software" von E. Gamma, R. Helm, R. Johnson, J. Vissides oder "Object-Oriented Analysis and Design with Applications" von G. Booch und viele mehr. 
```
### Kurzschrift für Methoden 

Es existiert ein kürzer Syntax für Methoden innerhalb literarischen Objekten: 

```js
// die Objekte tun das selbe 

user = {
  sayHi: function() {
    alert("Hallo");
  }
};

// die Kurzschrift für Methoden sieht besser aus, nicht? 
user = {
*!*
  sayHi() { // same as "sayHi: function()"
*/!*
    alert("Hallo");
  }
};
```

Wie demonstriert, können wir `"function"` weglassen und nur `sayHi()` schreiben. 

Um bei der Wahrheit zu bleiben: Die Notationen sind nicht ganz identisch. Es gibt feine Unterschiede in Bezug auf die Objektvererbung (die später behandelt wird), die uns noch nicht interessiert. In den meisten fällen wird die Kurzschrift bevorzugt. 

## "this" innerhalb von Methoden 

Es ist üblich, dass die Methode eines Objekt auf Informationen, die innerhalb des Objekt abgespeichert sind, zugreifen muss um seine Arbeit zu tun. 

So benötigt der Code innerhalb von `user.sayHi()` möglicherweise den Namen des `user`. 

**Um auf das Objekt zuzugreifen, kann eine Methode das Schlüsselwort `this` nutzen.**

Der Wert `this` ist das Objekt "vor dem Punkt", welches genutzt wurde um die Methode aufzurufen. 

Zum Beispiel:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" ist das "derzeitige Objekt"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Hier ist der Wert von `this`, während der Ausführung von `user.sayHi()`, `user`.

Technisch gesehen ist es auch möglich auf das Objekt ohne `this` zuzugreifen, indem man mit einer außenstehenden Variabel auf dieses verweist. 

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" anstelle von "this"
*/!*
  }

};
```
... aber ein solcher Code ist unzuverlässig. Wenn wir uns dafür entscheiden `user` in eine andere Variabel zu kopieren, zum Beispiel `admin = user` und `user` mit etwas anderem überschreiben, dann wird auf das falsche Objekt zugegriffen. 

Das wird hier demonstriert:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // führt zu einem Fehler
*/!*
  }

};


let admin = user;
user = null; // Überschreibung um die Sache offensichtlich zu machen

admin.sayHi(); // Whoops! innerhalb sayHi() wird der alte Name genutzt! Fehler!
```
`alert`
Hätten wir `this.name` anstelle von `user.name` innerhalb des `alert` genutzt, dann würde der Code funktionieren. 

## "this" hat keine Bindung 

In JavaScript verhält sich das Schlüsselwort `this` wie in kaum einer anderen Programmiersprache. Es kann in jeder Funktion genutzt werden. 

Im folgenden Beispiel gibt es keinen Syntaxfehler: 

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

Der Wert von `this` wird während der Ausführung evaluiert und hängt vom Kontext ab. 

Hier wird die selbe Funktion zwei unterschiedlichen Objekten zugeschrieben und "this" hat verschiedene Resultate beim Abruf: 

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// man nutzt die selbe Funktion für zwei Objekte
user.f = sayHi;
admin.f = sayHi;
*/!*

// diese Aufrufe haben ein unterschiedliches this
// "this" innerhalb der Funktion ist das Objekt "vor dem Punkt"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (Punkt oder eckige Klammern greifen auf die Methode zu - da gibt es keinen Unterschied)
```

Die Regeln sind simpel: Wenn `obj.f()` aufgerufen wird, dann ist `this` während des Aufruf von `f` `obj`. Deshalb ergibt es entweder `user` oder `admin` im obigen Beispiel.

````smart header="Aufruf ohne ein Objekt: `this == undefined`"
Wir können die Funktion gar ohne ein Objekt aufrufen:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

In diesem Fall ist `this`, im strikten Modus, `undefined`. Wenn wir versuchen auf `this.name` zuzugreifen, dann wird es einen Fehler geben. 

Im nicht striktren Modus entspricht der Wert von `this` in einem solchen Fall dem *Globalen Objekt* (`window` in einem Browser, wir werden noch später im Kapitel [](info:global-object) dazu kommen). Das ist ein historisch bedingtes Verhalten, das `"use strict"` behebt. 

Normalerweise wäre ein solcher Aufruf ein Programmierfehler. Wenn ein `this` innerhalb einer Funktion steht, wird davon ausgegangen das dies im Kontext eines Objekt geschieht. 
````

```smart header="Die Konsequenzen eines ungebunden `this`"
Wenn man von einer anderen Programmiersprache herkommt, ist man wahrscheinlich an die Idee eines "gebunden `this`" gewohnt, wo Methoden, die innerhalb eines Objekt definiert wurden, `this` immer auf dieses Objekt verweist. 

In JavaScript ist `this` "frei": Dessen Wert wird bim Abruf evaluiert und ist nicht davon abhängig an welcher Stelle die Methode deklariert wurde, aber eher davon welches Objekt "vor dem Punkt" steht. 

Das Konzept eines während der Ausführung evaluierten `this` hat Vor- wie Nachteile. Auf der einen Seite kann eine Funktion für verschiedene Objekte mehrmals wiederverwendet werden. Auf der anderen schafft die große Flexibilität mehr Möglichkeiten für Fehler. 

Wir wollen hier aber nicht darüber urteilen ob dieses Design der Sprache gut oder schlecht ist. Wir wollen verstehen mit diesem umzugehen und damit zu arbeiten, wie man davon profitiert und Probleme vermeidet. 
```

## Internes: Referenztyp

```warn header="In die tiefe gehendes Sprachmerkmal"
Dieser Abschnitt behandelt ein erweiterndes Thema, um gewisse Grenzfälle besser zu verstehen. 

Wenn man schneller fortschreiten möchte kann dieser Abschnitt übersprungen oder aufgeschoben werden.
```

Ein komplizierter Methodenaufruf kann `this` verlieren. Hier zum Beispiel: 

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (der einfache Aufruf klappt)

*!*
// man ruft nun user.hi oder user.bye abhängig vom Namen auf
(user.name == "John" ? user.hi : user.bye)(); // Fehler!
*/!*
```

In der letzten Zeile gibt es einen konditionellen Operator, der entweder `user.hi` oder `user.bye` auswählt. In diesem Fall ist das Resultat `user.hi`. 

Dann wird die Methode umgehend mit Parenthesen `()` aufgerufen. Aber es funktioniert nicht richtig! 

Wie man sehen kann endet der Aufruf in einem Fehler, da der Wert von `"this"` innerhalb des Aufruf zu `undefined` wird. 

Das hier funktioniert (Objekt-Punkt-Methode):
```js
user.hi();
```

Das hier nicht (evaluierte Methode): 
```js
(user.name == "John" ? user.hi : user.bye)(); // Fehler!
```

Weshalb? Wenn wir verstehen wollen weshalb das passiert, dann sollten wir genauer verstehen wie der Aufruf `obj.method()` im inneren funktioniert. 

Wenn man genauer hinschaut bemerkt man zwei Operationen innerhalb des Statement von `obj.method()`: 

1. Als erstes findet der Punkt `'.'` die Property `obj.method`.
2. Dann führen die Parenthesen `()` diese aus. 

Wie wird also die Information über `this` vom ersten Part zum zweiten rüber gebracht? 

Wenn wir diese Operationen auf unterschiedliche Zeilen stellen wird `this` mit Sicherheit verloren gehen: 

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// man teile das Erhalten und den Aufruf der Methode in zwei Zeilen auf 
let hi = user.hi;
hi(); // Error, da this undefiniert ist 
*/!*
```

Hier steckt `hi = user.hi` die Funktion in die Variabel und in der letzten Zeile steht die Funktion ganz alleine da und so gibt es dann kein `this`. 

**Das Aufrufe wie `user.hi()` funktionieren, nutzt JavaScript einen Trick -- der Punkt `'.'` gibt nicht eine Funktion aus, aber einen Wert des speziellen [Referenztyp](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

Der Referenztyp ist ein "Spezifikationstyp". Wir können ihn explizit nutzen, wird aber hauptsächlich inter von der Sprache genutzt. 

Der Wert des Referenztyp ist die Kombination aus drei Werten `(base, name, strict)`, wobei: 

- `base` das Objekt ist. 
- `name` der Property-Name ist. 
- `strict` wahr ist wenn `use strict` genutzt wird. 

Das Resultat eines Zugriff auf eine Property `user.hi` ist keine Funktion, jedoch ein Wert des Referenztyp. Im strikten Modus ist dieser für `user.hi`:

```js
// Reference Type value
(user, "hi", true)
```

Wenn Parenthesen `()` bei einem Referenztyp aufgerufen werden, dann erhalten diese vollständige Informationen über das Objekt und dessen Methoden und können nach dem richtigen `this` (`=user` in diesem Fall) schauen.

Ein Referenztyp ist ein spezieller interner "vermittlerischer" Typ, mit dem Zweck Informationen vom `.` zu den aufgerufenen Parenthesen `()` rüber zu spielen. 

Jegliche andere Operationen wie Zuweisungen `hi = user.hi` verwerfen den Referenztyp. Der Wert von `user.hi` (eine Funktion) wird aufgenommen und wird weitergegeben. Deshalb "verliert" jede weiter Operation `this`.

Das Resultat ist, dass der Wert von `this` nur auf richtige Weise weitergegeben wird, wenn die Funktion direkt mit dem Punkt `obj.method()` oder mit den eckigen Klammern `obj['method']()` aufgerufen wird (beide tun das selbe). Später noch werden wird zahlreiche Wege kennenlernen mit denen wir dieses Problem lösen, wie bspw. mit [func.bind()](/bind#solution-2-bind).

## Pfeilfunktionen verügen über kein "this"

Pfeilfunktionen sind speziell: Sie verfügen über kein "eigenes" `this`. Wenn wir auf `this` innerhalb einer solchen Funktion verweisen, wird der Wert von `this` von der äußeren "normalen" Funktion aufgegriffen. 

Hier nutzt `arrow()` zum Beispiel `this` von der äußeren Methode `user.sayHi()`: 

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Das ist eine spezielle Funktion der Pfeilfunktion, die nutzvoll ist wenn wir eigentlich kein separates `this` haben wollen, aber es eher vom äußeren Kontext aufnehmen wollen. Im Kapitel <info:arrow-functions> werden wir unser Wissen über Pfeilfunktionen vertiefen. 


## Zusammenfassung

- Funktionen die innerhalb von Properties eines Objekt gespeichert sind, nennen sich "Methoden". 
- Methoden erlauben es Objekten zu "agieren", wie `object.doSomething()`.
- Methoden können auf das Objekt mit `this` verweisen. 

Der Wert von `this` wird während der Ausführung evaluiert. 
- Wenn eine Funktion deklariert wurde, nutzt sie möglicherweise `this`, wobei dieses `this` keinen Wert hat solange die Funktion nicht aufgerufen wird. 
- Eine Funktion kann zwischen Objekten transferiert werden. 
- Wenn eine Funktion mit dem "Methodensyntax" aufgerufen wird: `object.method()`, der Wert von `this` während des Aufruf ist `object`.

Man beachte, dass Pfeilfunktionen speziell sind: Sie verfügen über kein `this`. Wenn auf `this` innerhalb einer Pfeilfunktion zugegriffen wird, dann wird dessen Wert von außerhalb aufgegriffen. 
