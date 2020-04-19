
# Typ Symbol

Laut Spezifikation können Propertyschlüssel eines Objekt entweder vom Typ String oder Symbol sein. Nicht Nummern, kein boolischer Wert, nur Strings und Symbole.

Bis jetzt hatten wir nur Strings genutzt. Jetzt schauen wir uns die Vorteile von Symbolen an. 

## Symbole 

Ein "Symbol" repräsentiert eine einzigartige Kennung. 

Ein Wert dieses Typ kann kreiert werden durch `Symbol()`:

```js
// id ist ein neues Symbol
let id = Symbol();
```

Bei der Kreation können wir dem Symbol eine Beschreibung geben (auch Symbolname genannt), die meistens für Debugging Zwecke genutzt wird:

```js
// id ist ein Symbol mit der Beschreibung "id"
let id = Symbol("id");
```

Symbole sind immer einzigartig. Selbst wenn wir viele Symbole mit der selben Beschreibung kreieren, sind sie verschiedene Werte. Die Beschreibung ist nur ein Etikett, das nichts beinflusst. 

Wir haben hier zum Beispiel zwei Symbole mit der selben Beschreibung -- sie sind nicht gleich: 

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Wenn man mit Ruby oder einer anderen Sprache vertraut ist, die etwas ähnliches wie ein "Symbole" besitzt -- man sei bitte nicht fehlgeleitet. JavaScript Symbole sind anders.

````warn header="Symbole konertieren sich nicht automatisch zu einem String"
Die meisten Werte in JavaScript unterstützen eine impizite Konvertierung in einen String. Zum Beispiel können wir beinahe jeden Wert mit `alert` ausgeben, und es wird funktionieren. Diese konvertieren nicht automatisch. 

Zum Beispiel wird dieser `alert` einen Fehler zeigen:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Das ist ein "Sprachwächter" der davor behütet Mist zu bauen, da Strings und Symbole fundamental unterschiedlich sind und nicht versehentlich einer zum anderen konvertiert werden soll. 

Wenm wir wirklich ein Symbol zeige wollen, dann müssen wir explizit `.toString()` aufrufen, wie hier:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), es funktioniert jetzt
*/!*
```

Oder nehmen die `symbol.description` Property, um nur die Beschreibung zu zeigen: 
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Verstecke" Properties

Symbole erlauben es uns "versteckte" Properties eines Objekt zu erstellen, auf die kein andere Teil des Code versehentlich zugreifen oder überschreiben kann. 

Zum Beispiel wenn wir mit dem Objekt `user` arbeiten, das zu einem Code von Dritten gehört. Wir möchten Kennungen an diese anbringen. 

Wir können eine Symbol als Schlüssel nutzen: 

```js run
let user = { // gehört zu einem anderen Code
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // wir können auf die Daten mit dem Symbol als Schlüssel zugreifen
```

Was ist der Vorteil eines `Symbol("id")` gegenüber einem String `"id"`?

Da Objekt `user` zu einem anderen Code gehört und dieser Code auch mit diesem Arbeitet, sollten wir diesem nicht einfach irgendwelche Felder hinzufügen. Das ist gefährlich. Aber auf ein Symbol kann nicht versehentlich zugegriffen werden, der Code von Dritten wird es nicht einmal sehen, sodass es in Ordnung ist das zu tun. 

Man stelle sich auch vor, dass ein anderes Skript, für seine eigenen Zwecke, seine eigene Kennung innerhalb `user` haben will. Das kann eine andere JavaScript Library sein, sodass die Scripts völlig unbewusst nebeneinander exisiteren. 

Dann kann das Skript seine eigene `Symbol("id")` wie folgt schaffen: 

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Es wird keinen Konflikt zwischen unseren und deren Kennungen geben, da Symbole immer unterchiedlich sind, selbst wenn sie den selben Namen haben. 

... aber wenn wir einen String `"id"` anstelle eines Symbol für diesen Zweck genutzt hätten, dann *gäbe* es einen Konflikt: 

```js run
let user = { name: "John" };

// Unser Skript nutzt die Property "id"
user.id = "Our id value";

// ... ein weiteres Skript will "id" auf für seine Zwecke...

user.id = "Their id value"
// Boom! overwritten by another script!
```

### Symbole in einem Literal

If we want to use a symbol in an object literal `{...}`, we need square brackets around it.

Wie folgt:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // not "id: 123"
*/!*
};
```
Darum benötigen wir den Wert von der Variabel `id` als Schlüssel und nicht den String "id".

### Symbole werde von for..in übersprungen

Properties eines Symbols partizipieren nicht an der `for..in` Schleife.

Zum Beispiel:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (keine Symbole)
*/!*

// der direkte Zugriff auf das Symbol funktioniert
alert( "Direct: " + user[id] );
```
`Object.keys(user)` ignoriert sie ebenso. Das ist Teil des allgemeinen Prinzip "versteckte Properties eines Symbol". Wenn ein anderes Skript oder eine Library über eines unserer Objekt loopt, dann wird es nicht unerwaterter Weise auf dei Property eines Symbol zugreifen.  

Im Gegenzug kopiert [Object.assign](mdn:js/Object/assign) sowohl String und Properties von Symbolen: 

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Es gibt nix paradoxes hier. Das ist so vorgesehen. Die Idee dahinter ist, dass wenn wir ein Objekt klonen oder Objekte zusammenführen, wir für gewöhnlich *alle* Properties kopiert haben möchten (was Symbole wie `id` miteinbezieht).

## Globale Symbole 

Wie wir geshen haben sind alle Symbole normalerweise unterschiedlich, slebst wenn diese den selben Namen haben. Aber manchmal wollen wir das gleichnamige Symbole auch die selben Entitäten sind. Beispielseise wollen mehrere Teile unserer Applikation auf das Symbol `"id"` zugreifen, ... jewo wef w
As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.

Dafür existiert ein *globales Symbolregister*. Wir können darin Symbole schaffen und später auf dies zugreifen und es wird garantiert, dass bei wiederholten Zugriff durch den selben Namen exakt das selbe Symbol ausgegeben wird. 

Um ein Symbol vom Register abzurufen (oder zu kreien sofern nicht vorhanden) benutzt man `Symbol.for(key)`.

Dieser Afruf prüft das globale Register und, wenn es ein Symbol das als `key` beschrieben gibt, dieses ausgibt. Andernfalls wird ein neues Symbol `Symbol(key)` geschaffen und wird im Register mit dem gegebenen `key` abgespeichert. 

Zum Beispiel:

```js run
// liest vom globalen Register
let id = Symbol.for("id"); // wenn das Symbol nicht existiert wird es geschaffen

// wird ernuet gelesen (vielleicht von einem anderen Teil des Code)
let idAgain = Symbol.for("id");

// das geliche Symbol 
alert( id === idAgain ); // true
```

Symbole innerhalb des Register nennen sich *globale Symbole*. Wenn wir ein für die ganze Applikation gültiges Symbol wollen, auf das überall vom Code aus zugegriffen werden kann, dann nutzt man diese. 

```smart header="Das hört sich nach Ruby an"
Bei manchen Programmiersprachen, wie Ruby, gibt es nur ein Symbol per Name.

Bei JavaScript, wie wir sehen könne, trifft das auf globale Symbole zu.
```

### Symbol.keyFor

Bei globalen Symbolen gibt es neben dem Aufruf von `Symbol.for(key)`, der ein Symbol beim Namen ausgibt, auch den umgekehrt wirkenden Aufruf `Symbol.keyFor(sym)`, der den Namen bei Angabe des zugehörigen Symbol ausgibt. 

Zum Beispiel:

```js run
// man erhält das Symbol beim Namen
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// man erhält den Namen durchs Symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` nutzt intern das globale Symbolregister um nach dem Schlüssel für das Symbol zu schauen. Darum funktionert es nicht bei globalen Symbolen. Wenn das Symbol nicht global ist, wird es nicht fähig sein dieses zu finden und wird `undefined` ausgeben. 

Abgesehen davon haben alle Symbole die Property `description`.

Zum Beispiel:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, globales Symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, nicht global

alert( localSymbol.description ); // name
```

## Systemsymbole

Es existieren viele "Systemsymbole" die JavaScript intern nutzt und wir können diese nutzen, um mehrer Aspekte unserer Objekte zu verfeinern. 

Sie sind in der Spezifikation unter der Tabelle [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) zu finden:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ... und so weiter.

Zum Beispiel erlaubt uns `Symbol.toPrimitive` die Umwandlung von Objekte in Primitves zu beschreiben. Wir werden das gleich bald angehen.

Andere Symbole werden wir uns auch anvertrauen, wenn wir die entsprechenden sprachlichen Features studieren. 

## Zusammenfassung

`Symbol` ist ein primitiver Typ für einzigartige Kennungen.

Symbole werden mit dem Aufruf `Symbol()` mit einer optionelen Beschreibung (Name) kreiert. 

Symbole sind stets verschiedene Werte, auch wenn sie den selben Namen haben. Wenn wir gleichnamig Symbole haben wollen, die auch gleich sind, dann sollten wir das globale Symbolregister nutzen: `Symbol.for(key)` gibt ein globale Symbol aus (wenn nötig kreiert dieses), mit `key` als den Name. Mehrere Aufrufe von `Symbol.for` mit dem selben `key` geben exakt das slebe Symbol aus. 

Symbole haben zwei Hauptanwendungsfälle: 

1. "Versteckte" Properties eines Objekt. 
    Wenn wir eine Property einem Objekt hinzufügen wollen, das zu einem anderen Skript oder Library gehört, dann können wir ein Symbol schaffen und es als Propertyschlüssel nutzen. Eine Property, die einem Symbol angehört, erscheint nicht in `for..in`, sodass diese nicht versehentlich mit anderen Properties verarbeitet wird. Auf sie wird auch nicht direkt zugegriffen, da andere Skripts nicht unser Symbol haben. Somit wird die Property vor versehentlichen Überschreibungen geschützt. 

    So können wir "verdeckt" etwas in unseren Objekten verstecken, das wir brauchen, aber andere nicht sehen sollen, indem wir symbolische Properties nutzen. 

2. Es gibt einige Systemsymbole die JavaScript nutzt, die über `Symbol.*` abrufbar sind. Wir können diese nutzen um ein paar eingebaute Verhaltensweisen zu verändern. Später im Tutorial werden wir zum Beispiel `Symbol.iterator` für [iterables](info:iterable) nutzen, `Symbol.toPrimitive` um [object-to-primitive conversion](info:object-toprimitive) zu nutzen und so weiter. 

Aus technischer Sicht sind Symbole nich 100%-ig versteckt. Es gibt eine eingebaute Methode [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols), die es uns erlaubt alle Symbole zu erhalten. Es gibt auch eine Methode namens Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), die *alle* Schlüssel eines Objekt, symbolische miteingeschlossen, ausgibt. Also sie sind nicht wirklich versteckt. Aber die meisten Libraries, eingebauten Funktionen und Syntaxkonstrukte nutzen diese Methoden nicht. 
