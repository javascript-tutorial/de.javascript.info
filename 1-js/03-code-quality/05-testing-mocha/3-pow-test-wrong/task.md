importance: 5

---

# Was ist falsch mit dem Test?

Was ist falsch bei dem Test von `pow` unten?

```js
it("Erhebt x zur Potenz n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. Syntaxmäßig ist der Test korrekt und besteht.
