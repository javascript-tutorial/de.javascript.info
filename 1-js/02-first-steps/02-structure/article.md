# Code-Struktur

Das erste, was wir untersuchen werden, sind die Bausteine des Codes.

## Anweisungen

Anweisungen sind Syntaxkonstrukte und Befehle, die Aktionen ausführen.

Wir haben bereits eine Anweisung `alert('Hallo, Welt!')` gesehen, welche die Meldung "Hallo, Welt!" zeigt.

Wir können so viele Anweisungen in unserem Code haben, wie wir wollen. Anweisungen können durch ein Semikolon getrennt werden.

Zum Beispiel teilen wir hier "Hallo Welt" in zwei Warnungen:

```js run no-beautify
alert('Hallo'); alert('Welt');
```

Normalerweise werden Anweisungen in separate Zeilen geschrieben, um den Code besser lesbar zu machen:

```js run no-beautify
alert('Hallo');
alert('Welt');
```

## Semikolons [#semicolon]

Ein Semikolon kann in den meisten Fällen weggelassen werden, wenn ein Zeilenumbruch vorliegt.

Das würde auch funktionieren:

```js run no-beautify
alert('Hallo')
alert('Welt')
```

Hier interpretiert JavaScript den Zeilenumbruch als "implizites" Semikolon. Dies wird als [automatische Semikoloneinfügung](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) bezeichnet.

**In den meisten Fällen bedeutet ein Zeilenumbruch ein Semikolon. "Meistens" heißt aber nicht "immer"!**

Es gibt Fälle, in denen ein Zeilenumbruch kein Semikolon bedeutet. Beispielsweise:

```js run no-beautify
alert(3 +
1
+ 2);
```

Der Code gibt `6` aus, da JavaScript hier keine Semikolons einfügt. Es ist intuitiv klar, dass, wenn die Zeile mit einem Pluszeichen `"+"` endet, es sich um einen "unvollständigen Ausdruck" handelt, sodass das Semikolon nicht erforderlich ist. Und in diesem Fall funktioniert das wie vorgesehen.

**Es gibt jedoch Situationen, in denen JavaScript ein Semikolon nicht annimmt, wenn es wirklich benötigt wird.**

Fehler, die in solchen Fällen auftreten, sind schwer zu finden und zu beheben.

````smart header="Ein Beispiel für einen Fehler"
Wenn Sie ein konkretes Beispiel für einen solchen Fehler sehen möchten, lesen Sie den folgenden Code:

```js run
[1, 2].forEach(alert)
```

Über die Bedeutung der Klammern `[]` und `forEach` muss noch nicht nachgedacht werden. Wir werden sie später studieren. Denk vorerst nur an das Ergebnis des Codes: Es zeigt `1`, dann `2`.

Fügen wir nun vor dem Code einen `alert` ein und beenden ihn *nicht* mit einem Semikolon:

```js run no-beautify
alert("Es wird ein Fehler auftreten")

[1, 2].forEach(alert)
```

Wenn wir nun den Code ausführen, wird nur der erste `alert` angezeigt und dann haben wir einen Fehler!

Aber alles ist wieder in Ordnung, wenn wir nach `alert` ein Semikolon einfügen:
```js run
alert("Jetzt ist alles in Ordnung");

[1, 2].forEach(alert)
```

Jetzt haben wir die Nachricht "Jetzt ist alles in Ordnung" gefolgt von `1` und `2`.


Der Fehler in der Variante ohne Semikolon tritt auf, weil JavaScript kein Semikolon vor eckigen Klammern `[...]` annimmt.

Da das Semikolon nicht automatisch eingefügt wird, wird der Code im ersten Beispiel als einzelne Anweisung behandelt. So sieht es die Engine:

```js run no-beautify
alert("Es wird ein Fehler auftreten")[1, 2].forEach(alert)
```

Aber es sollten zwei getrennte Aussagen sein, nicht eine. Eine solche Verschmelzung ist in diesem Fall einfach falsch, daher der Fehler. Dies kann in anderen Situationen auftreten.
````

Es wird empfohlen, Semikolons zwischen Anweisungen zu setzen, auch wenn diese durch Zeilenumbrüche getrennt sind. Diese Regel wird von der Community weitgehend übernommen. Lassen Sie uns noch einmal festhalten -- es ist möglich, Semikolons die meiste Zeit wegzulassen. Aber es ist sicherer -- besonders für Anfänger -- sie zu benutzen.

## Kommentare

Mit der Zeit werden Programme immer komplexer. Es müssen *Kommentare* hinzugefügt werden, die beschreiben, was der Code macht und warum.

Kommentare können an jeder Stelle eines Skripts eingefügt werden. Sie haben keinen Einfluss auf die Ausführung, da die Engine sie einfach ignoriert.

**Einzeilige Kommentare beginnen mit zwei Schrägstrichen `//`.**

Der Rest der Zeile ist ein Kommentar. Er kann eine ganze eigene Zeile belegen oder einer Anweisung folgen.

Wie hier:
```js run
// Dieser Kommentar belegt eine eigene Zeile
alert('Hallo');

alert('Welt'); // Dieser Kommentar folgt der Anweisung
```

**Mehrzeilige Kommentare beginnen mit einem Schrägstrich und einem Sternchen <code>/&#42;</code> und enden mit einem Sternchen und einem Schrägstrich <code>&#42;/</code>.**

So wie hier:

```js run
/* Ein Beispiel mit zwei Nachrichten.
Dies ist ein mehrzeiliger Kommentar.
*/
alert('Hallo');
alert('Welt');
```

Der Inhalt von Kommentaren wird ignoriert. Wenn wir also Code innerhalb <code>/&#42; ... &#42;/</code> einfügen, wird er nicht ausgeführt.

Manchmal kann es nützlich sein, einen Teil des Codes vorübergehend zu deaktivieren:

```js run
/* Code auskommentieren
alert('Hallo');
*/
alert('Welt');
```

```smart header="Benutze Tastenkombination!"
In den meisten Editoren können Sie eine Codezeile auskommentieren, indem Sie die Tastenkombination `key:Strg+/` für einen einzeiligen Kommentar und die Tastenkombination `key:Strg+Umschalt+/` für mehrzeilige Kommentare drücken (wählen Sie ein Stück Code aus und drücken Sie die Tastenkombination). Versuchen Sie bei einem Mac "key:Cmd" anstelle von "key:Strg".
```

````warn header="Verschachtelte Kommentare werden nicht unterstützt!"
Es ist nicht möglich `/*...*/` innerhalb eines anderen `/*...*/` zu setzen.

Solcher Code resultiert in einem Fehler:

```js run no-beautify
/*
  /* verschachtelter Kommentar ?!? */
*/
alert( 'Welt' );
```
````

Bitte zögern Sie nicht, Ihren Code zu kommentieren.

Kommentare vergrößern den gesamten Code-Fussabdruck, aber das ist überhaupt kein Problem. Es gibt viele Werkzeuge, die den Code vor dem Veröffentlichen auf einem Produktionsserver minimieren. Sie entfernen Kommentare, sodass sie nicht in den Arbeitsskripten angezeigt werden. Kommentare wirken sich daher überhaupt nicht negativ auf die Produktion aus.

Später im Tutorial wird es ein Kapitel <info:code-quality> geben, in dem auch erklärt wird, wie man bessere Kommentare schreibt.
