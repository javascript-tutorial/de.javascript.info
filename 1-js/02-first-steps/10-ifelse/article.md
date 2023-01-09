
# Bedingte Operatoren: if, '?'


Manchmal müssen wir verschiedene Aktionen auf Grundlage unterschiedlicher Bedingungen durchführen.

Um das zu tun, können wir die `if`-Anweisung und den bedingten Operator `?` verwenden, der auch "Fragezeichenoperator" genannt wird.

## Die "if"-Anweisung

Die `if(...)`-Anweisung wertet eine Bedingung in Klammern aus und führt einen Codeblock aus, wenn das Ergebnis `true` ist.

Beispiel:

```js run
let year = prompt('In welchem Jahr wurde die ECMAScript-2015-Spezifikation veröffentlicht?', '');

*!*
if (year == 2015) alert( 'Du liegst richtig!' );
*/!*
```

Im obigen Beispiel ist die Bedingung eine einfache Gleichheitsprüfung (`year == 2015`), sie kann aber auch viel komplexer sein.

Wenn wir mehr als eine Anweisung ausführen wollen, müssen wir unseren Codeblock in geschweifte Klammern einschließen:

```js
if (year == 2015) {
  alert( "Das ist richtig!" );
  alert( "Du bist so schlau!" );
}
```

Wir empfehlen, deinen Codeblock grundsätzlich immer mit geschweiften Klammern `{}` zu versehen, wenn du eine `if`-Anweisung verwendest - auch wenn nur eine Anweisung ausgeführt werden soll. Das verbessert die Lesbarkeit.

## Boolean-Umwandlung

Die `if (…)`-Anweisung wertet die Anweisung in der Klammer aus und wandelt das Ergebnis in einen Boolean (logischen Wert) um.

Erinnern wir uns an die Umwandlungregeln aus dem Kapitel <info:type-conversions>:

- Eine Zahl `0`, ein leerer String `""`, `null`, `undefined`, und `NaN` werden alle zu `false`. Deshalb werden sie "falsy"-Werte genannt.
- Andere Werte werden `true`, daher werden sie als "truthy" bezeichnet.

Der Code unter dieser Bedingung würde also nie ausgeführt werden:

```js
if (0) { // 0 ist "falsy"
  ...
}
```

...und unter dieser Bedingung immer:

```js
if (1) { // 1 ist "truthy"
  ...
}
```

Wir können auch einfach einen schon ausgewerteten Boolean-Wert einer `if`-Anweisung übergeben, etwa so:

```js
let cond = (year == 2015); // Vergleich wird zu true oder false

if (cond) {
  ...
}
```

## Der "else"-Block


Die `if`-Anweisung kann einen optionalen "else"-Block enthalten. Er wird ausgeführt, wenn die Bedingung falsch ist.

<<<<<<< HEAD
=======
The `if` statement may contain an optional `else` block. It executes when the condition is falsy.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

Beispiel:
```js run
let year = prompt('In welchem Jahr wurde die ECMAScript-2015-Spezifikation veröffentlicht?', '');

if (year == 2015) {
  alert( 'Richtig geraten!' );
} else {
  alert( 'Wie kann man sich so irren?' ); // jeder Wert außer 2015
}
```

## Mehrere Bedingungen: "else if"

Manchmal möchten wir gerne mehrere Varianten einer Bedingung überprüfen. Das können wir mit dem `else if`-Block machen.

Beispiel:

```js run
let year = prompt('In welchem Jahr wurde die ECMAScript-2015-Spezifikation veröffentlicht?', '');

if (year < 2015) {
  alert( 'Zu früh...' );
} else if (year > 2015) {
  alert( 'Zu spät.' );
} else {
  alert( 'Exakt!' );
}
```

Im obigen Codeausschnitt evaluiert JavaScript als erstes `year < 2015`. Wenn das Ergebnis *falsy* ist, wird der nächste Ausdruck `year < 2015` ausgewertet. Wenn ebendieser auch *falsy* ist, wird die letzte `alert`-Meldung ausgegeben.

Es kann mehrere `else if`-Blöcke geben. Das finale `else` ist optional.

## Bedingter Operator: '?'

Manchmal müssen wir eine Variable in Abhängigkeit von einer Bedingung zuweisen.

Zum Beispiel:

```js run no-beautify
let accessAllowed;
let age = prompt('Wie alt bist du?', '');

*!*
if (age > 18) {
  accessAllowed = true;   // Zugang erlaubt
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Der sogenannte "bedingte" Operator oder "Fragezeichenoperator" lässt uns das auf eine kürzere und einfachere Weise tun.

Der Operator wird durch ein Fragezeichen `?` dargestellt. Manchmal wird er "ternär" (*ternary*) genannt, weil der Operator drei Operanden besitzt. Es ist eigentlich sogar der einzige Operator in JavaScript, der so viele hat.

Die Syntax lautet:
```js
let result = condition ? value1 : value2;
```

Die Bedingung (`condition`) wird ausgewertet: Wenn sie *truthy* ist, wird `value1` zurückgegeben, andernfalls -- `value2`.

Zum Beispiel:

```js
let accessAllowed = (age > 18) ? true : false;
```

Theoretisch können wir die Klammern um `age > 18` weglassen. Der Fragezeichenoperator hat eine niedrige Priorität, sodass er nach dem Vergleich `>` ausgeführt wird.

Dieses Beispiel macht das gleiche wie das vorherige:

```js
// der Vergleichsoperator "age > 18" wird sowieso zuerst ausgeführt
// (nicht notwendig, ihn in Klammern einzuschließen)
let accessAllowed = age > 18 ? true : false;
```

Allerdings machen Klammern den Code besser lesbar, so dass wir empfehlen, sie zu verwenden.

````smart
Im Beispiel oben kannst du die Verwendung des Fragezeichenoperators vermeiden, da der Vergleich selbst `true/false` zurückgibt:

```js
// gleiche Sache
let accessAllowed = age > 18;
```
````

## Mehrere '?'

Eine Aneinanderreihung von Fragezeichenoperatoren `?` kann einen Wert zurückgeben, der von mehr als einer Bedingung abhängt.

Zum Beispiel:
```js run
let age = prompt('Alter?', 18);

let message = (age < 3) ? 'Hallo, Kleines!' :
  (age < 18) ? 'Hallo!' :
  (age < 100) ? 'Grüße!' :
  'Was ein ungewöhnliches Alter!';

alert( message );
```

Es ist vielleicht auf den ersten Blick schwer zu erkennen, was hier eigentlich passiert. Aber bei näherer Betrachtung sehen wir, dass es sich um eine ganz normale Abfolge von Tests handelt:

<<<<<<< HEAD
1. Das erste Fragezeichen prüft, ob `age < 3`.
2. Falls wahr, gibt es `Hallo, Kleines!` zurück. Andernfalls fährt es mit dem Ausdruck nach dem Doppelpunkt '":"' fort, und prüft `age < 18`.
3. Falls das wahr ist, gibt es `'Hallo!'` zurück. Andernfalls fährt es mit dem Ausdruck nach dem Doppelpunkt '":"' fort, und prüft `age < 100`.
4. Falls das wahr ist, gibt es `'Grüße!'` zurück. Andernfalls fährt es mit dem Ausdruck nach dem letzten Doppelpunkt '":"' fort, und gibt `'Was für ein ungewöhnliches Alter!'` zurück.
=======
1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon ":", checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon ":", checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon ":", returning `'What an unusual age!'`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

So sieht es mit `if..else` aus:

```js
if (age < 3) {
  message = 'Hallo, Kleines!';
} else if (age < 18) {
  message = 'Hallo!';
} else if (age < 100) {
  message = 'Grüße!';
} else {
  message = 'Was ein ungewöhnliches Alter!';
}
```

## Unkonventionelle Nutzung von '?'

Manchmal wird das Fragezeichen `?` als Ersatz für `if` benutzt:

```js run no-beautify
let company = prompt('Welches Unternehmen hat JavaScript erfunden?', '');

*!*
(company == 'Netscape') ?
   alert('Richtig!') : alert('Falsch.');
*/!*
```

Abhängig von der Bedingung `company == 'Netscape'` wird entweder der erste oder zweite Ausdruck nach dem `?` ausgeführt und eine Meldung angezeigt.

Wir weisen hier kein Ergebnis einer Variablen zu. Stattdessen führen wir abhängig von der Bedingung unterschiedlichen Code aus.

**Es wird nicht empfohlen, den Fragezeichenoperator auf diese Weise zu verwenden.**

Diese Notation ist kürzer als das äquivalente `if`-Statement, was einige Programmierer anspricht. Dafür ist es aber schlechter lesbar.

Hier ist der gleiche Code mit `if`zum Vergleich:

```js run no-beautify
let company = prompt('Welches Unternehmen hat JavaScript erfunden?', '');

*!*
if (company == 'Netscape') {
  alert('Richtig!');
} else {
  alert('Falsch.');
}
*/!*
```

Unsere Augen erfassen den Code vertikal. COdeblöcke, die sich über mehrere Zeilen erstrecken, sind leichter zu verstehen als eine lange, horizontale Befehlssammlung.

Der Zweck des Fragezeichenoperators `?` besteht darin, abhängig von seiner Bedingung den einen oder anderen Wert zurückzugeben. Bitte verwende ihn genau dafür. Verwende `if`, wenn du verschiedene Code-Zweige ausführen musst.
