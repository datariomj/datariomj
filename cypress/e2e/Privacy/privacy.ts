/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('User visits privacy page', () => {
  cy.visit(`${ Cypress.config().baseUrl }/privacy`);
});

Then('User will load proper metadata', () => {
  cy.title().should('eq', 'MJ Datario | Privacy Policy');
});
