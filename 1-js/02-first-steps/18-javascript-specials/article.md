# JavaScript Besonderheiten

Dieses Kapitel wiederholt kurz die Features von JavaScript, die wir bis jetzt gelernt haben, mit besonderer Aufmerksamkeit auf die subtilen Momente.

## Code Struktur

Anweisungen werden mit einem Semikolon getrennt:

```js run no-beautify
alert('Hallo'); alert('Welt');
```

Normalerweise wird ein Zeilenumbruch ebenfalls als Trennzeichen behandelt, so dass auch das funktioniert:

```js run no-beautify
alert('Hallo')
alert('Welt')
```

Das wird "Automatisches Einfügen von Semikolons" genannt. Manchmal funktioniert das nicht, zum Beispiel:

```js run
alert("Es wird einen Fehler nach dieser Nachricht geben")

[1, 2].forEach(alert)
```

Die Meisten Codestil-Leitfäden stimmen darin überein, dass wir ein Semikolon nach jeder Anweisung setzen sollten.

Semikolons sind nach Codeblöcken und Syntaxkonstrukten mit geschweiften Klammern `{...}`, wie z.B. Schleifen, nicht erforderlich:

```js
function f() {
  // kein Semikolon nach der Funktionsdeklaration erforderlich
}

for(;;) {
  // kein Semikolon nach der Schleife erforderlich
}
```

...Aber selbst wenn wir irgendwo ein "zusätzliches" Semikolon setzen, ist das kein Fehler. Es wird ignoriert.

Mehr in: <info:structure>.

## Strikter Modus

Um alle Funktionen des modernen JavaScripts zu ermöglichen, sollten wir Skripte mit `"use strict"` beginnen.

```js
'use strict';

...
```

Die Direktive muss am Anfang eines Skripts oder am Anfang eines Funktionsrumpfes stehen.

Ohne `"use strict"` funktioniert alles weiterhin, aber einige Funktionen verhalten sich in der alten, "kompatiblen" Weise. Wir würden im Allgemeinen das moderne Verhalten bevorzugen.

Einige moderne Features der Sprache (wie Klassen, die wir in der Zukunft behandeln) aktivieren den strikten Modus implizit.

Mehr in: <info:strict-mode>.

## Variablen

Können deklariert werden mit:

- `let`
- `const` (Konstante, kann icht geändert werden)
- `var` (altmodisch, sehen wir später)

Ein Variablenname kann folgendes enthalten:
- Buchstaben und Ziffern, aber das erste Zeichen darf keine Ziffer sein.
- Zeichen `$` und `_` sind normal, und auf gleicher Ebene mit Buchstaben.
- Nichtlateinische Alphabete und Hieroglyphen sind ebenfalls erlaubt, aber werden für gewöhnlich nicht genutzt.

Variablen sind dynamisch typisiert. Sie können einen beliebigen Wert beinhalten:

```js
let x = 5;
x = "John";
```

Es gibt 8 Datentypen:

- `number` für Gleitkommazahlen und Ganzzahlen,
- `bigint` für Ganzzahlen beliebiger Länge,
- `string` für Zeichenfolgen,
- `boolean` Für logische Werte: `true/false`,
- `null` -- ein Typ mit einem einzigen Wert `null`, der "leer" oder "existiert nicht" bedeutet,
- `undefined` -- ein Typ mit einem einzigen Wert `undefined`, der "nicht zugewiesen" bedeutet,
- `object` und `symbol` -- für komplexe Datenstrukturen und eindeutige Bezeichner, die wir noch nicht erlernt haben.

Der `typeof`-Operator gibt den Typ eines Wertes zurück, mit zwei Ausnahmen:
```js
typeof null == "object" // Fehler in der Sprache
typeof function(){} == "function" // Funktionen werden gesondert behandelt
```

Mehr in: <info:variables> und <info:types>.

## Interaktion

Wir benutzen einen Browser als Arbeitsumgebung, also sind grundlegende UI-Funktionen:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Stell eine `Frage` und gib zurück was die Besucher eingegeben haben oder `null` wenn sie auf "Abbrechen" geklickt haben.

[`confirm(question)`](mdn:api/Window/confirm)
: Stell eine `Frage` und schlag die Auswahlt zwischen OK und Abbrechen vor. Die Auswahl wird als `true/false` zurückgegeben.

[`alert(message)`](mdn:api/Window/alert)
: Ausgabe einer `Nachricht`.

Alle diese Funktionen sind *modal*, sie pausieren das Ausführen des Codes und verhindern, dass die Benutzer mit der Seite interagieren bis sie antworten.

Zum Beispiel:

```js run
let userName = prompt("Dein Name?", "Alice");
let isTeaWanted = confirm("Möchtest du etwas Tee?");

alert( "Besucher: " + userName ); // Alice
alert( "Tee gewünscht: " + isTeaWanted ); // true
```

Mehr in: <info:alert-prompt-confirm>.

## Operatoren

JavaScript unterstützt folgende Operatoren:

Arithmetisch
: Gewöhnlich: `* + - /`, ebenfalls `%` für den Rest und `**` für die Potenz einer Zahl.

    Das binäre Plus `+` setzt Zeichenketten zusammen. Und wenn einer der Operanden eine Zeichenkette ist, wird der andere auch in eine Zeichenkette konvertiert:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Zuweisungen
: Es gibt eine einfache Zuweisung: `a = b` und kombinierte `a *= 2`.

Bitwise
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Guide/Expressions_and_Operators#Bitwise) when they are needed.

Bedingt
: Der einzige Operator mit drei Parametern: `cond ? resultA : resultB`. Wenn `cond` wahr ist, gib `resultA` zurück, andernfalls `resultB`.

Logische Operatoren
: Logisches UND `&&` und ODER `||` führen Kurzzschlussauswertungen aus und dann geben sie den Wert zurück wo sie angehalten sind (nicht unbedingt `true`/`false`). Logisches NICHT `!` Konvertiert den Operand in einen bool'schen Typ und gibt den umgekehrten Wert zurück.

Nullish coalescing operator
: The `??` operator provides a way to choose a defined value from a list of variables. The result of `a ?? b` is `a` unless it's `null/undefined`, then `b`.

Comparisons
: Equality check `==` for values of different types converts them to a number (except `null` and `undefined` that equal each other and nothing else), so these are equal:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Andere Vergleiche konvertieren ebenfalls in eine Zahl.

    Der strikte Gleichheitsoperator `===` führt diese Konversion nicht durch: unterschiedliche Typen bedeuten immer unterschieldiche Werte dafür.

    Werte `null` und `undefined` sind besonders: sie sind gleich `==` zueinander und nicht gleich zu etwas anderem.

    Größer/kleiner-Vergleiche vergleichen Zeichenketten zeichenweise, andere Typen werden in eine Zahl umgewandelt.

Andere Operatoren
: Es gibt einige andere, wie den Komma-Operator.

More in: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Schleifen

- Wir haben 3 Typen von Schleifen behandelt:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- Die Variable die in der `for(let...)`-Schleife deklariert wurde, ist nur in der Schleife sichtbar. Aber wir können `let` auch weglassen und eine vorhandene Variable wiederverwenden.
- Direktiven `break/continue` ermöglichen es die ganze Schleife/aktuelle Iteration zu verlassen. Benutze Labels, um verschachtelte Schleifen abzubrechen.

Details in: <info:while-for>.

Später werden wir weitere Arten von Schleifen untersuchen, um mit Objekten zu arbeiten.

## Das "switch" Konstrukt

Das "switch" Konstrukt kann mehrere `if`-Abfragen ersetzen. Es verwendet `===` (strikte Gleichheit) für Vergleiche.

Zum Beispiel:

```js run
let age = prompt('Dein Alter?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("Das funktioniert!");
    break;

  default:
    alert("Ein beliegibert Wert ungleich eines der oberen");
}
```

Details in: <info:switch>.

## Funktionen

Wir betrachteten drei Möglichkeiten zum Erstellen einer Funktion in JavaScript:

1. Funktionsdeklaration: die Funktion im Hauptcodeablauf

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Funktionsausdruck: die Funktion im Kontext eines Ausdrucks

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Pfeilfunktionen:

    ```js
    // expression on the right side
    let sum = (a, b) => a + b;

    // oder mehrzeilige Syntax mit { ... }, benötigt hier return:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // ohne Argumente
    let sayHi = () => alert("Hallo");

    // mit einem einzigen Argument
    let double = n => n * 2;
    ```


- Functions may have local variables: those declared inside its body or its parameter list. Such variables are only visible inside the function.
- Parameters can have default values: `function sum(a = 1, b = 2) {...}`.
- Functions always return something. If there's no `return` statement, then the result is `undefined`.

Details: siehe <info:function-basics>, <info:arrow-functions-basics>.

## Da kommt noch mehr

Das war eine kurze Zusammenfassung von JavaScript-Funktionen. Bis jetzt haben wir nur die Grundlagen kennengelernt. Im weiteren Verlauf des Tutorials findest du weitere Besonderheiten und fortgeschrittene Funktionen von JavaScript.
