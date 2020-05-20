importance: 2

---

# Verketten 

Es gibt ein Objekt `ladder`, dass es erlaubt auf un ab zu gehen: 

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // zeigt die derzeitige Stufe an
    alert( this.step );
  }
};
```

Wenn wir nun mehrere Aufrufe hintereinander möchten, können wir das wie folgt tun: 

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Man modifiziere den Code von `up`, `down` und `showStep` so, dass man die Aufrufe wie folgt verketten kann: 

```js
ladder.up().up().down().showStep(); // 1
```

Solch eine Herangehensweise ist bei JavaScript Libraries weit verbreitet. 
