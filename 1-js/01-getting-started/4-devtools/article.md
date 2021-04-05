# Entwickler-Konsole

Code ist anfällig für Fehler. Du wirst sehr wahrscheinlich Fehler machen... Oh, was rede ich da? Du wirst *auf jeden Fall* Fehler machen, zumindest wenn du ein Mensch bist und kein [Roboter](https://en.wikipedia.org/wiki/Bender_(Futurama)).

Aber im Browser sehen die Benutzer standardmäßig keine Fehler. Wenn also im Skript etwas schief geht, sehen wir nicht, was fehlerhaft ist und können es nicht beheben.

Um Fehler zu sehen und weitere nützliche Informationen über Skripte zu erhalten, wurden "Entwicklerwerkzeuge" in die Browser eingebettet.

Die meisten Entwickler tendieren bei der Entwicklung zu Chrome oder Firefox, da diese Browser über die besten Entwicklerwerkzeuge verfügen. Andere Browser bieten ebenfalls Entwicklerwerkzeuge an, manchmal mit speziellen Funktionen, aber in der Regel lassen Chrome oder Firefox diese hinter sich. So haben die meisten Entwickler einen "Lieblingsbrowser" und wechseln zu einen anderen, wenn es ein browserspezifisches Problem gibt.

<<<<<<< HEAD
Entwicklerwerkzeuge sind leistungsstark; sie haben viele Funktionen. Zu Beginn werden wir lernen, wie man sie öffnet, Fehler betrachtet und JavaScript-Befehle ausführt.
=======
Developer tools are potent, they have many features. To start, we'll learn how to open them, look at errors, and run JavaScript commands.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3

## Google Chrome

Öffne die Seite [bug.html](bug.html).

Dort ist ein Fehler im JavaScript-Code. Er ist aus Sicht eines normalen Besuchers nicht zu sehen, also öffnen wird die Entwicklerwerkzeuge um ihn zu sehen.

Drücke `key:F12` oder wenn du auf einem Mac bist `key:Cmd+Opt+J`.

Die Entwicklerwerkzeuge öffnen sich standardmäßig auf dem Konsolen-Reiter.

Es sieht in etwa so aus:

![chrome](chrome.png)

Das genaue Aussehen der Entwicklerwerkzeuge hängt von deiner Chrome-Version ab. Es ändert sich von Zeit zu Zeit, sollte aber ähnlich aussehen.

- Hier sehen wir die rot eingefärbte Fehlermeldung. In diesem Fall enthält das Skript einen unbekannten "lalala"-Befehl.
- Auf der rechten Seite ist ein anklickbarer Link zur Quelle `bug.html:12` mit der Zeilennummer, wo der Fehler aufgetreten ist.

Unter der Fehlermeldung befindet sich ein blaues `>` Symbol. Es markiert eine "Befehlszeile" wo wir JavaScript-Befehle eingeben können. Drücke `key:Enter` um sie auszuführen.

Jetzt können wir Fehler erkennen, und das reicht für den Anfang. Wir werden später noch einmal auf die Entwicklerwerkzeuge zurückkommen und das Debugging ausführlicher im Kapitel <info:debugging-chrome> behandeln.

```smart header="Multi-line input"
Wenn wir eine Codezeile in die Konsole eingeben und dann `key:Enter` drücken, wird sie normalerweise ausgeführt.

Um mehrere Zeilen einzufügen, drücke `key:Shift+Enter`. Auf diese Weise kann man lange Fragmente von JavaScript-Code eingeben.
```

## Firefox, Edge, und andere

Die meisten Browser benutzen `key:F12` um die Entwicklerwerkzeuge zu öffnen.

Das Aussehen ist meist sehr ähnlich. Sobald du weißt wie man eins dieser Tools benutzt (du kannst mit Chrome anfangen), kannst du einfach zu einem anderen wechseln.

## Safari

Safari (Mac Browser, nicht unterstützt werden Windows/Linux) ist etwas speziell. Wir müssen zuerst das "Entwickler-Menü" aktivieren.

Öffne Einstellungen und wähle "Erweitert" aus. Dort ist unten ein Kontrollkästchen:

![safari](safari.png)

Nun kann `key:Cmd+Opt+C` die Konsole umschalten. Beachte ebenfalls den neuen Menüeintrag "Entwickler", der aufgetaucht ist. Dieser hat viele Befehle und Optionen.

## Zusammenfassung

- Entwicklertools ermöglichen uns Fehler zu sehen, Befehle auszuführen, Variablen zu untersuchen und vieles mehr
- Sie können mit `key:F12` in den meisten Browsern auf Windows geöffnet werden. Chrome für den Mac benötigt `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (muss erst eingeschaltet werden).

Nun ist unsere Umgebung bereit. Im nächsten Abschnitt kommen wir zu JavaScript.
