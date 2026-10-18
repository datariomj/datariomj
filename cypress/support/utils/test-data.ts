/// <reference types="cypress" />

// Test data utilities for consistent test data across tests

export const TestData = {
  // User data for contact forms
  users: {
    validUser: {
      name: "John Doe",
      email: "john.doe@example.com",
      message:
        "Hello, I would like to get in touch regarding potential opportunities. This is a test message with sufficient content.",
    },
    invalidUser: {
      name: "",
      email: "invalid-email",
      message: "",
    },
    specialCharUser: {
      name: "José María González-López",
      email: "josé@gonzález-lópez.com",
      message:
        "Message with special characters: àáâãäåæçèéêë ñòóôõö ùúûüý & symbols: @#$%^&*()",
    },
    longContentUser: {
      name: "Very Very Very Very Very Very Very Very Very Very Long Name That Exceeds Normal Limits",
      email:
        "very.long.email.address.that.might.cause.issues@very-long-domain-name-example.com",
      message: "A".repeat(1001), // Exceeds 1000 character limit
    },
  },

  // Viewport configurations for responsive testing
  viewports: {
    mobile: {
      "iPhone SE": [375, 667],
      "iPhone 12": [390, 844],
      "Samsung Galaxy S21": [360, 800],
    },
    tablet: {
      iPad: [768, 1024],
      "iPad Pro": [1024, 1366],
      "Samsung Galaxy Tab": [800, 1280],
    },
    desktop: {
      "Small Desktop": [1024, 768],
      "Standard Desktop": [1366, 768],
      "Large Desktop": [1920, 1080],
      "Ultra Wide": [2560, 1440],
    },
  },

  // API endpoints and responses
  api: {
    endpoints: {
      cvList: "/spaces/*/environments/master/entries?content_type=cvList",
      cvEntity: {
        solDev: "/spaces/*/environments/master/entries/czzi0Qy1HtMqzCaTnbqa9",
        datariomj:
          "/spaces/*/environments/master/entries/3Tyn6Eb3khsslzETTEfxUH",
        compEng: "/spaces/*/environments/master/entries/4l2fMoTErh3ArtEBcyUtPB",
        solArch: "/spaces/*/environments/master/entries/4y9a4QX6KCJSY4g4abZYe9",
      },
      contact: "/api/contact",
    },
    fixtures: {
      cvList: "cv/list.json",
      entities: {
        solDev: "cv/entity-sol-dev.json",
        datariomj: "cv/entity-datariomj.json",
        compEng: "cv/entity-comp-eng.json",
        solArch: "cv/entity-sol-arch.json",
      },
    },
  },

  // Page metadata expectations
  metadata: {
    home: {
      title: "MJ Datario | Home",
      url: "/",
      description: "Home",
    },
    cv: {
      title: "MJ Datario | CV",
      url: "/experience",
      description: "Curriculum Vitae",
    },
    terms: {
      title: "MJ Datario | Terms",
      url: "/terms",
    },
    privacy: {
      title: "MJ Datario | Privacy",
      url: "/privacy",
    },
    blog: {
      url: "/blog",
    },
    stack: {
      url: "/stack",
    },
  },

  // Performance thresholds
  performance: {
    pageLoad: {
      mobile: 3000, // 3 seconds
      desktop: 2000, // 2 seconds
    },
    interaction: {
      click: 100, // 100ms
      navigation: 500, // 500ms
    },
  },

  // Accessibility standards
  accessibility: {
    minTouchTarget: 44, // pixels - WCAG 2.1 AA
    minFontSize: 16, // pixels - recommended
    contrastRatio: 4.5, // WCAG AA standard
    maxTabIndex: 0, // No positive tab indexes recommended
  },

  // Animation and transition durations
  animations: {
    short: 200,
    medium: 500,
    long: 1000,
  },
};

// Utility functions for test data
export const TestHelpers = {
  // Generate random test data
  generateRandomUser: () => ({
    name: `Test User ${Math.floor(Math.random() * 1000)}`,
    email: `test${Math.floor(Math.random() * 1000)}@example.com`,
    message: `Test message generated at ${new Date().toISOString()}`,
  }),

  // Wait for animations to complete
  waitForAnimation: (duration: "short" | "medium" | "long" = "medium") => {
    cy.wait(TestData.animations[duration]);
  },

  // Setup common API mocks
  setupStandardMocks: () => {
    Object.entries(TestData.api.endpoints.cvEntity).forEach(
      ([key, endpoint]) => {
        const fixture =
          TestData.api.fixtures.entities[
            key as keyof typeof TestData.api.fixtures.entities
          ];
        cy.intercept("GET", endpoint, { fixture }).as(`cv-entity-${key}`);
      },
    );

    cy.intercept("GET", TestData.api.endpoints.cvList, {
      fixture: TestData.api.fixtures.cvList,
    }).as("cv-list");
    cy.intercept("POST", TestData.api.endpoints.contact, {
      statusCode: 200,
      body: { success: true },
    }).as("contactSubmit");
  },

  // Verify page metadata
  verifyMetadata: (page: keyof typeof TestData.metadata) => {
    const meta = TestData.metadata[page];
    if ("title" in meta && meta.title) {
      cy.title().should("eq", meta.title);
    }
    if (meta.url) {
      cy.location("pathname").should("eq", meta.url);
    }
  },

  // Test all responsive breakpoints
  testAllBreakpoints: (testCallback: () => void) => {
    Object.entries(TestData.viewports).forEach(([category, viewports]) => {
      Object.entries(viewports).forEach(([device, [width, height]]) => {
        cy.log(`Testing ${category} - ${device}: ${width}x${height}`);
        cy.viewport(width, height);
        cy.wait(500);
        testCallback();
      });
    });
  },

  // Check performance thresholds
  checkPerformance: (context: "mobile" | "desktop" = "desktop") => {
    cy.window().then((win) => {
      const loadTime =
        win.performance.timing.loadEventEnd -
        win.performance.timing.navigationStart;
      const threshold = TestData.performance.pageLoad[context];
      expect(loadTime).to.be.lessThan(threshold);
    });
  },
};
