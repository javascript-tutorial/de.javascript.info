# Kommentare

Wie wir schon aus den vorherigen Kapiteln <info:structure> wissen, können Kommentare einzeilig, beginnend mit  `//`, oder mehrzeilig, beginnend mit `/* ... */`, sein.

Wir schreiben normalerweise Kommentare, um zu beschreiben, wie der Code funktioniert.

Auf den ersten Blick mag das Kommentieren offensichtlich sein, aber von Neulingen im Programmieren werden sie häufig falsch verwendet.

## Schlechte Kommentierung

Anfänger tendieren dazu, Kommentare zu verwenden, um zu beschreiben, was der Code "macht". Wie hier:

```js
// Dieser Code macht dies (...) und dann jenes (...)
// ...und wer weiß, was sonst noch...
very;
complex;
code;
```

Aber in einem guten Code sollte die Menge solcher "erklärenden" Kommentare minimal sein. Im Ernst, der Code sollte auch ohne sie leicht verständlich sein.

Dafür gibt es eine großartige Regel: "Wenn der Code so unklar ist, dass er einen Kommentar erfordert, dann sollte er stattdessen vielleicht neu geschrieben werden"

### Prinzip: Funktionen auslagern

Manchmal ist es sinnvoll, ein Code-Stück durch eine Funktion zu ersetzen, wie hier:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // prüfen, ob i eine Primzahl ist
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

Die bessere Variante, mit einer ausgelagerten Funktion `isPrime`:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Jetzt können wir den Code leichter verstehen. Die Funktion selbst wird dabei zum Kommentar. Ein solcher Code wird *selbsterklärend* genannt

### Prinzip: Funktionen erstellen

Und wenn wir ein langes "Code-Sheet" wie dieses haben:

```js
// hier fügen wir Whiskey hinzu
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// hier fügen wir Saft hinzu
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Dann könnte es eine bessere Variante sein, dieses in Funktionen umzuschreiben, wie hier:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Noch einmal, die Funktionen alleine sagen schon aus, was hier passiert. Es gibt nichts zu kommentieren. Und auch die Code-Struktur ist besser, wenn sie aufgeteilt ist. Es ist klar, was jede Funktion tut, was sie nimmt und was sie zurückgibt.

In Wirklichkeit können wir "erklärende" Kommentare nicht völlig vermeiden. Es gibt komplexe Algorithmen. Und es gibt intelligente "Tweaks" (= Anpassungen) zum Zwecke der Optimierung. Aber im Allgemeinen sollten wir versuchen, den Code einfach und selbsterklärend zu halten.

## Gute Kommentierung

Erklärende Kommentare sind also in der Regel schlecht. Was sind nun gute Kommentare?

Beschreibe die Struktur des Codes: Gib einen allgemeinen Überblick über Komponenten, wie diese interagieren, wie der Kontrollfluss in verschiedenen Situation abläuft.. Kurz gesagt -- die Vogelperspektive auf den Code. Es gibt eine spezielle Sprache, [UML](https://de.wikipedia.org/wiki/Unified_Modeling_Language), zum erstellen von allgemeinen Strukturdiagrammen in denen der Code erläutert wird. Definitiv ein Studium wert.

Dokumentiere die Funktionsparameter und die Verwendung: Es gibt eine spezielle Syntax, [JSDoc](http://en.wikipedia.org/wiki/JSDoc), um die Verwendung einer Funktion, die Parameter und den Rückgabewert zu dokumentieren.

Zum Beispiel:
```js
/**
 * Gibt x zur n-ten Potenz erhöht zurück.
 *
 * @param {number} x Die zu erhöhende Zahl.
 * @param {number} n Die Potenz, muss eine natürliche Zahl sein.
 * @return {number} x auf die n-te Potenz erhöht.
 */
function pow(x, n) {
  ...
}
```

Solche Kommentare erlauben es uns, den Zweck der Funktion zu verstehen und sie richtig zu verwenden, ohne in ihren Code zu sehen.

Übrigens, viele Entwicklungsumgebungen wie [WebStorm](https://www.jetbrains.com/de-de/webstorm/) können diese auch verstehen und verwenden diese, um Autovervollständigungen und einige automatische Code-Überprüfungen anzubieten.

Außerdem gibt es Tools wie [JSDoc 3](https://github.com/jsdoc3/jsdoc) die aus den Kommentaren eine HTML-Dokumentation generieren können. Weitere Informationen über JSDoc findest du unter <http://usejsdoc.org/>.

Warum wird die Aufgabe auf diese Weise gelöst? : Was geschrieben wird, ist wichtig. Aber was *nicht* geschrieben ist, kann noch wichtiger sein, um zu verstehen, was vor sich geht. Warum wird die Aufgabe genau auf diese Weise gelöst? Der Code gibt keine Antwort.

    Wenn es viele Wege zur Lösung der Aufgabe gibt, warum dann dieser? Vor allem dann, wenn es nicht der offensichtlichste ist.
    
    Ohne solche Kommentare ist die folgende Situation möglich:
    1. Du (oder dein Kollege) öffnen den Code, der vor einiger Zeit geschrieben wurde und siehst, das dieser "suboptimal" ist.
    2. Du denkst: "Wie dumm ich damals war, und wie viel klüger ich jetzt bin", und schreibst ihn mit der "offensichtlicheren und korrekteren" Variante um.
    3.  ... Der Drang, umzuschreiben, war gut. Aber dabei sieht man, dass die "offensichtlichere" Lösung tatsächlich fehlt. Du erinnerst dich sogar schwach daran, warum, weil du es schon vor langer Zeit versucht hast. Du kehrst zur richtigen Variante zurück, doch die Zeit war verschwendet.
    
    Kommentare, die die Lösung erklären sind sehr wichtig. Sei helfen, die Entwicklung auf dem richtigen Weg fortzusetzen. 

Gibt es subtile Merkmale des Codes? Wo werden sie verwendet? : Wenn der Code irgendetwas Subtiles und diskursives aufweist, ist es auf jeden Fall einen Kommentar wert.

## Zusammenfassung

Ein wichtiges Zeichen eines guten Programmierers sind Kommentare: ihr Vorhandensein und sogar ihr Nichtvorhandensein.

Gute Kommentare ermöglichen es uns, den Code gut zu pflegen, später darauf zurückzukommen und ihn effektiver zu nutzen.

**Verwende Kommentare:**

- allgemeiner Überblick, Überblick über die Struktur des Codes
- Verwendung von Funktionen.
- Wichtige Lösungsansätze, insbesondere wenn sie nicht sofort offensichtlich sind.

**Vermeide Kommentare:**

- Welche beschreiben "wie Code funktioniert" oder "was er tut"
- Setze sie nur dann ein, wenn es unmöglich ist, den Code so einfach und selbsterklärend zu gestalten, dass er sie nicht benötigt.

Kommentare werden auch für Autodokumentations-Tools wie JSDoc3 verwendet: sie lesen diese und erzeugen HTML-Dokumente (oder Dokumente in einem anderen Format)
