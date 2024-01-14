/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('User visits error page', () => {
  cy.visit(`${ Cypress.config().baseUrl }/non-existing-route`);
});

Then('User will load proper metadata', () => {
  cy.title().should('eq', '404 Error');
});
