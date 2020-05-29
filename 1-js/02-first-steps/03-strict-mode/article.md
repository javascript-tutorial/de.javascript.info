# Der moderne Modus, "use strict"

JavaScript hat sich lange Zeit ohne Kompatibilitätsprobleme weiterentwickelt. Der Sprache wurden neue Funktionen hinzugefügt, während sich die alten Funktionen nicht geändert haben.

Dies hatte den Vorteil, dass der vorhandene Code nie beschädigt wurde. Der Nachteil war jedoch, dass jeder Fehler oder eine Fehlentscheidung der JavaScript-Entwickler für immer in der Sprache hängen blieb.

Dies war bis zum Erscheinen von ECMAScript 5 (ES5) im Jahr 2009 der Fall. Es wurden der Sprache neue Funktionen hinzugefügt und einige der vorhandenen geändert. Damit der alte Code weiterhin funktioniert, sind die meisten dieser Änderungen standardmäßig deaktiviert. Du musst sie explizit mit einer speziellen Anweisung aktivieren: `"use strict"`.

## "use strict"

Die Direktive sieht aus wie ein String: `"use strict"` oder `'use strict'`. Wenn es sich am Anfang eines Skripts befindet, funktioniert das gesamte Skript auf "moderne" Weise.

Beispielsweise:

```js
"use strict";

// Dieser Code funktioniert auf moderne Weise
...
```

<<<<<<< HEAD
Wir werden bald Funktionen (eine Möglichkeit, Befehle zu gruppieren) lernen. Mit Blick auf die Zukunft sei angemerkt, dass `"use strict"` anstelle des gesamten Skripts am Anfang des Funktionskörpers stehen kann. Auf diese Weise wird der strikte Modus nur in dieser Funktion aktiviert. Normalerweise wird es jedoch für das gesamte Skript verwendet.

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

````warn header="Stellen sicher, dass \"use strict\" am Anfang steht"
Stelle sicher, dass `"use strict"` am Anfang deiner Skripte steht, da sonst der strikte Modus möglicherweise nicht aktiv ist.

Der strikte Modus ist hier nicht aktiviert:

```js no-strict
alert("etwas Code");
// "use strict" wird ignoriert -- es muss am Anfang stehen

"use strict";

// Der strikte Modus ist nicht aktiviert
```

Nur Kommentare dürfen über `"use strict"` erscheinen.
````

```warn header="Es gibt keine Möglichkeit, `use strict` abzubrechen"
Es gibt keine Direktive wie `"no use strict"`, die die Engine auf altes Verhalten zurücksetzt.

Sobald wir in den strikten Modus wechseln, gibt es kein Zurück mehr.
```

## Browser-Konsole

<<<<<<< HEAD
Wenn du in Zukunft eine Browserkonsole zum Testen von Funktionalitäten verwendest, beachte bitte, dass `use strict` standardmäßig nicht verwendet wird.
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

Manchmal, wenn `use strict` einen Unterschied macht, erhältst du falsche Ergebnisse.

<<<<<<< HEAD
Du kannst versuchen, durch Drücken von `key:Umschalt+Eingabetaste` mehrere Zeilen einzugeben und `use strict` wie folgt an den Anfang zu setzen:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
'use strict'; <Umschalt+Eingabe für eine neue Zeile>
//  ...Dein Code
<Eingabe zum Ausführen>
```

Es funktioniert in den meisten Browsern, wie Firefox und Chrome.

<<<<<<< HEAD
Wenn dies nicht der Fall ist, besteht die zuverlässigste Möglichkeit, um `use strict` sicherzustellen, darin, den Code wie folgt in die Konsole einzugeben:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...Dein Code...
})()
```

## Immer "use strict" verwenden

Wir müssen die Unterschiede zwischen dem striken Modus und dem "Standardmodus" noch behandeln.

In den nächsten Kapiteln werden wir beim Erlernen der Sprachfunktionen die Unterschiede zwischen dem Strikten und dem Standardmodus feststellen. Zum Glück gibt es nicht viele und sie verbessern unser Leben.

Im Moment genügt es, allgemein zu wissen:

1. Die Anweisung `"use strict"` schaltet die Engine in den "modernen" Modus und ändert das Verhalten einiger eingebauter Funktionen. Wir werden die Details später im Tutorial sehen.
2. Der strikte Modus wird aktiviert, indem `"use strict"` am Anfang eines Skripts oder einer Funktion platziert wird. Verschiedene Sprachfunktionen, wie "Klassen" und "Module", aktivieren den strikten Modus automatisch.
3. Der strikte Modus wird von allen modernen Browsern unterstützt.
4. Wir empfehlen, Skripte immer mit `"use strict"` zu starten. Alle Beispiele in diesen Tutorial gehen von einem strengen Modus aus, sofern nicht (sehr selten) anders angegeben.
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
