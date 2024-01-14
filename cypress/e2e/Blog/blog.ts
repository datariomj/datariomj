/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('User visits blog page', () => {
  cy.visit(`${ Cypress.config().baseUrl }/blog`);
});

Then('User will load proper metadata', () => {
  // cy.title().should('eq', 'MJ Datario | Blog');
  cy.title().should('eq', 'MJ Datario');
});
