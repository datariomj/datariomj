/// <reference types="Cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('User visits home page', () => {
  cy.visit(`${ Cypress.config().baseUrl }`);
});

Then('User will load proper metadata', () => {
  cy.title().should('eq', 'MJ Datario | Home');
});

When('User clicks hire me', () => {
  cy.get('[data-cy=home-cta]').click();
});

Then('User will see contact dialog', () => {
  cy.get('[data-cy=contact-form]').should('be.visible');
});
