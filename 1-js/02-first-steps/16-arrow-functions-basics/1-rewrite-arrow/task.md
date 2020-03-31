
# Ersetzen von Code mit Pfeilfunktionen

Ersetze im folgenden Code Funktionen innerhalb eines Ausdrucks durch Pfeilfunktionen:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Stimmst Du zu?",
  function() { alert("Du hast zugestimmt."); },
  function() { alert("Du hast den Vorgang abgebrochen."); }
);
```
