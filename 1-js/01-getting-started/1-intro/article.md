# Eine Einführung in JavaScript

Mal sehen, was das Besondere an JavaScript ist, was wir damit erreichen können und welche anderen Technologien gut damit umgehen.

## Was ist JavaScript?

*JavaScript* wurde ursprünglich entwickelt, um *"Webseiten lebendig zu machen "*.

Die Programme dieser Sprache werden *scripts* genannt. Sie können direkt im HTML der Seite geschrieben werden und werden automatisch beim laden der Seite ausgeführt.

Diese Scripts werden im Klartext bereitgestellt und ausgeführt. Sie benötigen keine spezielle Vorbereitung oder Kompilierung um zu funktionieren.

In diesem Aspekt unterscheidet sich JavaScript sehr von einer anderen Sprache namens [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Warum wird es <u>Java</u>Script genannt?"
Als JavaScript erstellt wurde, hatte es zunächst einen anderen Namen: "LiveScript". Aber Java war damals sehr beliebt, so dass beschlossen wurde, dass die Positionierung einer neuen Sprache als "jüngerer Bruder" von Java helfen würde.

Aber als es sich entwickelte, wurde JavaScript zu einer völlig unabhängigen Sprache mit einer eigenen Spezifikation namens [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), und jetzt hat es überhaupt keinen Bezug mehr zu Java.
```

Heute kann JavaScript nicht mehr nur im Browser ausgeführt werden. Es ist möglich JavaScript auch auf dem Server oder einem anderen beliebigen Geräte auszuführen, welches über ein Programm namens [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine) verfügt.

Der Browser verfügt über eine eingebettete Engine, die manchmal auch als "JavaScript Virtual Machine" bezeichnet wird.

Verschiedene Engines haben unterschiedliche "Kodnamen". Zum Beispiel:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome und Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...Es existieren auch noch andere Kodnamen wie "Trident" und "Chakra" für verschiedene Versionen von IE, "ChakraCore" für Microsoft Edge, "Nitro" und "SquirrelFish" für Safari, usw.

Die obigen Begriffe sind gut zu merken, da sie in Entwicklerartikeln im Internet verwendet werden. Wir werden sie auch benutzen. Wenn zum Beispiel "ein Feature X von V8 unterstützt wird", dann funktioniert es wahrscheinlich in Chrome und Opera.

```smart header="Wie funktioniert die Engine?"

Engines sind kompliziert. Aber die Grundlagen sind einfach.

1. Die Engine (eingebettet, wenn es sich um einen Browser handelt) liest ("parses") den Script.
2. Danach wird der Script in die Maschinensprache übersetzt ("Kompilieren").
3. Und zum Schluss wird der Maschienen Code ausgeführt, was ziemlich schnell passiert.

Die Engine wendet in jedem Schritt des Prozesses Optimierungen an. Es beobachtet sogar das kompilierte Skript, während es läuft, analysiert die Daten, die durch es fließen, und optimiert den Maschinencode basierend auf diesem Wissen weiter.
```

## Was kann in-browser JavaScript tun?

Modernes JavaScript ist eine "sichere" Programmiersprache. Es bietet keinen Low-Level-Zugriff auf Speicher oder CPU, da es ursprünglich für Browser erstellt wurde.

Die Funktionen von JavaScript hängen stark von der Umgebung ab, in der es ausgeführt wird. Beispielsweise unterstützt [Node.js](https://wikipedia.org/wiki/Node.js) Funktionen, die es JavaScript z.B. ermöglichen, beliebige Dateien zu lesen oder zu schreiben, sowie Netzwerkanfragen durchzuführen.

In-Browser JavaScript kann alles, was mit der Manipulation von Webseiten, der Interaktion mit dem Benutzer und dem Webserver zu tun hat.

So ist beispielsweise In-Browser JavaScript in der Lage:

- Der Seite neues HTML zu addieren, den existierenden content zu modifizieren, oder die Stile anzupassen.
- Auf Benutzeraktionen zu reagieren, zum Beispiel Mausklicks, Mauszeigerbewegungen oder Tastenanschläge.
- Anfragen and entfernte Server über das Netzwerk zu versenden und Daten hoch und runter zu laden (diese technologien werden [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) und [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) genannt).
- Lesen und schreiben von cookies, sowie das abfragen des Benutzers oder das anzeigen von Nachrichten.
- Speichern der Daten auf der client-side ("local storage"), also im Browser des Benutzers.

## Was kann JavaScript im Browser nicht tun?

Die Fähigkeiten von JavaScript im Browser sind aus Gründen der Sicherheit des Benutzers eingeschränkt. Ziel ist es, zu verhindern, dass eine bösartige Webseite auf private Informationen zugreift oder die Daten des Benutzers schädigt.

Beispiele für solche Beschränkungen sind:

- JavaScript auf einer Webseite darf keine beliebigen Dateien auf der Festplatte lesen/schreiben, sie kopieren oder Programme ausführen. Es hat keinen direkten Zugriff auf die Funktionen des Betriebssystems.

    Moderne Browsers erlauben es mit Dateien zu arbeiten. Der Zugriff ist jedoch beschränkt und nur möglich wenn der Benutzer bestimmte Aktionen ausführt, z.B. die Datei in den Browser per "drag and drop" lädt oder sie via `<input>` tag auswählt.

    Es gibt auch Möglichkeiten mit der Kamera oder dem Mikrofon des Geräts zu interagieren. Dies benötigt aber die explizite Zustimmung des Benutzers. Deshalb kann eine JavaScript-enabled Website nicht heimlich die Webcam aktivieren, die Umgebung beobachten und die Informationen and die [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) übermitteln.
- Unterschiedliche Tabs und Fenster wissen in der Regel nicht voneinander. Es gibt jedoch Ausnahmen, bei welchen dies doch der Fall ist. Dies kann z.B. passieren, wenn durch JavaScript ein neues Fenster geöffnet wird. Aber selbst in diesem Fall kann es sein, dass JavaScript von einer Seite nicht auf die andere Seite zugreifen kann, wenn sie von verschiedenen Seiten (von einer anderen Domäne, einem anderen Protokoll oder Port) kommen.

    Dies wird die "Same Origin Policy" genannt. Um das zu umgehen, müssen *beide Seiten* für den Datenaustausch übereinstimmen und einen speziellen JavaScript-Code enthalten, der dies behandelt. Wir werden das im Tutorial behandeln.

    Auch diese Einschränkung dient der Sicherheit des Benutzers. Eine Seite von `http://anysite.com`, die ein Benutzer geöffnet hat, darf nicht in der Lage sein, auf einen anderen Browser-Tab mit der URL `http://gmail.com` zuzugreifen und Informationen von dort zu stehlen.
- JavaScript kann leicht über das Netz mit dem Server kommunizieren, von dem die aktuelle Seite stammt. Aber seine Fähigkeit, Daten von anderen Seiten/Domains zu empfangen, ist eingeschränkt.
Obwohl es möglich ist, erfordert es eine ausdrückliche Zustimmung (ausgedrückt in HTTP-Headern) von der entfernten Seite. Auch dies ist eine Sicherheitseinschränkung.

![](limitations.svg)

Solche Einschränkungen bestehen nicht, wenn JavaScript außerhalb des Browsers, z.B. auf einem Server, verwendet wird. Moderne Browser erlauben auch Plugins/Erweiterungen, die unter Umständen nach erweiterten Rechten fragen.

## What makes JavaScript unique?

Es gibt mindestens *drei* großartige Dinge über JavaScript:

```compare
+ Volle integration in HTML und CSS.
+ Einfache Dinge werden einfach gemacht.
+ Unterstützung von allen gängigen Browsern und standardmäßig aktiviert.
```
JavaScript ist die einzige Browser-Technologie, die diese drei Dinge vereint.

Das macht JavaScript einzigartig. Deshalb ist es das am weitesten verbreitete Werkzeug zur Erstellung von Browser-Oberflächen.

Trotzdem erlaubt JavaScript auch die Erstellung von Servern, mobilen Anwendungen, etc.

## Sprachen "über" JavaScript

Die Syntax von JavaScript ist nicht für jeden geeignet. Verschiedene Menschen wollen unterschiedliche Funktionen.

Das ist zu erwarten, denn Projekte und Anforderungen sind für jeden anders.

So sind vor kurzem eine Fülle neuer Sprachen erschienen, die in JavaScript *transpiled* (konvertiert) werden, bevor sie im Browser laufen.

Moderne Werkzeuge machen die Transpilation sehr schnell und transparent und erlauben es den Entwicklern tatsächlich, in einer anderen Sprache zu programmieren und diese "unter der Haube" automatisch zu konvertieren.

Beispiele für solche Sprachen sind:

- [CoffeeScript](http://coffeescript.org/) ist ein "syntactic sugar" für JavaScript. Es führt eine kürzere Syntax ein, was uns erlaubt, klareren und präziseren Code zu schreiben. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) ist darauf konzentriert "strict data typing" hinzuzufügen. TypeScript verfolg das Ziel den Entwicklungsprozess und den Support für komplexe Systeme zu vereinfachen. Die Sprache wurde von Microsoft entwickelt.
- [Flow](http://flow.org/) fügt auch "data typing" hinzu, aber auf eine andere Art und Weise. Sie wurde von Facebook entwickelt.
- [Dart](https://www.dartlang.org/) ist eine eigenständige Sprache, die eine eigene Engine hat, die in Nicht-Browser-Umgebungen (wie z.B. mobilen Anwendungen) läuft, aber auch in JavaScript umgesetzt werden kann. Sie wurde von Google entwickelt.

Es gibt noch mehr. Auch wenn wir eine der transpilierten Sprachen verwenden sollten wir auch JavaScript trozdem kennen. Es ist wichtig zu verstehen, was im Hintergrund passiert und was wir eigentlich tun.

## Zusammenfassung

- JavaScript wurde ursprünglich als reine Browser-Sprache entwickelt, wird aber mittlerweile auch in vielen anderen Umgebungen eingesetzt.
- Heute hat JavaScript eine einzigartige Position als die am weitesten verbreitete Browsersprache mit voller Integration in HTML/CSS.
- Es gibt viele Sprachen, die auf JavaScript "transponiert" werden und bestimmte Funktionen bieten. Es wird empfohlen, sich diese zumindest kurz anzuschauen, nachdem man JavaScript beherrscht.
