Um die Suche unabhängig von Groß- und Kleinschreibung zu gestalten, bringen wir den String in Kleinbuchstaben und suchen dann:

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```
