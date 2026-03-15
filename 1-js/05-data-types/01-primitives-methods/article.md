# Methoden von Primitiven

JavaScript ermöglicht es uns, mit Primitiven (Zeichenketten, Zahlen usw.) zu arbeiten, als wären sie Objekte. Sie bieten auch Methoden an, die als solche aufgerufen werden können. Wir werden diese bald behandeln, doch zunächst werden wir sehen wie es funktioniert, weil Primitive natürlich keine Objekte sind (und hier werden wir es noch deutlicher machen).

Schauen wir uns die wichtigsten Unterschiede zwischen Primitiven und Objekten an.

Ein Primitiv

- Ist ein Wert eines primitiven Typs.
- Es gibt 7 primitive Typen: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` und `undefined`.

Ein Objekt

- Ist in der Lage, mehrere Werte als Eigenschaften zu speichern.
- Kann erstellt werden mit `{}`, zum Beispiel: `{name: "John", age: 30}`. Es gibt noch weitere Arten von Objekten in JavaScript: Funktionen zum Beispiel sind Objekte.

Eines der größten Vorteile von Objekten ist, dass wir eine Funktion als eine ihrer Eigenschaften speichern können.

```js run
let john = {
  name: 'John',
  sayHi: function () {
    alert('Hi Kumpel!');
  },
};

john.sayHi(); // Hi Kumpel!
```

Hier haben wir also ein Objekt `john` mit der Methode `sayHi` erstellt.

Es existieren bereits viele eingebaute Objekte, z. B. solche, die mit Daten, Fehlern, HTML-Elementen usw. arbeiten. Sie haben unterschiedliche Eigenschaften und Methoden.

Allerdings haben diese Besonderheiten auch ihren Preis!

Objekte sind "schwerer" als Primitive. Sie brauchen zusätzliche Ressourcen, um die interne Funktionalität zu unterstützen.

## Ein Primitiv als Objekt

Hier ist das Paradoxon, mit dem sich der Erfinder von JavaScript auseinandersetzte:

- Es gibt viele Sachen, die man mit einem Primitiv wie einer Zeichenkette oder einer Zahl machen möchte. Es wäre hervorragend, wenn man auf sie in Form von Methoden zugreifen könnte.
- Primitive müssen so schnell und leicht wie möglich sein.

Die Lösung sieht ein wenig umständlich aus, aber hier ist sie:

1. Primitive sind nach wie vor primitiv. Ein einziger Wert, wie es sein soll..
2. Die Sprache ermöglicht den Zugriff auf Methoden und Eigenschaften von Zeichenketen, Zahlen, boolschen Werten und Symbolen.
3. Damit das funktioniert, wird ein spezieller "Objekt-Wrapper" erstellt, der die zusätzlichen Funktionalitäten bereitstellt, und anschließend wieder zerstört wird.

Die "Objektwrappers" sind für jeden primitiven Typ unterschiedlich und heißen: `String`, `Number`, `Boolean` und `Symbol`. Daher stellen sie unterschiedliche Sätze von Methoden zur Verfügung.

Es gibt zum Beispiel eine String-Methode [str.toUpperCase()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) die ein großgeschriebenes `str` zurückgibt.

Und so funktioniert's:

```js run
let str = 'Hallo';

alert(str.toUpperCase()); // HALLO
```

Einfach, nicht wahr? Folgendes passiert tatsächlich in `str.toUpperCase()`:

1. Die Zeichenkette `str` ist ein Primitiv. Beim Zugriff auf ihre Eigenschaft wird also ein spezielles Objekt erstellt, das den Wert der Zeichenkette kennt und über nützliche Methoden verfügt, wie `toUpperCase()`.
2. Diese Methode wird ausgeführt und gibt eine neue Zeichenkette zurück (angezeigt durch `alert`).
3. Das spezielle Objekt wird zerstört, so dass das Primitiv `str` übrig bleibt.

Primitive können also Methoden bereitstellen, bleiben aber dennoch leichtgewichtig.

Die JavaScript-Engine optimiert dieses Verfahren erheblich. Es kann sogar sein, dass sie die Erstellung des zusätzlichen Objekts ganz überspringt. Sie muss sich aber trotzdem an die Spezifikation halten und sich so verhalten, als ob sie ein Objekt erstellt.

Eine Zahl hat ihre eigenen Methoden, z. B. [toFixed(n)](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rundet die Zahl auf die vorgegebene Genauigkeit:

```js run
let n = 1.23456;

alert(n.toFixed(2)); // 1.23
```

Wir werden weitere spezifische Methoden in den Kapiteln <info:number> und <info:string> sehen.

````warn header="Konstrukteure `String/Number/Boolean` sind nur für den internen Gebrauch bestimmt Einige Sprachen wie Java erlauben es uns, explizit "Wrapper-Objekte" für Primitive zu erstellen, indem wir eine Syntax wie`new Number(1)`or`new Boolean(false)`.

In JavaScript ist das aus historischen Gründen auch möglich, aber höchst **nicht empfehlenswert**. Die Ergebnisse werden an mehreren Stellen verrückt.

Zum Beispiel:

```js run
alert(typeof 0); // "number"

alert(typeof new Number(0)); // "object"!
```

Objekte sind immer effektiv wahr in `if`, also wird hier alert angezeigt :

```js run
let zero = new Number(0);

if (zero) {
  // zero ist wahr, weil es ein Objekt ist
  alert('zero ist effektiv wahr!?!');
}
```

Andererseits ist die Verwendung der selben Funktionen`String/Number/Boolean` ohne `new` eine völlig vernünftige und nützliche Sache. Sie konvertieren einen Wert in den entsprechenden Typ: in eine Zeichenkette, eine Zahl oder einen booleschen Wert (primitiv).

Beispielsweise ist Folgendes durchaus zulässig:

```js
let num = Number('123'); // konvertiert eine Zeichenkette zu einer Zahl.
```

`````


````warn header="null/undefined haben keine Methoden"
Die speziellen Primitive `null` und `undefined` sind Ausnahmen. Sie haben keine entsprechenden "Wrapper-Objekte" und bieten keine Methoden. In gewissem Sinne sind sie "die primitivsten".

Ein Versuch, auf eine Eigenschaft mit einem solchen Wert zuzugreifen, würde diesen Fehler erzeugen:

```js run
alert(null.test); // error
`````

## Zusammenfassung

- Primitive außer `null` und `undefined` verfügen über viele hilfreiche Methoden. Wir werden diese in den kommenden Kapiteln untersuchen.
- Formal funktionieren diese Methoden über temporäre Objekte, aber JavaScript-Engines sind gut darauf abgestimmt, dies intern zu optimieren, so dass der Aufruf dieser Methoden nicht aufwendig ist.
