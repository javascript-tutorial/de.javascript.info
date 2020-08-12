
Man kann Folgendes anmerken:

```js no-beautify
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
