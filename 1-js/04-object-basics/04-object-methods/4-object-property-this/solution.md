**Die Antwort: Ein Fehler.**

Man soll es einfach mal versuchen:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Fehler: Cannot read property 'name' of undefined
```

Das liegt an den Regeln die `this` festlegen: Sie schauen nicht nach der Definition eines Objekt. Nur der Zeipunkt des Aufruf spielt eine Rolle. 

Hier ist der Wert von `this` innerhlab von `makeUser()` `undefined`, da dieser als Funbktion aufgerufen wird und nicht als eine Methode mit dem "Punktsyntax". 

Der Wert von `this` ist einer für die ganze Funktion. Code Blocks und literale Objekte haben keinen Einfluss darauf. 

Deshalb nimmt sich `ref: this` das aktuelle `this` der Funktion. 

Wir koennen die Funktion umschreiben und das selbe `this` mit dem Wert `undefined` ausgeben: 

```js run
function makeUser(){
  return this; // dieses Mal gibt es kein literales Objekt
}

alert( makeUser().name ); // Fehler: Property 'name' von undefined kann nicht gelesen werden
```
Wie man sehen kann ist das Resultat von `alert( makeUser().name )` das selbe wie von `alert( user.ref.name )` im obigen Beispiel. 

Hier der umgekehrte Fall: 

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Jetzt funktioner es, da `user.ref()` eine Methode ist. Und der Wert von `this` wurde zu dem Objekt vor dem Punkt '.'.
