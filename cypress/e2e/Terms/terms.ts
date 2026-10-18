/// <reference types="cypress" />

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User visits terms page", () => {
  cy.visit(`${Cypress.config().baseUrl}/terms`);
});

// Handled in common.ts
