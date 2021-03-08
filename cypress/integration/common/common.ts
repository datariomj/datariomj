/// <reference types="Cypress" />

import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.intercept('post', '/sockjs-node/**', {}).as('postWebsocket');
  cy.intercept('GET', '/sockjs-node/**', {}).as('getWebsocket');
});
