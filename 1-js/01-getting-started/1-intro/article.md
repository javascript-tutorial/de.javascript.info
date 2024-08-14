# Eine Einführung in JavaScript

<<<<<<< HEAD
Mal sehen, was das Besondere an JavaScript ist, was wir damit erreichen können und welche anderen Technologien gut damit umgehen.
=======
Let's see what's so special about JavaScript, what we can achieve with it, and what other technologies play well with it.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

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

<<<<<<< HEAD
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome und Opera.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...Es existieren auch noch andere Kodnamen wie "Trident" und "Chakra" für verschiedene Versionen von IE, "ChakraCore" für Microsoft Edge, "Nitro" und "SquirrelFish" für Safari, usw.

Die obigen Begriffe sind gut zu merken, da sie in Entwicklerartikeln im Internet verwendet werden. Wir werden sie auch benutzen. Wenn zum Beispiel "ein Feature X von V8 unterstützt wird", dann funktioniert es wahrscheinlich in Chrome und Opera.
=======
- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- in Chrome, Opera and Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- in Firefox.
- ...There are other codenames like "Chakra" for IE, "JavaScriptCore", "Nitro" and "SquirrelFish" for Safari, etc.

The terms above are good to remember because they are used in developer articles on the internet. We'll use them too. For instance, if "a feature X is supported by V8", then it probably works in Chrome, Opera and Edge.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

```smart header="Wie funktioniert die Engine?"

Engines sind kompliziert. Aber die Grundlagen sind einfach.

<<<<<<< HEAD
1. Die Engine (eingebettet, wenn es sich um einen Browser handelt) liest ("parses") den Script.
2. Danach wird der Script in die Maschinensprache übersetzt ("Kompilieren").
3. Und zum Schluss wird der Maschienen Code ausgeführt, was ziemlich schnell passiert.
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

Die Engine wendet in jedem Schritt des Prozesses Optimierungen an. Es beobachtet sogar das kompilierte Skript, während es läuft, analysiert die Daten, die durch es fließen, und optimiert den Maschinencode basierend auf diesem Wissen weiter.
```

## Was kann in-browser JavaScript tun?

<<<<<<< HEAD
Modernes JavaScript ist eine "sichere" Programmiersprache. Es bietet keinen Low-Level-Zugriff auf Speicher oder CPU, da es ursprünglich für Browser erstellt wurde.
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

Die Funktionen von JavaScript hängen stark von der Umgebung ab, in der es ausgeführt wird. Beispielsweise unterstützt [Node.js](https://wikipedia.org/wiki/Node.js) Funktionen, die es JavaScript z.B. ermöglichen, beliebige Dateien zu lesen oder zu schreiben, sowie Netzwerkanfragen durchzuführen.

In-Browser JavaScript kann alles, was mit der Manipulation von Webseiten, der Interaktion mit dem Benutzer und dem Webserver zu tun hat.

So ist beispielsweise In-Browser JavaScript in der Lage:

- Der Seite neues HTML zu addieren, den existierenden content zu modifizieren, oder die Stile anzupassen.
- Auf Benutzeraktionen zu reagieren, zum Beispiel Mausklicks, Mauszeigerbewegungen oder Tastenanschläge.
- Anfragen and entfernte Server über das Netzwerk zu versenden und Daten hoch und runter zu laden (diese technologien werden [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) und [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) genannt).
- Lesen und schreiben von cookies, sowie das abfragen des Benutzers oder das anzeigen von Nachrichten.
- Speichern der Daten auf der client-side ("local storage"), also im Browser des Benutzers.

## Was kann JavaScript im Browser nicht tun?

<<<<<<< HEAD
<<<<<<< HEAD
Die Fähigkeiten von JavaScript im Browser sind aus Gründen der Sicherheit des Benutzers eingeschränkt. Ziel ist es, zu verhindern, dass eine bösartige Webseite auf private Informationen zugreift oder die Daten des Benutzers schädigt.
=======
JavaScript's abilities in the browser are limited for the sake of a user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

Beispiele für solche Beschränkungen sind:

- JavaScript auf einer Webseite darf keine beliebigen Dateien auf der Festplatte lesen/schreiben, sie kopieren oder Programme ausführen. Es hat keinen direkten Zugriff auf die Funktionen des Betriebssystems.

    Moderne Browsers erlauben es mit Dateien zu arbeiten. Der Zugriff ist jedoch beschränkt und nur möglich wenn der Benutzer bestimmte Aktionen ausführt, z.B. die Datei in den Browser per "drag and drop" lädt oder sie via `<input>` tag auswählt.

<<<<<<< HEAD
    Es gibt auch Möglichkeiten mit der Kamera oder dem Mikrofon des Geräts zu interagieren. Dies benötigt aber die explizite Zustimmung des Benutzers. Deshalb kann eine JavaScript-enabled Website nicht heimlich die Webcam aktivieren, die Umgebung beobachten und die Informationen and die [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) übermitteln.
- Unterschiedliche Tabs und Fenster wissen in der Regel nicht voneinander. Es gibt jedoch Ausnahmen, bei welchen dies doch der Fall ist. Dies kann z.B. passieren, wenn durch JavaScript ein neues Fenster geöffnet wird. Aber selbst in diesem Fall kann es sein, dass JavaScript von einer Seite nicht auf die andere Seite zugreifen kann, wenn sie von verschiedenen Seiten (von einer anderen Domäne, einem anderen Protokoll oder Port) kommen.

    Dies wird die "Same Origin Policy" genannt. Um das zu umgehen, müssen *beide Seiten* für den Datenaustausch übereinstimmen und einen speziellen JavaScript-Code enthalten, der dies behandelt. Wir werden das im Tutorial behandeln.

    Auch diese Einschränkung dient der Sicherheit des Benutzers. Eine Seite von `http://anysite.com`, die ein Benutzer geöffnet hat, darf nicht in der Lage sein, auf einen anderen Browser-Tab mit der URL `http://gmail.com` zuzugreifen und Informationen von dort zu stehlen.
- JavaScript kann leicht über das Netz mit dem Server kommunizieren, von dem die aktuelle Seite stammt. Aber seine Fähigkeit, Daten von anderen Seiten/Domains zu empfangen, ist eingeschränkt.
Obwohl es möglich ist, erfordert es eine ausdrückliche Zustimmung (ausgedrückt in HTTP-Headern) von der entfernten Seite. Auch dies ist eine Sicherheitseinschränkung.

![](limitations.svg)

Solche Einschränkungen bestehen nicht, wenn JavaScript außerhalb des Browsers, z.B. auf einem Server, verwendet wird. Moderne Browser erlauben auch Plugins/Erweiterungen, die unter Umständen nach erweiterten Rechten fragen.
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

## What makes JavaScript unique?

Es gibt mindestens *drei* großartige Dinge über JavaScript:

```compare
<<<<<<< HEAD
+ Volle integration in HTML und CSS.
+ Einfache Dinge werden einfach gemacht.
+ Unterstützung von allen gängigen Browsern und standardmäßig aktiviert.
=======
+ Full integration with HTML/CSS.
+ Simple things are done simply.
+ Supported by all major browsers and enabled by default.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
```
JavaScript ist die einzige Browser-Technologie, die diese drei Dinge vereint.

Das macht JavaScript einzigartig. Deshalb ist es das am weitesten verbreitete Werkzeug zur Erstellung von Browser-Oberflächen.

<<<<<<< HEAD
Trotzdem erlaubt JavaScript auch die Erstellung von Servern, mobilen Anwendungen, etc.
=======
That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

## Sprachen "über" JavaScript

Die Syntax von JavaScript ist nicht für jeden geeignet. Verschiedene Menschen wollen unterschiedliche Funktionen.

Das ist zu erwarten, denn Projekte und Anforderungen sind für jeden anders.

<<<<<<< HEAD
So sind vor kurzem eine Fülle neuer Sprachen erschienen, die in JavaScript *transpiled* (konvertiert) werden, bevor sie im Browser laufen.
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

Moderne Werkzeuge machen die Transpilation sehr schnell und transparent und erlauben es den Entwicklern tatsächlich, in einer anderen Sprache zu programmieren und diese "unter der Haube" automatisch zu konvertieren.

Beispiele für solche Sprachen sind:

<<<<<<< HEAD
<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) ist ein "syntactic sugar" für JavaScript. Es führt eine kürzere Syntax ein, was uns erlaubt, klareren und präziseren Code zu schreiben. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) ist darauf konzentriert "strict data typing" hinzuzufügen. TypeScript verfolg das Ziel den Entwicklungsprozess und den Support für komplexe Systeme zu vereinfachen. Die Sprache wurde von Microsoft entwickelt.
- [Flow](http://flow.org/) fügt auch "data typing" hinzu, aber auf eine andere Art und Weise. Sie wurde von Facebook entwickelt.
- [Dart](https://www.dartlang.org/) ist eine eigenständige Sprache, die eine eigene Engine hat, die in Nicht-Browser-Umgebungen (wie z.B. mobilen Anwendungen) läuft, aber auch in JavaScript umgesetzt werden kann. Sie wurde von Google entwickelt.
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

<<<<<<< HEAD
Es gibt noch mehr. Auch wenn wir eine der transpilierten Sprachen verwenden sollten wir auch JavaScript trozdem kennen. Es ist wichtig zu verstehen, was im Hintergrund passiert und was wir eigentlich tun.
=======
There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

## Zusammenfassung

<<<<<<< HEAD
- JavaScript wurde ursprünglich als reine Browser-Sprache entwickelt, wird aber mittlerweile auch in vielen anderen Umgebungen eingesetzt.
- Heute hat JavaScript eine einzigartige Position als die am weitesten verbreitete Browsersprache mit voller Integration in HTML/CSS.
- Es gibt viele Sprachen, die auf JavaScript "transponiert" werden und bestimmte Funktionen bieten. Es wird empfohlen, sich diese zumindest kurz anzuschauen, nachdem man JavaScript beherrscht.
=======
- JavaScript was initially created as a browser-only language, but it is now used in many other environments as well.
- Today, JavaScript has a unique position as the most widely-adopted browser language, fully integrated with HTML/CSS.
- There are many languages that get "transpiled" to JavaScript and provide certain features. It is recommended to take a look at them, at least briefly, after mastering JavaScript.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
