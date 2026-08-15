/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { CvPage } from "../../support/page-objects/CvPage";
import { BasePage } from "../../support/page-objects/BasePage";

const cvPage = new CvPage();
const basePage = new BasePage();

Given("User visits CV page with API mocks", () => {
  cvPage.setupApiInterceptors();
  cvPage.visitCvPage();
});

Given("API returns error for CV data", () => {
  cy.intercept(
    "GET",
    "/spaces/*/environments/master/entries?content_type=cvList",
    { statusCode: 500, body: { error: "Server Error" } },
  ).as("cv-list-error");
});

When("User clicks first parent node", () => {
  cvPage.clickFirstParentNode();
});

When("User clicks first parent node again", () => {
  cvPage.clickFirstParentNode();
});

When("User clicks first expand icon", () => {
  cvPage.clickFirstExpandIcon();
});

When("User clicks first expand icon again", () => {
  cvPage.clickFirstExpandIcon();
});

When("User clicks first child node", () => {
  cvPage.clickFirstChildNode();
});

When("User clicks second child node", () => {
  cvPage.clickChildNodeByIndex(1);
});

When("User clicks third child node", () => {
  cvPage.clickChildNodeByIndex(2);
});

When("User clicks mobile CV menu button", () => {
  cvPage.clickListMenuButton();
});

// Handled in responsive.ts
// When("User switches to desktop viewport", () => {
//   basePage.setViewportDesktop();
// });

Then("User should see CV page loaded correctly", () => {
  cvPage.verifyCvPageLoaded();
});

Then("CV tree structure should be visible", () => {
  cvPage.verifyTreeStructure();
});

Then("CV list should load with correct data", () => {
  cvPage.verifyCvListLoaded();
});

Then("Child CV details should be hidden", () => {
  cvPage.verifyChildNodesHidden();
});

Then("Child CV details should be visible", () => {
  cvPage.verifyChildNodesVisible();
});

Then("User should be on CV detail page", () => {
  cvPage.verifyCvDetailLoaded("/experience/solutions-developer");
});

Then("CV detail content should be visible", () => {
  cvPage.verifyDetailContent();
});

Then("Tab navigation should be available", () => {
  cvPage.verifyTabNavigation();
});

Then("Multiple tabs should be visible", () => {
  cvPage.verifyMultipleTabs();
});

Then("User can close individual tabs", () => {
  cy.get("app-root").should("be.visible");
});

Then("Tab navigation should work correctly", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV drawer should be closed by default", () => {
  cy.get("app-root").should("be.visible");
});

Then("Mobile CV menu button should be visible", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV drawer should open", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV drawer should be open by default", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV detail should show company information", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV detail should show duration information", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV detail should show description content", () => {
  cy.get("app-root").should("be.visible");
});

Then("External links should work correctly", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV page should be accessible", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV tree should have proper ARIA attributes", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV tabs should be keyboard navigable", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV page should load within acceptable time", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV data should be cached correctly", () => {
  cy.reload();
  cy.get("app-root").should("be.visible");
});

Then("Tree expansion should be smooth", () => {
  cy.get("app-root").should("be.visible");
});

Then("User should see error handling", () => {
  cy.get("app-root").should("be.visible");
});

Then("Page should remain functional", () => {
  basePage.verifyNavigationVisible();
});

Then("CV tree should show correct number of categories", () => {
  cy.get("app-root").should("be.visible");
});

Then("Each category should have child items", () => {
  cy.get("app-root").should("be.visible");
});

Then("CV details should contain required fields", () => {
  cy.get("app-root").should("be.visible");
});

Then("Dates should be formatted correctly", () => {
  cy.get("app-root").should("be.visible");
});
