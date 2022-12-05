
# Polyfills and transpilers

<<<<<<< HEAD
JavaScript entwickelt sich stetig weiter. Neue Vorschläge für die Sprache erscheinen regelmäßig, sie werden analysiert und, wenn sie als würdig erachtet werden, an die Liste unter <https://tc39.github.io/ecma262/> angehängt und dann zur [Spezifikation](http:// www.ecma-international.org/publications/standards/Ecma-262.htm) freigegeben.
=======
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

Teams hinter JavaScript-Engines haben ihre eigenen Vorstellungen davon, was zuerst implementiert werden soll. Sie können beschließen, Vorschläge zu implementieren, die sich im Entwurf befinden, und Dinge, die bereits in der Spezifikation enthalten sind, verschieben, weil sie weniger interessant oder einfach schwieriger zu machen sind.

<<<<<<< HEAD
Es ist also durchaus üblich, dass eine Engine nur einen Teil des Standards implementiert.
=======
So it's quite common for an engine to implement only part of the standard.
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

Eine gute Seite, um den aktuellen Stand der Unterstützung für Sprachfunktionen zu sehen, ist <https://kangax.github.io/compat-table/es6/> (es ist groß, wir haben noch viel zu lernen).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Wenn wir moderne Funktionen der Sprache verwenden, können einige Engines diesen Code möglicherweise nicht unterstützen. Wie gesagt, nicht alle Funktionen sind überall implementiert.

Hier kommt Babel zur Rettung.

[Babel](https://babeljs.io) ist ein [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). Es schreibt modernen JavaScript-Code in den vorherigen Standard um.

Tatsächlich gibt es in Babel zwei Teile:

1. Erstens das Transpiler-Programm, das den Code umschreibt. Der Entwickler führt es auf seinem eigenen Computer aus. Es schreibt den Code in den älteren Standard um. Und dann wird der Code für die Benutzer an die Website geliefert. Moderne Projekt-Build-Systeme wie [webpack](http://webpack.github.io/) bieten die Möglichkeit, den Transpiler bei jeder Codeänderung automatisch auszuführen, sodass er sehr einfach in den Entwicklungsprozess integriert werden kann.

2. Zweitens, der polyfill.

    Neue Sprachfeatures können neue integrierte Funktionen und Syntaxkonstrukte umfassen.
     Der Transpiler schreibt den Code neu und wandelt Syntaxkonstrukte in ältere um. Aber was neue eingebaute Funktionen betrifft, müssen wir sie implementieren. JavaScript ist eine hochdynamische Sprache, Skripte können beliebige Funktionen hinzufügen/ändern, damit sie sich dem modernen Standard entsprechend verhalten.

    Ein Skript, das neue Funktionen aktualisiert/hinzufügt, wird "Polyfill" genannt. Es "füllt" die Lücke und fügt fehlende Implementierungen hinzu.

    Zwei interessante Polyfills sind:
     - [core js](https://github.com/zloirock/core-js), der vieles unterstützt, ermöglicht es, nur benötigte Funktionen einzubinden.
     - [polyfill.io](http://polyfill.io) Dienst, der ein Skript mit Polyfills bereitstellt, abhängig von den Funktionen und dem Browser des Benutzers.

Wenn wir moderne Sprachfunktionen verwenden möchten, sind ein Transpiler und ein Polyfill erforderlich.

## Beispiele im Tutorial
=======
On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
<<<<<<< HEAD
````online
Die meisten Beispiele sind direkt lauffähig, wie folgt:

```js run
alert('Drücken Sie die Schaltfläche "Starten" in der oberen rechten Ecke, um zu starten');
```

Beispiele, die modernes JS verwenden, funktionieren nur, wenn Ihr Browser dies unterstützt.
````

```offline
Während Sie die Offline-Version lesen, sind PDF-Beispiele nicht lauffähig. In EPUB können einige von ihnen ausgeführt werden.
```

Google Chrome ist in der Regel mit Sprachfunktionen auf dem neuesten Stand und eignet sich gut, um topaktuelle Demos ohne Transpiler auszuführen, aber auch andere moderne Browser funktionieren einwandfrei.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

Two interesting polyfill libraries are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](https://polyfill.io/) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> a82915575863d33db6b892087975f84dea6cb425
