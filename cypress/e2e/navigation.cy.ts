import { BasePage } from "../support/page-objects/BasePage";

describe("Navigation & Routing", () => {
  const basePage = new BasePage();

  beforeEach(() => {
    basePage.visit("/");
  });

  it("navigates across header links on desktop", () => {
    basePage.clickNavLink("cv");
    basePage.verifyPageUrl("/experience");

    basePage.clickNavLink("stack");
    basePage.verifyPageUrl("/stack");

    basePage.clickNavLink("terms");
    basePage.verifyPageUrl("/terms");

    basePage.clickNavLink("privacy");
    basePage.verifyPageUrl("/privacy");

    basePage.clickNavLink("home");
    basePage.verifyPageUrl("/");
  });

  it("handles browser back and forward navigation history", () => {
    basePage.clickNavLink("cv");
    basePage.verifyPageUrl("/experience");

    cy.go("back");
    basePage.verifyPageUrl("/");

    cy.go("forward");
    basePage.verifyPageUrl("/experience");
  });

  it("navigates properly on mobile viewport", () => {
    basePage.setViewportMobile();
    basePage.clickNavLink("cv");
    basePage.verifyPageUrl("/experience");

    basePage.clickNavLink("home");
    basePage.verifyPageUrl("/");
  });
});
