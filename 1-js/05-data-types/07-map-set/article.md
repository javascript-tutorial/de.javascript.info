# Map und Set

Bisher haben wir folgende komplexe Datenstrukturen kennengelernt:

- Objekte werden für die Speicherung von Sammlungen mit Schlüsseln verwendet.
- Arrays werden für die Speicherung von geordneten Sammlungen verwendet.

Aber das reicht für das echte Leben nicht aus. Deshalb gibt es auch `Map` und `Set`.

## Map

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) ist eine Sammlung von Daten-Elementen mit Schlüsseln, ähnlich wie ein `Object`. Der Hauptunterschied ist jedoch, dass `Map` Schlüssel jeglichen Typs zulässt.

Methoden und Eigenschaften sind:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- erstellt die Map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- speichert den Wert unter dem Schlüssel.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- gibt den Wert zum Schlüssel zurück, `undefined` wenn der `key` nicht in der Map existiert.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- gibt `true` zurück, wenn der `key` existiert, andernfalls `false`.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- entfernt das Element (das Schlüssel/Wert-Paar) anhand des Schlüssels.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- entfernt alles aus der Map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- gibt die aktuelle Anzahl der Elemente zurück.

Zum Beispiel:

```js run
let map = new Map();

map.set('1', 'str1');   // ein String als Schlüssel
map.set(1, 'num1');     // eine Zahl als Schlüssel
map.set(true, 'bool1'); // ein Boolean als Schlüssel

// erinnerst Du Dich an das reguläre Objekt? Es würde Schlüssel zu Strings konvertieren
// Map behält den Typ, daher sind diese beiden unterschiedlich:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Wie wir sehen können, werden im Gegensatz zu Objekten die Schlüssel nicht in Strings umgewandelt. Jeder Schlüsseltyp ist möglich.

```smart header="`map[key]` ist nicht die korrekte Art eine `Map` zu verwenden"
Obwohl `map[key]` auch funktioniert, z.B. wir können `map[key] = 2` setzen, wird `map` dabei wie ein normales JavaScript-Objekt behandelt, daher gelten alle entsprechenden Einschränkungen (nur Strings/Symbol-Schlüssel und so weiter).

Deshalb sollten wir die `map`-Methoden verwenden: `set`, `get` usw.
```

**Map kann auch Objekte als Schlüssel verwenden.**

Zum Beispiel:

```js run
let john = { name: "John" };

// für jeden Benutzer wollen wir die Anzahl der Besuche speichern
let visitsCountMap = new Map();

// john ist der Schlüssel für die Map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Objekte als Schlüssel zu verwenden ist eines der bemerkenswertesten und wichtigsten Merkmale von `Map`. Das Gleiche gilt nicht für `Object`. Strings als Schlüssel in `Object` ist in Ordnung, aber wir können kein anderes `Object` als Schlüssel in einem `Object` verwenden.

Lass es uns versuchen:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // versuche ein Objekt zu verwenden

visitsCountObj[ben] = 234; // versuche Objekt ben als Schlüssel zu verwenden
visitsCountObj[john] = 123; // versuche Objekt john als Schlüssel zu verwenden, Objekt ben wird ersetzt

*!*
// Das wurde geschrieben!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

Da `visitsCountObj` ein Objekt ist, konvertiert es alle `Object`-Schlüssel, wie `john` und `ben` oben, zum gleichen String `"[object Object]"`. Definitiv nicht was wir wollen.

```smart header="Wie `Map` Schlüssel vergleicht"
Um Schlüssel auf Gleichheit zu testen, verwendet `Map` den Algorithmus [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). Das ist ungefähr das Gleiche wie die strikte Gleichheit `===`, aber der Unterschied liegt darin, dass `NaN` als gleich zu `NaN` angesehen wird. So kann `NaN` auch als Schlüssel verwendet werden.

Dieser Algorithmus kann nicht verändert oder angepasst werden.
```

````smart header="Verkettung"
Jeder Aufruf von `map.set` gibt die Map selbst zurück, sodass wir die Aufrufe "verketten" können:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Iteration über Map

Um über eine `map` zu iterieren, gibt es 3 Methoden:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- gibt ein iterierbares Objekt für Schlüssel zurück,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- gibt ein iterierbares Objekt für Werte zurück,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- gibt ein iterierbares Objekt für Einträge `[key, value]` zurück, wird standardmäßig in `for..of` genutzt.

Zum Beispiel:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iteriere über Schlüssel (Gemüse)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iteriere über Werte (Mengen)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iteriere über [key, value] Einträge
for (let entry of recipeMap) { // das gleiche wie bei recipeMap.entries()
  alert(entry); // cucumber,500 (usw.)
}
```

```smart header="Die Einfügereihenfolge wird verwendet"
Die Iteration erfolgt in der gleichen Reihenfolge, in der die Werte eingefügt wurden. `Map` bewahrt diese Reihenfolge, anders als ein normales `Object`.
```

Darüber hinaus verfügt `Map` über eine eingebaute `forEach`-Methode, ähnlich wie `Array`:

```js
// führt die Funktion für jedes (key, value) Paar aus
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 usw
});
```

## Object.entries: Map aus Object

Wenn eine `Map` erstellt wird, können wir ein Array (oder ein anderes iterierbares Objekt) mit Schlüssel/Wert-Paaren zur Initialisierung übergeben, so wie hier:

```js run
// Array von [key, value] Paaren
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

Wenn wir ein einfaches Objekt haben und wir daraus eine `Map` erstellen wollen, dann können wir die eingebaute Methode [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) verwenden, die ein Array von Schlüssel/Wert-Paaren für ein Objekt genau in diesem Format zurückgibt.

So können wir also eine Map aus einem Objekt erstellen:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Hier gibt `Object.entries` das Array von Schlüssel/Wert-Paaren zurück: `[ ["name","John"], ["age", 30] ]`. Genau das braucht `Map`.


## Object.fromEntries: Object aus Map

Wir haben gerade gesehen, wie man `Map` aus einem einfachen Objekt mit `Object.entries(obj)` erstellt.

Es gibt die Methode `Object.fromEntries`, die das Gegenteil macht: Gegeben ein Array von `[key, value]` Paaren erstellt sie daraus ein Objekt:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// jetzt ist prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Wir können `Object.fromEntries` verwenden, um ein einfaches Objekt aus `Map` zu erstellen.

Z.B. wir speichern die Daten in einer `Map`, aber wir müssen sie an einen Drittanbieter-Code übergeben, der ein normales Objekt erwartet.

So wird dies erreicht:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // erstelle ein einfaches Objekt (*)
*/!*

// fertig!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Ein Aufruf von `map.entries()` gibt ein iterierbares Objekt von Schlüssel/Wert-Paaren zurück, genau im richtigen Format für `Object.fromEntries`.

Wir könnten auch die Zeile `(*)` kürzer machen:
```js
let obj = Object.fromEntries(map); // weglassen von .entries()
```

Das kommt auf das Gleiche heraus, weil `Object.fromEntries` ein iterierbares Objekt als Argument erwartet (nicht unbedingt ein Array). Und die Standarditeration für `map` gibt die gleichen Schlüssel/Wert-Paare zurück wie `map.entries()`. So erhalten wir ein normales Objekt mit den gleichen Schlüsseln/Werten wie die `map`.

## Set

Ein [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) ist eine spezielle Art Sammlung - "Set von Werten" (ohne Schlüssel), in dem jeder Wert nur einmal vorkommen darf.

Seine Hauptmethoden sind:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- erstellt das Set, und wenn ein `iterable`-Objekt übergeben wird (in der Regel ein Array), kopiert es die Werte daraus in das Set.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- fügt einen Wert hinzu, gibt das Set selbst zurück.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- entfernt den Wert, gibt `true` zurück wenn der `value` zum Zeitpunkt des Aufrufs existierte, sonst `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- gibt `true` zurück, wenn der Wert im Set existiert, sonst `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- entfernt alles aus dem Set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- ist die Anzahl der Elemente.

Das Hauptmerkmal ist, dass wiederholte Aufrufe von `set.add(value)` mit demselben Wert nichts bewirken. Deshalb erscheint jeder Wert in einem `Set` nur einmal.

Zum Beispiel haben wir Besucher, die kommen, und wir möchten uns an jeden erinnern. Aber wiederholte Besuche sollten nicht zu Duplikaten führen. Ein Besucher muss nur einmal "gezählt" werden.

`Set` ist genau das Richtige dafür:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// Besuche, einige Benutzer kommen mehrere Male
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// das Set behält nur einzigartige Werte
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (dann Pete und Mary)
}
```

Die Alternative zu `Set` könnte ein Array von Benutzern sein, und der Code zum Überprüfen auf Duplikate bei jeder Einfügung unter Verwendung von [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Aber die Leistung wäre viel schlechter, weil diese Methode das gesamte Array durchläuft, um jeden Element zu überprüfen. `Set` ist intern viel besser für Einzigartigkeitsprüfungen optimiert.

## Iteration über Set

Wir können entweder mit `for..of` oder `forEach` über ein Set iterieren:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// das Gleiche mit forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Beachte eine merkwürdige Sache. Die Callback-Funktion, die `forEach` übergeben wurde, hat drei Argumente: einen `value`, dann *den gleichen Wert* `valueAgain` und dann das Zielobjekt. Tatsächlich erscheint der gleiche Wert doppelt in den Argumenten.

Das ist der Kompatibilität mit `Map` geschuldet, wo die Callback-Funktion für `forEach` drei Argumente hat. Sieht sicher ein bisschen seltsam aus, aber dies kann helfen, `Map` mit `Set` in bestimmten Fällen problemlos zu ersetzen, und umgekehrt.

Die gleichen Methoden, die `Map` für Iteratoren hat, werden auch unterstützt:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- gibt ein iterierbares Objekt für Werte zurück,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- das Gleiche wie `set.keys()`, für die Kompatibilität mit `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- gibt ein iterierbares Objekt für Einträge `[value, value]` zurück, existiert für die Kompatibilität mit `Map`.

## Zusammenfassung

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- ist eine Sammlung von wertigen Daten mit Schlüsseln.

Methoden und Eigenschaften:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- erstellt die Map, optional mit `iterable` (z.B. Array) von `[key,value]`-Paaren zur Initialisierung.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- speichert den Wert unter dem Schlüssel, gibt die Map selbst zurück.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- gibt den Wert zum Schlüssel zurück, `undefined` wenn der `key` nicht in der Map existiert.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- gibt `true` zurück, wenn der `key` existiert, sonst `false`.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- entfernt das Element anhand des Schlüssels, gibt `true` zurück, wenn der `key` zum Zeitpunkt des Aufrufs vorhanden war, sonst `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- entfernt alles aus der Map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- gibt die aktuelle Anzahl an Elementen zurück.

Die Unterschiede zu einem regulären `Object`:

- Beliebige Schlüssel, auch Objekte können Schlüssel sein.
- Zusätzliche praktische Methoden, die `size`-Eigenschaft.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- ist eine Sammlung von einzigartigen Werten.

Methoden und Eigenschaften:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- erstellt das Set, optional mit `iterable` (z.B. Array) von Werten zur Initialisierung.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- fügt einen Wert hinzu (macht nichts, wenn `value` bereits vorhanden ist), gibt das Set selbst zurück.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- entfernt den Wert, gibt `true` zurück, wenn der Wert im Moment des Aufrufs vorhanden war, sonst `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- gibt `true` zurück, wenn der Wert im Set vorhanden ist, sonst `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- entfernt alles aus dem Set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- ist die Anzahl der Elemente.

Die Iteration über `Map` und `Set` erfolgt immer in der Reihenfolge des Einfügens, daher können wir nicht sagen, dass diese Sammlungen ungeordnet sind, aber wir können die Elemente nicht umsortieren oder direkt ein Element anhand seiner Nummer abrufen.
