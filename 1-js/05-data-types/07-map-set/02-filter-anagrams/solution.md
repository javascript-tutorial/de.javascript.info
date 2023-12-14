Um alle Anagramme zu finden, lassen wir uns jede Zeichenkette in Buchstaben aufteilen und sortieren sie. Wenn sie buchstabensortiert sind, sind alle Anagramme gleich.

Zum Beispiel:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Wir verwenden die buchstabensortierten Varianten als Schlüssel in einer Map, um nur einen Wert pro Schlüssel zu speichern:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // das Wort in Buchstaben aufteilen, sortieren und wieder zusammenfügen
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Das Buchstabensortieren wird durch die Aufrufkette in der Zeile `(*)` durchgeführt.

Zur besseren Übersicht teilen wir es in mehrere Zeilen auf:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

Zwei unterschiedliche Wörter `'PAN'` und `'nap'` erhalten dieselbe buchstabensortierte Form `'anp'`.

Die nächste Zeile fügt das Wort in die Map ein:

```js
map.set(sorted, word);
```

Wenn wir erneut auf ein Wort mit derselben buchstabensortierten Form stoßen, wird der vorherige Wert mit demselben Schlüssel in der Map überschrieben. Daher haben wir immer maximal ein Wort pro Buchstabenform.

Am Ende erzeugt `Array.from(map.values())` ein iterierbares über die Werte der Map (wir benötigen die Schlüssel im Ergebnis nicht) und gibt ein Array davon zurück.

Hier könnten wir anstelle der `Map` auch ein einfaches Objekt verwenden, da die Schlüssel Zeichenketten sind.

So könnte die Lösung aussehen:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
