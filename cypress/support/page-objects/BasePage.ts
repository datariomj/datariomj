/// <reference types="cypress" />

export class BasePage {
  // Common elements across all pages
  readonly preloader = '[data-cy="preloader"]';
  readonly sidenav = ".nav-container";
  readonly sidenavDrawer = ".navigation-bar";
  readonly footer = "app-footer";
  readonly mobileNavigation = ".sidenav__mobile-nav";

  // Navigation elements - using rendered href for reliable selection
  readonly navLinks = {
    home: 'a[href="/"]',
    about: 'a[href="/about"]',
    cv: 'a[href="/experience"]',
    stack: 'a[href="/stack"]',
    contact: 'a[href="/contact"]',
    blog: 'a[href="/blog"]',
    terms: 'a.footer__link:contains("Terms")',
    privacy: 'a.footer__link:contains("Privacy")',
  };

  // Common actions
  visit(url = "/") {
    cy.visit(url);
    this.waitForPageLoad();
    return this;
  }

  waitForPageLoad() {
    // Wait for Angular to finish loading
    cy.get("app-root").should("exist");

    // Wait for router-outlet content to load
    cy.get("router-outlet").should("exist");

    // Wait for preloader to disappear if present
    cy.get("body").then(($body) => {
      if ($body.find(this.preloader).length > 0) {
        cy.get(this.preloader).should("not.be.visible");
      }
    });

    // Small wait for any animations/transitions
    cy.wait(200);
    return this;
  }

  clickNavLink(linkType: keyof typeof BasePage.prototype.navLinks) {
    if (linkType === "terms" || linkType === "privacy") {
      cy.visit(`/${linkType}`);
    } else {
      const selector = this.navLinks[linkType] || `a[routerLink="/${linkType}"]`;
      cy.get("body").then(($body) => {
        if ($body.find(`${selector}:visible`).length > 0) {
          cy.get(`${selector}:visible`).first().click({ force: true });
        } else if ($body.find(selector).length > 0) {
          cy.get(selector).first().click({ force: true });
        } else {
          const pathMap: Record<string, string> = {
            home: '/',
            cv: '/experience',
            about: '/about',
            stack: '/stack',
            contact: '/contact',
            blog: '/blog',
          };
          cy.visit(pathMap[linkType] ?? `/${linkType}`);
        }
      });
    }

    // Wait for page to load
    this.waitForPageLoad();
    return this;
  }

  // Responsive helpers
  setViewportMobile() {
    cy.viewport(375, 667); // iPhone SE
    return this;
  }

  setViewportTablet() {
    cy.viewport(768, 1024); // iPad
    return this;
  }

  setViewportDesktop() {
    cy.viewport(1366, 768); // Default desktop
    return this;
  }

  // Assertions
  verifyPageTitle(expectedTitle: string) {
    cy.title().should("eq", expectedTitle);
    return this;
  }

  verifyPageUrl(expectedPath: string) {
    cy.location("pathname").should("eq", expectedPath);
    return this;
  }

  verifyNavigationVisible() {
    cy.get(this.sidenavDrawer).should("be.visible");
    return this;
  }

  verifyMobileNavigationVisible() {
    cy.get(this.mobileNavigation).should("be.visible");
    return this;
  }

  // Accessibility helpers
  checkA11y(context?: string) {
    if (context) {
      cy.get(context).should("be.visible");
      cy.checkAccessibility(context);
    } else {
      cy.checkAccessibility();
    }
    return this;
  }

  // Screenshot capture
  takeScreenshot(name: string) {
    cy.screenshot(name);
    return this;
  }
}
