# Funktionen (*Functions*)

Des öfteren kommt es vor dass wir eine (ähnliche) Aktion an mehreren Stellen eines *script* ausführen möchten. 

Z. B. wenn wir dem Besucher unsere Seite eine schöne Nachreicht anzeigen wollen wenn dieser sich ein-, auslogt oder eventuell noch bei anderen Events. 

Funktionen kann man auch als das "Hauptgerüst" des Programs verstehen. Sie erlauben es uns geschriebenen Code häufig abzurufen ohne diesen erneut schreiben zu müssen.

Wir wurden bereits Zeugen von eingebauten (*built-in*) Funktionen (*functions*) wie `alert(nachricht)`, `prompt(nachricht, default)` und `confirm(frage)`. Es ist uns aber auch möglich slebst Funktionen zu kreieren.

## Funktionsdeklarierung (*Function Declaration*)

Funktionen können wir m. H. von Funktionsdeklarierungen (*function declaration*) erstellen.

Das sieht wie folgt aus:

```js
function showMessage() {
  alert( 'Hallo an alle!' );
}
```

Das *keyword* (Schlüsselwort) `function` steht an erster Stelle, darauf folgt der *Name der Funktion*. Dann noch eine Liste an Parameter zwischen den Paranthesen (mit einem "," voneinander getrennt; om obigen Beispiel leer) und letztlich der Code der Funktion, der auch als "Körper der Funktion" (*the function body*) genannt wird, der zwischen den eckigen Klammern steht (*curly brackets*).

```js
function name(parameter) {
  ...body...
}
```

Unsere neue Funktion kann mittels dessen Name abgerufen werden (*called*): `showMessage()`.

Bspw. :

```js run
function showMessage() {
  alert( 'Hallo an alle!' );
}

*!*
showMessage();
showMessage();
*/!*
```

Der Abruf (*call*) `showMessage()` führt den Code der Funktion aus. Darum sehen wir die Nachricht hier zwei Mal.

Dieses Beispeil zeigt perfekt was der hauptsächliche Zweck von Funktionen ist: sie verhindern die Duplikation von Code.

Falls wir jemals die Nachricht ändern müssten oder die Art auf die sie angezeigt wird genügt es den Code einmalig umzuschreiben: der innerhalb der Funktion der ihn ausführt. Genial! 

## Lokale (*local*) Variabeln

Eine Variabel die innerhalb einer Funktion deklariert wird ist ausschließlich innerhalb dieser sichtbar. 

Ein Beispiel:

```js run
function showMessage() {
*!*
  let message = "Hallo, ich bin JavaScript!"; // Lokale (*local*) Variabel
*/!*

  alert( message );
}

showMessage(); // Hallo, ich bin JavaScript!

alert( message ); // <-- Fehler! Die Variabel ist lokal zur Funktion
```

## Außenstehende (*outer*) Variabeln

Eine Funktion kann auch auf außenstehende Variabeln zugreifen wie folgendes Beispiel zeigt:

```js run no-beautify
let *!*userName*/!* = 'Johann';

function showMessage() {
  let message = 'Hallo, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hallo, Johann
```

Die Funktion hat vollständigen Zugriff auf außenstehende Variabeln. Und kann diese auch modifieren.

Hier zu sehen:

```js run
let *!*userName*/!* = 'Johann';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* before the function call

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

The outer variable is only used if there's no local one.

If a same-named variable is declared inside the function then it *shadows* the outer one. For instance, in the code below the function uses the local `userName`. The outer one is ignored:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert( userName ); // *!*John*/!*, unchanged, the function did not access the outer variable
```

```smart header="Global variables"
Variables declared outside of any function, such as the outer `userName` in the code above, are called *global*.

Global variables are visible from any function (unless shadowed by locals).

It's a good practice to minimize the use of global variables. Modern code has few or no globals. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.
```

## Parameters

We can pass arbitrary data to functions using parameters (also called *function arguments*) .

In the example below, the function has two parameters: `from` and `text`.

```js run
function showMessage(*!*from, text*/!*) { // arguments: from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

When the function is called in lines `(*)` and `(**)`, the given values are copied to local variables `from` and `text`. Then the function uses them.

Here's one more example: we have a variable `from` and pass it to the function. Please note: the function changes `from`, but the change is not seen outside, because a function always gets a copy of the value:


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // make "from" look nicer
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

## Default values

If a parameter is not provided, then its value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:

```js
showMessage("Ann");
```

That's not an error. Such a call would output `"Ann: undefined"`. There's no `text`, so it's assumed that `text === undefined`.

If we want to use a "default" `text` in this case, then we can specify it after `=`:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

Now if the `text` parameter is not passed, it will get the value `"no text given"`

Here `"no text given"` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
}
```

```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.

In the example above, `anotherFunction()` is called every time `showMessage()` is called without the `text` parameter.
```

````smart header="Default parameters old-style"
Old editions of JavaScript did not support default parameters. So there are alternative ways to support them, that you can find mostly in the old scripts.

For instance, an explicit check for being `undefined`:

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or the `||` operator:

```js
function showMessage(from, text) {
  // if text is falsy then text gets the "default" value
  text = text || 'no text given';
  ...
}
```


````


## Returning a value

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

It is possible to use `return` without a value. That causes the function to exit immediately.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`.

````smart header="A function with an empty `return` or without it returns `undefined`"
If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

An empty `return` is also the same as `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
That doesn't work, because JavaScript assumes a semicolon after `return`. That'll work the same as:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

So, it effectively becomes an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`. Or at least put the opening parentheses there as follows:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](http://jquery.com) framework defines a function with `$`. The [Lodash](http://lodash.com/) library has its core function named `_`.

These are exceptions. Generally functions names should be concise and descriptive.
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
