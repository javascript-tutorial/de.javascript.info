
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. Die Addition mit einem String `"" + 1` konvertiert `1` in einen String: `"" + 1 = "1"`, und dann haben wir `"1" + 0`, die gleiche Regel wird angewendet.
2. Die Subtraktion `-` funktioniert (wie die meisten mathematischen Operationen) nur mit Zahlen. Sie konvertiert eine leere Zeichenfolge `""` in `0`.
3. Die Addition mit einem String fügt dem String die Zahl `5` hinzu.
4. Die Subtraktion wird immer in Zahlen umgewandelt, so dass `"  -9  "` eine Zahl `-9` wird (Leerzeichen werden ignoriert).
5. `null` wird nach der numerischen Umwandlung zu `0`.
6. `undefined` wird nach der numerischen Umwandlung zu `NaN`.
7. Leerzeichen werden am Anfang und Ende eines Strings abgeschnitten, wenn ein String in eine Zahl umgewandelt wird. Hier besteht der gesamte String aus Leerzeichen wie `\t`, `\n` und einem "regulären" Leerzeichen dazwischen. Ähnlich wie bei einem leeren String wird sie zu `0`.
