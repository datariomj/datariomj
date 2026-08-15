/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
    // Custom commands from commands.ts
    waitForAngular(): Chainable<void>;
    tab(): Chainable<JQuery<HTMLElement>>;
    testBreakpoints(
      breakpoints: Record<string, [number, number]>,
    ): Chainable<void>;
    setupApiMocks(): Chainable<void>;
    measurePerformance(action: () => void): Chainable<void>;
    checkPagePerformance(maxLoadTime?: number): Chainable<void>;
    visualTest(name: string, options?: any): Chainable<void>;
    testFormValidation(
      formSelector: string,
      fields: Array<{
        selector: string;
        invalidValue?: string;
        validValue: string;
        errorSelector?: string;
      }>,
    ): Chainable<void>;
    checkAccessibility(context?: string, options?: any): Chainable<void>;
    testLoadingState(
      triggerAction: () => void,
      loadingSelector: string,
    ): Chainable<void>;
    testErrorState(apiPattern: string, errorMessage?: string): Chainable<void>;

    // Custom commands from e2e.ts
    startPerformanceMonitoring(): Chainable<void>;
    markPerformance(name: string): Chainable<void>;
    endPerformanceMonitoring(): Chainable<void>;

    // Additional type safety for common Cypress operations
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Global types for test data
export interface TestUser {
  name: string;
  email: string;
  message: string;
}

export interface ViewportConfig {
  [deviceName: string]: [number, number];
}

export interface ApiEndpoints {
  cvList: string;
  cvEntity: Record<string, string>;
  contact: string;
}

export interface PerformanceThresholds {
  pageLoad: Record<string, number>;
  interaction: Record<string, number>;
}
