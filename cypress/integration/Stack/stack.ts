/// <reference types="Cypress" />

import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps';


Before(() => {
  cy.intercept(
    'GET',
    '/spaces/*/environments/master/entries?content_type=technology',
    { fixture: 'stack/list.json' },
  ).as('stack-list');
});

Given('User visits stack page', () => {
  cy.visit(`${ Cypress.config().baseUrl }/stack`);
});

Then('User will load proper metadata', () => {
  // cy.title().should('eq', 'MJ Datario | Stack');
  cy.title().should('eq', 'MJ Datario');
});

Then('User will load stack list', () => {
  cy.wait('@stack-list');
  cy.get('[data-cy="stack-card"]').should('have.length', 6);
});

