// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using CommonJS syntax:
require("./commands");

// Import cypress-axe for accessibility testing
import "cypress-axe";

// Import cypress-audit lighthouse commands
import "@cypress-audit/lighthouse/commands";

// Code coverage support disabled - install @cypress/code-coverage if needed
// try {
//   require("@cypress/code-coverage/support");
// } catch (e) {
//   console.log("Code coverage support not available");
// }

// Import Cucumber preprocessor - currently disabled
// try {
//   require("cypress-cucumber-preprocessor/steps");
// } catch (e) {
//   console.log("Cucumber preprocessor steps not available");
// }

// Global before hook
beforeEach(() => {
  // Ensure Angular is ready
  cy.window().then((win: any) => {
    if (win.ng) {
      // Disable Angular animations for more stable tests
      win.ng
        .probe(win.document.body)
        .injector.get("NgZone")
        .runOutsideAngular(() => {
          const style = win.document.createElement("style");
          style.type = "text/css";
          style.innerHTML = `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `;
          win.document.head.appendChild(style);
        });
    }
  });

  // Set up default API interceptors to prevent real API calls
  cy.intercept("GET", "/spaces/**", { fixture: "example.json" }).as(
    "defaultApi",
  );

  // Handle uncaught exceptions gracefully
  cy.on("uncaught:exception", (err, runnable) => {
    // Ignore certain types of errors that don't affect functionality
    if (err.message.includes("ResizeObserver loop limit exceeded")) {
      return false;
    }
    if (err.message.includes("Non-Error promise rejection captured")) {
      return false;
    }
    return true;
  });
});

// Global after hook for cleanup
afterEach(() => {
  // Clear any remaining intercepts
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});

// Configure axe-core for accessibility testing (if available)
Cypress.Commands.add("configureAxe", () => {
  try {
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        // Disable certain rules that might be too strict for your app
        { id: "color-contrast", enabled: true },
        { id: "landmark-one-main", enabled: true },
        { id: "page-has-heading-one", enabled: true },
        { id: "region", enabled: false }, // Might be too strict
      ],
      tags: ["wcag2a", "wcag2aa"],
    });
  } catch (e) {
    console.log("Axe configuration not available");
  }
});

// Add global error handling
Cypress.on("fail", (error, runnable) => {
  // Log additional context for debugging
  cy.log(`Test failed: ${runnable.title}`);
  cy.log(`Error: ${error.message}`);

  // Take a screenshot on failure
  cy.screenshot(`FAILED-${runnable.title}`, { capture: "fullPage" });

  throw error;
});

// Performance monitoring
Cypress.Commands.add("startPerformanceMonitoring", () => {
  cy.window().then((win) => {
    win.performanceMetrics = {
      startTime: win.performance.now(),
      marks: {},
    };
  });
});

Cypress.Commands.add("markPerformance", (name: string) => {
  cy.window().then((win) => {
    if (win.performanceMetrics) {
      win.performanceMetrics.marks[name] =
        win.performance.now() - win.performanceMetrics.startTime;
    }
  });
});

Cypress.Commands.add("endPerformanceMonitoring", () => {
  cy.window().then((win) => {
    if (win.performanceMetrics) {
      const totalTime =
        win.performance.now() - win.performanceMetrics.startTime;
      cy.log("Performance metrics:", win.performanceMetrics);
      cy.log(`Total test time: ${totalTime}ms`);
    }
  });
});

// Add TypeScript declarations for custom commands and window properties
declare global {
  namespace Cypress {
    interface ApplicationWindow {
      performanceMetrics?: {
        startTime: number;
        marks: Record<string, number>;
      };
    }
    interface Chainable {
      startPerformanceMonitoring(): Chainable<void>;
      markPerformance(name: string): Chainable<void>;
      endPerformanceMonitoring(): Chainable<void>;
    }
  }
}

