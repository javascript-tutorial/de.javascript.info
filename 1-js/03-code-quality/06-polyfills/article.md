
# Polyfills

JavaScript entwickelt sich stetig weiter. Neue Vorschläge für die Sprache erscheinen regelmäßig, sie werden analysiert und, wenn sie als würdig erachtet werden, an die Liste unter <https://tc39.github.io/ecma262/> angehängt und dann zur [Spezifikation](http:// www.ecma-international.org/publications/standards/Ecma-262.htm) freigegeben.

Teams hinter JavaScript-Engines haben ihre eigenen Vorstellungen davon, was zuerst implementiert werden soll. Sie können beschließen, Vorschläge zu implementieren, die sich im Entwurf befinden, und Dinge, die bereits in der Spezifikation enthalten sind, verschieben, weil sie weniger interessant oder einfach schwieriger zu machen sind.

Es ist also durchaus üblich, dass eine Engine nur einen Teil des Standards implementiert.

Eine gute Seite, um den aktuellen Stand der Unterstützung für Sprachfunktionen zu sehen, ist <https://kangax.github.io/compat-table/es6/> (es ist groß, wir haben noch viel zu lernen).

## Babel

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

Wenn wir also moderne Sprachfunktionen verwenden möchten, sind ein Transpiler und ein Polyfill erforderlich.

## Beispiele im Tutorial


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
