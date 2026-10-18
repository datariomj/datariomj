/// <reference types="cypress" />

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User visits privacy page", () => {
  cy.visit(`${Cypress.config().baseUrl}/privacy`);
});

// Handled in common.ts
