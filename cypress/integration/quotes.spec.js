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

    it("the submit button enables when both inputs are filled out", () => {
      authorInput().type("Casey!");
      textInput().type("Isn't testing FUN!?");
      submitBtn().should("not.be.disabled");
    })

    it("the cancel button can reset the inputs and disable the submit button", () => {
      authorInput().type("Casey!");
      textInput().type("CSS is the BEST!");
      cancelBtn().click();
      textInput().should("have.value", "");
      authorInput().should("have.value", "");
      submitBtn().should("be.disabled");
    })
  })

  describe("Adding a new quote", () => {
    it("Can submit and delete a new quote", () => {
      cy.contains(/CSS is the BEST!/i).should("not.exist");
      textInput().type("CSS is the BEST!");
      authorInput().type("CRHarding");
      submitBtn().click();
      cy.contains(/CSS is the BEST!/i).should("exist");
      cy.contains(/CSS is the BEST!/i).next().next().click();
    })
  })

  describe("Editing an existing quote", () => {
    it("can edit a quote", () => {
      textInput().type("Who likes CSS anyways?");
      authorInput().type("Casey");
      submitBtn().click();
      cy.contains("Who likes CSS anyways?").siblings("button:nth-of-type(1)").click();
      textInput().should("have.value", "Who likes CSS anyways?");
      authorInput().should("have.value", "Casey");
      textInput().type(" I do!");
      authorInput().type(" Harding");
      submitBtn().click();
      cy.contains("Who likes CSS anyways? I do! (Casey Harding)");
      cy.contains("Who likes CSS anyways? I do! (Casey Harding)").next().next().click();
      cy.contains("Who likes CSS anyways? I do! (Casey Harding").should("not.exist");
    })
  })
})
