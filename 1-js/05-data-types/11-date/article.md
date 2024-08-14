# Datum und Uhrzeit

Lass uns ein neues eingebautes Objekt kennenlernen: [Date](mdn:js/Date). Es speichert das Datum, die Uhrzeit und bietet Methoden zur Verwaltung von Datum/Uhrzeit.

Zum Beispiel können wir es verwenden, um Erstellungs-/Änderungszeiten zu speichern, die Zeit zu messen oder einfach nur das aktuelle Datum auszugeben.

## Erstellung

Um ein neues `Date`-Objekt zu erstellen, rufe `new Date()` mit einem der folgenden Argumente auf:

`new Date()`
: Ohne Argumente – erstellt ein `Date`-Objekt für das aktuelle Datum und die aktuelle Uhrzeit:

    ```js run
    let now = new Date();
    alert( now ); // zeigt aktuelles Datum/Uhrzeit
    ```

`new Date(milliseconds)`
: Erstelle ein `Date`-Objekt mit der Zeit gleich der Anzahl von Millisekunden (1/1000 einer Sekunde), die seit dem 1. Januar 1970 UTC+0 vergangen sind.

    ```js run
    // 0 bedeutet 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // nun 24 Stunden hinzufügen, ergibt 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Eine ganze Zahl, die die Anzahl der Millisekunden darstellt, die seit Beginn des Jahres 1970 vergangen sind, wird als *Zeitstempel* bezeichnet.

    Es ist eine leichtgewichtige numerische Darstellung eines Datums. Wir können immer ein Datum aus einem Zeitstempel erstellen mit `new Date(timestamp)` und das bestehende `Date`-Objekt in einen Zeitstempel umwandeln mit der Methode `date.getTime()` (siehe unten).

    Daten vor dem 01.01.1970 haben negative Zeitstempel, zum Beispiel:
    ```js run
    // 31. Dez 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Wenn es ein einzelnes Argument gibt und es ist ein String, dann wird es automatisch geparst. Der Algorithmus ist derselbe, den `Date.parse` verwendet, was wir später behandeln werden.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Die Zeit ist nicht gesetzt, daher wird angenommen, dass es Mitternacht GMT ist
    // und sie wird entsprechend der Zeitzone angepasst, in der der Code ausgeführt wird
    // Das Ergebnis könnte also sein
    // Do., 26. Jan. 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // oder
    // Mi., 25. Jan. 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Erstelle das Datum mit den gegebenen Komponenten in der lokalen Zeitzone. Nur die ersten beiden Argumente sind obligatorisch.

    - `year` sollte 4 Ziffern haben. Aus Kompatibilitätsgründen werden auch 2 Ziffern akzeptiert und als `19xx` betrachtet, zum Beispiel entspricht `98` dem Wert `1998`, aber die Verwendung von 4 Ziffern wird dringend empfohlen.
    - `month` zählt ab `0` (Januar), bis `11` (Dezember).
    - Der `date`-Parameter ist tatsächlich der Tag des Monats, wenn weggelassen, dann wird `1` angenommen.
    - Wenn `hours/minutes/seconds/ms` weggelassen werden, wird angenommen, dass diese `0` sind.

    Beispiel:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1. Jan 2011, 00:00:00
    new Date(2011, 0, 1); // das Gleiche, Stunden usw. sind standardmäßig 0
    ```

    Die größtmögliche Genauigkeit ist 1 ms (1/1000 Sekunde):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Zugriff auf Datumskomponenten

Es gibt Methoden, um auf das Jahr, den Monat usw. des `Date`-Objekts zuzugreifen:

[getFullYear()](mdn:js/Date/getFullYear)
: Zugriff auf das Jahr (4 Ziffern)

[getMonth()](mdn:js/Date/getMonth)
: Zugriff auf den Monat, **von 0 bis 11**.

[getDate()](mdn:js/Date/getDate)
: Zugriff auf den Tag des Monats, von 1 bis 31, der Name der Methode wirkt etwas seltsam.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Zugriff auf die entsprechenden Zeitkomponenten.

```warn header="Nicht `getYear()`, sondern `getFullYear()`"
Viele JavaScript-Engines implementieren eine nicht-standardisierte Methode `getYear()`. Diese Methode ist veraltet. Sie gibt manchmal ein 2-stelliges Jahr zurück. Bitte verwende sie niemals. Es gibt `getFullYear()` für das Jahr.
```

Zusätzlich können wir den Wochentag bekommen:

[getDay()](mdn:js/Date/getDay)
: Zugriff auf den Wochentag, von `0` (Sonntag) bis `6` (Samstag). Der erste Tag ist immer Sonntag, in einigen Ländern ist das nicht so, aber das kann nicht geändert werden.

**Alle oben genannten Methoden geben die Komponenten relativ zur lokalen Zeitzone zurück.**

Es gibt auch ihre UTC-Gegenstücke, die Tag, Monat, Jahr usw. für die Zeitzone UTC+0 zurückgeben: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Füge einfach nach `"get"` das `"UTC"` ein.

Wenn deine lokale Zeitzone relativ zu UTC verschoben ist, dann zeigt der untenstehende Code unterschiedliche Stunden an:

```js run
// aktuelles Datum
let date = new Date();

// die Stunde in Ihrer aktuellen Zeitzone
alert( date.getHours() );

// die Stunde in der Zeitzone UTC+0 (Londoner Zeit ohne Sommerzeit)
alert( date.getUTCHours() );
```

Neben den gegebenen Methoden gibt es zwei spezielle, die keine UTC-Variante haben:

[getTime()](mdn:js/Date/getTime)
: Gibt den Zeitstempel für das Datum zurück -- eine Anzahl von Millisekunden seit dem 1. Januar 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Gibt den Unterschied zwischen UTC und der lokalen Zeitzone in Minuten zurück:

    ```js run
    // Wenn du dich in der Zeitzone UTC-1 befindest, gibt es 60 aus
    // Wenn du dich in der Zeitzone UTC+3 befindest, gibt es -180 aus
    alert( new Date().getTimezoneOffset() );

    ```

## Datumskomponenten einstellen

Die folgenden Methoden erlauben es, Datum/Zeit-Komponenten festzulegen:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (setzt das ganze Datum auf Millisekunden seit dem 01.01.1970 UTC)

Jede dieser Methoden außer `setTime()` hat ein UTC-Gegenstück, wie zum Beispiel: `setUTCHours()`.

Wie wir sehen können, können einige Methoden gleichzeitig mehrere Komponenten anpassen, zum Beispiel `setHours`. Die Komponenten, die nicht erwähnt werden, werden nicht geändert.

Beispiel:

```js run
let heute = new Date();

heute.setHours(0);
alert(heute); // immer noch heute, aber die Stunde ist auf 0 geändert

heute.setHours(0, 0, 0, 0);
alert(heute); // immer noch heute, jetzt 00:00:00 genau.
```

## Autokorrektur

Die *Autokorrektur* ist eine sehr praktische Funktion von `Date`-Objekten. Wir können Werte außerhalb des Bereichs verwenden, und sie wird diese automatisch anpassen.

Beispiel:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32. Jan 2013 ?!?
alert(date); // ...ist der 1. Feb 2013!
```

Datumskomponenten außerhalb des Bereichs werden automatisch verteilt.

Angenommen, wir müssen das Datum "28. Feb 2016" um 2 Tage erhöhen. Es könnte der "2. März" oder der "1. März" im Falle eines Schaltjahres sein. Wir müssen nicht darüber nachdenken. Einfach 2 Tage hinzufügen. Das `Date`-Objekt erledigt den Rest:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1. Mär 2016
```

Diese Funktion wird oft verwendet, um das Datum nach einer bestimmten Zeitperiode zu erhalten. Zum Beispiel, lass uns das Datum für "70 Sekunden ab jetzt" erhalten:

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // zeigt das korrekte Datum
```

Wir können auch null oder sogar negative Werte verwenden. Zum Beispiel:

```js run
let date = new Date(2016, 0, 2); // 2. Jan 2016

date.setDate(1); // lege Tag 1 des Monats fest
alert( date );

date.setDate(0); // minimaler Tag ist 1, also wird der letzte Tag des Vormonats angenommen
alert( date ); // 31. Dez 2015
```

## Datum in Zahl, Datumsunterschied

Wenn ein `Date`-Objekt in eine Zahl umgewandelt wird, wird es zum Zeitstempel genauso wie `date.getTime()`:

```js run
let date = new Date();
alert(+date); // die Anzahl der Millisekunden, genau wie date.getTime()
```

Die wichtige Seiteneffekt: Daten können subtrahiert werden, das Ergebnis ist ihr Unterschied in Millisekunden.

Das kann für Zeitmessungen verwendet werden:

```js run
let start = new Date(); // beginnen mit der Zeitmessung

// verrichte Arbeit
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // beenden der Zeitmessung

alert( `Die Schleife dauerte ${end - start} ms` );
```

## Date.now()

Wenn wir nur die Zeit messen wollen, benötigen wir kein `Date`-Objekt.

Es gibt eine spezielle Methode `Date.now()`, die den aktuellen Zeitstempel zurückgibt.

Sie ist semantisch gleichbedeutend mit `new Date().getTime()`, aber sie erstellt kein Zwischen-`Date`-Objekt. Daher ist sie schneller und belastet die Garbage-Kollektion nicht.

Sie wird meistens aus Bequemlichkeit oder wenn Performance wichtig ist verwendet, wie in JavaScript-Spielen oder anderen spezialisierten Anwendungen.

Also ist das vermutlich besser:

```js run
*!*
let start = Date.now(); // Millisekunden seit 1. Jan 1970
*/!*

// verrichte Arbeit
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // fertig
*/!*

alert( `Die Schleife dauerte ${end - start} ms` ); // subtrahiere Zahlen, nicht Daten
```

## Benchmarking

Wenn wir einen verlässlichen Benchmark für eine CPU-intensive Funktion haben wollen, sollten wir vorsichtig sein.

Zum Beispiel, lass uns zwei Funktionen messen, die den Unterschied zwischen zwei Daten berechnen: welche ist schneller?

Solche Leistungsmessungen werden oft "Benchmarks" genannt.

```js
// wir haben date1 und date2, welche Funktion gibt schneller deren Unterschied in ms zurück?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// oder
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Diese beiden machen genau dasselbe, aber eine benutzt ein explizites `date.getTime()`, um das Datum in Millisekunden zu erhalten, und die andere verlässt sich auf eine Datum-zu-Zahl-Umwandlung. Das Ergebnis ist immer das Gleiche.

Also, welche ist schneller?

Die erste Idee könnte sein, sie viele Male hintereinander auszuführen und den Zeitunterschied zu messen. In unserem Fall sind die Funktionen sehr einfach, also müssen wir das mindestens 100000 Mal machen.

Lass uns messen:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Zeit für diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Zeit für diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

Wow! Die Verwendung von `getTime()` ist so viel schneller! Das liegt daran, dass keine Typumwandlung stattfindet und es für die Engines viel einfacher ist, zu optimieren.

Okay, wir haben etwas. Aber das ist noch kein guter Benchmark.

Stell dir vor, dass zur Zeit der Ausführung von `bench(diffSubtract)` die CPU parallel etwas anderes gemacht hat und Ressourcen verbraucht wurden. Und zum Zeitpunkt der Ausführung von `bench(diffGetTime)` war diese Arbeit beendet.

Ein ziemlich reales Szenario für ein modernes Multi-Prozess-Betriebssystem.

Als Ergebnis könnte der erste Benchmark weniger CPU-Ressourcen als der zweite haben. Das könnte zu falschen Ergebnissen führen.

**Für zuverlässigeres Benchmarking sollte das gesamte Paket an Benchmarks mehrmals wiederholt werden.**

Zum Beispiel so:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// führe bench(diffSubtract) und bench(diffGetTime) jeweils 10-mal abwechselnd aus
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Gesamtzeit für diffSubtract: ' + time1 );
alert( 'Gesamtzeit für diffGetTime: ' + time2 );
```

Moderne JavaScript-Engines beginnen damit, fortgeschrittene Optimierungen nur auf "heißen Code" anzuwenden, der viele Male ausgeführt wird (keine Notwendigkeit, selten ausgeführte Dinge zu optimieren). Deshalb sind in dem oben genannten Beispiel die ersten Ausführungen nicht gut optimiert. Wir möchten vielleicht einen Aufwärm-Durchlauf hinzufügen:

```js
// Hinzugefügt zum "Aufwärmen" vor der Hauptschleife
bench(diffSubtract);
bench(diffGetTime);

// jetzt Benchmarking
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Sei vorsichtig bei Mikrobenchmarking"
Moderne JavaScript-Engines führen viele Optimierungen durch. Du kannst die Ergebnisse von "künstlichen Tests" im Vergleich zur "normalen Nutzung" verändern, insbesondere wenn wir etwas sehr Kleines benchmarken, wie die Funktionsweise eines Operators oder einer eingebauten Funktion. Wenn du also die Performance ernsthaft verstehen möchtest, dann studiere bitte, wie die JavaScript-Engine funktioniert. Und dann wirst du wahrscheinlich überhaupt keine Mikrobenchmarks brauchen.

Eine großartige Sammlung von Artikeln über V8 findest Du unter <https://mrale.ph>.
```

## Date.parse aus einem String

Die Methode [Date.parse(str)](mdn:js/Date/parse) kann ein Datum aus einem String auslesen.

Das String-Format sollte sein: `YYYY-MM-DDTHH:mm:ss.sssZ`, wobei:

- `YYYY-MM-DD` -- das Datum ist: Jahr-Monat-Tag.
- Das Zeichen `"T"` wird als Trennzeichen verwendet.
- `HH:mm:ss.sss` -- ist die Zeit: Stunden, Minuten, Sekunden und Millisekunden.
- Der optionale Teil `'Z'` kennzeichnet die Zeitzone im Format `+-hh:mm`. Ein einzelner Buchstabe `Z` würde UTC+0 bedeuten.

Auch kürzere Varianten sind möglich, wie `YYYY-MM-DD` oder `YYYY-MM` oder sogar `YYYY`.

Der Aufruf von `Date.parse(str)` parst den String im gegebenen Format und gibt den Zeitstempel zurück (Anzahl der Millisekunden ab dem 1. Januar 1970 UTC+0). Wenn das Format ungültig ist, gibt er `NaN` zurück.

Zum Beispiel:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (Zeitstempel)
```

Wir können sofort ein `new Date` Objekt aus dem Zeitstempel erstellen:

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);
```

## Zusammenfassung

- Datum und Uhrzeit in JavaScript werden mit dem [Date](mdn:js/Date)-Objekt dargestellt. Wir können nicht "nur Datum" oder "nur Zeit" erstellen: `Date`-Objekte tragen immer beides.
- Monate werden von Null gezählt (ja, Januar ist der Null-Monat).
- Wochentage in `getDay()` werden auch ab Null gezählt (das ist Sonntag).
- `Date` korrigiert sich selbst, wenn Komponenten außerhalb des gültigen Bereichs gesetzt werden. Gut für das Hinzufügen/Subtrahieren von Tagen/Monaten/Stunden.
- Daten können subtrahiert werden, was ihre Differenz in Millisekunden ergibt. Das liegt daran, dass ein `Date`, wenn es in eine Zahl umgewandelt wird, zum Zeitstempel wird.
- Verwende `Date.now()`, um schnell den aktuellen Zeitstempel zu erhalten.

Beachte, dass anders als in vielen anderen Systemen, Zeitstempel in JavaScript in Millisekunden und nicht in Sekunden sind.

Manchmal benötigen wir genauere Zeitmessungen. JavaScript selbst hat keine Möglichkeit, Zeit in Mikrosekunden zu messen (1 Millionstel einer Sekunde), aber die meisten Umgebungen bieten dies an. Zum Beispiel hat der Browser [performance.now()](mdn:api/Performance/now), was die Anzahl der Millisekunden seit dem Start des Seitenladens mit Mikrosekunden-Präzision ergibt (3 Ziffern nach dem Punkt):

```js run
alert(`Das Laden hat vor ${performance.now()}ms begonnen`);
// Etwas wie: "Das Laden hat vor 34731.26000000001ms begonnen"
// .26 sind Mikrosekunden (260 Mikrosekunden)
// mehr als 3 Ziffern nach dem Dezimalpunkt sind Präzisionsfehler, nur die ersten 3 sind korrekt
```

Node.js hat das `microtime` Modul und andere Weisen. Technisch gesehen, ermöglicht fast jedes Gerät und jede Umgebung eine genauere Präzision, sie ist nur nicht in `Date`.
