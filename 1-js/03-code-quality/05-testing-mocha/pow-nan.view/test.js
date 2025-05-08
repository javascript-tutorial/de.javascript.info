describe("pow", function() {

  describe("erhöht x auf Potenz 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} zur Potenz 3 ist ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  it("für negatives n ist das Ergebnis NaN", function() {
    assert.isNaN(pow(2, -1));
  });

  it("für nicht-ganzzahliges n ist das Ergebnis NaN", function() {
    assert.isNaN(pow(2, 1.5));
  });

});
