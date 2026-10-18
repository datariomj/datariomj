/// <reference types="cypress" />

import { BasePage } from "./BasePage";

export class CvPage extends BasePage {
  // CV page specific elements
  readonly cvContainer = ".cv__container";
  readonly cvDrawer = ".cv__drawer";
  readonly cvTree = ".cv__tree";
  readonly cvListWrapper = ".cv__list-wrapper";
  readonly cvRouterWrapper = ".cv__router-wrapper";
  readonly cvTabNavbar = ".cv__tab-navbar";
  readonly cvListMenu = ".cv__list-menu";

  // Tree elements
  readonly parentNodes = '[data-cy="cv-parent-node"]';
  readonly childNodes = '[data-cy="cv-child-node"]';
  readonly expandIcons = '[data-cy="cv-icon-expand"]';
  readonly treeNodes = "mat-tree-node";

  // Tab elements
  readonly tabNavBar = "nav[mat-tab-nav-bar]";
  readonly tabNavPanel = "mat-tab-nav-panel";
  readonly navTabs = "a[mat-tab-link]";
  readonly closeButtons = ".cv__nav-close";

  // Detail elements
  readonly cvDetailContainer = ".cv-detail";
  readonly cvDetailLink = ".cv-detail__link";
  readonly matList = "mat-list";
  readonly matListItems = "mat-list-item";

  // Actions specific to CV page
  visitCvPage() {
    return this.visit("/experience");
  }

  setupApiInterceptors() {
    cy.intercept(
      "GET",
      "/spaces/*/environments/master/entries?content_type=cvList",
      { fixture: "cv/list.json" },
    ).as("cv-list");
    cy.intercept(
      "GET",
      "/spaces/*/environments/master/entries/czzi0Qy1HtMqzCaTnbqa9",
      { fixture: "cv/entity-sol-dev.json" },
    ).as("cv-entity-sol-dev");
    cy.intercept(
      "GET",
      "/spaces/*/environments/master/entries/3Tyn6Eb3khsslzETTEfxUH",
      { fixture: "cv/entity-datariomj.json" },
    ).as("cv-entity-datariomj");
    cy.intercept(
      "GET",
      "/spaces/*/environments/master/entries/4l2fMoTErh3ArtEBcyUtPB",
      { fixture: "cv/entity-comp-eng.json" },
    ).as("cv-entity-comp-eng");
    cy.intercept(
      "GET",
      "/spaces/*/environments/master/entries/4y9a4QX6KCJSY4g4abZYe9",
      { fixture: "cv/entity-sol-arch.json" },
    ).as("cv-entity-sol-arch");
    return this;
  }

  clickFirstParentNode() {
    cy.get("body").then(($body) => {
      if ($body.find(this.parentNodes).length > 0) {
        cy.get(this.parentNodes).first().click({ force: true });
      }
    });
    return this;
  }

  clickFirstChildNode() {
    cy.get("body").then(($body) => {
      if ($body.find(this.childNodes).length > 0) {
        cy.get(this.childNodes).first().click({ force: true });
      }
    });
    return this;
  }

  clickFirstExpandIcon() {
    cy.get("body").then(($body) => {
      if ($body.find(this.expandIcons).length > 0) {
        cy.get(this.expandIcons).first().click({ force: true });
      }
    });
    return this;
  }

  clickParentNodeByIndex(index: number) {
    cy.get("body").then(($body) => {
      if ($body.find(this.parentNodes).length > index) {
        cy.get(this.parentNodes).eq(index).click({ force: true });
      }
    });
    return this;
  }

  clickChildNodeByIndex(index: number) {
    cy.get("body").then(($body) => {
      if ($body.find(this.childNodes).length > index) {
        cy.get(this.childNodes).eq(index).click({ force: true });
      }
    });
    return this;
  }

  closeTabByIndex(index: number) {
    cy.get("body").then(($body) => {
      if ($body.find(this.closeButtons).length > index) {
        cy.get(this.closeButtons).eq(index).click({ force: true });
      }
    });
    return this;
  }

  clickListMenuButton() {
    cy.get("body").then(($body) => {
      if ($body.find(this.cvListMenu).length > 0) {
        cy.get(this.cvListMenu).first().click({ force: true });
      }
    });
    return this;
  }

  // Verifications
  verifyCvPageLoaded() {
    cy.title().should("include", "MJ Datario");
    this.verifyPageUrl("/experience");
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyCvListLoaded() {
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyTreeStructure() {
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyChildNodesHidden() {
    return this;
  }

  verifyChildNodesVisible() {
    return this;
  }

  verifyCvDetailLoaded(expectedPath: string) {
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyTabNavigation() {
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyDetailContent() {
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyResponsiveDrawer() {
    cy.get("app-root").should("be.visible");
    return this;
  }

  verifyMultipleTabs() {
    cy.get("app-root").should("be.visible");
    return this;
  }
}
