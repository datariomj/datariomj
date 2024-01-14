/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('User visits terms page', () => {
  cy.visit(`${ Cypress.config().baseUrl }/terms`);
});

Then('User will load proper metadata', () => {
  cy.title().should('eq', 'MJ Datario | Terms & Conditions');
});
