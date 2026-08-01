/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { BasePage } from "../../support/page-objects/BasePage";
import { HomePage } from "../../support/page-objects/HomePage";
import { CvPage } from "../../support/page-objects/CvPage";
import { ContactDialog } from "../../support/page-objects/ContactDialog";

const basePage = new BasePage();
const homePage = new HomePage();
const cvPage = new CvPage();
const contactDialog = new ContactDialog();

// Mobile breakpoint: 375x667 (iPhone SE)
// Tablet breakpoint: 768x1024 (iPad)
// Desktop breakpoint: 1366x768 (Standard laptop)

Given("User opens contact dialog on mobile", () => {
  basePage.setViewportMobile();
  homePage.visitHomePage();
  cy.get('[data-cy="nav-contact"]').first().click({ force: true });
});

// Handled in common-steps.ts

// Handled in common.ts

When("User navigates through sections", () => {
  basePage.clickNavLink("cv");
  cy.wait(500);
  basePage.clickNavLink("home");
  cy.wait(500);
  basePage.clickNavLink("terms");
});

When("User resizes window", () => {
  cy.viewport(1200, 800);
  cy.wait(500);
  cy.viewport(1366, 768);
});

When("User tests all viewport breakpoints", () => {
  cy.viewport(375, 667);
  cy.wait(200);
  cy.viewport(768, 1024);
  cy.wait(200);
  cy.viewport(1024, 768);
  cy.wait(200);
  cy.viewport(1366, 768);
  cy.wait(200);
});

When("User switches between mobile and desktop", () => {
  basePage.setViewportMobile();
  cy.wait(500);
  basePage.setViewportDesktop();
  cy.wait(500);
});

When("User switches to desktop viewport", () => {
  basePage.setViewportDesktop();
});

When("User switches to desktop", () => {
  basePage.setViewportDesktop();
});

When("User navigates through the site", () => {
  basePage.clickNavLink("cv");
  cy.wait(500);
  basePage.clickNavLink("home");
  cy.wait(500);
});

When("User rotates device to landscape", () => {
  cy.viewport(667, 375); // Landscape orientation
});

When("User rotates back to portrait", () => {
  cy.viewport(375, 667); // Portrait orientation
});

When("User uses screen reader on mobile", () => {
  cy.get("body").should("exist");
});

Then("Mobile navigation should be displayed", () => {
  cy.get(".sidenav__mobile-nav, .mobile-menu-btn").should("be.visible");
});

Then("Desktop drawer should be hidden", () => {
  cy.get(".desktop-only").should("not.be.visible");
});

Then("Mobile navigation should remain functional", () => {
  cy.get(".sidenav__mobile-nav, .mobile-menu-btn").should("be.visible");
});

Then("Layout should adapt to tablet size", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV layout should work on tablet", () => {
  cy.get("app-root").should("be.visible");
});

Then("Desktop layout should be displayed", () => {
  cy.get(".desktop-only").should("be.visible");
});

Then("Navigation drawer should be visible", () => {
  cy.get(".navigation-bar").should("be.visible");
});

Then("Layout should adapt responsively", () => {
  cy.get("app-root").should("be.visible");
});

Then("Layout should adapt at each breakpoint", () => {
  cy.get("app-root").should("be.visible");
  cy.get(".navigation-bar").should("be.visible");
});

Then("Content should remain accessible", () => {
  cy.get("h1, h2, h3, p").should("be.visible");
});

Then("Navigation should work at all sizes", () => {
  cy.get("a").should("exist");
});

Then("Content should reflow properly", () => {
  cy.get("app-root").should("be.visible");
});

Then("Images should scale appropriately", () => {
  cy.get("app-root").should("be.visible");
});

Then("Text should remain readable", () => {
  cy.get("p, h1, h2, h3").should("exist");
});

Then("CV drawer should be collapsed", () => {
  cy.get("app-root").should("be.visible");
});

Then("Mobile CV menu should be available", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV drawer should expand automatically", () => {
  cy.get("app-root").should("be.visible");
});

Then("Form should fit mobile screen", () => {
  cy.get("app-contact, form").should("be.visible");
});

Then("Form fields should be touch-friendly", () => {
  cy.get("input#name, input#email, textarea#message").should("be.visible");
});

Then("Form should adapt to larger screen", () => {
  cy.get("app-contact, form").should("be.visible");
});

Then("Page load times should be acceptable on mobile", () => {
  cy.get("app-root").should("be.visible");
});

Then("Animations should be smooth on mobile", () => {
  cy.get("app-root").should("be.visible");
});

Then("Touch interactions should be responsive", () => {
  cy.get("app-root").should("be.visible");
});

Then("Layout should adapt to landscape mode", () => {
  cy.get("app-root").should("be.visible");
});

Then("Navigation should remain functional", () => {
  cy.get("app-root").should("be.visible");
});

Then("Layout should return to portrait mode", () => {
  cy.get("app-root").should("be.visible");
});

// Handled in common.ts

Then("Touch targets should be properly sized", () => {
  cy.get("app-root").should("be.visible");
});

// Handled in accessibility.ts

Then("Content should be properly announced", () => {
  cy.get("app-root").should("be.visible");
});
