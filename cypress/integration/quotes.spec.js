// write tests here
describe("Quotes App", () => {
  beforeEach(() => {
    // Each test needs fresh state!
    // Tests should NEVER rely on state left over from previous tests
    // Every test should able to work in isolation
    cy.visit("http://localhost:1234");
  })

  // Centralize the getters
  const textInput = () => cy.get('input[name=text]');
  const authorInput = () => cy.get('input[name=author]');
  const foobarInput = () => cy.get('input[name=foobar]');
  const submitBtn = () => cy.get(`button[id="submitBtn"]`);
  const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);

  it("sanity check to make sure that tests work", () => {
    // "it" is a test
    // "expect is an assertion"
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({}); // strict equality ===
    expect({}).to.eql({}); // not strict equality ==
  })

  it("The proper elements are showing", () => {
    textInput().should("exist");
    foobarInput().should("not.exist");
    authorInput().should("exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");

    cy.contains("Submit Quote").should("exist");
    cy.contains(/submit quote/i).should("exist");
  })

  describe("Filling out the inputs and cancelling", () => {
    // You can use (optional) "describe" blocks to organize
    // our tests and group them under a top level heading
    it("can navigate to the site", () => {
      cy.url().should("include", "localhost");
    })

    it("submit button starts out disabled", () => {
      submitBtn().should("be.disabled");
    })

    it("can type in the inputs", () => {
      textInput()
        .should("have.value", "")
        .type("Woah there cowboy!")
        .should("have.value", "Woah there cowboy!");
      
      authorInput()
        .should("have.value", "")
        .type("CRHarding")
        .should("have.value", "CRHarding");
    })
  })

})