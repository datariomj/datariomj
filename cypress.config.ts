import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { lighthouse, prepareAudit } from "@cypress-audit/lighthouse";

export default defineConfig({
  projectId: "3zwyy9",
  viewportHeight: 768,
  viewportWidth: 1366,
  video: true,
  screenshotOnRunFailure: true,
  allowCypressEnv: true,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,

  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on("before:browser:launch", (browser: any, launchOptions: any) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
    baseUrl: "http://localhost:4200",
    specPattern: ["cypress/e2e/**/*.feature", "cypress/e2e/**/*.cy.ts"],
    supportFile: "cypress/support/e2e.ts",

    // Environment variables
    env: {
      coverage: true,
      codeCoverage: {
        exclude: [
          "cypress/**/*.*",
          "node_modules/**/*.*",
          "**/*.spec.ts",
          "**/*.test.ts",
        ],
      },
      // Accessibility testing
      accessibility: {
        skipFailures: false,
        includeTags: ["wcag2a", "wcag2aa"],
        excludeTags: ["experimental"],
      },
      // Performance thresholds
      performance: {
        pageLoadTimeout: 3000,
        interactionTimeout: 500,
      },
    },

    // Retry configuration
    retries: {
      runMode: 0,
      openMode: 0,
    },

    // Browser configuration
    chromeWebSecurity: false,

    // Test configuration
    testIsolation: true,
    // experimentalStudio removed (Cypress 15.4+)
    // experimentalRunAllSpecs removed (no longer needed)
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
