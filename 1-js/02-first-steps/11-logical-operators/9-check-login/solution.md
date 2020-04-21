

```js run demo
let userName = prompt("Wer da?", '');

if (userName == 'Admin') {

  let pass = prompt('Passwort?', '');

  if (pass == 'TheMaster') {
    alert( 'Willkommen!' );
  } else if (pass == '' || pass == null) {
    alert( 'Abbruch' );
  } else {
    alert( 'Falsches Passwort' );
  }

} else if (userName == '' || userName == null) {
  alert( 'Abbruch' );
} else {
  alert( "Ich kenne Sie nicht!" );
}
```

Achte auf die vertikalen Einrückungen innerhalb des `if`-Blocks, die syntaktisch nicht zwingend sind, aber den Code lesbarer machen.
