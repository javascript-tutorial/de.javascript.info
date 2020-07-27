# Interaktion: alert, prompt, confirm

Da wir den Browser als unsere Demo-Umgebung verwenden, wollen wir einige Funktionen zur Interaktion mit dem Benutzer betrachten: `alert`, `prompt` und `confirm`.

## alert

<<<<<<< HEAD
Diese haben wir bereits gesehen. Es zeigt eine Meldung an und wartet darauf, dass der Benutzer "OK" drückt.
=======
This one we've seen already. It shows a message and waits for the user to press "OK".
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Zum Beispiel:

```js run
alert("Hallo");
```

Das Mini-Fenster mit der Nachricht wird als *Dialog-Fenster* bezeichnet. Das Wort "Dialog" bedeutet, dass der Besucher erst dann mit dem Rest der Seite interagieren, andere Knöpfe drücken usw. kann, wenn er sich mit dem Fenster beschäftigt hat. In diesem Fall -- bis er "OK" drückt.

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

```smart header="Eckige Klammer in der Syntax `[...]`"
Die eckigen Klammern um `default` in der obigen Syntax bedeuten, dass der Parameter optional, nicht erforderlich ist.
```

Der Besucher kann etwas in das Eingabefeld eingeben und OK drücken. Dann erhalten wir diesen Text im `Ergebnis`. Oder er kann die Eingabe beenden, indem er Abbrechen drückt oder `key:Esc` drückt, dann erhalten wir `Null` als `Ergebnis`.

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
