importance: 5

---

# Kürze den Text

Erstelle eine Funktion `truncate(str, maxlength)`, die die Länge des Strings `str` überprüft und - falls diese `maxlength` übersteigt - das Ende von `str` mit dem Auslassungszeichen `"…"` ersetzt, um seine Länge an `maxlength` anzupassen.

Das Ergebnis der Funktion sollte der gekürzte (falls nötig) String sein.

Zum Beispiel:

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
