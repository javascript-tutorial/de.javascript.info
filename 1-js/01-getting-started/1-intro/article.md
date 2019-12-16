# Eine Einführung in JavaScript

Mal sehen, was das Besondere an JavaScript ist, was wir damit erreichen können und welche anderen Technologien gut damit umgehen.

## Was ist JavaScript?

*JavaScript* wurde ursprünglich entwickelt, um *"Webseiten lebendig zu machen "*.

Die Programme dieser Sprache werden *scripts* genannt. Sie können direkt im HTML der Seite geschrieben werden und werden automatisch beim laden der Seite ausgeführt.

Diese Scripts werden im Klartext bereitgestellt und ausgeführt. Sie benötigen keine spezielle Vorbereitung oder Kompilierung um zu funktionieren.

In diesem Aspekt unterscheidet sich JavaScript sehr von einer anderen Sprache namens [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Wiso wird es <u>Java</u>Script genannt?"
Als JavaScript erstellt wurde, hatte es zunächst einen anderen Namen: "LiveScript". Aber Java war damals sehr beliebt, so dass beschlossen wurde, dass die Positionierung einer neuen Sprache als "jüngerer Bruder" von Java helfen würde.

Aber als es sich entwickelte, wurde JavaScript zu einer völlig unabhängigen Sprache mit einer eigenen Spezifikation namens [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), und jetzt hat es überhaupt keinen Bezug zu Java.
```

Heute kann JavaScript nicht mehr nur im Browser ausgeführt werden. Es ist möglich JavaScript auch auf dem Server oder einem anderen beliebigen Geräte auszuführen, welches über ein Programm namens [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine) verfügt.

Der Browser verfügt über eine eingebettete Engine, die manchmal auch als "JavaScript Virtual Machine" bezeichnet wird.

Verschiedene Engines haben unterschiedliche "Codenamen". Zum Beispiel:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome und Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...Es existieren auch noch andere Codenamen wie "Trident" und "Chakra" für verschiedene Versionen von IE, "ChakraCore" fpr Microsoft Edge, "Nitro" und "SquirrelFish" für Safari, usw.

Die obigen Begriffe sind gut zu merken, da sie in Entwicklerartikeln im Internet verwendet werden. Wir werden sie auch benutzen. Wenn zum Beispiel "ein Feature X von V8 unterstützt wird", dann funktioniert es wahrscheinlich in Chrome und Opera.

```smart header="Wie funktioniert die Engine?"

Engines sind kompliziert. Aber die Grundlagen sind einfach.

1. Die Engine (embedded if it's a browser) liest ("parses") den Script.
2. Danach wird der Script in die Maschinensprache übersetzt ("compiles").
3. Und zum Schluss wird der Maschienen Code ausgeführt, was ziemlich schnell passiert.

Die Engine wendet in jedem Schritt des Prozesses Optimierungen an. Es beobachtet sogar das kompilierte Skript, während es läuft, analysiert die Daten, die durch es fließen, und optimiert den Maschinencode basierend auf diesem Wissen weiter.
```

## Was kann in-browser JavaScript tun?

Modernes JavaScript ist eine "sichere" Programmiersprache. Es bietet keinen Low-Level-Zugriff auf Speicher oder CPU, da es ursprünglich für Browser erstellt wurde, die es nicht benötigen.

Die Funktionen von JavaScript hängen stark von der Umgebung ab, in der es ausgeführt wird. Beispielsweise unterstützt [Node.js](https://wikipedia.org/wiki/Node.js) Funktionen, die es JavaScript ermöglichen, beliebige Dateien zu lesen/schreiben, Netzwerkanfragen durchzuführen, etc.

In-Browser JavaScript kann alles, was mit der Manipulation von Webseiten, der Interaktion mit dem Benutzer und dem Webserver zu tun hat.

So ist beispielsweise In-Browser JavaScript in der Lage:

- Der Seite neues HTML zu addieren, den existierenden content zu modifizieren, oder die Stile anzupassen.
- Auf Benutzeraktionen zu reagieren, zum Beispiel Mausklicks, Mauszeigerbewegungen oder Tastenanschläge.
- Anfragen and entfernte Server über das Netzwerk zu versenden und Daten hoch und runter zu laden (dies technologien werden [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) und [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) genannt).
- Lesen und schreiben von cookies sowie das abragen des Benutzers oder das anzeigen von Nachrichten.
- Speichern der Daten auf der client-side ("local storage").

## Was kann JavaScript im Browser nicht tun?

Die Fähigkeiten von JavaScript im Browser sind aus Gründen der Sicherheit des Benutzers eingeschränkt. Ziel ist es, zu verhindern, dass eine bösartige Webseite auf private Informationen zugreift oder die Daten des Benutzers schädigt.

Examples of such restrictions include:

- JavaScript on a webpage may not read/write arbitrary files on the hard disk, copy them or execute programs. It has no direct access to OS system functions.

    Modern browsers allow it to work with files, but the access is limited and only provided if the user does certain actions, like "dropping" a file into a browser window or selecting it via an `<input>` tag.

    There are ways to interact with camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and contain a special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com` and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limits do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugin/extensions which may ask for extended permissions.

## What makes JavaScript unique?

There are at least *three* great things about JavaScript:

```compare
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Support by all major browsers and enabled by default.
```
JavaScript is the only browser technology that combines these three things.

That's what makes JavaScript unique. That's why it's the most widespread tool for creating browser interfaces.

That said, JavaScript also allows to create servers, mobile applications, etc.

## Languages "over" JavaScript

The syntax of JavaScript does not suit everyone's needs. Different people want different features.

That's to be expected, because projects and requirements are different for everyone.

So recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.

Modern tools make the transpilation very fast and transparent, actually allowing developers to code in another language and auto-converting it "under the hood".

Examples of such languages:

- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.

There are more. Of course, even if we use one of transpiled languages, we should also know JavaScript to really understand what we're doing.

## Summary

- JavaScript was initially created as a browser-only language, but is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language with full integration with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
