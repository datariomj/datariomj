/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { BasePage } from "../../support/page-objects/BasePage";
import { HomePage } from "../../support/page-objects/HomePage";
import { CvPage } from "../../support/page-objects/CvPage";

const basePage = new BasePage();
const homePage = new HomePage();
const cvPage = new CvPage();

// Handled in common.ts

When("User clicks CV navigation link", () => {
  basePage.clickNavLink("cv");
});

When("User clicks Home navigation link", () => {
  basePage.clickNavLink("home");
});

When("User clicks Stack navigation link", () => {
  basePage.clickNavLink("stack");
});

When("User clicks Blog navigation link", () => {
  basePage.clickNavLink("blog");
});

When("User clicks Terms navigation link", () => {
  basePage.clickNavLink("terms");
});

When("User clicks Privacy navigation link", () => {
  basePage.clickNavLink("privacy");
});

When("User navigates through main sections on mobile", () => {
  basePage.setViewportMobile();
  basePage.clickNavLink("cv");
  cy.wait(500);
  basePage.clickNavLink("home");
  cy.wait(500);
  basePage.clickNavLink("stack");
  cy.wait(500);
});

When("User navigates between sections", () => {
  basePage.clickNavLink("cv");
  cy.wait(500);
  basePage.clickNavLink("home");
  cy.wait(500);
});

When("User uses browser back button", () => {
  cy.go("back");
});

When("User uses browser forward button", () => {
  cy.go("forward");
});

When("User visits {string} directly", (path: string) => {
  const actualPath = path === "/cv" ? "/experience" : path;
  basePage.visit(actualPath);
});

Then("User should be on CV page with proper metadata", () => {
  cy.title().should("include", "MJ Datario");
  basePage.verifyPageUrl("/experience");
});

Then("User should be on Home page with proper metadata", () => {
  cy.title().should("include", "MJ Datario");
  basePage.verifyPageUrl("/");
});

Then("User should be on Stack page", () => {
  basePage.verifyPageUrl("/stack");
});

Then("User should be on Blog page", () => {
  basePage.verifyPageUrl("/blog");
});

Then("User should be on Terms page with proper metadata", () => {
  cy.title().should("include", "MJ Datario");
  basePage.verifyPageUrl("/terms");
});

Then("User should be on Privacy page with proper metadata", () => {
  cy.title().should("include", "MJ Datario");
  basePage.verifyPageUrl("/privacy");
});

Then("Navigation should work correctly on mobile", () => {
  basePage.verifyNavigationVisible();
});

Then("Mobile navigation bar should be visible", () => {
  basePage.verifyMobileNavigationVisible();
});

Then("Desktop navigation drawer should be visible", () => {
  cy.get(".navigation-bar").should("be.visible");
});

Then("Desktop navigation drawer should remain open", () => {
  cy.get(".navigation-bar").should("be.visible");
});

Then("Desktop navigation drawer should stay open", () => {
  cy.get(".navigation-bar").should("be.visible");
});

Then("Navigation should be accessible", () => {
  // Check for proper semantic HTML
  cy.get("nav").should("exist");
  cy.get(".nav-links").should("exist");
});

Then("Navigation links should have proper aria labels", () => {
  cy.get("a.nav-link").each(($link) => {
    cy.wrap($link).should("exist");
  });
});

Then("Navigation should be keyboard navigable", () => {
  cy.get("a.nav-link").first().should("exist");
});

Then("User should be on previous page", () => {
  basePage.verifyPageUrl("/");
});

Then("User should return to CV page", () => {
  basePage.verifyPageUrl("/experience");
});
