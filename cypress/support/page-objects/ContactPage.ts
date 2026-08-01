/// <reference types="cypress" />

export class ContactPage {
  // Page elements
  readonly container = "app-contact";
  readonly title = 'h1:contains("0x04 // ESTABLISH_CONNECTION")';
  
  // Form elements
  readonly contactForm = 'form';
  readonly nameField = 'input#name';
  readonly emailField = 'input#email';
  readonly messageField = 'textarea#message';

  // Form labels
  readonly nameLabel = 'label[for="name"]';
  readonly emailLabel = 'label[for="email"]';
  readonly messageLabel = 'label[for="message"]';

  // Buttons
  readonly submitButton = 'button[type="submit"], button[type="button"]';

  // Actions
  openPage() {
    cy.get('[data-cy="nav-contact"]').first().click();
    cy.url().should("include", "/contact");
    cy.get(this.container).should("be.visible");
    return this;
  }

  fillNameField(name: string) {
    cy.get(this.nameField).clear().type(name, { delay: 10 });
    return this;
  }

  fillEmailField(email: string) {
    cy.get(this.emailField).clear().type(email, { delay: 10 });
    return this;
  }

  fillMessageField(message: string) {
    cy.get(this.messageField).focus().clear().type(message, { force: true, delay: 0 });
    return this;
  }

  fillCompleteForm(name: string, email: string, message: string) {
    this.fillNameField(name);
    this.fillEmailField(email);
    this.fillMessageField(message);
    return this;
  }

  submitForm() {
    cy.get(this.submitButton).click();
    return this;
  }

  clearForm() {
    cy.get(this.nameField).clear();
    cy.get(this.emailField).clear();
    cy.get(this.messageField).clear();
    return this;
  }

  // Verifications
  verifyPageVisible() {
    cy.get(this.container).should("be.visible");
    cy.get(this.title).should("be.visible");
    cy.get(this.contactForm).should("be.visible");
    return this;
  }

  verifyFormFields() {
    cy.get(this.nameField).should("be.visible");
    cy.get(this.emailField).should("be.visible");
    cy.get(this.messageField).should("be.visible");
    cy.get(this.submitButton).should("be.visible");
    return this;
  }

  verifyFormLabels() {
    cy.get(this.nameLabel).should("be.visible");
    cy.get(this.emailLabel).should("be.visible");
    cy.get(this.messageLabel).should("be.visible");
    return this;
  }

  verifySubmitState() {
    cy.get(this.submitButton).should("contain.text", "TRANSMITTING");
    return this;
  }
}
