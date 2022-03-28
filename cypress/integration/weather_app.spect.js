describe("Weather App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("frontpage can be opened", () => {
    cy.get("h1").should("contain", "Weather Challenge");
  });

  it("search a forecast weather and go back", () => {
    cy.get("input[name='street']").clear().type("785 %20 Flushing %20 Ave");
    cy.get("input[name='city']").clear().type("Brooklyn");
    cy.get("input[name='state']").clear().type("NY");
    cy.contains("Search").click();
    cy.contains("Go Back").click();
  });

  it("disable search button width no entry text", () => {
    cy.get("input[name='street']").clear();
    cy.get("input[name='city']").clear();
    cy.get("input[name='state']").clear();
    cy.contains("Search").should("be.disabled");
  });

  it("Get a not found search", () => {
    cy.get("input[name='street']").clear().type("force not found");
    cy.get("input[name='city']").clear().type("force not found");
    cy.get("input[name='state']").clear().type("force not found");
    cy.contains("Search").click();
    cy.contains("NOT FOUND").should("be.visible");
  });
});
