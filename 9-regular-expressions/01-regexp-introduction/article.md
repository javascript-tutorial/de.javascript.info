# Muster und Kennzeichen

Reguläre Ausdrücke sind Muster, die eine leistungsfähige Möglichkeit zum Suchen und Ersetzen im Text bieten.

In JavaScript sind sie sowohl über das Objekt [RegExp](mdn:js/RegExp) verfügbar als auch in Methoden von Zeichenketten integriert.

## Reguläre Ausdrücke

Ein regulärer Ausdruck (auch "regexp", oder einfach "reg") besteht aus einem *Muster* und optionalen *Kennzeichen*.

Es gibt zwei Syntaxen, die verwendet werden können, um ein Objekt für reguläre Ausdrücke zu erzeugen.

Die "lange" Syntax:

````js
regexp = new RegExp ("Muster", "Kennzeichen");
````

Und das "kurze", mit Schrägstrichen `"/"/"`":

```js
regexp = /muster/; // keine Kennzeichen
regexp = /muster/gmi; // mit den Kennzeichen g,m und i (wird demnächst behandelt)
```

Schrägstriche `muster:/.../` teilen JavaScript mit, dass wir einen regulären Ausdruck erstellen. Sie spielen die gleiche Rolle wie Anführungszeichen für Zeichenketten.

In beiden Fällen wird `regexp` eine Instanz der eingebauten Klasse `RegExp`.

Der Hauptunterschied zwischen diesen beiden Syntaxen besteht darin, dass Muster mit Schrägstrichen `/.../` es nicht erlauben, Ausdrücke einzufügen (wie String-Template-Literale mit `${...}`). Sie sind vollständig statisch.

Schrägstriche werden verwendet, wenn wir den regulären Ausdruck zum Zeitpunkt des Schreibens des Codes kennen -- und das ist die häufigste Situation. Während `neue RegExp` häufiger verwendet wird, wenn wir "on the fly" einen regulären Ausdruck aus einer dynamisch generierten Zeichenkette erzeugen müssen. Zum Beispiel:

```js
let tag = prompt ("Welchen Tag möchten Sie finden?", "h2");

let regexp = new RegExp(`<${tag}>`); // wie /<h2>/, wenn in der obigen Eingabeaufforderung mit "h2" geantwortet wurde
```

## Kennzeichen

Reguläre Ausdrücke können Flags haben, die die Suche beeinflussen.

Es gibt nur 6 davon in JavaScript:

`muster:i`
: Mit diesem Flag ist die Suche unabhängig von Groß- und Kleinschreibung: kein Unterschied zwischen `A` und `a` (siehe das Beispiel unten).

`muster:g`
: Mit diesem Flag sucht die Suche nach allen Übereinstimmungen, ohne dieses Flag -- nur die erste Übereinstimmung wird zurückgegeben.

`muster:m` 
: Mehrzeilenmodus (behandelt im Kapitel <info:regexp-mehrzeilenmodus>).

`muster:s` : Mehrzeilenmodus
: Aktiviert den "dotall"-Modus, der es einem Punkt `muster:.` erlaubt, mit einem Zeilenumbruchzeichen `\n` übereinzustimmen (behandelt im Kapitel <info:regexp-character-classes>).

`muster:u`
: Aktiviert volle Unicode-Unterstützung. Das Flag ermöglicht die korrekte Verarbeitung von Surrogatpaaren. Mehr dazu im Kapitel <info:regexp-unicode>.

`muster:y`
: "Sticky"-Modus: Suche an der genauen Position im Text (mehr dazu im Kapitel <info:regexp-sticky>)

```smart header="Colors"
Von hier an ist das Farbschema:

- regexp -- `muster:rot`
- Zeichenkette (wo wir suchen) -- `betreff:blau`
- Ergebnis -- `Übereinstimmung:grün`
```

## Suche: str.match

Wie bereits erwähnt, sind reguläre Ausdrücke in String-Methoden integriert.

Die Methode `str.match(regexp)` findet alle Übereinstimmungen von `regexp` in der Zeichenkette `str`.

Sie hat 3 Arbeitsmodi:

1. Wenn der reguläre Ausdruck das Flag `muster:g` hat, gibt sie ein Array mit allen Übereinstimmungen zurück:
    ```js run
    let str = "Wir werden, wir werden Sie schaukeln";

    alert( str.match(/we/gi) ); // We,we (ein Array aus 2 Teilzeichenketten, die übereinstimmen)
    ```
    Bitte beachten Sie, dass sowohl `Übereinstimmung:Wir` als auch `Übereinstimmung:wir` gefunden werden, da das Kennzeichen `muster:i` den regulären Ausdruck case-insensitive macht.

2. Wenn es kein solches Kennzeichen gibt, gibt es nur die erste Übereinstimmung in der Form eines Arrays zurück, mit der vollständigen Übereinstimmung bei Index `0` und einigen zusätzlichen Details in den Eigenschaften:
    ```js run
    let str = "Wir werden, wir werden Sie schaukeln";

    let ergebnis = str.match(/we/i); // ohne Kennzeichen g

    alert( ergebnis[0] ); // Wir (1. Spiel)
    alert( ergebnis.länge ); // 1

    // Einzelheiten:
    alert( ergebnis.index ); // 0 (Position des Spiels)
    alert( ergebnis.input ); // Wir werden, wir werden Sie schaukeln (source string)
    ```
    Das Array kann neben `0` noch andere Indizes haben, wenn ein Teil des regulären Ausdrucks in Klammern eingeschlossen ist. Wir werden das im Kapitel <info:regexp-groups> behandeln.


3. Und schließlich, wenn es keine Übereinstimmungen gibt, wird `null` zurückgegeben (es spielt keine Rolle, ob es eine Kennzeichen `muster:g` gibt oder nicht).
    Dies ist eine sehr wichtige Nuance. Wenn es keine Übereinstimmungen gibt, erhalten wir kein leeres Array, sondern stattdessen `null`. Das zu vergessen, kann zu Fehlern führen, z.B:

    ```js run
    let übereinstimmungen = "JavaScript".match(/HTML/); // = null

    if (! übereinstimmungen.length) { // Fehler: Die Eigenschaft 'length' von null kann nicht gelesen werden
      alert ("Fehler in der obigen Zeile");
    }
    ```

    Wenn wir möchten, dass das Ergebnis immer ein Array ist, können wir es so schreiben:

    ```js run
    let übereinstimmungen = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!übereinstimmungen.length) {
      alert ("Keine Übereinstimmungen"); // jetzt funktioniert es
    }
    ```

## Ersetzung: str.replace

Die Methode `str.replace(RegAusdrk, Ersetzung)` ersetzt Übereinstimmungen, die mit `RegAusdrk` in der Zeichenkette `str` gefunden wurden, durch `Ersetzung` (alle Übereinstimmungen, wenn es das Kennzeichen `muster:g` gibt, ansonsten nur die erste).

Zum Beispiel:

```js run
// keine Kennzeichen g
alert( "Wir werden, wir werden".replace(/we/i, "Sie") ); // Sie werden, sie werden

// mit Kennziechen g
alert( "Wir werden, wir werden".replace(/we/ig, "Sie") ); // Sie werden, sie werden
```

Das zweite Argument ist die Zeichenkette `Ersatz`. Wir können darin spezielle Zeichenkombinationen verwenden, um Fragmente der Übereinstimmung einzufügen:

| Symbole | Aktion in der `Ersetzungszeichenkette |
|--------|--------|
|`$&`| fügt die ganze Übereinstimmung ein
|<<code>$&#096;</code>| fügt einen Teil der Zeichenkette vor der Übereinstimmung ein|
|`$'`| fügt einen Teil der Zeichenkette nach der Übereinstimmung ein
|`$n`||wenn `n` eine 1-2-stellige Zahl ist, dann fügt sie den Inhalt der n-ten Klammer ein, mehr dazu im Kapitel <info:regexp-groups>|
|`$<name>`| fügt den Inhalt der Klammern mit dem angegebenen `Namen` ein, mehr dazu im Kapitel <info:regexp-groups>|
|`$$`| fügt das Zeichen `$` | ein

Ein Beispiel mit `Muster:$&`:

```js run
alert( "Ich liebe HTML".replace(/HTML/, "$& und JavaScript") ); // Ich liebe HTML und JavaScript
```

## Testen: regexp.test

Die Methode `regexp.test(str)` sucht nach mindestens einer Übereinstimmung, wenn sie gefunden wird, liefert `true` (wahr), andernfalls `false` (falsch).

```js run
let str = "Ich liebe JavaScript";
let regexp = /LIEBE/i;

alert( regexp.test(str) ); // true (wahr)
```

Später in diesem Kapitel werden wir mehr reguläre Ausdrücke studieren, durch weitere Beispiele gehen und auch andere Methoden kennen lernen.

Vollständige Informationen über die Methoden finden Sie im Artikel <info:regexp-methods>.

## Zusammenfassung

- Ein regulärer Ausdruck besteht aus einem Muster und optionalen Kennzeichen: muster:g", "muster:i", "muster:m", "muster:u", "muster:s", "muster:y".
- Ohne Kennzeichen und Sonderzeichen (die wir später untersuchen werden) ist die Suche mit einem Regexp dasselbe wie eine Teilzeichenfolgesuche.- Die Methode `str.match(regexp)` sucht nach übereinstimmenden Zeichenfolgen: alle, wenn es das Kennzeichen `pattern:g` gibt, andernfalls nur das erste.
- Die Methode `str.replace(regexp, replacement)` ersetzt gefundene Treffer, die mit `regexp` gefunden wurden, durch `replacement`: alle, wenn das Kennzeichen `pattern:g` vorhanden ist, andernfalls nur die erste.
- Die Methode `regexp.test(str)` ergibt `true`, wenn es mindestens eine Übereinstimmung gibt, andernfalls wird `false` ausgegeben.
