# Der moderne Modus, "use strict"

JavaScript hat sich lange Zeit ohne Kompatibilitätsprobleme weiterentwickelt. Der Sprache wurden neue Funktionen hinzugefügt, während sich die alten Funktionen nicht geändert haben.

Dies hatte den Vorteil, dass der vorhandene Code nie beschädigt wurde. Der Nachteil war jedoch, dass jeder Fehler oder eine unvollständige Entscheidung der JavaScript-Entwickler für immer in der Sprache stecken blieb.

Dies war bis zum Erscheinen von ECMAScript 5 (ES5) im Jahr 2009 der Fall. Es wurden der Sprache neue Funktionen hinzugefügt und einige der vorhandenen geändert. Damit der alte Code weiterhin funktioniert, sind die meisten dieser Änderungen standardmäßig deaktiviert. Sie müssen sie explizit mit einer speziellen Anweisung aktivieren: `"use strict"`.

## "use strict"

Die Direktive sieht aus wie eine Zeichenkette: `"use strict"` oder `'use strict'`. Wenn es sich am Anfang eines Skripts befindet, funktioniert das gesamte Skript auf "moderne" Weise.

Beispielsweise:

```js
"use strict";

// Dieser Code funktioniert auf moderne Weise
...
```

Wir werden bald Funktionen (eine Möglichkeit, Befehle zu gruppieren) lernen. Mit Blick auf die Zukunft sei angemerkt, dass `"use strict"` anstelle des gesamten Skripts am Anfang des Funktionskörpers stehen kann. Auf diese Weise wird der strikte Modus nur in dieser Funktion aktiviert. Normalerweise wird es jedoch für das gesamte Skript verwendet.


````warn header="Stellen Sie sicher, dass \"use strict\" am Anfang steht"
Stellen Sie sicher, dass `"use strict"` am Anfang in Ihren Skripten steht, da sonst der strikte Modus möglicherweise nicht aktiviert ist.

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

Wenn Sie in Zukunft eine Browserkonsole zum Testen von Eigenschaften verwenden, beachten Sie bitte, dass `use strict` standardmäßig nicht verwendet wird.

Manchmal, wenn `use strict` einen Unterschied macht, erhalten Sie falsche Ergebnisse.

Sie können versuchen, durch Drücken von `key:Umschalt+Eingabetaste` mehrere Zeilen einzugeben und `use strict` wie folgt an den Anfang zu setzen:

```js
'use strict'; <Umschalt+Eingabe für eine neue Zeile>
//  ...Ihr Code
<Eingabe zum Ausführen>
```

Es funktioniert in den meisten Browsern, wie Firefox und Chrome.

Wenn dies nicht der Fall ist, besteht die zuverlässigste Möglichkeit, um `use strict` sicherzustellen, darin, den Code wie folgt in die Konsole einzugeben:

```js
(function() {
  'use strict';

  // ...Ihr Code...
})()
```

## Immer "use strict" verwenden

Wir müssen die Unterschiede zwischen dem striken Modus und dem "Standardmodus" noch behandeln.

In den nächsten Kapiteln werden wir beim Erlernen der Sprachfunktionen die Unterschiede zwischen dem Strikten und dem Standardmodus feststellen. Zum Glück gibt es nicht viele und sie verbessern unser Leben.

Im Moment genügt es, allgemein zu wissen:

1. Die Anweisung `"use strict"` schaltet die Engine in den "modernen" Modus und ändert das Verhalten einiger eingebauter Funktionen. Wir werden die Details später im Tutorial sehen.
2. Der strikte Modus wird aktiviert, indem `"use strict"` am Anfang eines Skripts oder einer Funktion platziert wird. Verschiedene Sprachfunktionen, wie "Klassen" und "Module", aktivieren den strikten Modus automatisch.
3. Der strikte Modus wird von allen modernen Browsern unterstützt.
4. Wir empfehlen, Skripte immer mit `"use strict"` zu starten. Alle Beispiele in diesem Lernprogramm gehen von einem strengen Modus aus, sofern nicht (sehr selten) anders angegeben.
