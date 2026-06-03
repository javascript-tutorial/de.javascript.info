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

Die restlichen Parameter können in der Funktionsdefinition durch drei Punkte `...` gefolgt vom Namen des Arrays, das sie enthalten wird, eingebunden werden. Die Punkte bedeuten wörtlich "sammle die restlichen Parameter in ein Array".

Um beispielsweise alle Argumente in ein Array `args` zu sammeln:

```js run
function sumAll(...args) { // args is the name for the array
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

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="The rest parameters must be at the end"
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

Wie wir uns erinnern, haben Pfeilfunktionen nicht ihr eigenes `this`. Jetzt wissen wir, dass sie auch nicht das spezielle`arguments`-Objekt haben.
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

So, for a string, `for..of` returns characters and `...str` becomes `"H","e","l","l","o"`. The list of characters is passed to array initializer `[...str]`.

For this particular task we could also use `Array.from`, because it converts an iterable (like a string) into an array:

```js run
let str = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(str) ); // H,e,l,l,o
```

The result is the same as `[...str]`.

But there's a subtle difference between `Array.from(obj)` and `[...obj]`:

- `Array.from` operates on both array-likes and iterables.
- The spread syntax works only with iterables.

So, for the task of turning something into an array, `Array.from` tends to be more universal.


## Copy an array/object

Remember when we talked about `Object.assign()` [in the past](info:object-copy#cloning-and-merging-object-assign)?

It is possible to do the same thing with the spread syntax.

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array
*/!*

// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Note that it is possible to do the same thing to make a copy of an object:

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object
*/!*

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

This way of copying an object is much shorter than `let objCopy = Object.assign({}, obj)` or for an array `let arrCopy = Object.assign([], arr)` so we prefer to use it whenever we can.


## Summary

When we see `"..."` in the code, it is either rest parameters or the spread syntax.

There's an easy way to distinguish between them:

- When `...` is at the end of function parameters, it's "rest parameters" and gathers the rest of the list of arguments into an array.
- When `...` occurs in a function call or alike, it's called a "spread syntax" and expands an array into a list.

Use patterns:

- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.

Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in "old-style" `arguments`: array-like iterable object.
