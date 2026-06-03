# Rest-Parameter und Spread-Syntax

Viele eingebaute JavaScript-Funktionen unterstützen eine beliebige Anzahl von Argumenten.

Zum Beispiel:

- `Math.max(arg1, arg2, ..., argN)` -- gibt das größte der Argumente zurück.
- `Object.assign(dest, src1, ..., srcN)` -- kopiert Eigenschaften von `src1..N` in `dest`.
- ...und so weiter.

In diesem Kapitel lernen wir, wie man dasselbe tut. Und auch, wie man Arrays als Parameter an solche Funktionen übergibt.

## Rest-Parameter `...`

Eine Funktion kann mit beliebig vielen Argumenten aufgerufen werden, unabhängig davon, wie sie definiert ist.

So wie hier:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

Es gibt keinen Fehler wegen "zu vieler" Argumente. Aber natürlich werden im Ergebnis nur die ersten beiden gezählt, also ist das Ergebnis im obigen Code `3`.

Die restlichen Parameter können in der Funktionsdefinition durch drei Punkte `...` gefolgt vom Namen des Arrays, das sie enthält, eingebunden werden. Die Punkte bedeuten wörtlich "sammle die restlichen Parameter in ein Array".

Um beispielsweise alle Argumente in ein Array `args` zu sammeln:

```js run
function sumAll(...args) { // args ist der Name des Arrays
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Wir können wählen, die ersten Parameter als Variablen zu erhalten und nur den Rest zu sammeln.

Hier gehen die ersten zwei Argumente in Variablen und der Rest geht in das Array `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // der Rest geht in das Array titles
  // d.h. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Die Rest-Parameter müssen am Ende sein"
Rest-Parameter sammeln alle verbleibenden Argumente, daher ergibt das Folgende keinen Sinn und verursacht einen Fehler:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

`...rest` muss immer am Ende sein.
````

## Die "arguments"-Variable

Es gibt auch ein spezielles Array-ähnliches Objekt namens `arguments`, das alle Argumente nach ihrem Index enthält.

Zum Beispiel:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // es ist iterierbar
  // for(let arg of arguments) alert(arg);
}

// zeigt: 2, Julius, Caesar
showName("Julius", "Caesar");

// zeigt: 1, Ilya, undefined (kein zweites Argument)
showName("Ilya");
```

In alten Zeiten gab es Rest-Parameter in der Sprache nicht, und die Verwendung von `arguments` war die einzige Möglichkeit, alle Argumente einer Funktion zu erhalten. Und es funktioniert immer noch, wir können es in altem Code finden.

Der Nachteil ist jedoch, dass obwohl `arguments` sowohl Array-ähnlich als auch iterierbar ist, es kein Array ist. Es unterstützt keine Array-Methoden, daher können wir zum Beispiel nicht `arguments.map(...)` aufrufen.

Außerdem enthält es immer alle Argumente. Wir können sie nicht teilweise erfassen, wie wir es mit Rest-Parametern getan haben.

Wenn wir also diese Funktionen brauchen, werden Rest-Parameter bevorzugt.

````smart header="Pfeilfunktionen haben kein `\"arguments\"`"
Wenn wir auf das `arguments`-Objekt von einer Pfeilfunktion aus zugreifen, nimmt es sie von der äußeren "normalen" Funktion.

Hier ist ein Beispiel

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Wie wir uns erinnern, haben Pfeilfunktionen nicht ihr eigenes `this`. Jetzt wissen wir, dass sie auch nicht das spezielle `arguments`-Objekt haben.
````


## Spread syntax [#spread-syntax]

Wir haben gerade gesehen, wie man ein Array aus einer Parameterliste erhält.

Aber manchmal müssen wir genau das Gegenteil tun.

Zum Beispiel gibt es eine eingebaute Funktion [Math.max](mdn:js/Math/max), die die größte Zahl aus einer Liste zurückgibt:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Nehmen wir an, wir haben ein Array `[3, 5, 1]`. Wie rufen wir `Math.max` damit auf?

Es einfach so zu übergeben funktioniert nicht, da `Math.max` eine Liste von numerischen Argumenten erwartet, nicht ein einzelnes Array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Und wir können natürlich nicht manuell Elemente im Code auflisten `Math.max(arr[0], arr[1], arr[2])`, da wir möglicherweise nicht sicher sind, wie viele es gibt. Während unser Skript ausgeführt wird, könnten es viele oder keine sein. Und das würde hässlich aussehen.

*Spread syntax* zur Rettung! Sie sieht ähnlich aus wie Rest-Parameter und verwendet ebenfalls `...`, macht aber genau das Gegenteil.

Wenn `...arr` in einem Funktionsaufruf verwendet wird, "expandiert" es ein iterierbares Objekt `arr` in die Parameterliste.

Für `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (Spread wandelt Array in eine Parameterliste um)
```

Wir können auch mehrere Iterierbare auf diese Weise übergeben:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Wir können auch die Spread-Syntax mit normalen Werten kombinieren:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Außerdem kann die Spread-Syntax zum Zusammenführen von Arrays verwendet werden:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, dann arr, dann 2, dann arr2)
```

In den obigen Beispielen haben wir ein Array verwendet, um die Spread-Syntax zu demonstrieren, aber jedes Iterierbare funktioniert.

Zum Beispiel verwenden wir hier die Spread-Syntax, um den String in ein Array von Zeichen umzuwandeln:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Die Spread-Syntax verwendet intern Iteratoren, um Elemente zu sammeln, genauso wie `for..of` es tut.

Also, bei einem String gibt `for..of` Zeichen zurück und `...str` wird zu `"H","e","l","l","o"`. Die Liste der Zeichen wird dem Array-Initializer `[...str]` übergeben.

Für diese spezielle Aufgabe könnten wir auch `Array.from` verwenden, weil es ein Iterable (wie einen String) in ein Array umwandelt:

```js run
let str = "Hello";

// Array.from wandelt ein Iterierbares in ein Array um
alert( Array.from(str) ); // H,e,l,l,o
```

Das Ergebnis ist das gleiche wie `[...str]`.

Es gibt aber einen subtilen Unterschied zwischen `Array.from(obj)` und `[...obj]`:

- `Array.from` funktioniert mit Array-ähnlichen Objekten und Iterierbaren.
- Die Spread-Syntax funktioniert nur mit Iterierbaren
Also, für die Aufgabe, etwas in ein Array umzuwandeln, ist `Array.from` tendenziell universeller.


## Array oder Objekt kopieren

Erinnern Sie sich, als wir früher über `Object.assign()` gesprochen haben [in the past](info:object-copy#cloning-and-merging-object-assign)?

Es ist möglich, dasselbe mit der Spread-Syntax zu tun.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // Array in eine Parameterliste "ausbreiten"
                        // dann das Ergebnis in ein neues Array einfügen
*/!*

// Haben die Arrays denselben Inhalt?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// Sind die Arrays gleich?
alert(arr === arrCopy); // false (nicht die gleiche Referenz)

// Die Änderung unseres ursprünglichen Arrays ändert nicht die Kopie:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Beachten Sie, dass es möglich ist, dasselbe zu tun, um eine Kopie eines Objekts zu erstellen:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // Objekt in eine Parameterliste "ausbreiten"
                          // dann das Ergebnis in ein neues Objekt zurückgeben
*/!*

// Haben die Objekte denselben Inhalt?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// Sind die Objekte gleich?
alert(obj === objCopy); // false (nicht die gleiche Referenz)

// Die Änderung unseres ursprünglichen Objekts ändert nicht die Kopie:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Diese Methode zum Kopieren eines Objekts ist viel kürzer als `let objCopy = Object.assign({}, obj)` oder für ein Array `let arrCopy = Object.assign([], arr)`, daher ziehen wir es vor, sie zu verwenden, wann immer wir können.


## Zusammenfassung

Wenn wir `"..."` im Code sehen, ist es entweder ein Rest-Parameter oder die Spread-Syntax.

Es gibt einen einfachen Weg, sie zu unterscheiden:

- Wenn `...` am Ende von Funktionsparametern steht, handelt es sich um "Rest-Parameter" und es werden die restlichen Argumente in ein Array eingefügt.
- Wenn `...` in einem Funktionsaufruf oder ähnlichem auftritt, wird es "Spread-Syntax" genannt und es wird ein Array in eine Parameterliste expandiert.

Anwendungsmuster:

- Rest-Parameter werden verwendet, um Funktionen zu erstellen, die eine beliebige Anzahl von Argumenten akzeptieren.
- Die Spread-Syntax wird verwendet, um ein Array an Funktionen zu übergeben, die normalerweise eine Liste mit vielen Argumenten erfordern.

Zusammen helfen sie dabei, einfach zwischen einer Liste und einem Array von Parametern zu wechseln.

Alle Argumente eines Funktionsaufrufs sind auch im "alten Stil" `arguments` verfügbar: ein Array-ähnliches iterierbare Objekt.
