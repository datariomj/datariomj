/// <reference types="cypress" />

import { Before, Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.intercept(
    "GET",
    "/spaces/*/environments/master/entries?content_type=technology",
    { fixture: "stack/list.json" },
  ).as("stack-list");
});

Given("User visits stack page", () => {
  cy.visit(`${Cypress.config().baseUrl}/stack`);
});

// Handled in common.ts

Then("User will load stack list", () => {
  cy.wait("@stack-list");
  cy.get('[data-cy="stack-card"]').should("have.length", 6);
});
