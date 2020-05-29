# Interaktion: alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
In diesem Teil des Tutorials behandeln wir die JavaScript-Sprache "als solche", ohne umgebungsspezifische Anpassungen.

Aber wir verwenden immer noch den Browser als Demoumgebung, also sollten wir zumindest einige seiner Funktionen der Benutzeroberfläche kennen. In diesem Kapitel machen wir uns mit den Browser-Funktionen `alert` (hinweisen), `prompt` (anfragen) und `confirm` (bestätigen) vertraut.

## alert

Syntax:

```js
alert(message);
```

Dies zeigt eine Meldung `message` an und hält die Ausführung des Skripts an, bis der Benutzer auf "OK" klickt. 
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to presses "OK".
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Zum Beispiel:

```js run
alert("Hello");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Das Minifenster mit der Meldung wird als *modales Fenster* bezeichnet. Das Wort "modal" bedeutet, dass der Besucher nicht mit dem Rest der Seite interagieren kann, keine anderen Knöpfe drücken kann, usw., bis er sich mit dem Fenster beschäftigt hat. In diesem Fall -- bis er auf "OK" drückt.
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

Die Funktion `prompt` nimmt zwei Argumente an:

```js no-beautify
result = prompt(title, [default]);
```

Es wir ein modales Fenster mit einer Meldung angezeigt, ein Eingabefeld für den Besucher, und die Knöpfe OK/Abbrechen.

`title`
: Die Meldung, die dem Besucher gezeigt wird.

`default`
: Ein optionaler zweiter Parameter, der vor-befüllte Wert für das Eingabefeld.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Der Besucher kann etwas in das Feld tippen und dann auf OK klicken. Oder er beendet die Eingabe, indem er auf Abbrechen klickt oder die `key:Esc` Taste drückt.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter as optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Der Aufruf von `prompt` gibt den Text des Eingabefelds zurück. Wenn die Eingabe abgebrochen wurde, so ist der Rückgabewert `null`.

Zum Beispiel:

```js run
let age = prompt('Wie alt bist du?', 100);

alert(`Du bist ${age} Jahre alt!`); // Du bist 100 Jahre alt!
```

````warn header="Im IE: stelle immer einen `default` Wert bereit"
Der zweite Parameter ist optional, aber wenn wir ihn nicht angeben, wird Internet Explorer den Text `"undefined"` in die Eingabeaufforderung einfügen. 

Führe diesen Code im Internet Explorer aus, um es zu sehen:

```js run
let test = prompt("Test");
```

Um also Eingabeaufforderungen im IE gut Aussehen zu lassen, empfehlen wir, immer das zweite Argument anzugeben:

```js run
let test = prompt("Test", ''); // <-- für IE
```
````

## confirm

Die Syntax:

```js
result = confirm(question);
```

Die Funktion `confirm` zeigt ein modales Fenster mit einer Frage `question` und zwei Knöpfen an: OK und Abbrechen.

Der Rückgabewert ist `true` wenn OK gedrückt wurde, andernfalls `false`.

Zum Beispiel:

```js run
let isBoss = confirm("Bist du der Chef?");

alert( isBoss ); // true, falls OK gedrückt wurde
```

## Zusammenfassung

Wir haben 3 browserspezifische Funktionen zur Interaktion mit den Besuchern behandelt:

`alert`
: zeigt eine Meldung.

`prompt`
: zeigt eine Meldung, die den Benutzer zur Eingabe von Text auffordert. Liefert den Text, oder falls Abbrechen oder die `key:Esc` gedrückt wurde, `null`.

`confirm`
: zeigt eine Meldung und wartet bis der Benutzer OK oder Abbrechen drückt. Liefert `true` für OK und `false` für Abbrechen/`key:Esc`.

Alle diese Methoden sind modal: sie pausieren die Skriptausführung und erlauben dem Besucher nicht, mit dem Rest der Seite zu interagieren, bis das Fenster geschlossen wurde.

Es gibt zwei Einschränkungen, die allen oben genannten Methoden gemeinsam sind:

1. Die genaue Position des modalen Fensters wird durch den Browser bestimmt. Normalerweise ist es in der Mitte.
2. Das genaue Aussehen des Fensters hängt auch vom Browser ab. Wir können es nicht verändern.

Das ist der Preis für die Einfachheit. Es gibt andere Möglichkeiten, schönere Fenster zu zeigen und für eine umfangreichere Interaktion mit dem Besucher, aber wenn "Schnickschnack" nicht so wichtig ist, funktionieren diese Methoden sehr gut.
