/// <reference types="Cypress" />

import { And, Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

// Before(() => {
//   cy.intercept('post', '/sockjs-node/**', {}).as('postWebsocket');
//   cy.intercept('GET', '/sockjs-node/**', {}).as('getWebsocket');
// });

Given('User visits home page', () => {
  cy.visit(`${ Cypress.config().baseUrl }`);
});

When('User clicks contact button from sidenav', () => {
  cy.get('[data-cy=nav-contact]:visible').click();
});

And('User will see contact dialog', () => {
  cy.get('[data-cy=contact-form]').should('be.visible');
});

And('User clicks cancel button from contact dialog', () => {
  cy.get('[data-cy=contact-cancel]').click();
});

Then('User will not see contact dialog', () => {
  cy.get('[data-cy=contact-form]').should('not.exist');
});
