/// <reference types="cypress" />

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User visits error page", () => {
  cy.visit(`${Cypress.config().baseUrl}/non-existing-route`);
});

// Handled in common.ts
