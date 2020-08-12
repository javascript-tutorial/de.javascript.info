Wichtigkeit: 4

---

# Schlechter Stil

Was ist an dem Codestil unten falsch?

```js no-beautify
function pow(x,n)
{
  let result=1;
  for(let i=0;i<n;i++) {result*=x;}
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'')
if (n<=0)
{
  alert(`Exponent ${n} wird nicht unterstützt, bitte geben Sie einen Integerwert ein, der größer als 0 ist`);
}
else
{
  alert(pow(x,n))
}
```

Verbessere ihn.
