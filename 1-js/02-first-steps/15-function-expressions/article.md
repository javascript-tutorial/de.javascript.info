# Function Expressions

In JavaScript ist eine Funktion keine "magische Sprachstruktur", sondern eine besondere Art Wert.

Bisher haben wir die Syntax *Function Declaration* benutzt. 

```js
function sayHi() {
  alert( "Hello" );
}
```

Es gibt allerdings auch die Syntax namens *Function Expression*

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

Interessanterweise führt die letzte Zeile die Funktion nicht aus, denn hinter `sayHi` befinden sich keine Klammern. In einigen Programmiersprachen führt jede Erwähnung einer Funktion zur Ausführung, JavaScript gehört nicht dazu.

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

1. Die Function Declaration `(1)` definiert die Funktion und schreibt sie in die Variable `sayHi`.
2. Zeile `(2)` kopiert sie in die Variable  `func`. Wieder verwenden wir *keine* Klammern nach `sayHi`. Wenn wir Klammern verwenden würden, dann würde `func = sayHi()` das *Ergebnis des Aufrufs* `sayHi()` in Variable `func`kopieren, nicht den Quellcode selbst.
3. Jetzt kann die Funktion unter beiden Namen `sayHi()` und `func()` aufgerufen werden.

Wir hätten in der ersten Zeile auch die Syntax Function Expression nutzen können um `sayHi` zu definieren:
```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

Alles würde gleich funktionieren.


````smart header="Wieso ist da ein Semikolon am Ende?"
Man könnte sich fragen, wieso Function Expressions einen Semicolon `;` am Ende benötigen und Function Declarations nicht.

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
- Eine Function Expression dagegen wird im Befehl `let sayHi = ...;` als Wert verwandt. Es ist kein Block Code, sondern eine Zuweisung. Der Semicolon `;` ist am Ende von Statements empfohlen, egal was der Wert ist. Der Semicolon `;` hat an dieser Stelle also nichts mit der Funktion zu tun, sondern beendet nur das Statement.
````

## Callback Funktionen

Schauen wir uns noch einige Beispiele an, in denen funktionen als Werte weitergegeben und in Funktionsausdrücken genutzt werden.

Wir schreiben eine Funktion `ask(Frage, ja, nein)`  mit drei Parametern:

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

**Die Argumente `showOK`und `shoeCancel` nennt man *Callback Funktionen* oder einfach *Callbacks*. **

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
Normale Werte wie Strings oder Zahlen repräsentieren die "Daten".
Eine Funktion ist also eine *Aktion*

Wir könne sie zwischen den Variablen verschieben und nutzen, wann wir wollen.
```


## Function Expression vs Function Declaration
Was sind die Kernunterschiede zwischen Function Declarations und Function Expressions?

Erstens, die Syntax, wie man sie im Code unterscheidet

- *Function Declaration*: eine Funktion, die separat deklariert wird. 
    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* eine Funktion die in einem Ausdruck oder einem anderen Konstrukt erstellt wird. Hier wird die Funktion auf der rechten Seite der "Zuweisung" `=` definiert:
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

Der unauffälligere Unterschied ist, *wann* eine Funktion von der JavaScript Engine definiert wird.

**Eine Function Expression wird erst erstellt, wenn die Ausführung des Skrpts dort ankommt und ist erst ab dort verwendbar**

Erst wenn die rechte Seite von `let sum = function…` von der Engine erreicht wurde ist die Funktion verfügbar und kann zugewiesen oder ausgeführt werden.

Function Declarations sind anders.

**Eine Function Declaration kann verwendet werden, bevor sie definiert wurde**

Z.B. eine globale Function Declaration ist im ganzen Skript sichtbar, egal, in welcher Zeile sie steht. 

Das liegt an internen Algorithmen. Wenn JavaSkript beginnt, ein Skript auszuführen, dann sucht es zunächst, globale Function Declarations im Skript und erstellt die Funktionen. Wir können uns das als die "Aufwärmphase" vorstellen.

Nachdem alle Function Declarations verarbeitet wurden erst, wird der Code ausgeführt. Daher hat er schon Zugang zu den Funktionen.

Das hier funktioniert: 

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

Die Function Declaration `sayHi` wird schon in der Aufwärmphase erstellt und daher überall verfügbar.

...Wenn es eine Function Expression wäre, dann würde es nicht funktionieren:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) kaputt...
  alert( `Hello, ${name}` );
};
```

Funktionsausdrücke werden erst erstellt, wenn sie ausgeführt wurden. Dass passiert erst in Zeile `(*)`, wo es zu spät ist.

Noch eine Spezialität von Function Declarations ist ihre Sichtbarkeit im Block.

**Im modernen "strict mode" ist eine Function Declaration - falls in einem Block stehend - nur in dem Block auch sichtbar. Außerhalb nicht.

Stellen wir uns beispielsweise vor, wir bräuchten eine Funktion `welcome()`, die von der variable `age` abhängt, deren Wert während der Skriptausführung bestimmt wird.

Per Function Declaration funktioniert es nicht wie gewünscht.

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

Das liegt daran, dass Function Declarations nur innerhalb von ihrem Codeblock verfügbar sind

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
// daher können wir die Function Declarations, die innerhalb geschehen, nicht sehen.

*!*
welcome(); // Error: welcome ist nicht definiert.
*/!*
```

Wie machen wir `welcome` außerhalb von `if` sichtbar?

Korrekt wäre es, eine Function Expression zu verwenden und `welcome` der Variable zuzuweisen, die wir außerhalb des Blocks definiert haben, sodass sie überall sichtbar ist.

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
welcome(); // jetzt geht's
*/!*
```


```smart header="Wann sollte man eine Function Declaration, wann einen Ausdruck verwenden?"
Als Daumenregel ist die Syntakx Function Declaration die erste Wahl. Sie gibt einem mehr Freiheit in der Organisation des Code, denn wir können sie aufrufen, bevor sie definiert wurde.

Dies hilft auch der Lesbarkeit, denn es ist leichter, nach `function f(…) {…}` im Code zu suchen, als nach `let f = function(…) {…};`. function declarations "springen ins Auge".

Aber manchmal benötigen wir eine bedingte Definition (wie eben im Beispiel) oder haben andere Gründe eine Function Expression zu bevorzugen.
```

## Zusammenfassung

- Funktionen sind Werte. Sie können überall im Code zugewiesen, kopiert oder deklariert werden.
- Wenn die Funktion in einem extra Statement im Hauptcode deklariert wird, dann nennt man das "Function Declaration".
- Wenn sie als Teil eines Ausdrucks definiert wird, nennen wir das "function expression".
- Function Declarations werden verarbeitet bevor der Block ausgeführt wird. Sie sind im ganzen Block sichtbar.
- Function Expressions werden erst erstellt, wenn der Ausführungsfluss sie erreicht.

Meistens, wenn wir eine Funktion definieren, sollten wir eine Function Declaration nutzen, da sie überall sichtbar ist. Das sorgt für flexiblere Codeorganisation und bessere Lesbarkeit.

Daher sollten wir einen Function Expression nur verwenden, wenn die Function Declaration ungeeignet ist. Dazu haben wir einige Beispiele behandelt und werden in Zukunft noch mehr kennenlernen.
