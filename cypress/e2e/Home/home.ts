/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Handled in common.ts

When("User clicks hire me", () => {
  cy.get("[data-cy=home-cta]").click();
});

Then("User will see contact dialog", () => {
  cy.get("[data-cy=contact-form]").should("be.visible");
});
