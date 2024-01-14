/// <reference types="Cypress" />

import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  // cy.intercept('*', (req) => {
  //   const regularResourcesRe = /\.(jsx?|coffee|html|less|s?css|svg)(\?.*)?$/;
  //   const url = new URL(req.url);

  //   url.search = '';
  //   url.hash = '';

  //   const isAsset = req.method === 'GET' && regularResourcesRe.test(url.href);

  //   if (req.url.includes('sockjs-node') || isAsset) {
  //     req.destroy();
  //   } else {
  //     req.continue();
  //   }
  // });
  // cy.intercept('POST', '/sockjs-node/**', {}).as('postWebsocket');
  // cy.intercept('GET', '/sockjs-node/**', {}).as('getWebsocket');
});
