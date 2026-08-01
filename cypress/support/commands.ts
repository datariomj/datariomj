/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Import cypress-axe if available - currently disabled
// try {
//   require("cypress-axe");
// } catch (e) {
//   console.log("cypress-axe not available - accessibility commands disabled");
// }

// Custom command to handle Angular loading
Cypress.Commands.add("waitForAngular", () => {
  cy.window().then((win: any) => {
    return new Cypress.Promise((resolve) => {
      if (win.getAllAngularTestabilities) {
        const testabilities = win.getAllAngularTestabilities();
        if (testabilities && testabilities.length > 0) {
          testabilities[0].whenStable(resolve);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  });
});

// Custom command for keyboard navigation
Cypress.Commands.add("tab", { prevSubject: "element" }, (subject) => {
  cy.wrap(subject).trigger("keydown", { key: "Tab", code: "Tab", which: 9 });
  return cy.focused();
});

// Custom command for testing responsive breakpoints
Cypress.Commands.add(
  "testBreakpoints",
  (breakpoints: Record<string, [number, number]>) => {
    Object.entries(breakpoints).forEach(([name, [width, height]]) => {
      cy.log(`Testing ${name} breakpoint: ${width}x${height}`);
      cy.viewport(width, height);
      cy.wait(500); // Allow time for responsive changes

      // Take screenshot for visual regression
      cy.screenshot(`breakpoint-${name}-${width}x${height}`);
    });
  },
);

// Custom command for API mocking setup
Cypress.Commands.add("setupApiMocks", () => {
  // Mock CV API endpoints
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

  // Mock contact form submission
  cy.intercept("POST", "/api/contact", {
    statusCode: 200,
    body: { success: true },
  }).as("contactSubmit");
});

// Custom command for measuring performance
Cypress.Commands.add("measurePerformance", (action: () => void) => {
  cy.window().then((win) => {
    const startTime = win.performance.now();
    action();
    cy.then(() => {
      const endTime = win.performance.now();
      const duration = endTime - startTime;
      cy.log(`Performance measurement: ${duration.toFixed(2)}ms`);
      expect(duration).to.be.lessThan(2000); // 2 second threshold
    });
  });
});

// Custom command for checking page load performance
Cypress.Commands.add("checkPagePerformance", (maxLoadTime = 3000) => {
  cy.window().then((win) => {
    const loadTime =
      win.performance.timing.loadEventEnd -
      win.performance.timing.navigationStart;
    cy.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).to.be.lessThan(maxLoadTime);
  });
});

// Custom command for visual regression testing
Cypress.Commands.add("visualTest", (name: string, options?: any) => {
  cy.screenshot(name, options);
  // Could integrate with Percy or other visual testing tools here
});

// Custom command for testing form validation
Cypress.Commands.add(
  "testFormValidation",
  (
    formSelector: string,
    fields: Array<{
      selector: string;
      invalidValue?: string;
      validValue: string;
      errorSelector?: string;
    }>,
  ) => {
    fields.forEach(({ selector, invalidValue, validValue, errorSelector }) => {
      if (invalidValue) {
        cy.get(selector).clear().type(invalidValue);
        cy.get(formSelector).submit();
        if (errorSelector) {
          cy.get(errorSelector).should("be.visible");
        }
      }

      cy.get(selector).clear().type(validValue);
      if (errorSelector) {
        cy.get(errorSelector).should("not.exist");
      }
    });
  },
);

// Custom command for accessibility testing with context
Cypress.Commands.add(
  "checkAccessibility",
  (context?: string, options?: any) => {
    cy.injectAxe();
    if (context) {
      cy.checkA11y(context, options);
    } else {
      cy.checkA11y(null, options);
    }
  },
);

// Custom command for testing loading states
Cypress.Commands.add(
  "testLoadingState",
  (triggerAction: () => void, loadingSelector: string) => {
    triggerAction();
    cy.get(loadingSelector).should("be.visible");
    cy.get(loadingSelector).should("not.exist");
  },
);

// Custom command for error state testing
Cypress.Commands.add(
  "testErrorState",
  (apiPattern: string, errorMessage?: string) => {
    cy.intercept("GET", apiPattern, {
      statusCode: 500,
      body: { error: "Server Error" },
    }).as("apiError");
    cy.reload();
    cy.wait("@apiError");

    if (errorMessage) {
      cy.contains(errorMessage).should("be.visible");
    }

    // Verify page remains functional despite error
    cy.get("app-root").should("be.visible");
  },
);

