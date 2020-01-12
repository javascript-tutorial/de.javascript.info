# Hallo, Welt!

Dieser Teil des Tutorials behandelt den Kern von JavaScript, die Sprache selbst.

Aber wir brauchen eine Arbeitsumgebung um unsere Skripte auszuführen und, da dies ein Online-Buch ist, ist der Browser eine gute Wahl. Wir werden die Anzahl browser-spezifischer Befehle (wie `alert`) auf ein Minimum beschränken, so dass du damit keine Zeit verschwendest, solltest du planen dich auf eine andere Umgebung (wie Node.js) zu konzentrieren. Wir fokusieren uns auf JavaScript im Browser im [nächsten Teil](/ui) des Tutorials.

Als erstes, lass uns sehen wie wir ein Skript einer Webseite hinzufügen. Für eine serverseitige Umgebung (wie Node.js), kannst du das Skript mit einem Befehl wie `"node mein.js"` ausführen.


## Der "script"-Tag

JavaScript-Programme können an jeder beliebigen Stelle eines HTML-Dokuments mit Hilfe des `<script>`-Tag eingefügt werden.

Beispielsweise:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Vor dem Skript...</p>

*!*
  <script>
    alert( 'Hallo, Welt!' );
  </script>
*/!*

  <p>...Nach dem Skript</p>

</body>

</html>
```

```online
Du kannst das Beispiel durch klicken des "Play"-Buttons, in der rechten oberen Ecke der darüberliegenden Box, ausführen.
```

Der `<script>`-Tag beinhaltet JavaScript-Code, welcher automatisch ausgeführt wird, wenn der Browser den Tag verarbeitet.


## Modernes Markup

Der `<script>`-Tag hat einige Attribute die heutzutage nur selten Verwendung finden, aber noch immer in alten Code vorhanden sind:

Das `type`-Attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: Der alte HTML-Standard, HTML4, setzte bei einem Skript den `Typ` voraus. Üblicherweise war es `type="text/javascript"`. Dies wird nicht länger benötigt. Zudem, der moderne HTML-Standard hat die Bedeutung des Attributs völlig verändert. Jetzt kann es für JavaScript-Module verwendet werden. Aber dies ist ein weiterführendes Thema; wir werden über Module in einem anderen Teil des Tutorials sprechen.

Das `language`-Attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: Dieses Attribute war gedacht, um die Sprache des Skripts anzuzeigen. Dieses Attribute macht nicht länger Sinn, weil JavaScript die Standard-Sprache ist. Es gibt keinen Grund es zu nutzen.

Kommentare vor und nach Skripten.
: In wirklich alten Büchern und Anleitungen findest du vielleicht, innerhalb von `<script>`-Tags, Kommentare wie diese:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Dieser Trick wird im modernen JavaScript nicht verwendet. Diese Kommentare verstecken JavaScript-Code für alte Browser, die nicht wissen wie der `<script>`-Tag verarbeitet wird. Da Browser-Veröffentlichungen der letzten 15 Jahre dieses Problem nicht haben, kann dir diese Art von Kommentar helfen wirklich alten Code zu identifizieren.


## Externe Skripte

Wenn wir viel JavaScript-Code haben, können wir diesen in eine separate Datei legen.

Skript-Dateien werden zu HTML mit dem `src`-Attribute hinzugefügt:

```html
<script src="/pfad/zum/skript.js"></script>
```

Hier ist `/pfad/zum/script.js` ein absoluter Pfad zu dem Skript, aus dem Wurzelverzeichnis der Seite. Auch ein relativer Pfad der aktuellen Seite kann angeben werden. Beispielsweise, `src="script.js"` würde eine Datei `"script.js"` im aktuellen Verzeichnis bedeuten.

Außerdem können wir auch eine komplette URL angeben. Beispielsweise:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Um mehrere Skripte einzufügen, nutze Mehrfach-Tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Normalerweise werden nur die einfachsten Skripte ins HTML eingefügt. Komplexere liegen in separaten Dateien.

Der Vorteil einer separaten Datei ist, dass der Browser sie heruntlädt und in seinem [Puffer-Speicher](https://de.wikipedia.org/wiki/Browser-Cache) ablegt.

Andere Seiten die zum selben Skript referenzieren werden es aus dem Speicher nehmen anstatt es herunterzuladen, die Datei wird so tatsächlich nur einmal geladen.

Das reduziert Datenverkehr und macht Seiten schneller.
```

````warn header="Wenn `src` gesetzt ist, wird der Skript-Content ignoriert."
Ein einzelner `<script>`-Tag kann nicht beides haben, das `src`-Attribute und Code innerhalb.

Dies funktioniert nicht:

```html
<script *!*src*/!*="datei.js">
  alert(1); // der Inhalt wird ignoriert, weil src ist gesetzt.
</script>
```

Wir müssen wählen, entweder ein externes `<script src="…">` oder ein reguläres `<script>` mit Code.

Um zu funktionieren kann das obige Beispiel in zwei Skripte unterteilt werden:

```html
<script src="datei.js"></script>
<script>
  alert(1);
</script>
```
````

## Zusammenfassung

- Wir können einen `<script>`-Tag nutzen, um JavaScript-Code einer Seite hinzuzufügen.
- Die `type`- und `language`-Attribute sind nicht erforderlich.
- Ein Skript in einer externen Datei kann mit `<script src="pfad/zum/skript.js"></script>` eingefügt werden.


Es gibt noch viel mehr über Browser-Skripte und ihre Interaktion mit Webseiten zu lernen. Aber vergessen wir nicht, dass dieser Teil des Tutorials JavaScript selbst gewidmet ist, wir sollten uns nicht von browser-spezifischen Implementierungen ablenken lassen. Wir werden den Browser als Methode zum Ausführen von JavaScript verwenden, was für das Online-Lesen sehr praktisch ist, aber nur eine von vielen.
