Der Test zeigt eine der Versuchungen, denen ein Entwickler beim Schreiben von Tests begegnet.

Was wir hier tatsächlich haben, sind eigentlich 3 Tests, aber angeordnet als einzelne Funktion mit 3 Assertions.

Manchmal ist es einfacher, auf diese Weise zu schreiben, aber wenn ein Fehler auftritt, ist es viel weniger offensichtlich, was schiefgelaufen ist.

Tritt ein Fehler in der Mitte eines komplexen Programmablaufs auf, dann müssen wir die Daten an diesem Punkt herausfinden. Wir müssen tatsächlich *den Test debuggen*.

Es wäre viel besser, den Test in mehrere `it` Blöcke aufzubrechen, mit klar geschriebenen Eingaben und Ausgaben.

So zum Beispiel:
```js
describe("Erhöht x zur Potenz n", function() {
  it("5 in der Potenz 1 gleich 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in der Potenz 2 gleich 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in der Potenz 3 gleich 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Wir haben das einzelnen `it` durch `describe` und eine Gruppe von `it` Blöcken ersetzt. Wenn jetzt etwas fehlschlägt, würden wir klar sehen, welche Daten es waren.

Außerdem können wir einen einzelnen Test isolieren und ihn im Standalone-Modus ausführen, indem wir `it.only` statt `it` schreiben:


```js
describe("Erhöht x zur Potenz n", function() {
  it("5 in der Potenz 1 gleich 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha wird nur diesen Block ausführen
  it.only("5 in der Potenz 2 gleich 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in der Potenz 3 gleich 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
