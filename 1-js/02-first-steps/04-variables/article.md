# Variablen

Die meiste Zeit muss eine JavaScript-Anwendung mit Informationen arbeiten. Hier sind zwei Beispiele:
1. Ein Onlineshop - die Informationen können verkaufte Waren und einen Warenkorb enthalten.
2. Eine Chat-Anwendung - die Informationen können Benutzer, Nachrichten und vieles mehr beinhalten.

Diese Informationen werden in Variablen gespeichert.

## Eine Variable

Eine [Variable](https://de.wikipedia.org/wiki/Variable_(Programmierung)) ist ein "benannter Speicher" für Daten. Wir können Variablen verwenden, um Leckereien, Besucher und andere Daten zu speichern.

Um eine Variable in JavaScript zu erstellen, verwende das `let` Schlüsselwort.

Die folgende Anweisung erzeugt (mit anderen Worten: *deklariert*) eine Variable mit dem Namen "message":

```js
let message;
```

Nun können wir sie mit Daten befüllen, indem wir den Zuweisungsoperator `=` verwenden: 

```js
let message;

*!*
message = 'Hello'; // speichere diese Zeichenkette
*/!*
```

Diese Zeichenkette wird nun in den mit der Variable verbundenen Speicherbereich gespeichert. Wir können über den Variablennamen darauf zugreifen:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // zeigt den Inhalt der Variable an
*/!*
```

Um es kurz zu machen, können wir die Variablendeklaration und -zuweisung in einer einzigen Zeile zusammenfassen:

```js run
let message = 'Hello!'; // definiere die Variable und weise ihr einen Wert zu

alert(message); // Hello!
```

Wir können auch mehrere Variablen in einer Zeile deklarieren:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Das mag kürzer erscheinen, aber wir empfehlen es nicht. Aus Gründen der besseren Lesbarkeit verwende bitte eine einzige Zeile pro Variable.

Die mehrzeilige Variante ist etwas länger, aber leichter lesbar:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Einige Leute definieren auch mehrere Variablen in diesem mehrzeiligen Stil:

```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...oder sogar im "Komma-zuerst"-Stil:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Technisch gesehen machen alle diese Varianten dasselbe. Es ist also eine Frage des persönlichen Geschmacks und der Ästhetik.

````smart header="`var` anstatt `let`"
In älteren Scripts findest du womöglich noch ein anderes Schlüsselwort: `var` anstatt `let`:

```js
*!*var*/!* message = 'Hello';
```

Das `var` Schlüsselwort ist *fast* dasselbe wie `let`. Es deklariert auch eine Variable, aber auf eine etwas andere, "altbackene" Weise.

Es gibt subtile Unterschiede zwischen `let` und `var`, aber sie sind für uns noch nicht wichtig. Wir werden sie im Kapitel <info:var> ausführlich behandeln.
````

## Eine Analogie aus dem wirklichen Leben

Wir können das Konzept einer "Variablen" leicht verstehen, wenn wir sie uns als eine "Kiste" für Daten vorstellen, mit einem eindeutig benannten Aufkleber darauf.

Zum Beispiel kann man sich die Variable `message` als eine Kiste vorstellen mit der Bezeichnung `"message"` und dem Wert `"Hello!"` darin:

![](variable.svg)

Wir können jeden Wert in die Kiste legen.

Wir können den Wert auch so oft ändern, wie wir wollen:
```js run
let message;

message = 'Hello!';

message = 'World!'; // Wert verändert

alert(message);
```

Wenn der Wert geändert wird, werden die alten Daten aus der Variable entfernt:

![](variable-change.svg)

Wir können auch zwei Variablen deklarieren und Daten von der einen in die andere kopieren.

```js run
let hello = 'Hello world!';

let message;

*!*
// kopiere 'Hello world' von hello nach message
message = hello;
*/!*

// jetzt beinhalten zwei Variablen die gleichen Daten
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="Funktionale Sprachen"
Interessant ist, dass es [funktionale](https://de.wikipedia.org/wiki/Funktionale_Programmierung) Programmiersprachen wie [Scala](http://www.scala-lang.org/) oder [Erlang](http://www.erlang.org/) gibt, die das Ändern von Variablenwerten verbieten.

In solchen Sprachen ist der Wert, sobald er "in der Kiste" gespeichert ist, für immer da. Wenn wir etwas anderes speichern wollen, zwingt uns die Sprache dazu, eine neue Kiste zu erstellen (eine neue Variable zu deklarieren). Wir können die alte nicht wiederverwenden.

Auch wenn es auf den ersten Blick etwas seltsam erscheint, sind diese Sprachen durchaus für seriöse Softwareentwicklung geeignet. Mehr noch, es gibt Bereiche wie Parallelberechnungen, in denen diese Einschränkung gewisse Vorteile bringt. Das Studium einer solchen Sprache (auch wenn man nicht vorhat, sie bald zu benutzen) wird empfohlen, um den Geist zu erweitern.
```

## Benamung der Variablen [#variable-naming]

Es gibt zwei Einschränkungen für Variablennamen in JavaScript:

1. Der Name darf nur Buchstaben, Ziffern oder die Symbole `$` und `_` enthalten.
2. Das erste Zeichen darf keine Ziffer sein.

Besipiele für gültige Namen:

```js
let userName;
let test123;
```

Wenn der Name mehrere Wörter enthält, wird üblicherweise [camelCase](https://en.wikipedia.org/wiki/CamelCase) verwendet. Das heißt: Wörter kommen eins nach dem anderen, jedes Wort, außer dem ersten, mit einem großen Anfangsbuchstaben: `myVeryLongName`.

Was interessant ist - das Dollarzeichen `'$'` und der Unterstrich `'_'` können auch in Namen verwendet werden. Sie sind normale Symbole, genau wie Buchstaben, ohne besondere Bedeutung.

Diese Namen sind gültig:

```js run untrusted
let $ = 1; // deklariert eine Variabe mit dem Namen "$"
let _ = 2; // und nun eine Variable mit dem Namen "_"

alert($ + _); // 3
```

Beispiele für falsche Variablennamen:

```js no-beautify
let 1a; // kann nicht mit einer Ziffer beginnen

let my-name; // Bindestriche '-' sind im Namen nicht erlaubt
```

```smart header="Groß- und Kleinschreibung"
Variablen mit den Namen `apple` und `AppLE` sind zwei unterschiedliche Variablen.
```

````smart header="nicht-lateinische Buchstaben sind erlaubt, aber nicht empfohlen"
Es ist möglich, jede Sprache, einschließlich kyrillischer Buchstaben oder sogar chinesische Schriftzeichen, wie diese zu verwenden:

```js
let имя = '...';
let 我 = '...';
```

Technisch gesehen gibt es hier keinen Fehler, solche Namen sind erlaubt, aber es gibt eine internationale Tradition, Englisch in Variablennamen zu verwenden. Selbst wenn wir ein kleines Script schreiben, kann es ein langes Leben vor sich haben. Menschen aus anderen Ländern müssen es vielleicht irgendwann einmal lesen.
````

````warn header="Reservierte Namen"
Es gitb eine [Liste mit reservierten Wörtern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), die nicht als Variablennamen verwendet werden können, da sie von der Sprache selbst verwendet werden.

Zum Beispiel: `let`, `class`, `return`, und `function` sind reserviert.

Der folgende Code ergibt einen Syntaxfehler:

```js run no-beautify
let let = 5; // kann Variable nicht "let" benennen, Fehler!
let return = 5; // kann sie auch nicht "return" benennen, Fehler!
```
````

````warn header="Eine Zuweisung ohne `use strict`"

Normalerweise müssen wir eine Variable definieren, bevor wir sie verwenden können. Aber in den alten Zeiten war es technisch möglich, eine Variable durch eine einfache Zuweisung des Wertes zu erstellen, ohne `let` zu benutzen. Um die Kompatibilität mit alten Scripts beizubehalten, funktioniert das auch jetzt noch, wenn wir in unseren Scripts nicht `use strict` verwenden.

```js run no-strict
// beachte: kein "use strict" in diesem Beispiel

num = 5; // die Variable "num" wird erstellt, wenn sie nicht existiert

alert(num); // 5
```

Dies ist eine schlechte Praxis und würde im "strict-mode" einen Fehler verursachen:

```js
"use strict";

*!*
num = 5; // Fehler: "num" ist nicht definiert
*/!*
```
````

## Konstanten

Um eine konstante (unveränderliche) Variable zu deklarieren, verwende `const` anstatt `let`:

```js
const myBirthday = '18.04.1982';
```

Variablen, die mit `const` deklariert werden, werden "Konstanten" genannt. Sie können nicht neu zugewiesen werden. Ein Versuch, dies zu tun, würde einen Fehler verursachen:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // Fehler, Konstante kann nicht neu zugewiesen werden!
```

Wenn ein Programmierer sicher ist, dass eine Variable sich nie ändern wird, kann er sie mit `const` deklarieren, um diese Tatsache zu garantieren und jedem klar zu kommunizieren.


### Konstanten in Großbuchstaben

Es ist eine weit verbreitete Praxis, Konstanten als Alias für schwer zu merkende Werte zu verwenden, die bereits vor der Ausführung bekannt sind.

Solche Konstanten werden mit Großbuchstaben und Unterstrichen benannt.

Lass uns zum Beispiel Konstanten für Farben im sogenannten "Web-Format" (hexadezimal) erstellen:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...wenn wir uns für eine Farbe entscheiden müssen
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Vorteile:

- `COLOR_ORANGE` ist viel leichter zu merken als `"#FF7F00"`.
- Es ist viel leichter, sich bei `"#FF7F00"` zu vertippen als bei `COLOR_ORANGE`.
- Beim Lesen des Codes ist `COLOR_ORANGE` viel aussagekräftiger als `#FF7F00`.

Wann sollten wir Großbuchstaben für eine Konstante verwenden und wann sollten wir sie normal benennen? Lass uns das klarstellen.

Eine "Konstante" zu sein bedeutet nur, dass sich der Wert einer Variablen nie ändert. Aber es gibt Konstanten, die vor der Ausführung bekannt sind (wie ein hexadezimaler Wert für die Farbe rot) und es gibt Konstanten, die zur Laufzeit, also während der Ausführung, *berechnet* werden, sich aber nach ihrer anfänglichen Zuweisung nicht mehr ändern.

Zum Beispiel:
```js
const pageLoadTime = /* Zeit, die eine Website braucht, um geladen zu werden */;
```

Der Wert von `pageLoadTime` ist vor dem Laden der Seite nicht bekannt, daher wird er normal benannt. Aber es ist immer noch eine Konstante, weil er sich nach der Zuweisung nicht mehr ändert.

Mit anderen Worten, großgeschriebene Konstanten werden nur als Aliase für "hart kodierte" Werte verwendet.  

## Dinge richtig benennen

Apropos Variablen, es gibt noch eine extrem wichtige Sache.

Ein Variablenname sollte eine saubere, offensichtliche Bedeutung haben, die die Daten beschreibt, die er speichert.

Die Benennung von Variablen ist eine der wichtigsten und komplexesten Fähigkeiten in der Programmierung. Ein schneller Blick auf Variablennamen kann zeigen, welcher Code von einem Anfänger im Gegensatz zu einem erfahrenen Entwickler geschrieben wurde.

In einem echten Projekt wird die meiste Zeit damit verbracht, eine bestehende Codebasis zu modifizieren und zu erweitern, anstatt etwas völlig Neues zu schreiben. Wenn wir zu irgendeinem Code zurückkehren, nachdem wir eine Weile etwas anderes gemacht haben, ist es viel einfacher Informationen zu finden, die gut beschriftet sind. Oder, mit anderen Worten, wenn die Variablen gute Namen haben.

Bitte denk über den richtigen Namen für eine Variable nach, bevor du sie deklarierst. Das wird sich ordentlich auszahlen.

Einige Regeln, die gut zu befolgen sind:

- Verwende menschenlesbare Namen, wie `userName` oder `shoppingCart`.
- Halte dich fern von Abkürzungen oder Kürzel wie `a`, `b`, `c`, es sei denn, du weißt wirklich, was du tust.
- Mach Namen maximal beschreibend und prägnant. Beispiele für schlechte Namen sind `data` und `value`. Solche Namen sagen nichts aus. Es ist nur in Ordnung, sie zu benutzen, wenn der Kontext des Codes es außergewöhnlich offensichtlich macht, auf welche Daten oder Werte die Variable verweist.
- Mach dir mit dir selbst und deinem Team Bedingungen aus. Wenn ein Website Besucher "user" genannt wird, dann sollten verwandte Variablen `currentUser` oder `newUser` heißen, anstatt `currentVisitor` oder `newManInTown`.

Klingt einfach? Ist es auch, aber die Erstellung von beschreibenden und prägnanten Variablennamen ist es in der Praxis nicht. Nur zu.

```smart header="Wiederverwenden oder Erstellen?"
Und die letzte Anmerkung. Es gibt einige faule Programmierer, die, anstatt neue Variablen zu deklarieren, dazu neigen, bestehende wiederzuverwenden.

Als Ergebnis sind ihre Variablen wie Kisten, in die die Menschen verschiedene Dinge werfen, ohne ihre Aufkleber zu verändern. Was ist jetzt in der Box? Wer weiß das schon? Wir müssen näher kommen und nachsehen.

Solche Programmierer sparen ein wenig an der Variablen-Deklaration, verlieren aber zehnmal mehr beim Debuggen.

Eine zusätzliche Variable ist gut, nicht böse.

Moderne JavaScript-Minifier und Browser optimieren den Code gut genug, so dass es keine Performance-Probleme gibt. Die Verwendung verschiedener Variablen für verschiedene Werte kann sogar der Engine helfen, deinen Code zu optimieren.
```

## Zusammenfassung

Wir können Variablen deklarieren, um Daten zu speichern, indem wir die Schlüsselwörter `var`, `let` oder `const` verwenden.

- `let` -- ist eine moderne Variablendeklaration.
- `var` -- ist eine altbackene Variablendeklaration. Normalerweise benutzen wir es überhaupt nicht, aber wir werden die subtilen Unterschiede von `let` im Kapitel <info:var> behandeln, nur für den Fall, dass du sie brauchst.
- `const` -- ist wie `let`, aber der Wert der Variable kann nicht mehr verändert werden.

Variablen sollten so benannt werden, dass wir leicht verstehen können, was in ihnen enthalten ist.
