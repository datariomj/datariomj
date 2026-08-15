import { BasePage } from "../support/page-objects/BasePage";
import { CvPage } from "../support/page-objects/CvPage";

describe("Application Static Pages & Utilities", () => {
  const basePage = new BasePage();
  const cvPage = new CvPage();

  it("loads Terms of Service page", () => {
    basePage.visit("/terms");
    cy.title().should("include", "MJ Datario");
    cy.contains("Terms").should("be.visible");
  });

  it("loads Privacy Policy page", () => {
    basePage.visit("/privacy");
    cy.title().should("include", "MJ Datario");
    cy.contains("Privacy").should("be.visible");
  });

  it("loads Experience / CV page with skills and roles", () => {
    basePage.visit("/experience");
    cy.title().should("include", "MJ Datario");
    cy.contains("DevOps Engineer Lead").should("be.visible");
    cvPage.verifyCvPageLoaded();
  });

  it("loads Stack / Tech page", () => {
    basePage.visit("/stack");
    cy.title().should("include", "MJ Datario");
    cy.contains("OPERATIONS").should("be.visible");
  });

  it("renders 404 Error page on invalid routes", () => {
    basePage.visit("/non-existent-route", false);
    cy.contains("404").should("be.visible");
  });
});
