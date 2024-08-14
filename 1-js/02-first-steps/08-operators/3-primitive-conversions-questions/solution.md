
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
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

<<<<<<< HEAD
1. Die Addition mit einem String `"" + 1` konvertiert `1` in einen String: `"" + 1 = "1"`, und dann haben wir `"1" + 0`, die gleiche Regel wird angewendet.
2. Die Subtraktion `-` funktioniert (wie die meisten mathematischen Operationen) nur mit Zahlen. Sie konvertiert eine leere Zeichenfolge `""` in `0`.
3. Die Addition mit einem String fügt dem String die Zahl `5` hinzu.
4. Die Subtraktion wird immer in Zahlen umgewandelt, so dass `"  -9  "` eine Zahl `-9` wird (Leerzeichen werden ignoriert).
5. `null` wird nach der numerischen Umwandlung zu `0`.
6. `undefined` wird nach der numerischen Umwandlung zu `NaN`.
7. Leerzeichen werden am Anfang und Ende eines Strings abgeschnitten, wenn ein String in eine Zahl umgewandelt wird. Hier besteht der gesamte String aus Leerzeichen wie `\t`, `\n` und einem "regulären" Leerzeichen dazwischen. Ähnlich wie bei einem leeren String wird sie zu `0`.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
