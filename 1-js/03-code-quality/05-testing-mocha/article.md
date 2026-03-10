# Automatisiertes Testen mit Mocha

Automatisiertes Testen wird in weiterführenden Aufgaben verwendet und ist auch in echten Projekten weit verbreitet.

## Warum brauchen wir Tests?

Wenn wir eine Funktion schreiben, können wir uns normalerweise vorstellen, was sie tun soll: Welche Parameter welche Ergebnisse liefern.

Während der Entwicklung können wir die Funktion überprüfen, indem wir sie ausführen und das Ergebnis mit dem erwarteten vergleichen. Zum Beispiel können wir das in der Konsole tun.

Wenn etwas nicht stimmt, dann reparieren wir den Code, führen ihn erneut aus, überprüfen das Ergebnis - und so weiter, bis es funktioniert.

Aber solche manuellen "Neustarts" sind unvollkommen.

**Beim Testen eines Codes durch manuelle Neustarts passiert es schnell, etwas zu übersehen.**

Angenommen wir erstellen eine Funktion `f`. Wir haben Code geschrieben, übergeprüft: `f(1)` funktioniert, aber `f(2)` funktioniert nicht. Wir reparieren den Code und jetzt funktioniert `f(2)`. Sieht vollständig aus? Aber wir haben vergessen, `f(1)` erneut zu testen. Das könnte zu einem Fehler führen.

Das ist sehr typisch. Wenn wir etwas entwickeln, behalten wir viele mögliche Anwendungsfälle im Kopf. Aber es ist schwer zu erwarten, dass ein Programmierer sie nach jeder Änderung manuell überprüft. Daher wird es leicht, eine Sache zu reparieren und eine andere kaputtzumachen.

**Automatisiertes Testen bedeutet, dass Tests separat geschrieben werden, zusätzlich zum Code. Sie führen unsere Funktionen auf verschiedene Weise aus und vergleichen die Ergebnisse mit dem Erwarteten.**

## Behavior Driven Development (BDD)

Beginnen wir mit einer Technik namens [Behavior Driven Development](http://de.wikipedia.org/wiki/Behavior-driven_development) oder kurz BDD.

**BDD ist dreierlei in einem: Tests UND Dokumentation UND Beispiele.**

Um BDD zu verstehen, werden wir einen praktischen Fall der Entwicklung untersuchen.

## Entwicklung von "pow": die Spezifikation

Nehmen wir an, wir möchten eine Funktion `pow(x, n)` erstellen, die `x` auf die ganzzahlige Potenz `n` erhöht. Wir gehen davon aus, dass `n≥0`.

Diese Aufgabe ist nur ein Beispiel: Es gibt den Operator `**` in JavaScript, der das kann, aber hier konzentrieren wir uns auf den Entwicklungsfluss, der auch auf komplexere Aufgaben angewandt werden kann.

Bevor wir den Code von `pow` erstellen, können wir uns vorstellen, was die Funktion tun sollte und sie beschreiben.

Diese Beschreibung wird als *Spezifikation* oder kurz *Spec* bezeichnet und enthält Beschreibungen der Anwendungsfälle zusammen mit Tests für diese, wie folgt:

```js
describe("pow", function() {

  it("erhöht auf die n-te Potenz", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Eine Spezifikation hat drei Hauptbestandteile, die du oben sehen kannst:

`describe("titel", function() { ... })`
: Welche Funktionalität beschreiben wir? In unserem Fall beschreiben wir die Funktion `pow`. Wird verwendet um "Worker" -- die `it` Blöcke -- zu gruppieren.

`it("Beschreibung des Anwendungsfalls", function() { ... })`
: Im Titel von `it` beschreiben wir *auf eine für den Menschen lesbare Weise* den speziellen Anwendungsfall, und das zweite Argument ist eine Funktion, die diesen testet.

`assert.equal(wert1, wert2)`
: Der Code im `it`-Block, wenn die Implementierung korrekt ist, sollte ohne Fehler ausgeführt werden.

    Funktionen `assert.*` werden benutzt, um zu überprüfen, ob `pow` wie erwartet funktioniert. Hier benutzen wir eine von ihnen -- `assert.equal`, die Argumente vergleicht und einen Fehler auslöst, wenn sie nicht gleich sind. Hier überprüft sie, dass das Resultat von `pow(2, 3)` gleich `8` ist. Es gibt andere Arten von Vergleichen und Überprüfungen, die wir später hinzufügen werden.

Die Spezifikation kann ausgeführt werden, und sie führt den Test aus, der im `it`-Block spezifiziert ist. Das werden wir später sehen.

## Der Entwicklungsablauf

Der Entwicklungsablauf sieht normalerweise so aus:

1. Eine anfängliche Spezifikation wird geschrieben, mit Tests für die grundlegendste Funktionalität.
2. Eine Erstimplementierung wird erstellt.
3. Um zu überprüfen, ob sie funktioniert, führen wir das Test-Framework [Mocha](https://mochajs.org/) aus (mehr Details bald), das die Spec ausführt. Solange die Funktionalität nicht komplett ist, werden Fehler angezeigt. Wir machen Korrekturen, bis alles funktioniert.
4. Jetzt haben wir eine funktionierende Implementierung mit Tests.
5. Wir fügen mehr Anwendungsfälle zur Spezifikation hinzu, die wahrscheinlich noch nicht von der Implementierung unterstützt werden. Die Tests beginnen zu fehlzuschlagen.
6. Gehe zu 3, aktualisiere die Implementierung, bis Tests keine Fehler mehr anzeigen.
7. Wiederhole Schritte 3-6, bis die Funktionalität fertig ist.

Die Entwicklung ist also *iterativ*. Wir schreiben die Spezifikation, implementieren sie, stellen sicher, dass die Tests bestehen, dann schreiben wir mehr Tests, stellen sicher, dass sie funktionieren usw. Am Ende haben wir sowohl eine funktionierende Implementierung als auch Tests dafür.

Betrachten wir diesen Entwicklungsablauf anhand unseres praktischen Beispiels.

Der erste Schritt ist bereits abgeschlossen: Wir haben eine erste Spezifikation für `pow`. Jetzt, bevor wir die Implementierung vornehmen, lass uns ein paar JavaScript-Bibliotheken verwenden, um die Tests auszuführen, nur um zu sehen, dass sie funktionieren (sie werden alle fehlschlagen).

## Die Spezifikation in Aktion

Hier im Tutorial werden wir die folgenden JavaScript-Bibliotheken für Tests verwenden:

- [Mocha](https://mochajs.org/) -- das Kernframework: Es bietet gemeinsame Testfunktionen, einschließlich `describe` und `it` und die Hauptfunktion, die Tests ausführt.
- [Chai](https://www.chaijs.com/) -- die Bibliothek mit vielen Assertions (Zusicherungen). Sie ermöglicht die Verwendung vieler verschiedener Assertions, im Moment benötigen wir nur `assert.equal`.
- [Sinon](https://sinonjs.org/) -- eine Bibliothek zum Überwachen von Funktionen, zum Emulieren von eingebauten Funktionen und mehr. Wir werden sie viel später benötigen.

Diese Bibliotheken eignen sich sowohl für das Testen im Browser als auch auf der Serverseite. Hier werden wir die Browser-Variante betrachten.

Die vollständige HTML-Seite mit diesen Frameworks und der `pow`-Spezifikation:

```html src="index.html"
```

Die Seite kann in fünf Teile unterteilt werden:

1. Der `<head>` -- füge Dritt-Bibliotheken und Styles für Tests hinzu.
2. Das `<script>` mit der Funktion zum Testen, in unserem Fall -- mit dem Code für `pow`.
3. Die Tests -- in unserem Fall ein externes Skript `test.js`, das `describe("pow", ...)` von oben hat.
4. Das HTML-Element `<div id="mocha">` wird von Mocha verwendet, um die Ergebnisse auszugeben.
5. Die Tests werden mit dem Befehl `mocha.run()` gestartet.

Das Ergebnis:

[iframe-Höhe=250 src="pow-1" border=1 edit]

Bis jetzt schlägt der Test fehl, es gibt einen Fehler. Das ist logisch: Wir haben einen leeren Funktionscode in `pow`, daher gibt `pow(2,3)` `undefined` statt `8` zurück.

Für die Zukunft sei angemerkt, dass es noch höhere Test-Runner gibt, wie [karma](https://karma-runner.github.io/) und andere, die das automatische Ausführen vieler verschiedener Tests erleichtern.

## Erste Implementierung

Lass uns eine einfache Implementierung von `pow` machen, damit die Tests bestehen:

```js
function pow(x, n) {
  return 8; // :) wir schummeln!
}
```

Wow, jetzt funktioniert es!

[iframe-Höhe=250 src="pow-min" border=1 edit]

## Verbesserung der Spezifikation

Was wir getan haben, ist definitiv ein Schummeln. Die Funktion funktioniert nicht: Der Versuch, `pow(3,4)` zu berechnen, würde ein falsches Ergebnis liefern, aber die Tests bestehen.

...Aber die Situation ist ziemlich typisch, das passiert in der Praxis. Die Tests bestehen, aber die Funktion funktioniert falsch. Unsere Spezifikation ist unvollkommen. Wir müssen mehr Anwendungsfälle hinzufügen.

Lass uns einen weiteren Test hinzufügen, um zu überprüfen, dass `pow(3, 4) = 81`.

Wir können hier zwei Wege wählen, um den Test zu organisieren:

1. Die erste Variante -- füge ein weiteres `assert` in denselben `it` ein:

    ```js
    describe("pow", function() {

      it("erhöht auf die n-te Potenz", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. Die zweite -- erstelle zwei Tests:

    ```js
    describe("pow", function() {

      it("2 erhöht auf Potenz 3 ist 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 erhöht auf Potenz 4 ist 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

Der Hauptunterschied besteht darin, dass bei Auslösung eines Fehlers durch `assert` der `it`-Block sofort beendet wird. Daher werden wir im ersten Fall bei einem Fehler des ersten `assert` niemals das Ergebnis des zweiten `assert` sehen.

Getrennte Tests zu machen, ist nützlich, um mehr Informationen darüber zu erhalten, was vor sich geht, daher ist die zweite Variante besser.

Und nebenbei gibt es noch eine Regel, die gut zu befolgen ist.

**Ein Test überprüft eine Sache.**

Wenn wir den Test ansehen und zwei unabhängige Überprüfungen darin sehen, ist es besser, ihn in zwei einfachere aufzuteilen.

Also fahren wir mit der zweiten Variante fort.

Das Ergebnis:

[iframe-Höhe=250 src="pow-2" edit border="1"]

Wie erwartet ist der zweite Test fehlgeschlagen. Sicher, unsere Funktion gibt immer `8` zurück, während das `assert` `81` erwartet.

## Verbesserung der Implementierung

Lass uns etwas Realistischeres schreiben, damit die Tests bestehen:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Um sicherzustellen, dass die Funktion gut funktioniert, solltest du sie für mehr Werte testen. Anstatt `it`-Blöcke manuell zu schreiben, können wir sie in einer `for`-Schleife generieren:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} zur Potenz 3 ist ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Das Ergebnis:

[iframe-Höhe=250 src="pow-3" edit border="1"]

## Verschachtelte describe

Wir werden noch mehr Tests hinzufügen. Doch zunächst sei angemerkt, dass die Hilfsfunktion `makeTest` und `for` zusammen gruppiert werden sollten. Wir brauchen `makeTest` nicht in anderen Tests, es wird nur in `for` benötigt: Ihre gemeinsame Aufgabe ist es zu überprüfen, wie `pow` auf die vorgegebene Potenz erhöht wird.

Gruppierungen werden mit einem verschachtelten `describe` durchgeführt:

```js
describe("pow", function() {

*!*
  describe("erhöht x auf Potenz 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} zur Potenz 3 ist ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... mehr Tests folgen hier, sowohl describe als auch it können hinzugefügt werden
});
```

Das verschachtelte `describe` definiert eine neue "Untergruppe" von Tests. In der Ausgabe können wir die beschriftete Einrückung sehen:

[iframe-Höhe=250 src="pow-4" edit border="1"]

In Zukunft können wir mehr `it` und `describe` auf der obersten Ebene mit eigenen Hilfsfunktionen hinzufügen, sie werden `makeTest` nicht sehen.

````smart header="`before/after` und `beforeEach/afterEach`"
Wir können `before/after`-Funktionen einrichten, die vor/nach dem Ausführen der Tests ausgeführt werden, sowie `beforeEach/afterEach`-Funktionen, die vor/nach *jedem* `it` ausgeführt werden.

Zum Beispiel:

```js no-beautify
describe("test", function() {

  before(() => alert("Test beginnt – vor allen Tests"));
  after(() => alert("Test abgeschlossen – nach allen Tests"));

  beforeEach(() => alert("Vor einem Test – beginne einen Test"));
  afterEach(() => alert("Nach einem Test – beende einen Test"));

  it('Test 1', () => alert(1));
  it('Test 2', () => alert(2));

});
```

Die Ausführungsreihenfolge ist:

```
Test beginnt – vor allen Tests (before)
Vor einem Test – beginne einen Test (beforeEach)
1
Nach einem Test – beende einen Test   (afterEach)
Vor einem Test – beginne einen Test (beforeEach)
2
Nach einem Test – beende einen Test   (afterEach)
Test abgeschlossen – nach allen Tests (after)
```

[edit src="beforeafter" title="Öffne das Beispiel in der Sandbox."]

Normalerweise werden `beforeEach/afterEach` und `before/after` verwendet, um Initialisierungen durchzuführen, Zähler zurückzusetzen oder etwas anderes zwischen den Tests (oder Testgruppen) zu machen.
````

## Erweiterung der Spezifikation

Die grundlegende Funktionalität von `pow` ist abgeschlossen. Die erste Iteration der Entwicklung ist erledigt. Wenn wir mit dem Feiern und Champagnertrinken fertig sind -- lass uns weitermachen und sie verbessern.

Wie gesagt, die Funktion `pow(x, n)` soll mit positiven ganzen Zahlen `n` funktionieren.

Um einen mathematischen Fehler anzuzeigen, geben JavaScript-Funktionen normalerweise `NaN` zurück. Lass uns für ungültige Werte von `n` dasselbe tun.

Lass uns zunächst das Verhalten in der Spezifikation hinzufügen(!):

```js
describe("pow", function() {

  // ...

  it("für negatives n ist das Ergebnis NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("für nicht-ganzzahliges n ist das Ergebnis NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

Das Ergebnis mit den neuen Tests:

[iframe-Höhe=530 src="pow-nan" edit border="1"]

Die neu hinzugefügten Tests scheitern, da unsere Implementierung sie nicht unterstützt. So wird BDD gemacht: Zuerst schreiben wir fehlerhafte Tests, und dann machen wir eine Implementierung für sie.

```smart header="Andere Assertions"
Bitte beachte die Assertion `assert.isNaN`: sie prüft auf `NaN`.

Es gibt auch andere Assertions in [Chai](https://www.chaijs.com/de/) wie zum Beispiel:

- `assert.equal(wert1, wert2)` -- überprüft die Gleichheit `wert1 == wert2`.
- `assert.strictEqual(wert1, wert2)` -- überprüft die strenge Gleichheit `wert1 === wert2`.
- `assert.notEqual`, `assert.notStrictEqual` -- umgekehrte Überprüfungen zu den oben genannten.
- `assert.isTrue(wert)` -- überprüft ob `wert === true`
- `assert.isFalse(wert)` -- überprüft ob `wert === false`
- ...die vollständige Liste ist in der [Dokumentation](https://www.chaijs.com/de/api/assert/)
```

Also sollten wir ein paar Zeilen zur `pow`-Funktion hinzufügen:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Nun funktioniert es, alle Tests bestehen:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Öffne das vollständige finale Beispiel in der Sandbox."]

## Zusammenfassung

Bei BDD kommt zuerst die Spec, gefolgt von der Implementierung. Am Ende haben wir sowohl die Spec als auch den Code.

Die Spec kann auf drei Arten verwendet werden:

1. Als **Tests** - sie garantieren, dass der Code korrekt funktioniert.
2. Als **Dokumentation** -- die Titel von `describe` und `it` sagen aus, was die Funktion tut.
3. Als **Beispiele** -- die Tests sind tatsächlich funktionierende Beispiele, die zeigen, wie eine Funktion genutzt werden kann.

Mit der Spec können wir die Funktion auf sichere Weise verbessern, ändern, sogar von Grund auf neu schreiben und sicherstellen, dass sie immer noch richtig funktioniert.

Das ist besonders wichtig in großen Projekten, wenn eine Funktion an vielen Stellen verwendet wird. Wenn wir eine solche Funktion ändern, gibt es einfach keine Möglichkeit, manuell zu prüfen, ob jede Stelle, die sie verwendet, noch richtig funktioniert.

Ohne Tests haben Menschen zwei Möglichkeiten:

1. Die Änderung trotzdem durchführen. Und dann begegnen unsere Nutzer Bugs, weil wir wahrscheinlich versäumen, etwas manuell zu prüfen.
2. Oder, wenn die Strafe für Fehler hart ist und es keine Tests gibt, dann bekommen Menschen Angst davor, solche Funktionen zu modifizieren, und dann wird der Code veraltet, niemand will sich damit befassen. Nicht gut für die Entwicklung.

**Automatisierte Tests helfen, diese Probleme zu vermeiden!**

Wenn das Projekt mit Tests abgedeckt ist, gibt es dieses Problem einfach nicht. Nach beliebigen Änderungen können wir die Tests laufen lassen und sehen innerhalb von Sekunden viele Überprüfungen.

**Zudem hat gut getesteter Code eine bessere Architektur.**

Natürlich, denn automatisch getesteter Code ist leichter zu modifizieren und zu verbessern. Aber es gibt noch einen anderen Grund.

Um Tests zu schreiben, muss der Code so organisiert sein, dass jede Funktion eine klar beschriebene Aufgabe, gut definierte Eingabe und Ausgabe hat. Das bedeutet von Anfang an eine gute Architektur.

Im echten Leben ist das manchmal gar nicht so einfach. Manchmal ist es schwierig, eine Spec vor dem eigentlichen Code zu schreiben, weil noch nicht klar ist, wie er sich verhalten soll. Aber im Allgemeinen macht das Schreiben von Tests die Entwicklung schneller und stabiler.

Später im Tutorial wirst du vielen Aufgaben mit eingebauten Tests begegnen. Also wirst du mehr praktische Beispiele sehen.

Tests zu schreiben erfordert gute JavaScript-Kenntnisse. Aber wir fangen gerade erst an, es zu lernen. Daher, um alles zu festigen, wirst du jetzt nicht aufgefordert, Tests zu schreiben, aber du solltest bereits in der Lage sein, sie zu lesen, auch wenn sie ein wenig komplexer sind als in diesem Kapitel.
