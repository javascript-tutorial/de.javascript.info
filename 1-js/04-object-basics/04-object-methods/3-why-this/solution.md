
Hier sind die Erklärungen. 

1. Das ist ein regulärer Aufruf der dem Objekt zugehörigen Methode. 

2. Das selbe, da Parenthesen hier nicht die Reihenfolge der Operationen beeinflusst. Der Punkt steht trotzdem davor. 

3. Hier haben wir den komplexeren Aufruf `(expression).method()`. Der Aufruf funktioniert so, als wäre er in zwei Zeilen unterteilt worden: 

    ```js no-beautify
    f = obj.go; // calculate the expression
    f();        // call what we have
    ```

    Hier wird `f()` als eine Funktion ohne `this` ausgeführt.

5. Die ähnliche Sachw wie bei `(3)`. Zur linken des `.` steht eine Expression.

Um das Verhalten von `(3)` und `(4)` zu versthen müseen wir uns daran erinnern, dass die Zurgiffe auf Properties (Punkt oder eckige Klammern) einen Wert des Peferenztyp wiedergeben. 

Jegliche Operation die auf ihnen ausgeführt wird, mit Ausnahme eines Aufruf einer Methode (wie Zuweisungt `=` oder `||`), wandelt deren Wert in einen gewöhnlichen Wert um, der die nötige Inforamtion um ein `this` zu benutzen nicht aufnimmt. 

