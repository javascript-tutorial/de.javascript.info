
Man kann Folgendes anmerken:

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- kein Leerzeichen zwischen Parametern
{  // <- Klammer auf in eine zweite Zeile
  let result=1;   // <- keine Leerzeichen vor und nach =
  for(let i=0;i<n;i++) {result*=x;}   // <- keine Leerzeichen
  // the contents of { ... } sollte in eine neue Zeile sein
  return result;
}


let x=prompt("x?",''), n=prompt("n?",'') // <-- theoretisch möglich,
// aber besser wenn man es auf zwei Zeilen aufteilt. Es fehlen auch die Leerzeichen und das Semikolon ;
if (n<0)  // <- keine Leerzeichen in den Klammern (n < 0), davor sollte auch eine leere Zeile sein
{   // <- Klammer auf in eine neue Zeile
  // unten - lange Zeilen können aufgeteilt werden um die Lesbarkeit zu verbessern
  alert(`Exponent ${n} wird nicht unterstützt, bitte geben Sie einen Integerwert ein, der größer ist als null`);

=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
}
else // <- man könnte es in einer einzigen Zeile schreiben "} else {"
{
  alert(pow(x,n))  // keine Leerzeichen und kein ;
}
```

Die Verbesserte Variante:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");


if (n < 0) {
  alert(`Exponent ${n} wird nicht unterstützt,
    bitte geben Sie einen Integerwert ein, der größer ist als null`);

} else {
  alert( pow(x, n) );
}
```
