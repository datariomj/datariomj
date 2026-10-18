/// <reference types="cypress" />

import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("User visits blog page", () => {
  cy.visit(`${Cypress.config().baseUrl}/blog`);
});

// Handled in common.ts
