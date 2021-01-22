# Mouse events

In diesem Kapitel werden wir uns im Detail mit "mouse events" / Maus Interaktionen und ihren Eigenschaften beschäftigen.

Hinweis: Solche "Events" / Interaktionen müssen nicht umbedingt von Mäusen kommen, sondern können auch von anderen Geräten, wie Handys und Tablets kommen, wo diese für bessere Kom­pa­ti­bi­li­tät diese nachahmen.

## Mouse event types

Wir haben schon ein paar dieser Interaktionen gesehen:

`mousedown/mouseup`
: Die Maus wird über einem Element geklickt/wieder losgelassen.

`mouseover/mouseout`
: Der Mauszeiger geht über oder aus einem Element heraus.

`mousemove`
: Jede Mausbewegung über einem Element löst das "event" bzw. die Interaktion aus.

`click`
: Wird ausgelöst wenn `mousedown` und danach `mouseup` über demselben Element mit der linken Maustaste verwendet wird.

`dblclick`
: Wird nach zwei Klicks in kurzer Zeit auf demselben Element ausgelöst. Wird heutzutage nur noch selten verwendet.

`contextmenu`
: Wird ausgelöst wenn die rechte Maustaste gedrückt wird. Es gibt auch andere Wege ein "context menu" oder Befehlsübersicht zu öffnen: z.B. eine besondere Tastatur zu verwenden, die in diesem Fall auch die Interaktion auslöst, also ist es nicht genau ein mouse event.

...Es gibt auch einige andere Möglichkeiten, um die wir uns später kümmern.

## Events order

Wie du oben in der Liste sehen kannst, kann ein Benutzer mehrere Aktionen auslösen.

Zum Beispiel löst ein Click mit der linken Maustaste `mousedown` aus, wenn die Taste gepresst wird, dann `mouseup` und `click` aus wenn die Taste losgelassen wird.

In Fällen in denen ein einzelner Click mehrere unterschiedliche "events" auslöst, ist die Reihenfolge festgelegt. Also werden die "handler" bzw. die Funktionen in der Reihenfolge `mousedown` -> `mouseup` -> `click` aufgerufen.

```online
Drücke den Knopf unten und du wirst die "events" sehen. Versuche auch einen Doppel-click.

In dem Beispiel unten werden alle mouse events wahrgenommen und wenn sie mehr als 1 Sekunde Verzögerung haben durch einen horizontalen Strich getrennt.

Wir können auch die Eigenschaft des `button` sehen, die erlaubt die Maustaste zu erkennen. Unten wird es erklärt.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Klicke mich mit der rechten oder linken Maustaste." type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Mouse button
Events, die durch Clicks ausgelöst werden haben eine `button` Eigenschaft, welche die geklickte Maustaste erhält.

Normalerweise benutzten wir diese nicht für die `click` und `contextmenu` events, weil das click-event nur bei der linken Maustaste funktioniert und das contextmenu-event nur bei der rechten.

Auf der anderen Seite könnten `mousedown` und `mouseup` handler das `event.button` event benötigen, weil diese events bei jedem button ausgelöst werden und `button` gibt die Möglichkeit zwischen "right-mousedown" und "left-mousedown" zu unterscheiden.

Die möglichen Werte eines `event.button` sind:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxillary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

Die meisten Mäuse haben nur eine linke und eine rechte Taste, also sind die möglichen Werte `0` oder `2`. Touchscreens generieren ähnliche events wenn man sie antippt.

Zusätzlich gibt es die `event.buttons` Eigenschaft, die alle gedrückten buttons als Integer speichert, ein bit pro button. In Anwendung wird diese Eigenschaft nur selten genutzt, genauere Details kannst du unter [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) finden, falls du sie mal benutzen willst.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```

## Modifiers: shift, alt, ctrl und meta

Alle mouse events beinhalten die Informationen über die gedrückten modifier keys.

Event Eigenschaften:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (oder `key:Opt` für Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` für Mac

Sie sind `true` wenn der korrespondierende key während des events gedrückt wurde.

Zum Beispiel, der button unten funktioniert nur bei `key:Alt+Shift`+Klick:

```html autorun height=60
<button id="button">Alt+Shift+Klick auf mich!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Hooray!');
    }
  };
</script>
```

```warn header="Achtung: bei Mac ist es normalerweise `Cmd` anstatt von `Ctrl`"
Auf Windows und Linux gibt es die modifier keys `key:Alt`, `key:Shift` und `key:Ctrl`. Auf Mac gibt es einen mehr: `key:Cmd`,
der auf die Eigenschaft `metaKey` hört.

In den meisten Anwendungen, wenn Windows/Linux `key:Ctrl` benutzt, benutzt Mac `key:Cmd`.

Also: Wenn ein Windows Benutzer `key:Ctrl+Enter` oder `key:Ctrl+A` drückt, würde ein Mac Benutzer `key:Cmd+Enter` or `key:Cmd+A` drücken, und so weiter

Wenn wir also Kombinationen wie `key:Ctrl`+Klick unterstützen wollen, macht es für Mac Sinn `key:Cmd`+Klick zu benutzen. Das ist angenehmer für Mac Benutzer.

Sogar wenn wir gerne Mac Benutzer zwingen würden `key:Ctrl`+Klick zu benutzen -- wäre das schwierig. Das Problem: Ein linker Klick mit `key:Ctrl` wird als *right-click* auf MacOS interpretiert und generiert das `contextmenu` event, nicht `click` wie bei Windows/Linux.

Also wenn wir wollen, dass sich Benutzer aller Betriebssysteme bei uns wohl fühlen, sollten wir zusammen mit `ctrlKey` `metaKey` ckecken.

Für den Js-Code heißt das, dass wir wir `if (event.ctrlKey || event.metaKey)` checken sollten.
```

```warn header="Es gibt auch mobile Geräte"
Tastaturkombinationen funktionieren gut als Zusatz zum Arbeitsfluss. Also wenn ein Benutzer eine Tastatur benutzt -- das sie funktioniert.

Aber wenn ihr Gerät keine hat -- dann sollte es einen Weg geben ohne modifier keys zu leben.
```

## Coordinates: clientX/Y, pageX/Y

Alle mouse events bieten Koordinaten zweier Arten:

1. Window-relative: `clientX` und `clientY`.
2. Document-relative: `pageX` und `pageY`.

Wir haben schon die Unterschiede zwischen diesen im Kapitel <info:coordinates> besprochen.

Kurz zusammengefasst: document-relative Koordinaten `pageX/Y` gehen von der linken oberen Ecke eines Dokuments aus, und ändern sich nicht, wenn die Seite gescrollt wird. `clientX/Y` Koordinaten hingegen werden von der Ecke links oben des jetzigen Fensters gezählt. Wenn die Seite gescrollt wird, ändern sie sich.

Zum Beispiel, wenn wir ein Fenster mit einer Größe von 500x500 haben, und die Maus in der Ecke links oben ist, dann sind `clientX` und `clientY` `0`, egal wie oft die Seite gescrollt wird.

Und wenn die Maus in der Mitte ist, dann sind `clientX` und `clientY` `250`, egal wo man sich im Dokument befindet. Sie sind in diesem Aspekt ähnlich zu `position:fixed`.

````online
Bewege die Maus über das Input Feld um `clientX/clientY` zu sehen (Das Beispiel ist im `iframe`, also sind die Koordinaten relativ zum diesem `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

## Preventing selection on mousedown

Ein doppelter Mausclick hat einen Nebeneffekt der in manchen interfaces störend sein könnte: er wählt Text aus.

Zum Beispiel: ein doppelter Click im Text unten wählt ihn aus zusätzlich zu unserem handler:

```html autorun height=50
<span ondblclick="alert('dblclick')">Klick mich doppelt</span>
```

Wenn man die linke Maustaste drückt und, ohne sie loszulassen, die Maus bewegt, verursacht das auch die Auswahl, oft nicht gewollt.

Es gibt mehrere Wege um die Auswahl zu verhindern, über die du im Kapitel <info:selection-range> lesen kannst.

In diesem speziellen Fall es am besten die Aktionen des Browsers bei `mousedown` aufzuhalten. Es vermeidet diese beiden Auswahlen:

```html autorun height=50
Vorher...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Doppelclick mich
</b>
...Nachher
```

Jetzt wird das fette Element bei Doppelclicks nicht ausgewählt, und auch beim Drücken der linken Maustaste wird die Auswahl nicht gestartet.

Hinweis: Der Text ist immer noch auswählbar. Wie auch immer, die Auswahl sollte jetzt nicht im Text starten, sondern entweder vor oder nach dem Text. Das ist normalerweise ok für Benutzer.

````smart header="Kopieren verhindern"
Wenn wir die Auswahl deaktivieren wollen um unsere Seite vor copy-pasting zu schützen, dann könne wir ein anderes event verwenden: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Kopieren Verboten!');return false"*/!*>
  Lieber Benutzer,
  Für dich ist das Kopieren verboten.
  Wenn du JS oder HTML kennst, kannst du jedoch an alles durch den Seiten Sourcecode gelangen.
</div>
```
Wenn du versuchst einen Teil des Textes im `<div>` zu kopieren, wird das nicht funktionieren, weil die Standard action `oncopy` verhindert wird.

Natürlich hat der Benutzer Zugriff auf den HMTL-Sourcecode der Seite und kann den Inhalt von dort kopieren, aber nicht jeder weiß, wie man das macht.
````

## Summary
Mouse events haben die folgenden Eigenschaften:

- Button: `button`.
- Modifier keys (`true` wenn gedrückt): `altKey`, `ctrlKey`, `shiftKey` und `metaKey` (Mac).
  - Wenn du `key:Ctrl` händeln willst, dann vergesse nicht Mac Benutzer, diese verwenden normalerweise `key:Cmd`, also ist es besser `if (e.metaKey || e.ctrlKey)` zu checken.

- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

Die voreingestellte Browser action auf `mousedown` ist Text Auswahl, wenn es jedoch nicht passend für das Interface ist, sollte es verhindert werden.

Im nächsten Kapitel werden wir mehr Details über events lernen, die der Mauszeigerbewegung folgen und helfen die Veränderung der Elemente darunter abzubilden.
