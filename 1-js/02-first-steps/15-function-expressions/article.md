# Funktionsausdrücke

In JavaScript, a function is not a "magical language structure", but a special kind of value.
In JavaScript ist eine Funktion keine "magische Sprachstruktur", sondern eine besondere Art Wert.

The syntax that we used before is called a *Function Declaration*:
Bisher haben wir die Syntax *Funktionsdeklaration* benutzt. 

```js
function sayHi() {
  alert( "Hello" );
}
```

There is another syntax for creating a function that is called a *Function Expression*.
Es gibt allerdings auch die Syntax namens *Funktionsausdruck*

It looks like this:
Diese sieht so aus:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Here, the function is created and assigned to the variable explicitly, like any other value. No matter how the function is defined, it's just a value stored in the variable `sayHi`.
Hier wird die Funltion erstellt und einer Variable explizit zugewiesen, wie jeder andere Wert. Unabhängig davon, wie die Funktion definiert ist, ist sie nur ein Wert, den wir in der variable `sayHi` speichern.

The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".
Die Bedeutung beider Codebeispiele ist dieselbe: "erstelle eine funktion und schreibe sie in die Variable `sayHi`".

We can even print out that value using `alert`:
Wir können uns diesen Wert mit dem Befehl `alert` auch anzeigen lassen:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // zeigt die Funktion als String
*/!*
```

Please note that the last line does not run the function, because there are no parentheses after `sayHi`. There are programming languages where any mention of a function name causes its execution, but JavaScript is not like that.
Interessanterweise führt die letzte Zeile die Funktion nicht aus, denn hinter `saHi' befinden sich keine Klammern. In einigen Programmiersprachen führt jede Erwähnung einer Funktion zur Ausführung, JavaScript gehört nicht dazu.

In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.
In JavaScript ist eine Funktion ein Wert, also können wir damit auch umgehen, wie mit einem Wert. Der obige code zeigt die Funktion als String an, zeigt also den Quellcode.

Surely, a function is a special value, in the sense that we can call it like `sayHi()`.
Sicher, eine Funktion ist ein besonderer Wert, denn wir können sie aufrufen, z.B. mit `sayHi()'.

But it's still a value. So we can work with it like with other kinds of values.
Sie bleibt aber ein Wert. Darum können wir mit Funktionen genau so arbeiten wie mit anderen Werten.

We can copy a function to another variable:
Wir können Funktionen in eine Variable kopieren:

```js run no-beautify
function sayHi() {   // (1) erstellen
  alert( "Hello" );
}

let func = sayHi;    // (2) kopieren

func(); // Hello     // (3) Kopie ausführen(klappt)!
sayHi(); // Hello    //     Die Funktion funktioniert immernoch (warum auch nicht?)
```

Here's what happens above in detail:
Das hier passiert oben im Detail:

1. The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
1. Die Funktionsdeklaration `(1)` definiert die funtion und schreibt sie in die Variable `sayHi`.
2. Line `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
2. Zeile `(2)` kopiert sie in die Variable  `func`. Wieder verwenden wir *keine* Klammern nach `sayHi`. Wenn wir Klammern verwenden würden, dann würde `func = sayHi()` das *Ergebnis des Aufrufs* `sayHi()` in Variable `func`kopieren, nicht den Quellcode selbst.
3. Now the function can be called as both `sayHi()` and `func()`.
3. Jetzt kann die Funktion unter beiden Namen `sayHi()` und `func()` aufgerufen werden.

Note that we could also have used a Function Expression to declare `sayHi`, in the first line:
Wir hätten in der ersten Zeile auch die Syntax Funktionsausdruck nutzen können um `sayHi` zu definieren:
```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

Everything would work the same.
Alles würde gleich funktionieren.


````smart header="Wieso ist da ein Semikolon am Ende?"
You might wonder, why does Function Expression have a semicolon `;` at the end, but Function Declaration does not:
Man könnte sich fragen, wieso Funktionsausdrücke einen Semicolon `;` am Ende benötigen und Funktionsdeklarationen nicht.

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

The answer is simple:
Die Antwort ist:
- There's no need for `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for {  }`, `function f { }` etc.
- Man benötigt keinen semicolon `;` am ende von Blöcken und syntaktischen Strukturen, die `if { ... }`, `for {  }`, `function f { }` etc. verwenden.
- A Function Expression is used inside the statement: `let sayHi = ...;`, as a value. It's not a code block, but rather an assignment. The semicolon `;` is recommended at the end of statements, no matter what the value is. So the semicolon here is not related to the Function Expression itself, it just terminates the statement.
- Ein Funktionsausdruck dagegen wird im Befehl `let sayHi = ...;` als Wert verwandt. Es ist kein Block Code, sondern eine Zuweisung. Der Semicolon `;` ist am Ende von Statements empfohlen, egal was der Wert ist. Der Semicolon `;` hat an dieser Stelle also nichts mit der Funktion zu tun, sondern beendet nur das Statement.
````

## Callback functions
## Callback Funktionen

Let's look at more examples of passing functions as values and using function expressions.
Schauen wir uns noch einige Beispiele an, in denen funktionen als Werte weitergegeben und in Funktionsausdrücken genutzt werden.

We'll write a function `ask(question, yes, no)` with three parameters:
Wir schreiben eine funktion `ask(question, yes, no)`  mit drei Parametern:

`Frage`
: Fragetext

`ja`
: Funktion, die laufen soll, wenn bestätigt wurde.

`nein`
: Funktion, die laufen soll, wenn abgelehnt wurde.

The function should ask the `question` and, depending on the user's answer, call `yes()` or `no()`:
Die Funktion soll die `Frage` fragen und, je nach der Antwort der Nutzerin, `ja()` oder `nein()` aufrufen:
```js run
*!*
function ask(Frage, ja, nein) {
  if (confirm(Frage)) ja()
  else nein();
}

*/!*

function showOk() {
  alert( "Einverstanden!" );
}

function showCancel() {
  alert( "Abbruch!" );
}

// Benutzung: die Funktionen showOk, showCancel werden ask als Funktionsargument weitergegeben
ask("Einverstanden?", showOk, showCancel);
```

In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such function usually draws a nice-looking question window. But that's another story.
In der Praxis sind solche Funktionen sehr nützlich. Der Hauptunterschied zwischen einem "professionellen" `ask` und dem Beispiel ist, dass "professionelle" Funktionen kompliziertere Verfahren nutzen, um mit dem Nutzer zu interagieren als ein einfaches `confirm`. Im browser erstellt eine solche Funktion normal ein schickes Fragefenster. Aber das ist eine andere Baustelle.

**The arguments `showOk` and `showCancel` of `ask` are called *callback functions* or just *callbacks*.**
**Die Argumente `showOK`und `shoeCancel` nennt man *Callback Funtionen* oder einfach *Callbacks*. **

The idea is that we pass a function and expect it to be "called back" later if necessary. In our case, `showOk` becomes the callback for "yes" answer, and `showCancel` for "no" answer.
Dabei geht es darum, dass wir eine Funktion vorgeben, die später aufgerufen werden soll, falls nötig. In unserem Fall, `showOK` wird aufgerufen, wenn der User bestätigt, `showCancel` wenn der User ablehnt.

We can use Function Expressions to write the same function much shorter:
Wir können Funktionsausdrücke verwenden, um dieselbe Funktion deutlich zu verkürzen:
```js run no-beautify
function ask(Frage, ja, nein) {
  if (confirm(Frage)) ja()
  else nein();
}

*!*
ask(
  "Einverstanden?",
  function() { alert("Einverstanden!"); },
  function() { alert("Abbruch."); }
);
*/!*
```

Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called *anonymous*. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.
Wir deklarieren die Funktionen direkt im Aufruf von `ask` . Sie haben keinen Namen, weshalb sie als *anonym* bezeichnet werden. Solche Funktionen sind nicht außerhalb von `ask` aufrufbar (denn sie sind keiner Variable zugeordnet), aber das ist genau, was wir hier brauchen.

Such code appears in our scripts very naturally, it's in the spirit of JavaScript.
Solcher Code taucht in unseren Programmen natürllicherweise auf, es ist die Essez von JavaScript.

```smart header="Eine Funktion ist ein Wert, der eine \"Aktion\" repräsentiert"
Regular values like strings or numbers represent the *data*.
Normale Werte wie Strings oder Zahlen repräsentieren die "Daen".
A function can be perceived as an *action*.
Eine Funktion ist also eine *Aktion*

We can pass it between variables and run when we want.
Wir könne sie zwischen den Variablen verschieben und nutzen, wann wir wollen.
```


## Function Expression vs Function Declaration
## Funktionsdeklaration vs. Funktionsausdruck
Let's formulate the key differences between Function Declarations and Expressions.
Was sind die Kernunterschiede zwischen Funktionsdeklarationen und Funktionsausdücken?

First, the syntax: how to differentiate between them in the code.
Erstens, die Syntax, wie man sie im Code unterscheidet

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.
- *Deklaration*: eine Funktion, die separat deklariert wird. 
    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created at the right side of the "assignment expression" `=`:
- *Ausdruck*: eine Funktion die in einem Ausdruck oder einem anderen Konstrukt erstellt wird. Hier wird die Funktion auf der rechten Seite der "Zuweisung" `=` definiert:
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

The more subtle difference is *when* a function is created by the JavaScript engine.
Der unauffälligere Unterschied ist, *wann* eine Funktion von der JavaScript Engine definiert wird.

**A Function Expression is created when the execution reaches it and is usable only from that moment.**
**Ein Funktionsausdruck wird erst erstellt, wenn die Ausführung des Skrpts dort ankommt und ist erst ab dort verwendbar**

Once the execution flow passes to the right side of the assignment `let sum = function…` -- here we go, the function is created and can be used (assigned, called, etc. ) from now on.
Erst wenn die rechte Seite von `let sum = function…` von der Engine erreicht wurde ist die Funktion verfügbar und kann zugewiesen oder ausgeführt werden.

Function Declarations are different.
Deklarationen sind anders.

**A Function Declaration can be called earlier than it is defined.**
**Eine Deklaration kann verwendet werden, bevor sie definiert wurde**

For example, a global Function Declaration is visible in the whole script, no matter where it is.
Z.B. eine globale Deklaration ist im ganzen Skript sichtbar, egal, in welcher Zeile sie steht. 

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".
Das liegt an internen Algorithmen. Wenn JavaSkript beginnt, ein Skript auszuführen, dann sucht es zunächst globale Deklarationen im Skript und erstellt die funktionen. Wir können uns das als die "Aufwärmphase" vorstellen.

And after all Function Declarations are processed, the code is executed. So it has access to these functions.
Nachdem alle Funktionsdeklarationen verarbeitet wurden erst, wird der Code ausgeführt. Daher hat er schon Zugang zu dem Code.

For example, this works:
Das hier funktioniert: 

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.
Die Deklaration `sayHi` wird schon in der Aufwärmphase erstellt und daher überall verfügbar.

...Wenn es einFunktionsausdruck wäre, dann würde es nicht funktionieren:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) kaputt...
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.
Funktionsausdrücke werden erst erstellt, wenn sie ausgeführt wurden. Dass passiert erst in Zeile `(*)`, wo es zu spät ist.

Another special feature of Function Declarations is their block scope.
Noch eine Spezialität von Funktionsdeklarationen ist ihre Sichtbarkeit über Blockgrenzen hinweg.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**
**Im modernen "strict mode" ist eine Funktionsdeklaration - falls in einem Block stehend - nur in dem Block auch sichtbar. Außerhalb nicht.

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.
Stellen wir uns beispielsweise vor, wir bräuchten eine Funktion `welcome()`, die von der variable `age` abhängt, deren Wert während der Skriptausführung bestimmt wird.

If we use Function Declaration, it won't work as intended:
Per Funktionsdeklaration funktioniert es nicht wie gewünscht.

```js run
let age = prompt("What is your age?", 18);

// eine Funktion konditionell definieren
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...und später nutzen
*!*
welcome(); // Error: welcome ist undefiniert.
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.
Das liegt daran, dass Funktionsdeklarationen nur innerhalb von ihrem Codeblock verfügbar sind

Here's another example:
Ein weiteres Beispiel:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (führt aus)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  Funktionsdeklaration ist überall in dem 
  }                        //  |  Block, in dem sie deklariert wird
                           //  |
*!*
  welcome();               // /   (fhrt aus)
*/!*

} else {

  function welcome() {    
    alert("Greetings!");
  }
}

// Hier sind wir außerhalb der geschwungenen Klammern,
// daher können wir die Deklarationen, die innerhalb geschehen, nicht sehen.

*!*
welcome(); // Error: welcome ist undefiniert.
*/!*
```

What can we do to make `welcome` visible outside of `if`?
Wie machen wir `welcome`außerhalb von `if`sichtbar?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.
Korrekt wäre es, eine Function Expression zu verwenden und `welcome` der Variable zuzuweisen, die wir außerhalb des Blocks definiert haben, sodass sie überall sichtbar ist.

This code works as intended:
Das hier funktioniert: 

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:
Noch einfacher können wir es mit dem Fragezeichenoperator `?` schreiben:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="Wann sollte man eine Deklaration, wann einen Ausdruck verwenden?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.
Als Daumenregel ist die Syntakx Funktionsdeklaration die erste Wahl. Sie gibt einem mehr Freiheit in der Organisation des Code, denn wir können sie aufrufen, bevor sie definiert wurde.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".
Dies hilft auch der Lesbarkeit, denn es ist leichter, nach `function f(…) {…}` im Code zu suchen, als nach `let f = function(…) {…};`. Funktionsdeklarationen "springen ins Auge".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
Aber manchmal benötigen wir eine konditionale Definition (wie eben im Beispiel) oder haben andere Gründe die Funktionsdeklaration zu bevorzugen.
```

## Summary
## Zusammenfassung

- Functions are values. They can be assigned, copied or declared in any place of the code.
- Funktionen sind Werte. Sie können überall im Code zugewiesen, kopiert oder deklariert werden.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- Wenn die Funktion in einem extra Statement im Hauptcode deklariert wird, dann nennt man das "Funktionsdeklaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Wenn sie als Teil eines Ausdrucks definiert wird, nennen wir das "Funktionsausdruck".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Deklarationen werden verarbeitet bevor der Block ausgeführt wird. Sie sind im ganzen Block sichtbar.
- Function Expressions are created when the execution flow reaches them.
- Funktionsausdrücke werden erst erstellt, wenn der Ausführungsfluss sie erreicht.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.
Meistens, wenn wir eine Funktion definieren, sollten wir eine Funktionsdeklaration nutzen, da sie überall sichtbar ist. Das sorgt für flexiblere Codeorganisation und bessere Lesbarkeit.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
Daher sollten wir einen Funktionsausdruck nur verwenden, wenn die Funktionsdeklaration ungeeignet ist. Dazu haben wir einige Beispiele gesehen und werden in Zukunft noch mehr kennenlernen.
