/// <reference types="Cypress" />

import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.intercept(
    'GET',
    '/spaces/*/environments/master/entries?content_type=cvList',
    { fixture: 'cv/list.json' },
  ).as('cv-list');
  cy.intercept(
    'GET',
    '/spaces/*/environments/master/entries/czzi0Qy1HtMqzCaTnbqa9',
    { fixture: 'cv/entity-sol-dev.json' },
  ).as('cv-entity-sol-dev');
  cy.intercept(
    'GET',
    '/spaces/*/environments/master/entries/3Tyn6Eb3khsslzETTEfxUH',
    { fixture: 'cv/entity-datariomj.json' },
  ).as('cv-entity-datariomj');
  cy.intercept(
    'GET',
    '/spaces/*/environments/master/entries/4l2fMoTErh3ArtEBcyUtPB',
    { fixture: 'cv/entity-comp-eng.json' },
  ).as('cv-entity-comp-eng');
  cy.intercept(
    'GET',
    '/spaces/*/environments/master/entries/4y9a4QX6KCJSY4g4abZYe9',
    { fixture: 'cv/entity-sol-arch.json' },
  ).as('cv-entity-sol-arch');
});

Given('User visits cv page', () => {
  cy.visit(`${ Cypress.config().baseUrl }/cv`);
});

When('User clicks cv detail', () => {
  cy.get('[data-cy="cv-child-node"]:first').click();
});

When('User toggles cv list', () => {
  cy.get('[data-cy="cv-parent-node"]:first').click();
});

When('User toggles cv list via icon', () => {
  cy.get('[data-cy="cv-icon-expand"]:first').click();
});

Then('Child cv details will be hidden', () => {
  cy.get('[data-cy="cv-parent-node"]:first').next('[data-cy="cv-child-node"]').should('not.exist');
});

Then('Child cv details will be visible', () => {
  cy.get('[data-cy="cv-parent-node"]:first').next('[data-cy="cv-child-node"]').should('be.visible');
});

Then('User will load proper metadata', () => {
  cy.title().should('eq', 'MJ Datario | CV');
});

Then('User will load cv list', () => {
  cy.wait('@cv-list');
  cy.wait([
    '@cv-entity-sol-dev',
    '@cv-entity-datariomj',
    '@cv-entity-comp-eng',
    '@cv-entity-sol-arch',
  ]);
  cy.get('[data-cy="cv-parent-node"]').should('have.length', 4);
  cy.get('[data-cy="cv-child-node"]').should('have.length', 4);
});

Then('User will load cv detail', () => {
  cy.location('pathname').should('eq', '/cv/solutions-developer');
});
