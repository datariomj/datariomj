import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Then("User will load proper metadata", () => {
  cy.title().should("not.be.empty");
  cy.get('meta[name="description"]').should("exist");
});

Given("User visits CV page", () => {
  cy.visit("/experience");
});

Then("Mobile layout should be accessible", () => {
  cy.get("app-root").should("be.visible");
});
