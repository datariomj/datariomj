import { BasePage } from "../support/page-objects/BasePage";
import { ContactPage } from "../support/page-objects/ContactPage";

describe("Contact Form Page", () => {
  const basePage = new BasePage();
  const contactPage = new ContactPage();

  beforeEach(() => {
    basePage.visit("/contact");
  });

  it("displays contact form fields and labels", () => {
    contactPage.verifyPageVisible();
    contactPage.verifyFormFields();
    contactPage.verifyFormLabels();
  });

  it("handles form input typing and values update", () => {
    contactPage.fillCompleteForm("Test User", "test@example.com", "This is a test message.");
    cy.get(contactPage.nameField).should("have.value", "Test User");
    cy.get(contactPage.emailField).should("have.value", "test@example.com");
    cy.get(contactPage.messageField).should("have.value", "This is a test message.");
  });

  it("submits contact form and verifies transmitting state", () => {
    contactPage.fillCompleteForm("Jane Doe", "jane@example.com", "Hello, this is a valid message.");
    contactPage.submitForm();
    contactPage.verifySubmitState();
  });

  it("ensures form fields have accessible id and for attributes", () => {
    cy.get(contactPage.nameField).should("have.attr", "id", "name");
    cy.get(contactPage.nameLabel).should("have.attr", "for", "name");
    cy.get(contactPage.emailField).should("have.attr", "id", "email");
    cy.get(contactPage.emailLabel).should("have.attr", "for", "email");
    cy.get(contactPage.messageField).should("have.attr", "id", "message");
    cy.get(contactPage.messageLabel).should("have.attr", "for", "message");
  });

  it("fits responsive mobile screen size", () => {
    basePage.setViewportMobile();
    cy.get(contactPage.container).should("be.visible");
  });
});
