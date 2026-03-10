# Strings

In JavaScript werden Textdaten als Zeichenketten (Strings) gespeichert. Es gibt keinen separaten Typ für einzelne Zeichen.

Das interne Format für Zeichenketten ist immer [UTF-16](https://de.wikipedia.org/wiki/UTF-16), es ist nicht an die Seitenkodierung gebunden.

## Anführungszeichen

Erinnern wir uns an die Arten von Anführungszeichen.

Zeichenketten können entweder in einfache Anführungszeichen, doppelte Anführungszeichen oder Backticks eingeschlossen werden:

```js
let single = 'einfach-quotiert';
let double = "doppelt-quotiert";

let backticks = `Backticks`;
```

Einfache und doppelte Anführungszeichen sind im Wesentlichen gleich. Backticks erlauben es uns jedoch, jeden Ausdruck in die Zeichenkette einzubetten, indem wir ihn mit `${…}` umgeben:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Ein weiterer Vorteil der Verwendung von Backticks besteht darin, dass sie ermöglichen, dass eine Zeichenkette mehrere Zeilen umfasst:

```js run
let guestList = `Gäste:
 * John
 * Pete
 * Mary
`;

alert(guestList); // eine Gästeliste, mehrere Zeilen
```

Sieht natürlich aus, nicht wahr? Aber einfache oder doppelte Anführungszeichen funktionieren nicht auf diese Weise.

Wenn wir sie verwenden und versuchen, mehrere Zeilen zu verwenden, gibt es einen Fehler:

```js run
let guestList = "Gäste: // Fehler: Unerwartetes Token ILLEGAL
  * John";
```

Einfache und doppelte Anführungszeichen stammen aus der alten Zeit der Gestaltung von Programmiersprachen, als die Notwendigkeit für mehrzeilige Zeichenketten nicht berücksichtigt wurde. Backticks erschienen viel später und sind daher vielseitiger.

Backticks erlauben es uns auch, eine "Template-Funktion" vor dem ersten Backtick anzugeben. Die Syntax lautet: <code>func&#96;string&#96;</code>. Die Funktion `func` wird automatisch aufgerufen, erhält die Zeichenkette `string` und eingebettete Ausdrücke und kann sie verarbeiten. Diese Funktion wird "tagged templates" genannt, sie ist selten zu sehen, aber du kannst darüber auf MDN lesen unter: [Template literals](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Spezielle Zeichen

Es ist immer noch möglich, mehrzeilige Zeichenketten mit einfachen und doppelten Anführungszeichen zu erstellen, indem man ein sogenanntes "neue Zeile-Zeichen", dargestellt als `\n`, verwendet, das einen Zeilenumbruch darstellt:

```js run
let guestList = "Gäste:\n * John\n * Pete\n * Mary";

alert(guestList); // eine mehrzeilige Gästeliste, wie oben
```

Als einfacheres Beispiel sind diese beiden Zeilen gleich, nur unterschiedlich geschrieben:

```js run
let str1 = "Hallo\nWelt"; // zwei zeilen mit einem "neue Zeile-Symbol"

// zwei zeilen mit einer normalen neuen Zeile und Backticks
let str2 = `Hallo
Welt`;

alert(str1 == str2); // true
```

Es gibt andere, weniger gebräuchliche spezielle Zeichen:

| Zeichen | Beschreibung |
|-----------|-------------|
|`\n`|Neue Zeile|
|`\r`|In Windows-Textdateien wird ein Zeilenumbruch durch eine Kombination von zwei Zeichen `\r\n` dargestellt, während es in Nicht-Windows-Betriebssystemen nur `\n` ist. Das ist historisch bedingt, die meisten Windows-Programme verstehen auch `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Anführungszeichen|
|`\\`|Backslash|
|`\t`|Tabulator|
|`\b`, `\f`, `\v`| Backspace, Formularvorschub, Vertikaler Tabulator -- nur der Vollständigkeit halber erwähnt, stammen aus alter Zeit, werden heutzutage nicht genutzt (du kannst sie direkt vergessen). |

Wie du siehst, beginnen alle speziellen Zeichen mit dem Backslash-Zeichen `\`. Es wird auch als "Maskierungszeichen" ("escape character") bezeichnet.

Weil es so besonders ist, wenn wir einen tatsächlichen Backslash `\` innerhalb der Zeichenkette zeigen müssen, müssen wir ihn verdoppeln:

```js run
alert( `Der Backslash: \\` ); // Der Backslash: \
```

Sogenannte maskierte Anführungszeichen `\'`, `\"`, <code>\\`</code> werden verwendet, um ein Anführungszeichen in eine Zeichenkette mit den gleichen Anführungszeichen einzufügen.

Zum Beispiel:

```js run
alert( 'Ich*!*\'*/!* bin das Walross!' ); // *!*Ich bin*/!* das Walross!
```

Wie du sehen kannst, müssen wir dem inneren Anführungszeichen ein Backslash `\'` voranstellen, da es sonst das Ende der Zeichenkette anzeigen würde.

Natürlich müssen nur jene Anführungszeichen maskiert werden, die gleich wie die umgebenden sind. Also könnten wir als elegantere Lösung stattdessen auf doppelte Anführungszeichen oder Backticks wechseln:

```js run
alert( "Ich bin das Walross!" ); // Ich bin das Walross!
```

Neben diesen speziellen Zeichen gibt es auch eine spezielle Notation für Unicode-Codes `\u…`, sie wird selten verwendet und ist im optionalem Kapitel über [Unicode](info:unicode) behandelt.

## Zeichenkettenlänge

Die Eigenschaft `length` gibt die Länge der Zeichenkette an:

```js run
alert( `Mein\n`.length ); // 3
```

Beachte, dass `\n` ein einzelnes "spezielles" Zeichen ist und die Länge tatsächlich `3` ist.

```warn header="`length` ist eine Eigenschaft"
Personen mit Erfahrung in einigen anderen Sprachen vertippen sich manchmal, indem sie `str.length()` anstelle von einfach `str.length` aufrufen. Das funktioniert nicht.

Bitte beachte, dass `str.length` eine numerische Eigenschaft ist, keine Funktion. Es ist nicht notwendig, Klammern dahinter zu setzen. Nicht `.length()`, sondern `.length`.
```

## Auf Zeichen zugreifen

Um ein Zeichen an der Position `pos` zu erhalten, verwende eckige Klammern `[pos]` oder rufe die Methode [str.at(pos)](mdn:js/String/at) auf. Das erste Zeichen beginnt bei der Position Null:

```js run
let str = `Hallo`;

// das erste Zeichen
alert( str[0] ); // H
alert( str.at(0) ); // H

// das letzte Zeichen
alert( str[str.length - 1] ); // o
alert( str.at(-1) ); // o
```

Wie du sehen kannst, hat die Methode `.at(pos)` den Vorteil, dass sie negative Positionen zulässt. Wenn `pos` negativ ist, wird es vom Ende der Zeichenkette gezählt.

Also bedeutet `.at(-1)` das letzte Zeichen und `.at(-2)` das davor usw.

Die eckigen Klammern geben `undefined` für negative Indizes zurück, zum Beispiel:

```js run
let str = `Hallo`;

alert( str[-2] ); // undefined
alert( str.at(-2) ); // l
```

Wir können auch mit `for..of` über Zeichen iterieren:

```js run
for (let char of "Hallo") {
  alert(char); // H,e,l,l,o (char wird "H", dann "e", dann "l" usw)
}
```

## Zeichenketten sind unveränderlich

Zeichenketten können in JavaScript nicht verändert werden. Es ist unmöglich, ein Zeichen zu ändern.

Versuchen wir es, um zu zeigen, dass es nicht funktioniert:

```js run
let str = 'Hi';

str[0] = 'h'; // Fehler
alert( str[0] ); // funktioniert nicht
```

Die übliche Vorgehensweise besteht darin, eine ganz neue Zeichenkette zu erstellen und sie anstelle der alten `str` zuzuweisen.

Zum Beispiel:

```js run
let str = 'Hi';

str = 'h' + str[1]; // ersetze die Zeichenkette

alert( str ); // hi
```

In den folgenden Abschnitten werden wir weitere Beispiele dafür sehen.

## Die Groß-/Kleinschreibung ändern

Die Methoden [toLowerCase()](mdn:js/String/toLowerCase) und [toUpperCase()](mdn:js/String/toUpperCase) ändern die Groß-/Kleinschreibung:

```js run
alert( 'Schnittstelle'.toUpperCase() ); // SCHNITTSTELLE
alert( 'Schnittstelle'.toLowerCase() ); // schnittstelle
```

Oder wenn wir nur einen einzelnen Buchstaben kleingeschrieben haben wollen:

```js run
alert( 'Schnittstelle'[0].toLowerCase() ); // 's'
```

## Nach einer Teilzeichenkette suchen

Es gibt mehrere Möglichkeiten, innerhalb einer Zeichenkette nach einer Teilzeichenkette zu suchen.

### str.indexOf

Die erste Methode ist [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Sie sucht `substr` in `str`, beginnend bei der gegebenen Position `pos`, und gibt die Position zurück, an der die Übereinstimmung gefunden wurde oder `-1`, wenn nichts gefunden werden kann.

Zum Beispiel:

```js run
let str = 'Widget mit id';

alert( str.indexOf('Widget') ); // 0, weil 'Widget' am Anfang gefunden wird
alert( str.indexOf('widget') ); // -1, nicht gefunden, die Suche ist groß-/kleinschreibungsempfindlich

alert( str.indexOf("id") ); // 1, "id" wird an der Position 1 gefunden (..idget mit id)
```

Der optionale zweite Parameter ermöglicht es uns, die Suche ab einer bestimmten Position zu starten.

Zum Beispiel ist das erste Vorkommen von `"id"` an Position `1`. Um nach dem nächsten Vorkommen zu suchen, starten wir die Suche ab Position `2`:

```js run
let str = 'Widget mit id';

alert( str.indexOf('id', 2) ) // 11
```

Wenn wir an allen Vorkommen interessiert sind, können wir `indexOf` in einer Schleife ausführen. Jeder neue Aufruf erfolgt mit der Position nach dem vorherigen Treffer:

```js run
let str = 'So listig wie ein Fuchs, so stark wie ein Ochse';

let target = 'so'; // danach wollen wir suchen

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Gefunden bei ${foundPos}` );
  pos = foundPos + 1; // setze die Suche ab der nächsten Position fort
}
```

Der gleiche Algorithmus kann kürzer dargestellt werden:

```js run
let str = "So listig wie ein Fuchs, so stark wie ein Ochse";
let target = "so";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Es gibt auch eine ähnliche Methode [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf), die vom Ende eines Strings zum Anfang durchsucht.

Sie würde die Vorkommen in umgekehrter Reihenfolge auflisten.
```

Ein kleines Problem bei `indexOf` ist die Verwendung im `if`. Wir können es nicht wie folgt in die `if`-Bedingung setzen:

```js run
let str = "Widget mit id";

if (str.indexOf("Widget")) {
    alert("Wir haben es gefunden"); // funktioniert nicht!
}
```

Das `alert` im Beispiel oben erscheint nicht, weil `str.indexOf("Widget")` `0` zurückgibt (das bedeutet, dass es die Übereinstimmung am Anfang gefunden hat). Richtig, aber `if` betrachtet `0` als `false`.

Wir sollten also tatsächlich nach `-1` überprüfen, so wie hier:

```js run
let str = "Widget mit id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Wir haben es gefunden"); // jetzt funktioniert es!
}
```

### includes, startsWith, endsWith

Die modernere Methode [str.includes(substr, pos)](mdn:js/String/includes) gibt `true/false` zurück, je nachdem, ob `str` `substr` enthält.

Das ist die richtige Wahl, wenn wir auf das Vorhandensein testen müssen, aber dessen Position nicht benötigen:

```js run
alert( "Widget mit id".includes("Widget") ); // true

alert( "Hallo".includes("Tschüss") ); // false
```

Das optionale zweite Argument von `str.includes` ist die Position, ab der gesucht werden soll:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, ab Position 3 gibt es kein "id"
```

Die Methoden [str.startsWith](mdn:js/String/startsWith) und [str.endsWith](mdn:js/String/endsWith) tun genau das, was sie ausdrücken:

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" beginnt mit "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" endet mit "get"
```

## Einen Teilstring erhalten

Es gibt in JavaScript drei Methoden, um einen Teilstring zu erhalten: `substring`, `substr` und `slice`.

`str.slice(start [, end])`
: Gibt den Teil der Zeichenkette von `start` bis (aber nicht einschließlich) `end` zurück.

    Zum Beispiel:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', der Teilstring von 0 bis 5 (5 nicht eingeschlossen)
    alert( str.slice(0, 1) ); // 's', von 0 bis 1, aber nicht inklusive 1, also nur das Zeichen bei 0
    ```

    Wenn es keinen zweiten Argument gibt, dann geht `slice` bis zum Ende der Zeichenkette:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', von der 2. Position bis zum Ende
    ```

    Negative Werte für `start/end` sind ebenfalls möglich. Sie bedeuten, dass die Position vom Ende des Strings gezählt wird:

    ```js run
    let str = "strin*!*gif*/!*y";

    // beginne bei der 4. Position von rechts, endet bei der 1. von rechts
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Gibt den Teil der Zeichenkette *zwischen* `start` und `end` zurück (end nicht eingeschlossen).

    Dies ist fast das Gleiche wie `slice`, aber es erlaubt `start`, größer als `end` zu sein (in diesem Fall werden einfach die `start`- und `end`-Werte getauscht).

    Zum Beispiel:

    ```js run
    let str = "st*!*ring*/!*ify";

    // diese sind gleich für substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...aber nicht für slice:
    alert( str.slice(2, 6) ); // "ring" (das gleiche)
    alert( str.slice(6, 2) ); // "" (ein leerer String)

    ```

    Negative Argumente werden (im Gegensatz zu slice) nicht unterstützt und als `0` behandelt.

`str.substr(start [, length])`
: Gibt den Teil der Zeichenkette von `start` bis zur gegebenen Länge `length` zurück.

    Im Gegensatz zu den vorherigen Methoden erlaubt diese, die `length` anstelle der Endposition anzugeben:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', ab der 2. Position 4 Zeichen bekommen
    ```

    Das erste Argument kann negativ sein, um vom Ende zu zählen:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', ab der 4. Position 2 Zeichen bekommen
    ```

    Diese Methode ist im [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) der Sprachspezifikation enthalten. Das bedeutet, dass sie nur von in Browsern gehosteten Javascript-Engines unterstützt werden sollte, und es wird nicht empfohlen, sie zu verwenden. In der Praxis wird sie jedoch überall unterstützt.

Lass uns diese Methoden rekapitulieren, um jegliche Verwirrung zu vermeiden:

| Methode | selektiert... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | von `start` bis `end` (ohne `end` einzuschließen) | erlaubt negative Werte |
| `substring(start, end)` | zwischen `start` und `end` (ohne `end` einzuschließen) | negative Werte bedeuten `0` |
| `substr(start, length)` | von `start` `length` Zeichen holen | erlaubt negatives `start` |

```smart header="Welche soll man wählen?"
Alle können die Aufgabe erfüllen. Formal hat `substr` einen kleinen Nachteil: Es wird nicht in der Hauptspezifikation von JavaScript beschrieben, sondern in Anhang B, der Browser-spezifische Funktionen umfasst, die hauptsächlich aus historischen Gründen existieren. Daher könnte es sein, dass Nicht-Browser-Umgebungen sie nicht unterstützen. Aber in der Praxis funktioniert sie überall.

Von den anderen beiden Varianten ist `slice` ein bisschen flexibler, es erlaubt negative Argumente und ist kürzer zu schreiben.

Praktisch gesehen ist es also genug, sich nur `slice` zu merken.
```

## Strings vergleichen

Wie wir aus dem Kapitel <info:comparison> wissen, werden Strings Zeichen-für-Zeichen in alphabetischer Reihenfolge verglichen.

Allerdings gibt es einige Kuriositäten.

1. Ein Kleinbuchstabe ist immer größer als ein Großbuchstabe:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Buchstaben mit diakritischen Zeichen fallen "aus der Reihe":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Das kann zu seltsamen Ergebnissen führen, wenn wir diese Ländernamen sortieren. Normalerweise würde man erwarten, dass `Zealand` nach `Österreich` in der Liste kommt.

Um zu verstehen, was passiert, sollten wir uns bewusst sein, dass Zeichenketten in Javascript mit [UTF-16](https://en.wikipedia.org/wiki/UTF-16) kodiert sind. Das heißt: Jeder Buchstabe hat einen entsprechenden numerischen Code.

Es gibt spezielle Methoden, die es ermöglichen, den Buchstaben für den Code zu erhalten und umgekehrt:

`str.codePointAt(pos)`
: Gibt eine Dezimalzahl zurück, die den Code für das Zeichen an der Position `pos` repräsentiert:

    ```js run
    // Unterschiedliche Groß- und Kleinbuchstaben haben unterschiedliche Codes
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (wenn wir einen Hexadezimalwert benötigen)
    ```

`String.fromCodePoint(code)`
: Erstellt einen Buchstaben anhand seines numerischen `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (wir können auch einen Hexwert als Argument verwenden)
    ```

Schauen wir uns jetzt die Zeichen mit den Codes `65..220` an (das lateinische Alphabet und ein bisschen extra), indem wir eine Zeichenkette aus ihnen erstellen:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// Ausgabe:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Siehst Du? Großbuchstaben kommen zuerst, dann einige Sonderzeichen, dann Kleinbuchstaben, und `Ö` fast am Ende der Ausgabe.

Jetzt wird klar, warum `a > Z`.

Die Zeichen werden anhand ihres numerischen Codes verglichen. Der größere Code bedeutet, dass das Zeichen größer ist. Der Code für `a` (97) ist größer als der Code für `Z` (90).

- Alle Kleinbuchstaben folgen nach den Großbuchstaben, weil ihre Codes größer sind.
- Einige Buchstaben wie `Ö` stehen abseits vom Hauptalphabet. Hier ist sein Code größer als alles von `a` bis `z`.

### Korrekte Vergleiche [#correct-comparisons]

Der "richtige" Algorithmus für den Vergleich von Zeichenketten ist komplizierter, als es scheint, weil die Alphabetisierung für verschiedene Sprachen unterschiedlich ist.

Daher muss der Browser die Sprache kennen, um zu vergleichen.

Zum Glück unterstützen moderne Browser den Internationalisierungsstandard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).

Er stellt eine spezielle Methode zur Verfügung, um Zeichenketten in verschiedenen Sprachen gemäß ihren Regeln zu vergleichen.

Der Aufruf von [str.localeCompare(str2)](mdn:js/String/localeCompare) gibt eine Ganzzahl zurück, die angibt, ob `str` kleiner, gleich oder größer als `str2` gemäß den Sprachregeln ist:

- Gibt eine negative Nummer zurück, wenn `str` kleiner als `str2` ist.
- Gibt eine positive Nummer zurück, wenn `str` größer als `str2` ist.
- Gibt `0` zurück, wenn sie gleichwertig sind.

Beispielsweise:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

Diese Methode hat tatsächlich zwei zusätzliche Argumente, die in [der Dokumentation](mdn:js/String/localeCompare) spezifiziert sind und es uns ermöglichen, die Sprache festzulegen (standardmäßig aus der Umgebung abgeleitet, Buchstabenreihenfolge hängt von der Sprache ab) und zusätzliche Regeln einzustellen, wie Empfindlichkeit für Groß-/Kleinschreibung oder ob `"a"` und `"á"` als dasselbe behandelt werden sollen usw.

## Zusammenfassung

- Es gibt 3 Arten von Anführungszeichen. Backticks erlauben es, dass eine Zeichenkette mehrere Zeilen umfasst und Ausdrücke `${…}` eingebettet werden können.
- Wir können Sonderzeichen verwenden, wie z.B. einen Zeilenumbruch `\n`.
- Um ein Zeichen zu erhalten, benutze: `[]` oder die Methode `at`.
- Um eine Teilzeichenkette zu erhalten, benutze: `slice` oder `substring`.
- Um eine Zeichenkette in Klein-/Großbuchstaben umzuwandeln, verwende: `toLowerCase/toUpperCase`.
- Um nach einer Teilzeichenkette zu suchen, verwende: `indexOf` oder `includes/startsWith/endsWith` für einfache Überprüfungen.
- Um Zeichenketten entsprechend der Sprache zu vergleichen, verwende: `localeCompare`, sonst werden sie nach Zeichencodes verglichen.

Es gibt mehrere andere hilfreiche Methoden in Zeichenketten:

- `str.trim()` -- entfernt ("trimmt") Leerzeichen am Anfang und Ende der Zeichenkette.
- `str.repeat(n)` -- wiederholt die Zeichenkette `n`-mal.
- ...und mehr, zu finden im [Handbuch](mdn:js/String).

Zeichenketten haben auch Methoden zur Durchführung von Such-/Ersetzungsvorgängen mit regulären Ausdrücken. Das ist jedoch ein großes Thema, daher wird es in einem separaten Tutorialabschnitt erklärt <info:regular-expressions>.

Außerdem, wie bisher bekannt, ist es wichtig zu wissen, dass Zeichenketten auf der Unicode-Kodierung basieren und daher Probleme beim Vergleich auftreten können. Es gibt mehr über Unicode im Kapitel <info:unicode>.
