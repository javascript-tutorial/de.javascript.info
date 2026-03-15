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

Bald werden wir Funktionen kennenlernen (eine Möglichkeit, Anweisungen zu gruppieren), also, so viel sei verraten, `"use strict"` kann an den Anfang einer Funktion gestellt werden. Auf diese Weise wird der strikte Modus nur in dieser Funktion aktiviert. Normalerweise wird er aber für das ganze Skript verwendet.

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

Wenn du eine [Entwicklerkonsole](info:devtools) zum Ausführen von Code verwendest, beachte bitte, dass sie standardmäßig nicht `use strict` verwendet.

Manchmal, wenn `use strict` einen Unterschied macht, erhältst du falsche Ergebnisse.

Wie kann man also in der Konsole tatsächlich `use strict` verwenden?

Zuerst kannst du versuchen, mit `key:Umschalt+Eingabe` mehrere Zeilen einzugeben, und oben drauf `use strict` setzen, so wie hier:

```js
'use strict'; <Umschalt+Eingabe für eine neue Zeile>
//  ...Dein Code
<Eingabe zum Ausführen>
```

Es funktioniert in den meisten Browsern, wie Firefox und Chrome.

Wenn das nicht der Fall ist, z.B. in einem alten Browser, gibt es einen unsauberen, aber zuverlässigen Weg, um `use strict` sicherzustellen. Ummantel es wie folgt:

```js
(function() {
  'use strict';

  // ...your code here...
})()
```

## Should we "use strict"?

Die Frage mag offensichtlich klingen, aber dem ist nicht so.

Man könnte empfehlen, Skripte mit `"use strict"` zu beginnen... Aber weißt du, was besser ist?

Modernes JavaScript unterstützt "Klassen" und "Module" - fortgeschrittene Sprachstrukturen (zu denen wir sicher noch kommen werden), die automatisch die `use strict` Verwendung ermöglichen. Wir brauchen also nicht die `"use strict"`-Direktive hinzuzufügen, wenn wir sie verwenden.

**Also, für den Moment ist `"use strict;"` ein willkommener Gast an der Spitze deiner Skripte. Später, wenn der Code nur noch aus Klassen und Modulen besteht, können wir ihn weglassen.**

Ab jetzt sollten wir über `use strict` im Allgemeinen Bescheid wissen.

In den nächsten Kapiteln werden wir, während wir die sprachlichen Merkmale kennen lernen, die Unterschiede zwischen dem strikten und dem herkömmlichen Modus sehen. Zum Glück gibt es nicht viele, und sie machen uns das Leben tatsächlich angenehmer.

Alle Beispiele in diesem Tutorial gehen vom strikten Modus aus, sofern nicht (sehr selten) anders angegeben.
