
# Das alte "var"

```smart header="Dieser Artikel ist zum verstehen alter Scripte"
Die Informationen in diesem Artikel sind nützlich um alte Scripts zu Verstehen.

So schreiben wir keinen Code.
```

Im allerersten Kapitel über Variablen [variables](info:variables) haben wir drei Arten der Variablendeklaration erwähnt:

1. `let`
2. `const`
3. `var`

Die Deklaration `var` ähnelt `let`. Meistens können wir `let` durch `var` ersetzen oder umgekehrt und erwarten, dass alles funktioniert:

```js run
var message = "Hi";
alert(message); // Hi
```

Innerlich ist `var` jedoch ein ganz anderes Biest, das aus sehr alten Zeiten stammt. Es wird in modernen Skripten generell nicht verwendet, taucht aber noch in alten Skripten auf.

Wenn du nicht vorhast, auf solche Skripte zu treffen, kannst du dieses Kapitel überspringen oder auf später verschieben.

Andererseits ist es wichtig, die Unterschiede beim Migrieren alter Skripte von `var` zu `let` zu verstehen, um seltsame Fehler zu vermeiden.

## "var" hat keinen Blockscope

Mit `var` deklarierte Variablen sind entweder funktions- oder global-scope. Sie sind durch Blöcke hindurch sichtbar.

Zum Beispiel:

```js run
if (true) {
  var test = true; // nutze "var" anstelle von "let"
}

*!*
alert(test); // true, die Variable lebt weiter
*/!*
```

Da `var` Codeblöcke ignoriert, haben wir hier eine globale Variable `test`.

Wenn wir statt `let test` `var test` verwendet hätten, wäre die Variable nur innerhalb des `if` sichtbar:

```js run
if (true) {
  let test = true; // nutze "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

Dasselbe gilt für Schleifen: `var` kann nicht block- oder schleifenlokal sein:

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i);   // 10, "i" ist nachdem loop sichtbar, es ist eine globale Variable
alert(one); // 1, "one" ist nachdem loop sichtbar, es ist eine globale Variable
*/!*
```

Wenn ein Codeblock innerhalb einer Funktion steht, wird `var` zur funktionsweiten Variable:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hallo";
  }

  alert(phrase); // funktioniert
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

Wie wir sehen, durchdringt `var` `if`, `for` oder andere Codeblöcke. Das liegt daran, dass Blöcke in JavaScript lange Zeit keine Lexical Environments hatten, und `var` ein Überbleibsel davon ist.

## "var" toleriert Neudeklarationen

Wenn wir dieselbe Variable mit `let` zweimal im selben Scope deklarieren, ist das ein Fehler:

```js run
let nutzer;
let nutzer; // SyntaxError: 'nutzer' has already been declared
```

Mit `var` können wir eine Variable beliebig oft neu deklarieren. Wenn wir `var` zu einer bereits deklarierten Variable hinzufügen, wird das einfach ignoriert:

```js run
var nutzer = "Pete";

var nutzer = "John"; // dieses "var" macht nichts (bereits deklariert)
// ...es löst keinen Fehler aus

alert(nutzer); // John
```

## "var"-Variablen können unterhalb ihrer Verwendung deklariert werden

`var`-Deklarationen werden verarbeitet, wenn die Funktion startet (oder das Script für Globals startet).

Mit anderen Worten: `var` -Variablen sind von Anfang an der Funktion definiert, egal wo die Deklaration steht (vorausgesetzt, die Deklaration ist nicht in einer verschachtelten Funktion).

Also ist dieser Code:

```js run
function sayHi() {
  phrase = "Hallo";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...technisch dasselbe wie dieses (`var phrase` nach oben verschoben):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hallo";

  alert(phrase);
}
sayHi();
```

...Oder sogar wie dieses (denk daran, Codeblöcke werden ignoriert):

```js run
function sayHi() {
  phrase = "Hallo"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Man nennt dieses Verhalten auch "hoisting" (Hochziehen), weil alle `var` nach oben "gehoben" werden.

Also in obigem Beispiel wird der `if (false)`-Zweig nie ausgeführt, aber das spielt keine Rolle. Das `var` darin wird zu Beginn der Funktion verarbeitet, sodass die Variable zum Zeitpunkt von `(*)` existiert.

**Deklarationen werden hochgezogen, Zuweisungen jedoch nicht.**

Das zeigt sich am besten mit einem Beispiel:

```js run
function sayHi() {
  alert(phrase);

*!*
  var phrase = "Hallo";
*/!*
}

sayHi();
```

Die Zeile `var phrase = "Hello"` enthält zwei Aktionen:

1. Variablendeklaration `var`
2. Variablenzuweisung `=`.

Die Deklaration wird beim Start der Funktion ausgeführt ("hoisted"), aber die Zuweisung passiert an der Stelle, an der sie steht. Also funktioniert der Code im Wesentlichen so:

```js run
function sayHi() {
*!*
  var phrase; // Deklaration funktioniert am Start
*/!*

  alert(phrase); // undefiniert

*!*
  phrase = "Hallo"; // ...Zuweisung - wenn die Ausführung es erreicht
*/!*
}

sayHi();
```

Weil alle `var`-Deklarationen zu Beginn der Funktion verarbeitet werden, können wir an jeder Stelle darauf verweisen. Variablen sind jedoch undefiniert, bis die Zuweisungen passieren.

In beiden obigen Beispielen läuft `alert` ohne Fehler, weil die Variable `phrase` existiert. Ihr Wert ist jedoch noch nicht zugewiesen, daher wird `undefiniert` angezeigt.

## IIFE

Früher, da es nur `var` gab und es keine Block-Sichtbarkeit gab, erfanden Programmierer eine Möglichkeit, das zu emulieren. Das nannte man "immediately-invoked function expressions" (abgekürzt IIFE).
Das sollte man heute nicht mehr verwenden, aber man findet es in alten Skripten.

Eine IIFE sieht so aus:

```js run
(function() {

  var nachricht = "Hallo";

  alert(nachricht); // Hallo

})();
```

Hier wird ein Function Expression erstellt und sofort aufgerufen. Der Code läuft sofort und hat seine eigenen private Variablen.

Das Function Expression ist mit Klammern `(function {...})` umgeben, denn wenn die JavaScript-Engine im Hauptcode auf `"function"` stößt, versteht sie das als Beginn einer Funktionsdeklaration. Eine Funktionsdeklaration muss jedoch einen Namen haben, daher würde dieser Code einen Fehler geben:

```js run
// Versucht, eine Funktion zu deklarieren und sofort aufzurufen
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hallo";

  alert(message); // Hallo

}();
```

Selbst wenn wir einen Namen hinzufügen, funktioniert das nicht, da JavaScript Funktionsdeklaration nicht sofort aufrufbar sind:

```js run
// Syntaxfehler aufgrund der untenstehenden Klammern
function go() {

}(); // <-- Funktionsdeklaration kann nicht direkt aufgerufen werden
```

Die Klammern um die Funktion sind also ein Trick, um JavaScript zu zeigen, dass die Funktion im Kontext eines Ausdrucks erstellt wird und damit ein Function Expression ist: es braucht keinen Namen und kann sofort aufgerufen werden.

Es gibt neben Klammern noch andere Wege, JavaScript zu sagen, dass ein Function Expression gemeint ist:

```js run
// Wege ein IIFE zu erstellen

*!*(*/!*function() {
  alert("Klammern um die Funktion");
}*!*)*/!*();

*!*(*/!*function() {
  alert("Klammern um das Ganze");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT-Operator startet den Ausdruck");
}();

*!*+*/!*function() {
  alert("Das unäre Plus startet den Ausdruckskontext");
}();
```

In allen obigen Fällen deklarieren wir ein Function Expression und führen es sofort aus. Nochmals: heutzutage gibt es keinen Grund, solchen Code zu schreiben.

## Zusammenfassung

Es gibt zwei Hauptunterschiede von `var` im Vergleich zu `let/const`:

1. `var`-Variablen haben keinen Blockscope; ihre Sichtbarkeit ist auf die aktuelle Funktion beschränkt oder global, wenn sie außerhalb einer Funktion deklariert sind.
2. `var`-Deklarationen werden zu Beginn der Funktion (für Globals: des Scripts) verarbeitet.

Es gibt noch einen sehr kleinen Unterschied in Bezug auf das globale Objekt, den wir im nächsten Kapitel behandeln.

Diese Unterschiede machen `var` in den meisten Fällen schlechter als `let`. Blocklevel-Variablen sind eine großartige Sache. Deshalb wurde `let` schon lange in den Standard aufgenommen und ist jetzt zusammen mit `const` eine Hauptmethode, Variablen zu deklarieren.
