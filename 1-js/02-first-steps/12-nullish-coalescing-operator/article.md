# Nullish Coalescing Operator '??'

[recent browser="new"]

Der Nullish Coalescing Operator wird als zwei Fragezeichen `??` geschrieben.

Da er `null` und `undefined` ähnlich behandelt, werden wir hier in diesem Artikel einen speziellen Begriff verwenden. Kurz gesagt, wir werden sagen, dass ein Wert "definiert" ist, wenn er weder `null` noch `undefined` ist.

Das Ergebnis von `a ?? b` ist:
- wenn `a` definiert ist, dann `a`,
- wenn `a` nicht definiert ist, dann `b`.

Mit anderen Worten, `??` gibt das erste Argument zurück, wenn es nicht `null/undefined` ist und andernfalls das zweite.

Der Nullish Coalescing Operator ist nichts völlig Neues. Es ist nur eine nette Syntax, um den ersten "definierten" Wert von zweien zu bekommen.

Wir können `result = a ?? b` mit den Operatoren umschreiben, die wir bereits kennen, so:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Jetzt sollte absolut klar sein, was `??` macht. Lass uns sehen, wo es hilft.

Der gebräuchlichste Anwendungsfall für `??` ist, einen Standardwert bereitzustellen.

Beispielsweise zeigen wir hier `user` an, wenn sein Wert nicht `null/undefined` ist, ansonsten `Anonymous`:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user ist undefined)
```

Hier ist das Beispiel mit der Variablen `user`, der ein Name zugewiesen wurde:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user ist nicht null/undefined)
```

Wir können auch eine Sequenz von `??` verwenden, um den ersten Wert aus einer Liste auszuwählen, der nicht `null/undefined` ist.

Nehmen wir an, wir haben Daten eines Benutzers in den Variablen `firstName`, `lastName` oder `nickName`. Alle könnten nicht definiert sein, wenn der Benutzer sich entschieden hat, die entsprechenden Informationen nicht auszufüllen.

Wir möchten den Benutzernamen mit einer dieser Variablen anzeigen oder "Anonymous" zeigen, wenn alle `null/undefined` sind.

Verwenden wir hierfür den `??` Operator:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// zeigt den ersten definierten Wert:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Vergleich mit ||

Der ODER `||` Operator kann auf die gleiche Weise wie `??` verwendet werden, was im [vorherigen Kapitel](info:logical-operators#or-finds-the-first-truthy-value) beschrieben wurde.

Zum Beispiel könnten wir in dem obigen Code `??` durch `||` ersetzen und würden immer noch dasselbe Ergebnis erhalten:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// zeigt den ersten wahrheitswerten Wert:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Historisch gesehen war der ODER `||` Operator zuerst da. Er ist seit den Anfängen von JavaScript vorhanden, sodass Entwickler ihn seit langem für solche Zwecke verwendet haben.

Andererseits wurde der Nullish Coalescing Operator `??` erst kürzlich zu JavaScript hinzugefügt, und der Grund dafür war, dass die Leute mit `||` nicht ganz zufrieden waren.

Der wichtige Unterschied zwischen ihnen ist, dass:
- `||` den ersten *wahrheitswerten* Wert zurückgibt.
- `??` den ersten *definierten* Wert zurückgibt.

Mit anderen Worten, `||` unterscheidet nicht zwischen `false`, `0`, einem leeren String `""` und `null/undefined`. Sie sind alle gleich -- falsy Werte. Wenn einer dieser der erste Argument von `||` ist, dann erhalten wir als Ergebnis das zweite Argument.

In der Praxis jedoch möchten wir vielleicht nur dann einen Standardwert verwenden, wenn die Variable `null/undefined` ist. Das heißt, wenn der Wert wirklich unbekannt/nicht gesetzt ist.

Betrachten wir zum Beispiel dies:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` prüft `height` darauf, ob es ein falsy Wert ist, und das ist `0`, eindeutig falsy.
    - daher ist das Ergebnis von `||` das zweite Argument (`100`).
- `height ?? 100` prüft `height` darauf, ob es `null/undefined` ist, und das ist es nicht,
    - daher ist das Ergebnis `height` "wie es ist", also `0`.

In der Praxis ist die Höhe von Null oft ein gültiger Wert, der nicht durch den Standardwert ersetzt werden sollte. Daher macht `??` genau das Richtige.

## Vorrang

Die Vorrangigkeit des `??` Operators ist die gleiche wie bei `||`. Beide sind gleich `3` in der [MDN-Tabelle](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

Das bedeutet, dass genau wie `||` der Nullish Coalescing Operator `??` vor `=` und `?` ausgewertet wird, aber nach den meisten anderen Operationen, wie `+`, `*`.

Also könnten wir gezwungen sein, Klammern in Ausdrücken wie diesem hinzuzufügen:

```js run
let height = null;
let width = null;

// wichtig: Klammern verwenden
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Wenn wir die Klammern weglassen, würde `*` als höhere Priorität als `??` zuerst ausgeführt, was zu falschen Ergebnissen führen würde.

```js
// ohne Klammern
let area = height ?? 100 * width ?? 50;

// ...funktioniert so (nicht was wir wollen):
let area = height ?? (100 * width) ?? 50;
```

### Verwendung von ?? mit && oder ||

Aus Sicherheitsgründen verbietet JavaScript die Verwendung von `??` zusammen mit `&&` und `||`, es sei denn die Vorrangregeln werden durch Klammern explizit angegeben.

Der folgende Code löst einen Syntaxfehler aus:

```js run
let x = 1 && 2 ?? 3; // Syntaxfehler
```

Die Einschränkung ist sicher debattierbar, sie wurde der Sprachspezifikation hinzugefügt, um Programmierfehler zu vermeiden, wenn Leute beginnen, von `||` auf `??` umzusteigen.

Verwende klare Klammern, um dies zu umgehen:

```js run
*!*
let x = (1 && 2) ?? 3; // Funktioniert
*/!*

alert(x); // 2
```

## Zusammenfassung

- Der Nullish Coalescing Operator `??` bietet eine kurze Möglichkeit, den ersten "definierten" Wert aus einer Liste auszuwählen.

    Er wird verwendet, um Standardwerte für Variablen zuzuweisen:

    ```js
    // setze height=100, wenn height null oder undefined ist
    height = height ?? 100;
    ```

- Der Operator `??` hat eine sehr niedrige Vorrangigkeit, nur etwas höher als `?` und `=`, also sollte in Betracht gezogen werden, Klammern zu verwenden, wenn er in Ausdrücken verwendet wird.
- Es ist verboten, ihn mit `||` oder `&&` ohne explizite Klammern zu verwenden.
