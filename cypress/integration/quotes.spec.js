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
  })
})