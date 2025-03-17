describe("test", function() {
  
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
  
  before(() => alert("Test beginnt – vor allen Tests"));
  after(() => alert("Test abgeschlossen – nach allen Tests"));

  beforeEach(() => alert("Vor einem Test – beginne einen Test"));
  afterEach(() => alert("Nach einem Test – beende einen Test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
