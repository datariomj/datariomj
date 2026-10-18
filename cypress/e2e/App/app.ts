/// <reference types="cypress" />

import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";

// Before(() => {
//   cy.intercept('post', '/sockjs-node/**', {}).as('postWebsocket');
//   cy.intercept('GET', '/sockjs-node/**', {}).as('getWebsocket');
// });

When("User clicks contact button from sidenav", () => {
  cy.get("[data-cy=nav-contact]:visible").click();
});

Then("User will see contact dialog", () => {
  cy.get("[data-cy=contact-form]").should("be.visible");
});

When("User clicks cancel button from contact dialog", () => {
  cy.get("[data-cy=contact-cancel]").click();
});

Then("User will not see contact dialog", () => {
  cy.get("[data-cy=contact-form]").should("not.exist");
});
