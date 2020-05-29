
```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Stimmst Du zu ?",
*!*
  () => alert("Du hast zugestimmt."),
  () => alert("Du hast den Vorgang abgebrochen.")
*/!*
);
```

Sieht kurz und sauber aus, oder ?
