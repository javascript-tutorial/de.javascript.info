# Ninja-Code

```quote author="Konfuzius (Gespräche)"
Lernen ohne zu denken ist eitel; Denken ohne zu lernen ist gefährlich.
```

Programmierninjas aus der Vergangenheit benutzten diese Tricks, um den Geist des Code-Maintainers zu schärfen.

Code-Review-Gurus suchen nach ihnen in Testaufgaben.

Anfänger-Entwickler verwenden sie manchmal sogar besser als Programmierninjas.

Lies sie sorgfältig und finde heraus, wer du bist -- ein Ninja, ein Anfänger oder vielleicht ein Code-Reviewer?

```warn header="Ironie entdeckt"
Viele versuchen, den Ninja-Weg zu folgen. Wenige haben Erfolg.
```

## Kürze ist die Seele des Witzes

Mache den Code so kurz wie möglich. Zeige, wie klug du bist.

Lass dich von subtilen Sprachfunktionen leiten.

Zum Beispiel sieh dir diesen ternären Operator `?` an:

```js
// entnommen aus einer bekannten JavaScript-Bibliothek
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Cool, oder? Wenn du so schreibst, wird ein Entwickler, der auf diese Zeile stößt und versucht zu verstehen, was der Wert von `i` ist, eine fröhliche Zeit haben. Dann kommen sie zu dir und suchen nach einer Antwort.

Sag ihnen, dass kürzer immer besser ist. Führe sie in die Wege des Ninjas ein.

## Ein-Buchstaben-Variablen

```quote author="Laozi (Tao Te Ching)"
Das Dao verbirgt sich in Wortlosigkeit. Nur das Dao ist gut begonnen und gut
vollendet.
```

Ein weiterer Weg, den Code kürzer zu machen, ist, überall Ein-Buchstaben-Variablennamen zu verwenden. Wie `a`, `b` oder `c`.

Eine kurze Variable verschwindet im Code wie ein echter Ninja im Wald. Niemand wird sie mit der "Suche" des Editors finden können. Und wenn doch jemand es tut, werden sie nicht in der Lage sein zu "entschlüsseln", was der Name `a` oder `b` bedeutet.

...Aber es gibt eine Ausnahme. Ein echter Ninja wird niemals `i` als Zähler in einer `"for"`-Schleife verwenden. Überall, aber nicht hier. Schau dich um, es gibt viele exotischere Buchstaben. Zum Beispiel `x` oder `y`.

Eine exotische Variable als Schleifenzähler ist besonders cool, wenn der Schleifenrumpf 1-2 Seiten lang ist (mach ihn länger, wenn du kannst). Wenn dann jemand tief in der Schleife nachschaut, wird er nicht schnell herausfinden können, dass die mit `x` benannte Variable der Schleifenzähler ist.

## Verwende Abkürzungen

Wenn die Teamregeln die Verwendung von Ein-Buchstaben- und unklaren Namen verbieten -- kürze sie, mach Abkürzungen.

So wie:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...usw

Nur derjenige mit wirklich guter Intuition wird solche Namen verstehen können. Versuche, alles zu kürzen. Nur eine würdige Person sollte in der Lage sein, die Entwicklung deines Codes aufrechtzuerhalten.

## Erhebe dich hoch. Sei abstrakt.

```quote author="Laozi (Tao Te Ching)"
Das große Quadrat hat keine Ecken<br>
Das große Gefäß ist zuletzt vollendet,<br>
Der große Ton ist ein verdünnter Klang,<br>
Das große Bild hat keine Form.
```

Beim Wählen eines Namens versuche, das abstrakteste Wort zu verwenden. Wie `obj`, `data`, `value`, `item`, `elem` und so weiter.

- **Der ideale Name für eine Variable ist `data`.** Verwende ihn überall dort, wo du kannst. Tatsächlich enthält jede Variable *Daten*, richtig?

    ...Aber was tun, wenn `data` bereits vergeben ist? Versuche `value`, es ist auch universell. Schließlich bekommt eine Variable letztendlich einen *Wert*.

- **Benenne eine Variable nach ihrem Typ: `str`, `num`...**

    Probiere sie aus. Ein junger Initiand mag sich wundern -- sind solche Namen wirklich nützlich für einen Ninja? Tatsächlich sind sie das!

    Sicher, der Variablenname bedeutet immer noch etwas. Er sagt aus, was in der Variablen steckt: ein String, eine Zahl oder etwas anderes. Aber wenn ein Außenstehender versucht, den Code zu verstehen, wird er überrascht sein zu sehen, dass tatsächlich überhaupt keine Informationen vorhanden sind! Und wird letztendlich scheitern, deinen wohl durchdachten Code zu verändern.

    Der Werttyp ist leicht durch Debugging herauszufinden. Aber was ist die Bedeutung der Variablen? Welcher String/Wert wird darin gespeichert?

    Es gibt einfach keine Möglichkeit, das ohne eine gute Meditation herauszufinden!

- **...Aber was, wenn es keine solchen Namen mehr gibt?** Füge einfach eine Nummer hinzu: `data1, item2, elem5`...

## Aufmerksamkeitstest

Nur ein wirklich aufmerksamer Programmierer sollte in der Lage sein, deinen Code zu verstehen. Aber wie kann man das überprüfen?

**Ein Weg -- verwende ähnliche Variablennamen, wie `date` und `data`.**

Mische sie, wo immer du kannst.

Ein schnelles Lesen eines solchen Codes wird unmöglich. Und wenn ein Tippfehler auftritt... Ummm... Wir stecken fest, Zeit für Tee.

## Schlaue Synonyme

```quote author="Laozi (Tao Te Ching)"
Das ausgesprochene Dao ist nicht das ewige Dao. Der benannte Name ist nicht der ewige Name.
```

Die Verwendung von *ähnlichen* Namen für *gleiche* Dinge macht das Leben interessanter und zeigt deine Kreativität der Öffentlichkeit.

Betrachte zum Beispiel Funktionspräfixe. Wenn eine Funktion eine Nachricht auf dem Bildschirm anzeigt, beginne sie mit `display…`, wie `displayMessage`. Und wenn eine andere Funktion etwas anderes auf dem Bildschirm anzeigt, wie einen Benutzernamen, beginne sie mit `show…` (wie `showName`).

Unterstelle, dass es eine subtile Differenz zwischen solchen Funktionen gibt, obwohl es keine gibt.

Schließe einen Pakt mit den Ninja-Kollegen des Teams: Wenn John anfängt, Funktionen in seinem Code mit `display...` zu "zeigen", dann könnte Peter `render..` verwenden und Ann -- `paint...`. Beachte, wie viel interessanter und vielfältiger der Code geworden ist.

...Und jetzt der Höhepunkt!

Für zwei Funktionen mit wichtigen Unterschieden -- verwende den gleichen Präfix!

Zum Beispiel: Die Funktion `printPage(page)` verwendet einen Drucker. Und die Funktion `printText(text)` zeigt den Text auf dem Bildschirm an. Lass einen Leser, der mit der Funktion nicht vertraut ist, gut überlegen bei der ähnlich benannten Funktion `printMessage`: "Wohin schickt sie die Nachricht? An einen Drucker oder auf den Bildschirm?". Um es wirklich glänzen zu lassen, sollte `printMessage(message)` diese in einem neuen Fenster ausgeben!

## Verwende Namen erneut

```quote author="Laozi (Tao Te Ching)"
Sobald das Ganze geteilt ist, brauchen die Teile<br>
Namen.<br>
Es gibt bereits genug Namen.<br>
Man muss wissen, wann man aufhören muss.
```

Füge nur dann eine neue Variable hinzu, wenn es absolut notwendig ist.

Verwende stattdessen vorhandene Namen wieder. Schreibe einfach neue Werte hinein.

In einer Funktion versuche, nur Variablen zu verwenden, die als Parameter übergeben wurden.

Das macht es wirklich schwer zu identifizieren, was *jetzt* wirklich in der Variablen steckt. Und auch, woher sie kommt. Der Zweck ist, die Intuition und das Gedächtnis einer Person, die den Code liest, zu entwickeln. Jemand mit schwacher Intuition müsste den Code Zeile für Zeile analysieren und die Änderungen durch jeden Code-Zweig verfolgen.

**Eine fortgeschrittene Variante des Ansatzes besteht darin, heimlich (!) den Wert in der Mitte einer Schleife oder einer Funktion durch etwas Ähnliches zu ersetzen.**

Zum Beispiel:

```js
function ninjaFunction(elem) {
  // 20 Zeilen Code, die mit elem arbeiten

  elem = clone(elem);

  // 20 weitere Zeilen, die jetzt mit dem Klon von elem arbeiten!
}
```

Ein Kollege, der mit `elem` in der zweiten Hälfte der Funktion arbeiten möchte, wird überrascht sein... Erst während des Debuggens, nachdem er den Code untersucht hat, wird er herausfinden, dass er mit einem Klon arbeitet!

Regelmäßig im Code gesehen. Tödlich effektiv, selbst gegen einen erfahrenen Ninja.

## Unterstriche zum Spaß

Setze Unterstriche `_` und `__` vor Variablennamen. Wie `_name` oder `__value`. Es wäre großartig, wenn nur du ihre Bedeutung kennen würdest. Oder noch besser, füge sie nur zum Spaß hinzu, ohne eine besondere Bedeutung. Oder unterschiedliche Bedeutungen an verschiedenen Stellen.

Du erledigst zwei Fliegen mit einer Klappe. Erstens wird der Code länger und unlesbarer und zweitens könnte ein Kollege lange darüber nachdenken, was die Unterstriche bedeuten.

Ein schlauer Ninja setzt Unterstriche an einer Stelle des Codes und vermeidet sie an anderen Stellen. Das macht den Code noch brüchiger und erhöht die Wahrscheinlichkeit zukünftiger Fehler.

## Zeige deine Liebe

Lass jeden sehen, wie herrlich deine Entitäten sind! Namen wie `superElement`, `megaFrame` und `niceItem` werden definitiv einen Leser erleuchten.

Tatsächlich steht einerseits etwas geschrieben: `super..`, `mega..`, `nice..` Aber andererseits -- das bringt keine Details. Ein Leser könnte sich entscheiden, nach einer verborgenen Bedeutung zu suchen und eine Stunde oder zwei ihrer bezahlten Arbeitszeit zu meditieren.

## Überdecke äußere Variablen

```quote author="Guan Yin Zi"
Wenn im Licht, kann man nichts in der Dunkelheit sehen.<br>
Wenn in der Dunkelheit, kann man alles im Licht sehen.
```

Verwende für Variablen innerhalb und außerhalb einer Funktion dieselben Namen. So einfach. Keine Mühe, neue Namen zu erfinden.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...viele Zeilen...
  ...
  ... // <-- ein Programmierer möchte hier mit user arbeiten und...
  ...
}
```

Ein Programmierer, der in die `render`-Funktion springt, wird wahrscheinlich nicht bemerken, dass es eine lokale Variable `user` gibt, die die äußere überschattet.

Dann werden sie versuchen, mit `user` zu arbeiten in der Annahme, dass es die externe Variable ist, das Ergebnis von `authenticateUser()`... Die Falle ist zugeschnappt! Hallo, Debugger...

## Nebenwirkungen überall!

Es gibt Funktionen, die so aussehen, als würden sie nichts verändern. Wie `isReady()`, `checkPermission()`, `findTags()`... Sie werden vorausgesetzt, um Berechnungen durchzuführen, Daten zu finden und zurückzugeben, ohne etwas außerhalb von ihnen zu verändern. Mit anderen Worten, ohne "Nebenwirkungen".

**Ein wirklich schöner Trick ist, ihnen neben der Hauptaufgabe eine "nützliche" Aktion hinzuzufügen.**

Ein Gesichtsausdruck der verdutzten Überraschung auf dem Gesicht deines Kollegen, wenn sie eine Funktion namens `is..`, `check..` oder `find...` sehen, die etwas verändert, wird definitiv deine Grenzen des Verstehens erweitern.

**Ein anderer Weg, zu überraschen, ist, ein nicht standardmäßiges Ergebnis zurückzugeben.**

Zeige dein originelles Denken! Lass den Aufruf von `checkPermission` nicht `true/false` zurückgeben, sondern ein komplexes Objekt mit den Ergebnissen der Überprüfung.

Diejenigen Entwickler, die versuchen, `if (checkPermission(..))` zu schreiben, werden sich wundern, warum es nicht funktioniert. Sage ihnen: "Lies die Dokumentation!". Und gib ihnen diesen Artikel.

## Mächtige Funktionen!

```quote author="Laozi (Tao Te Ching)"
Das große Dao fließt überallhin,<br>
sowohl nach links als auch nach rechts.
```

Begrenze die Funktion nicht durch das, was in ihrem Namen geschrieben steht. Lege sie breiter aus.

Zum Beispiel könnte eine Funktion `validateEmail(email)` (neben der Überprüfung der E-Mail auf Korrektheit) eine Fehlermeldung anzeigen und dazu auffordern, die E-Mail erneut einzugeben.

Zusätzliche Aktionen sollten aus dem Funktionsnamen nicht offensichtlich sein. Ein echter Ninja-Coder wird sie auch aus dem Code nicht offensichtlich machen.

**Mehrere Aktionen in einer zusammenzufassen schützt deinen Code vor Wiederverwendung.**

Stelle dir vor, ein anderer Entwickler möchte nur die E-Mail überprüfen und keine Nachricht ausgeben. Deine Funktion `validateEmail(email)`, die beides tut, wird ihnen nicht entsprechen. So werden sie deine Meditation nicht durch irgendwelche Fragen stören.

## Zusammenfassung

Alle "Ratschläge" oben stammen aus dem realen Code ... Manchmal von erfahrenen Entwicklern geschrieben. Vielleicht sogar erfahrener als du ;)

- Befolge einige davon, und dein Code wird voller Überraschungen.
- Befolge viele davon, und dein Code wird wirklich deiner, niemand wird ihn ändern wollen.
- Befolge alle, und dein Code wird eine wertvolle Lektion für junge Entwickler sein, die nach Erleuchtung suchen.
