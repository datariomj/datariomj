import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { BasePage } from "../../support/page-objects/BasePage";
import { ContactPage } from "../../support/page-objects/ContactPage";

const basePage = new BasePage();
const contactPage = new ContactPage();

// Common steps
Given("User is on home page", () => {
  basePage.visit();
});

When("User navigates to contact page", () => {
  // Mobile or Desktop navigation
  cy.get("body").then(($body) => {
    if ($body.find(".mobile-menu-btn:visible").length > 0) {
      cy.get('.sidenav__mobile-nav [data-cy="nav-contact"]').click();
    } else {
      cy.get('.nav-links [data-cy="nav-contact"]').click();
    }
  });
  cy.url().should("include", "/contact");
});

Then("Contact page should be visible", () => {
  contactPage.verifyPageVisible();
});

// Fields verification
Then("All contact form fields should be visible", () => {
  contactPage.verifyFormFields();
});

Then("Contact form labels should be displayed", () => {
  contactPage.verifyFormLabels();
});

When("User types in each field", () => {
  contactPage.fillCompleteForm(
    "Test User",
    "test@example.com",
    "This is a test message.",
  );
});

Then("Field values should be updated correctly", () => {
  cy.get(contactPage.nameField).should("have.value", "Test User");
  cy.get(contactPage.emailField).should("have.value", "test@example.com");
  cy.get(contactPage.messageField).should(
    "have.value",
    "This is a test message.",
  );
});

// Success scenario
When("User fills valid contact information", () => {
  contactPage.fillCompleteForm(
    "Jane Doe",
    "jane@example.com",
    "Hello, this is a valid message.",
  );
});

When("User submits contact form", () => {
  contactPage.submitForm();
});

Then("Contact form should show transmitting state", () => {
  contactPage.verifySubmitState();
});

// Accessibility
Then("Contact form should be accessible", () => {
  cy.injectAxe();
  cy.checkA11y("form", {
    rules: {
      "color-contrast": { enabled: false },
      "region": { enabled: false },
    },
  });
});

Then("Form fields should have proper labels", () => {
  cy.get(contactPage.nameField).should("have.attr", "id", "name");
  cy.get(contactPage.nameLabel).should("have.attr", "for", "name");
  cy.get(contactPage.emailField).should("have.attr", "id", "email");
  cy.get(contactPage.emailLabel).should("have.attr", "for", "email");
  cy.get(contactPage.messageField).should("have.attr", "id", "message");
  cy.get(contactPage.messageLabel).should("have.attr", "for", "message");
});

// Responsive

Then("Contact page should fit mobile screen", () => {
  cy.get(contactPage.container).should("be.visible");
  cy.window().then((win) => {
    cy.get(contactPage.container).invoke("width").should("be.lte", win.innerWidth);
  });
});

Then("Form fields should be properly sized for mobile", () => {
  cy.get(contactPage.nameField).should("have.css", "width");
});
