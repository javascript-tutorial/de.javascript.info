# Müllsammlung 

Die Speicherverwaltung in JavaScript wird automatisch, für uns unsichtbar, durchgeführt. Wir erstellen einfache Datenstrukturen, Objekte, Funktionen... All das braucht Speicher.
All das nimmt Speicher in Anspruch. 

Was passiert, wenn etwas nicht mehr gebraucht wird? Wie erkennt das die JavaScript-Engine und bereinigt es?

## Erreichbarkeit 

Das zentrale Konzept der Speicherverwaltung in JavaScript ist *Erreichbarkeit*.

Einfach ausgedrückt, "erreichbare" Werte sind diejenigen, die irgendwie zugänglich oder nutzbar sind. Sie werden garantiert im Speicher abgelegt.

1. Es gibt einen Basissatz von inhärent erreichbaren Werten, die aus offensichtlichen Gründen nicht gelöscht werden können.

    Zum Beispiel:

    - Lokale Variablen und Parameter der aktuellen Funktion. 
    - Variablen und Parameter für andere Funktionen in der aktuellen Kette von verschachtelten Aufrufen.
    - Globale Variablen. 
    - (es gibt weitere, auch interne)

    Diese Werte werden *Wurzeln* genannt. 

2. Jeder andere Wert gilt als erreichbar, wenn er von einer Wurzel aus durch eine Referenz oder durch eine Kette von Referenzen erreichbar ist.

    Wenn sich beispielsweise ein Objekt in einer lokalen Variable befindet und dieses Objekt eine Eigenschaft hat, die auf ein anderes Objekt verweist, gilt dieses Objekt als erreichbar. Und diejenigen, die es referenziert, sind ebenfalls erreichbar. Ausführliche Beispiele folgen.

Es gibt einen Hintergrundprozess bei der JavaScript Engine, die nennt sich [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)). Dieser zeichnet alle Objekt auf und entfernd diejenigen, die unerreichbar wurden. 

## Ein einzelnes Beispiel

Hier ist das einfachste Beispiel:

```js
// user hat eine Referenz zum Objekt
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Hier zeigt der Pfeil eine Referenz eines Objekt. Die globale Variabel `"user"` referenziert das Objekt `{name: "John"}` (wir nennen es John, der Kürze halber). Die Property `"name"` von John speichert ein Primitive, weshalb es innerhalb des Objekt steht. 

Wenn der Wert von `user` überschrieben wird, geht die Referenz verloren: 

```js
user = null;
```

![](memory-user-john-lost.svg)

Nun ist John unerreichbar. Es gibt keinen Weg auf ihn zuzugreifen, keine Referenz zu ihm. Die Müllsammlung verwirft die Daten und reinigt den Speicher. 

## Zwei Referenzen

Wir nehmen uns nun vor, die Referenz von `user` zu `admin` zu kopieren:

```js
// user hat eine Referenz zum Objekt 
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Wenn wir jetzt das selbe tun: 
```js
user = null;
```

... dann ist das Objekt weiterhin erreichbar durch die globale Variabel `admin`, deshalb ist es im Speicher. Wenn wir auch `admin` überschreiben, kann es entfernt werden. 

## Interlinked objects

Jetzt ein komplexeres Beispiel. Die Familie:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

Die Funktion `marry` "verheiratet" zwei Objekte, in dem sie ihnen Referenzen zum jeweils anderen gibt und ein Objekt ausgibt, dass beide beinhaltet.

Die resultierende Speicherstruktur:

![](family.svg)

Bis bier hin sind alle Objekte erreichbar. 

Man entferne nun zwei Referenzen:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Es reicht nicht aus nur eine dieser Referenzen zu löschen, da alle Objekte weiterhin erreichbar wären.

Aber wenn wird beide löschen, dann können wir sehen, dass John keine eingehende Referenz mehr verfügt:

![](family-no-father.svg)

Ausgehende Referenzen spielen keine Rolle. Nur eingehende können ein Objekt erreichbar machen. Nun ist John unerreichbar und wird vom Speicher entfernt mit all seinen Daten, auf die auch nicht mehr zugegriffen werden kann. 

Nach der Müllsammlung:

![](family-no-father-2.svg)

## Unerreichbare Insel

Es ist möglich, dass die ganze Insel mit den miteinander verbundenen Objekten unerreichbar wird und sie vom Speicher entfernt wird. 

Das Ursprungsobjekt ist das selbe wie oben. Denn:

```js
family = null;
```

Das im Speicher abgelegt Bild wird zu:

![](family-no-family.svg)

Diese Beispiel demonstriert, wie wichtig das Konzept von Erreichbarkeit ist. 

Es ist offentsichtlic, dass John und Ann weiterhin miteinander verbunden sind, beide haben eingehende Referenzen. Aber das reicht nicht aus. 

Die Verbindung des früheren Objekt `"family"` wurde von der Wurzel gekappt, es gibt keine Referenz mehr zu ihm, deshalb wird die ganze Insel unerreichbar und wird entfernt. 

## Interner Algorithmus

Die grundlegende Müllsammlung nennt sich "mark-and-sweep".

Die folgenden Schritte der "Müllsammlung" werden regulär ausgeführt: 

- Die Müllsammlung nimmt sich die Wurzeln und "markiert" (erinnert sich an) diese. 
- Dann besucht sie diese und "markiert" alle von ihnen ausgehenden Referenzen.
- Dann besucht sie die markierten Objekte und markiert *deren* Referenzen. Alle besuchten Objekte werden vermerkt, sodass das selbe Objekt später nicht erneut besucht werden muss. 
- ... und so weiter bis jedes jede erreichbare Referenz (von den Wurzel aus) besucht wurde. 
- Alle Objekte außer die markierten werden entfernt. 

Wir nehmen als Beispiel an, dass die Struktur unseres Objekt so aussieht:

![](garbage-collection-1.svg)

Wir können klar eine "unerreichbare Insel" auf der rechten Seite erkennen. Wir sehen uns nun an wie die "mark-and-sweep" Müllsammlung damit umgeht. 

Beim ersten Schritt werden die Wurzeln markiert: 

![](garbage-collection-2.svg)

Dann werden deren Referenzen markiert: 

![](garbage-collection-3.svg)

... und deren Referenzen, sofern möglich: 

![](garbage-collection-4.svg)

Nun werden die Objekte, die nicht besucht werden konnten als unerreichbar eingestuft und entfernt: 

![](garbage-collection-5.svg)

Wir können und des Prozess auch als einen Farbeimer vorstellen, der von den Wurzeln ausgehend umgekippt wird und dessen Farbe durch alle Referenzen hindurchfließt und so die erreichbaren Objekte markiert. Die unmarkierten werden dann entfernt. 

Das ist das Konzept hinter der Müllsammlung. JavaScript Engines applizieren viele Optimierungen, sodass die Ausführung schneller abläuft und sie nicht behindert.

Ein Paar der Optimierungen: 

- **Generationsgerechte Sammlung** -- Objekte werden in zwei Sorten unterteilt: "die Neuen" und "die Alten". Viele Objekte taufen auch, erledigen ihren Job und verschwinden schnell. Diese können aggressiv bereinigt werden. Diejenigen die lang genug überleben werden "alt" und werden seltener überprüft. 
- **Schrittweise Sammlung** -- wenn es eine große Anzahl an Objekten gibt und wir versuchen den ganzen Satz an Objekten abzulaufen und zu markieren, wird dies möglicherweise einige Zeit dauern und sichtbare Verzögerungen in der Ausführung mit sich bringen. Deshalb versucht die Engine die Müllsammlung in Stücke aufzuteilen. Diese Stücke werden dann, separat, eines nach dem anderen ausgeführt. Das verlangt extra Buchführung um die Veränderung zwischen ihnen um Auge zu behalten, jedoch wird man nur wenige kleine Verzögerungen haben, anstatt eine große.
- **Sammlung zur Leerlaufzeit** -- die Müllsammlung versucht nur zu laufen, wenn die CPU inaktiv ist, um den möglichen Effekt auf die Ausführung zu vermindern. 

Es existieren andere Optimierungen und Sorten von Algorithmen der Müllsammlung. So gern ich diese hier beschreiben würde, so muss ich mich zurückhalten, da verschiedene Engines verschiedene Kniffe und Techniken mit sich bringen. Und, was noch weit wichtiger ist, Dinge verändern  sich wie Engines sich weiterentwickeln, weshalb ein vertieftes Studium "vorab", ohne einen triftigen Grund, es das nicht wert ist. Außer natürlich, wenn es eine Sache reinen Interesses ist. Dann gibt es dafür, unten stehend, ein paar Links.

## Zusammenfassung

Die wesentlichsten Dinge:

- Die Müllsammlung läuft automatisch. Wir können sie nicht zwingen zu laufen oder sie verhindern. 
- Objekte bleiben im Speicher solange sie erreichbar sind. 
- Referenziert zu werden ist nicht das selbe als erreichbar zu sein (von einer Wurzel aus): Ein Haufen an miteinander verbundenn Objekte kann als Ganzes unerreichbar werden. 

Moderne Engines implementieren fortgeschrittenere Algroithmen der Müllsammlung. 

Das Buch "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al) geht mehrere von dieses an. 

Wenn du vertraut bist mit low-level programming, dann findest du detailierte Informationen über die V8 Müllsammlung in dem Artikel [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

Der [V8 blog](https://v8.dev/) publiziert ab und zu auch Artikel über Änderungen im Speichermanagment. Für gewöhnlich ist es bessr über die internen Prozesse von V8 zu lesen um über Müllsammlung etwas zu erlenen. Der Blog von [Vyacheslav Egorov](http://mrale.ph) bietet sich an, da er bei V8 einer der Ingenieure war. Ich spreche von "V8", weil diese am meisten in Artikeln im Internet behanelt wird. Bei anderen Engines sind die Angehensweisen ähnlich, aber die Müllsammlung unterscheidet sich in vielen Aspekten.

In die tiefe gehendes Wissen über Engines ist hilfreich, wenn man low-level Optimisierungen braucht. Es wäre weise, dies als den nexten Schritt einzuplanen, nachdem man mit der Sprache vertraut ist. 
