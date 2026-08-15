/// <reference types="cypress" />

import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  // Home page specific elements
  readonly homeContainer = ".home__container";
  readonly homeMain = ".home__main";
  readonly homeGreeting = ".home__greeting";
  readonly readmeWrapper = ".home__readme-wrapper";
  readonly tabNavPanel = "mat-tab-nav-panel";
  readonly tabNavBar = "nav[mat-tab-nav-bar]";
  readonly hireMeButton = '[data-cy="home-cta"]';
  readonly readmeContent = '[data-cy="readme-content"]';

  // Actions specific to home page
  visitHomePage() {
    return this.visit("");
  }

  clickHireMeButton() {
    cy.get(this.hireMeButton).should("be.visible").click();
    return this;
  }

  clickGithubReadmeTab() {
    cy.get(`${this.tabNavBar} a[mat-tab-link]`).contains("README").click();
    return this;
  }

  // Verifications
  verifyHomePageLoaded() {
    this.verifyPageTitle("MJ Datario | Home");
    this.verifyPageUrl("/");
    cy.get(this.homeContainer).should("be.visible");
    return this;
  }

  verifyHomeContent() {
    cy.get(this.homeMain).should("be.visible");
    cy.get(this.homeGreeting).should("be.visible");
    return this;
  }

  verifyReadmeSection() {
    cy.get(this.readmeWrapper).should("be.visible");
    cy.get(this.tabNavPanel).should("be.visible");
    return this;
  }

  verifyReadmeContent() {
    cy.get(this.readmeContent).should("be.visible");
    cy.get(this.readmeContent).should("contain.text", "README");
    return this;
  }

  verifyResponsiveLayout() {
    // Mobile view
    this.setViewportMobile();
    cy.get(this.homeContainer).should("have.css", "flex-direction", "column");

    // Desktop view
    this.setViewportDesktop();
    cy.get(this.homeContainer).should("have.css", "flex-direction", "row");
    return this;
  }
}
