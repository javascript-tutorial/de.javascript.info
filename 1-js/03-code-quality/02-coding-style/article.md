# Coding Style

Unser Code muss so sauber und einfach zu lesen sein wie möglich.

Das ist eigentlich die Kunst des Programierens -- eine komplexe Aufgabe übernehmen, und sie so in Code umzusetzen, dass sie sowohl richtig, als auch menschlich-lesbar ist. Einen guten Codestil kann sehr viel dazu beitragen.  

## Syntax

Hier ist ein Spickzettel mit einge Regeln (siehe unten für mehr Details):

![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

Nun lasst uns die Regeln ins Detail diskutieren.

```warn header="Es gibt keine \"du musst\" Regeln"
Hier ist nichts in Stein gemeißelt. Diese sind nur Stilvorlieben, keine religiösen Vorschriften.
```

### Geschweifte Klammern

In most JavaScript projects curly braces are written in "Egyptian" style with the opening brace on the same line as the corresponding keyword -- not on a new line. There should also be a space before the opening bracket, like this:

```js
if (bedingung) {
  // mach dies
  // ...und das
  // ...und das
}
```

A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?

Here are the annotated variants so you can judge their readability for yourself:

1. 😠 Das machen die Anfänger manchmal. Schlecht! Geschweifte Klammern werden nicht benötigt:
    ```js
    if (n < 0) *!*{*/!*alert(`Exponent ${n} wird nicht unterstützt`);*!*}*/!*
    ```
2. 😠 Aufteilen auf eine weitere Zeile ohne Klammern. Sollte niemals gemacht werden. Beim Hinzufügen neuer Zeilen können sehr einfach Fehler passieren:
    ```js
    if (n < 0)
      alert(`Exponent ${n} wird nicht unterstützt`);
    ```
3. 😏 Eine Zeile ohne Klammern - akzeptabel, wenn sie kurz ist:
    ```js
    if (n < 0) alert(`Exponent ${n} wird nicht unterstützt`);
    ```
4. 😃 Die beste Variante:
    ```js
    if (n < 0) {
      alert(`Exponent ${n} wird nicht unterstützt`);
    }
    ```

Eine Zeile ist erlaubt, wenn es sich um eine kurze Codezeile handelt, z. B. `if (bedingung) return null`. Aber einen Codeblock (die letzte Variante) ist meistens besser lesbar.

### Zeilenlänge

Niemand liest gern lange, wagerechte Codezeilen. Die bewährte Vorgehensweise ist sie aufzuteilen.

Zum Beispiel:
```js
// Die Verwendung von Backticks ` erlauben uns die Aufteilung eines Strings auf mehrere Zeilen
let str = `
  ECMA International's TC39 ist eine Gruppe von JavaScript Entwickler,
  Implementierer, Akademiker, und mehr, die mit der Community zusammenarbeitet, 
  um die Definition von JavaScript aufrecht zu halten und weiterzuentwickeln.
`;
```

Und, für `if` -Anweisungen:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

Man sollte sich im Team auf eine maximale Zeilenlänge einigen. Sie beträgt normalerweise 80 oder 120 Zeichen.

### Einrückungen

Es gibt zwei Arten von Einrückungen:

- **Waagerechte Einrückungen: 2 oder 4 Leerzeichen.**

    Eine waagerechte Einrückung besteht aus entweder 2 oder 4 Leerzeichen oder das waagerechte Tabsymbol (`key:Tab` Taste). Welches man benutzten soll ist eine alte Debatte. Leerzeichen werden heutzutage häufiger benutzt.

    Ein Vorteil von Leerzeichen ist, dass sie eine flexiblere Benutzung von Einrückungen zulassen, als die Tab-Taste.

    Zum Beispiel, können wir die Parametern untereinander, an dem "Klammer-auf-Symbol" ausrichten:

    ```js no-beautify
    show(parameters,
         aligned, // 5 Leerzeichen links
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Senkrechte Einrückungen: leere Zeilen um den Code in logisch zusammenhängende Blöcke zu unterteilen.**

    Sogar eine einzige Methode kann in mehrere logische Blöcke unterteilt werden. In dem unten stehenden Beispiel werden die Initialisierung der Variable, die for-Schleife und das return-Statement durch leere Zeilen senkrecht voneinander getrennt.

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Füge eine leere Zeile dort hinzu, wo es hilft, die Lesbarkeit des Codes zu verbessern. Es sollten nicht mehr als neun Zeilen Code, ohne senkrechte Einrückung, geschrieben werden.

### Semikolons

Ein Semikolon sollte nach jeder Anweisung gesetzt werden, auch wenn es nicht unbedingt notwendig ist.

Es gibt Programiersprachen wo Semikonolns nicht zwingend erforderlich sind und deswegen kaum genutzt werden. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

Wenn du ein Erfahrener JavaScript Programierer bist, kannst du einen "no-semicolon-style" wie [StandardJS](https://standardjs.com/) verwenden. Ansonsten ist es besser Semikolons zu benutzen, um mögliche Fallen zu vermeiden. Die meisten Entwickler benutzen Semikolons.

### Verschachtelungsebenen

Versuche es zu vermeiden, Code auf zu viele Ebenen zu verschachteln.

Zum Beispiel: in eine Schleife ist es manchmal besser die [`continue`](info:while-for#continue) Anweisung zu verwenden, um weitere Verschachtelung zu vermeiden.

Zum Beispiel: anstatt einer verschachtelten `if` Anweisung wie hier:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- eine weitere Verschachtelungsebene
  }
}
```

Können wir lieber das machen:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- keine Weitere Verschachtelungsebene
}
```

Änliches kann man mit `if/else` und `return` machen.

Zum Beispiel: die zwei Konstrukte unten sind identisch.

Option 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negatives 'n' nicht unterstützt");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Option 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negatives 'n' nicht unterstützt");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Die zweite Variante ist besser lesbar, denn der "Spezialfall" `n < 0` wird gleich am Anfang behandelt. Sobald die Überprüfung fertig ist, können wir mit dem "Hauptteil" des Codes weitermachen.

## Methodenplatzierung

Wenn du mehrere "Hilfsmethoden" schreibst und auch weiterer Code der diese Methoden benutzt, dann gibt es drei Möglichkeiten, diese Mehtoden zu gliedern.

1. Methoden werden *über* dem Code deklariert, der sie benutzt:

    ```js
    // *!*Methodendeklarationen*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*der Code der die Methoden benutzt*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Code zuerst, danach die Methoden

    ```js
    // *!*der Code der die Methoden benutzt*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*Hilfsmethoden*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Gemischt: eine Methode wird dort deklariert, wo sie zuerst benutzt wird.

Meistens wird die zweite Variante bevorzugt.

Das liegt daran, dass man beim Lesen von Code zuerst wissen möchte *was er tut*. Wenn der Code zuerst kommt, dann ist es von vornherein klar. Vor allem wenn die Namen der Methoden sehr aussagekräftig sind, kann es vielleicht sein, dass wir die Methoden gar nicht mehr lesen müssen.

## Style Guides

A style guide contains general rules about "how to write" code, e.g. which quotes to use, how many spaces to indent, the maximal line length, etc. A lot of minor things.

When all members of a team use the same style guide, the code looks uniform, regardless of which team member wrote it.

Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.

Ein paar bekannte Beispiele:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (und viele andere)

Wenn du ein Neuling bist, starte mit dem Spickzettel am Anfang dieses Kapitels. Danach kannst du dich in andere Style Guides einlesen um weitere Ideen zu sammeln und selbst entscheiden welches du am besten findest.

## Automated Linters

Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:

- [JSLint](http://www.jslint.com/) -- one of the first linters.
- [JSHint](http://www.jshint.com/) -- more settings than JSLint.
- [ESLint](http://eslint.org/) -- probably the newest one.

All of them can do the job. The author uses [ESLint](http://eslint.org/).

Most linters are integrated with many popular editors: just enable the plugin in the editor and configure the style.

For instance, for ESLint you should do the following:

1. Install [Node.js](https://nodejs.org/).
2. Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4. Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.

Hier ist ein Beispiel einer `.eslintrc` Datei:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

Here the directive `"extends"` denotes that the configuration is based on the "eslint:recommended" set of settings. After that, we specify our own.

It is also possible to download style rule sets from the web and extend them instead. See <http://eslint.org/docs/user-guide/getting-started> for more details about installation.

Also certain IDEs have built-in linting, which is convenient but not as customizable as ESLint.

## Zusammenfassung

Alle Syntaxregeln die in diesem Kapitel (und in den verlinkten Kapiteln) beschrieben wurden, haben das Ziel, die Lesbarkeit deines Codes zu verbessern. Sie sind alle umstritten.

Wenn wir über "besseren" Code nachdenken, sollten wir uns folgende Fragen stellen: "Wie machen wir unser Code besser lesbar und leichter zu verstehen?" und "Was hilft uns, Fehler zu vermeiden?" Das sind die wichtigsten Sachen die man im Hinterkopf behalten muss wenn man sich für einen Codestil entscheidet.

Das Lesen von bekannten Style Guides hilft uns auf den neusten Stand zu bleiben, was Trends und bewährte Vorgehensweisen angeht.
