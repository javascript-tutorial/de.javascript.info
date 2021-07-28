

```js run demo
let userName = prompt("Wer da?", '');

if (userName === 'Admin') {

  let pass = prompt('Passwort?', '');

<<<<<<< HEAD
  if (pass == 'TheMaster') {
    alert( 'Willkommen!' );
  } else if (pass == '' || pass == null) {
    alert( 'Abbruch' );
=======
  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
  } else {
    alert( 'Falsches Passwort' );
  }

<<<<<<< HEAD
} else if (userName == '' || userName == null) {
  alert( 'Abbruch' );
=======
} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b
} else {
  alert( "Ich kenne Sie nicht!" );
}
```

Achte auf die vertikalen Einrückungen innerhalb des `if`-Blocks, die syntaktisch nicht zwingend sind, aber den Code lesbarer machen.
