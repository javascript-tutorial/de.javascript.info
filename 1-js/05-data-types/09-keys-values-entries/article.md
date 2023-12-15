# Object.keys, values, entries

Lass uns einen Schritt zurücktreten von den einzelnen Datenstrukturen und über deren Iteration sprechen.

Im letzten Kapitel haben wir die Methoden `map.keys()`, `map.values()`, `map.entries()` gesehen.

Diese Methoden sind generisch, es ist allgemein üblich, sie für Datenstrukturen zu verwenden. Wenn wir jemals eine eigene Datenstruktur erstellen, sollten wir sie ebenfalls implementieren.

Sie werden unterstützt für:

- `Map`
- `Set`
- `Array`

Einfache Objekte unterstützen auch ähnliche Methoden, aber die Syntax ist ein wenig anders.

## Object.keys, values, entries

Für einfache Objekte sind die folgenden Methoden verfügbar:

- [Object.keys(obj)](mdn:js/Object/keys) -- gibt ein Array von Schlüsseln zurück.
- [Object.values(obj)](mdn:js/Object/values) -- gibt ein Array von Werten zurück.
- [Object.entries(obj)](mdn:js/Object/entries) -- gibt ein Array von `[key, value]`-Paaren zurück.

Bitte beachte die Unterschiede (zun Beispiel im Vergleich zu Map):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Aufrufsyntax | `map.keys()`  | `Object.keys(obj)`, aber nicht `obj.keys()` |
| Rückgabe     | iterable    | "echtes" Array                     |

Der erste Unterschied ist, dass wir `Object.keys(obj)` aufrufen müssen, und nicht `obj.keys()`.

Warum ist das so? Der Hauptgrund ist Flexibilität. Erinnere dich, Objekte sind die Basis aller komplexen Strukturen in JavaScript. Wir können also ein eigenes Objekt wie `data` haben, das seine eigene Methode `data.values()` implementiert. Und wir können immer noch `Object.values(data)` darauf anwenden.

Der zweite Unterschied ist, dass die `Object.*` Methoden "echte" Array-Objekte zurückgeben, nicht nur ein Iterable. Das liegt hauptsächlich an historischen Gründen.

Zum Beispiel:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Hier ist ein Beispiel für die Verwendung von `Object.values` zum Durchlaufen von Eigenschaftswerten:

```js run
let user = {
  name: "John",
  age: 30
};

// Schleife über Werte
for (let value of Object.values(user)) {
  alert(value); // John, dann 30
}
```

```warn header="Object.keys/values/entries ignorieren symbolische Eigenschaften"
Wie bei einer `for..in`-Schleife, ignorieren diese Methoden Eigenschaften, die `Symbol(...)` als Schlüssel verwenden.

Normalerweise ist das praktisch. Aber wenn wir auch symbolische Schlüssel wollen, dann gibt es eine separate Methode [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols), die ein Array von nur symbolischen Schlüsseln zurückgibt. Außerdem gibt es die Methode [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), die *alle* Schlüssel zurückgibt.
```


## Transformation von Objekten

Objekten fehlen viele Methoden, die für Arrays existieren, z.B. `map`, `filter` und andere.

Wenn wir sie anwenden möchten, dann können wir `Object.entries` gefolgt von `Object.fromEntries` verwenden:

1. Verwende `Object.entries(obj)`, um ein Array von Schlüssel/Wert-Paaren von `obj` zu erhalten.
2. Verwende Array-Methoden auf diesem Array, z.B. `map`, um diese Schlüssel/Wert-Paare zu transformieren.
3. Verwende `Object.fromEntries(array)` auf dem resultierenden Array, um es wieder in ein Objekt umzuwandeln.

Zum Beispiel könnten wir ein Objekt mit Preisen haben und möchten diese verdoppeln:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // Preise in ein Array konvertieren, jedes Schlüssel/Wert-Paar in ein anderes Paar umwandeln
  // und dann gibt fromEntries das Objekt zurück
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

Es mag auf den ersten Blick schwierig erscheinen, wird aber leicht verständlich, nachdem Du es ein- oder zweimal verwendet hast. Auf diese Weise können wir leistungsstarke Transformationsketten erstellen.
