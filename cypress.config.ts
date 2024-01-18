import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3zwyy9',
  viewportHeight: 768,
  viewportWidth: 1366,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.feature',
  },
});
