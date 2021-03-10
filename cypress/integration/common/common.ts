/// <reference types="Cypress" />

import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.server({
    ignore: (xhr: Request) => {
      const regularResourcesRe = /\.(jsx?|coffee|html|less|s?css|svg)(\?.*)?$/;
      const url = new URL(xhr.url);

      url.search = '';
      url.hash = '';

      const isAsset = xhr.method === 'GET' && regularResourcesRe.test(url.href);
      return xhr.url.includes('sockjs-node') || isAsset;
    },
  });
  // cy.intercept('POST', '/sockjs-node/**', {}).as('postWebsocket');
  // cy.intercept('GET', '/sockjs-node/**', {}).as('getWebsocket');
});
