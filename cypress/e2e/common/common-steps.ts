/// <reference types="cypress" />

import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import { BasePage } from "../../support/page-objects/BasePage";
import { HomePage } from "../../support/page-objects/HomePage";

const basePage = new BasePage();
const homePage = new HomePage();

// Common navigation steps
Given("User visits home page", () => {
  homePage.visit();
});

// Common viewport steps
Given("User is on mobile viewport", () => {
  basePage.setViewportMobile();
  homePage.visitHomePage();
});

Given("User is on mobile viewport in portrait", () => {
  cy.viewport(375, 667);
  homePage.visitHomePage();
});

Given("User is on mobile viewport in landscape", () => {
  cy.viewport(667, 375);
  homePage.visitHomePage();
});

Given("User is on tablet viewport", () => {
  basePage.setViewportTablet();
});

Given("User is on desktop viewport", () => {
  basePage.setViewportDesktop();
});

// Common setup steps
Given("User has API mocks configured", () => {
  cy.setupApiMocks();
});

When("User opens contact dialog", () => {
  cy.get('[data-cy="nav-contact"]').first().click();
});
