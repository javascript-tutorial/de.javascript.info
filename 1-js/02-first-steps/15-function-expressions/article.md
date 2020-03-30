# Funktionsausdrücke

In JavaScript ist eine Funktion keine "magische Sprachstruktur", sondern eine besondere Art Wert.

Bisher haben wir die Syntax *function declaration* benutzt. 

```js
function sayHi() {
  alert( "Hello" );
}
```

Es gibt allerdings auch die Syntax namens *function expression*

Diese sieht so aus:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

Hier wird die Funktion erstellt und einer Variable explizit zugewiesen, wie jeder andere Wert. Unabhängig davon, wie die Funktion definiert ist, ist sie nur ein Wert, den wir in der variable `sayHi` speichern.

Die Bedeutung beider Codebeispiele ist dieselbe: "erstelle eine Funktion und schreibe sie in die Variable `sayHi`".

Wir können uns diesen Wert mit dem Befehl `alert` auch anzeigen lassen:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // zeigt die Funktion als String
*/!*
```

Interessanterweise führt die letzte Zeile die Funktion nicht aus, denn hinter `saHi` befinden sich keine Klammern. In einigen Programmiersprachen führt jede Erwähnung einer Funktion zur Ausführung, JavaScript gehört nicht dazu.

In JavaScript ist eine Funktion ein Wert, also können wir damit auch umgehen, wie mit einem Wert. Der obige code zeigt die Funktion als String an, zeigt also den Quellcode.
Sicher, eine Funktion ist ein besonderer Wert, denn wir können sie aufrufen, z.B. mit `sayHi()`.

Sie bleibt aber ein Wert. Darum können wir mit Funktionen genau so arbeiten wie mit anderen Werten.
Wir können Funktionen in eine Variable kopieren:

```js run no-beautify
function sayHi() {   // (1) erstellen
  alert( "Hello" );
}

let func = sayHi;    // (2) kopieren

func(); // Hello     // (3) Kopie ausführen(klappt)!
sayHi(); // Hello    //     Die Funktion funktioniert immernoch (warum auch nicht?)
```

Das hier passiert oben im Detail:

1. Die function declaration `(1)` definiert die funtion und schreibt sie in die Variable `sayHi`.
2. Zeile `(2)` kopiert sie in die Variable  `func`. Wieder verwenden wir *keine* Klammern nach `sayHi`. Wenn wir Klammern verwenden würden, dann würde `func = sayHi()` das *Ergebnis des Aufrufs* `sayHi()` in Variable `func`kopieren, nicht den Quellcode selbst.
3. Jetzt kann die Funktion unter beiden Namen `sayHi()` und `func()` aufgerufen werden.

Wir hätten in der ersten Zeile auch die Syntax function expression nutzen können um `sayHi` zu definieren:
```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

Alles würde gleich funktionieren.


````smart header="Wieso ist da ein Semikolon am Ende?"
Man könnte sich fragen, wieso Funktionsausdrücke einen Semicolon `;` am Ende benötigen und function declarationen nicht.

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

Die Antwort ist:
- Man benötigt keinen semicolon `;` am Ende von Blöcken und syntaktischen Strukturen, die `if { ... }`, `for {  }`, `function f { }` etc. verwenden.
- Eine function expression dagegen wird im Befehl `let sayHi = ...;` als Wert verwandt. Es ist kein Block Code, sondern eine Zuweisung. Der Semicolon `;` ist am Ende von Statements empfohlen, egal was der Wert ist. Der Semicolon `;` hat an dieser Stelle also nichts mit der Funktion zu tun, sondern beendet nur das Statement.
````

## Callback Funktionen

Schauen wir uns noch einige Beispiele an, in denen funktionen als Werte weitergegeben und in Funktionsausdrücken genutzt werden.

Wir schreiben eine Funktion `ask(question, yes, no)`  mit drei Parametern:

`Frage`
: Fragetext

`ja`
: Funktion, die laufen soll, wenn bestätigt wurde.

`nein`
: Funktion, die laufen soll, wenn abgelehnt wurde.

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

In der Praxis sind solche Funktionen sehr nützlich. Der Hauptunterschied zwischen einem "professionellen" `ask` und dem Beispiel ist, dass "professionelle" Funktionen kompliziertere Verfahren nutzen, um mit dem Nutzer zu interagieren als ein einfaches `confirm`. Im browser erstellt eine solche Funktion normal ein schickes Fragefenster. Aber das ist eine andere Baustelle.

**Die Argumente `showOK`und `shoeCancel` nennt man *Callback Funtionen* oder einfach *Callbacks*. **

Dabei geht es darum, dass wir eine Funktion vorgeben, die später aufgerufen werden soll, falls nötig. In unserem Fall, `showOK` wird aufgerufen, wenn der User bestätigt, `showCancel` wenn der User ablehnt.

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

Wir deklarieren die Funktionen direkt im Aufruf von `ask` . Sie haben keinen Namen, weshalb sie als *anonym* bezeichnet werden. Solche Funktionen sind nicht außerhalb von `ask` aufrufbar (denn sie sind keiner Variable zugeordnet), aber das ist genau, was wir hier brauchen.

Solcher Code taucht in unseren Programmen natürllicherweise auf, es ist die Essez von JavaScript.

```smart header="Eine Funktion ist ein Wert, der eine \"Aktion\" repräsentiert"
Normale Werte wie Strings oder Zahlen repräsentieren die "Daen".
Eine Funktion ist also eine *Aktion*

Wir könne sie zwischen den Variablen verschieben und nutzen, wann wir wollen.
```


## Function Expression vs Function Declaration
Was sind die Kernunterschiede zwischen function declarationen und Funktionsausdücken?

Erstens, die Syntax, wie man sie im Code unterscheidet

- *function declaration*: eine Funktion, die separat deklariert wird. 
    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:*: eine Funktion die in einem Ausdruck oder einem anderen Konstrukt erstellt wird. Hier wird die Funktion auf der rechten Seite der "Zuweisung" `=` definiert:
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

Der unauffälligere Unterschied ist, *wann* eine Funktion von der JavaScript Engine definiert wird.

**Eine function expression wird erst erstellt, wenn die Ausführung des Skrpts dort ankommt und ist erst ab dort verwendbar**

Erst wenn die rechte Seite von `let sum = function…` von der Engine erreicht wurde ist die Funktion verfügbar und kann zugewiesen oder ausgeführt werden.

Function Declarations sind anders.

**Eine function declaration kann verwendet werden, bevor sie definiert wurde**

For example, a global Function Declaration is visible in the whole script, no matter where it is.
Z.B. eine globale function declaration ist im ganzen Skript sichtbar, egal, in welcher Zeile sie steht. 

That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates the functions. We can think of it as an "initialization stage".
Das liegt an internen Algorithmen. Wenn JavaSkript beginnt, ein Skript auszuführen, dann sucht es zunächst globale function declarationen im Skript und erstellt die funktionen. Wir können uns das als die "Aufwärmphase" vorstellen.

And after all Function Declarations are processed, the code is executed. So it has access to these functions.
Nachdem alle function declarationen verarbeitet wurden erst, wird der Code ausgeführt. Daher hat er schon Zugang zu dem Code.

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
Die function declaration `sayHi` wird schon in der Aufwärmphase erstellt und daher überall verfügbar.

...Wenn es einfunction expression wäre, dann würde es nicht funktionieren:

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
Noch eine Spezialität von function declarationen ist ihre Sichtbarkeit über Blockgrenzen hinweg.

**In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.**
**Im modernen "strict mode" ist eine function declaration - falls in einem Block stehend - nur in dem Block auch sichtbar. Außerhalb nicht.

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.
Stellen wir uns beispielsweise vor, wir bräuchten eine Funktion `welcome()`, die von der variable `age` abhängt, deren Wert während der Skriptausführung bestimmt wird.

If we use Function Declaration, it won't work as intended:
Per function declaration funktioniert es nicht wie gewünscht.

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
Das liegt daran, dass function declarationen nur innerhalb von ihrem Codeblock verfügbar sind

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
    alert("Hello!");       //  |  function declaration ist überall in dem 
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
// daher können wir die function declarationen, die innerhalb geschehen, nicht sehen.

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


```smart header="Wann sollte man eine function declaration, wann einen Ausdruck verwenden?"
As a rule of thumb, when we need to declare a function, the first to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.
Als Daumenregel ist die Syntakx function declaration die erste Wahl. Sie gibt einem mehr Freiheit in der Organisation des Code, denn wir können sie aufrufen, bevor sie definiert wurde.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".
Dies hilft auch der Lesbarkeit, denn es ist leichter, nach `function f(…) {…}` im Code zu suchen, als nach `let f = function(…) {…};`. function declarationen "springen ins Auge".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
Aber manchmal benötigen wir eine konditionale Definition (wie eben im Beispiel) oder haben andere Gründe die function declaration zu bevorzugen.
```

## Summary
## Zusammenfassung

- Functions are values. They can be assigned, copied or declared in any place of the code.
- Funktionen sind Werte. Sie können überall im Code zugewiesen, kopiert oder deklariert werden.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- Wenn die Funktion in einem extra Statement im Hauptcode deklariert wird, dann nennt man das "function declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Wenn sie als Teil eines Ausdrucks definiert wird, nennen wir das "function expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- function declarationen werden verarbeitet bevor der Block ausgeführt wird. Sie sind im ganzen Block sichtbar.
- Function Expressions are created when the execution flow reaches them.
- Funktionsausdrücke werden erst erstellt, wenn der Ausführungsfluss sie erreicht.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.
Meistens, wenn wir eine Funktion definieren, sollten wir eine function declaration nutzen, da sie überall sichtbar ist. Das sorgt für flexiblere Codeorganisation und bessere Lesbarkeit.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
Daher sollten wir einen function expression nur verwenden, wenn die function declaration ungeeignet ist. Dazu haben wir einige Beispiele gesehen und werden in Zukunft noch mehr kennenlernen.
