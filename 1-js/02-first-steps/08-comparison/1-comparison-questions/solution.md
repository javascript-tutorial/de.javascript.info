

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Begründungen:

1. Offensichtlich true.
2. Wörterbuchvergleich, daher false. `"a"` ist kleiner als `"p"`.
3. Wieder, Wörterbuchvergleich, erstes Zeichen `"2"` ist größer als das erste Zeichen `"1"`.
4. Die Werte `null` und `undefined` sind nur gegenseitig gleich.
5. Strikte Gleichheit ist strikt. Verschiedene Datentype auf beiden Seite führe zu false.
6. Gleich wie `(4)`, `null` ist nur gleich `undefined`.
7. Strikte Gleichheit von verschiedenen Datentypen.
