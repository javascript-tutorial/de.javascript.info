Die Lösung liegt darin, das Objekt selbst bei jedem Aufruf auszugeben. 

```js run demo
let ladder = {
  step: 0,
  up() {
    this.step++;
*!*
    return this;
*/!*
  },
  down() {
    this.step--;
*!*
    return this;
*/!*
  },
  showStep() {
    alert( this.step );
*!*
    return this;
*/!*
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```

Wir können auch einen Aufruf per Zeile schreiben. Bei längeren Ketten ist das besser lesbar:

```js
ladder
  .up()
  .up()
  .down()
  .up()
  .down()
  .showStep(); // 1
```
