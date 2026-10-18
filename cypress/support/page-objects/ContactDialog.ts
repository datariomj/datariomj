/// <reference types="cypress" />

export class ContactDialog {
  // Contact dialog elements
  readonly contactDialog = "app-contact-dialog";
  readonly dialogContent = "mat-dialog-content";
  readonly dialogActions = "mat-dialog-actions";

  // Form elements
  readonly contactForm = '[data-cy="contact-form"]';
  readonly nameField = 'input[formcontrolname="name"]';
  readonly emailField = 'input[formcontrolname="email"]';
  readonly messageField = 'textarea[formcontrolname="message"]';

  // Form labels and errors
  readonly nameLabel = 'mat-label:contains("Name")';
  readonly emailLabel = 'mat-label:contains("Email")';
  readonly messageLabel = 'mat-label:contains("Message")';
  readonly nameError = 'mat-error:contains("Please enter a valid name")';
  readonly emailError = 'mat-error:contains("Please enter a valid email")';
  readonly messageRequiredError =
    'mat-error:contains("Please enter a message")';
  readonly messageLengthError = 'mat-error:contains("Message is too long")';

  // Buttons
  readonly submitButton = 'button[type="submit"]';
  readonly cancelButton = 'button:contains("Cancel")';

  // Actions
  openDialog() {
    // Trigger dialog opening via sidenav contact button
    cy.get('[data-cy="nav-contact"]').click();
    // Wait for dialog to appear
    cy.get(this.contactDialog).should("exist");
    return this;
  }

  fillNameField(name: string) {
    cy.get(this.nameField).clear().type(name);
    return this;
  }

  fillEmailField(email: string) {
    cy.get(this.emailField).clear().type(email);
    return this;
  }

  fillMessageField(message: string) {
    cy.get(this.messageField).clear().type(message);
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

  cancelForm() {
    cy.get('[data-cy="contact-cancel"]').click();
    return this;
  }

  clearForm() {
    cy.get(this.nameField).clear();
    cy.get(this.emailField).clear();
    cy.get(this.messageField).clear();
    return this;
  }

  // Verifications
  verifyDialogVisible() {
    // Wait for dialog to exist first
    cy.get(this.contactDialog).should("exist");
    // Then wait for it to be visible and have proper dimensions
    cy.get(this.contactDialog)
      .should("be.visible")
      .and(($el) => {
        expect($el.width()).to.be.greaterThan(0);
        expect($el.height()).to.be.greaterThan(0);
      });
    cy.get(this.contactForm).should("be.visible");
    return this;
  }

  verifyDialogNotVisible() {
    cy.get(this.contactDialog).should("not.exist");
    return this;
  }

  verifyFormFields() {
    cy.get(this.nameField).should("be.visible");
    cy.get(this.emailField).should("be.visible");
    cy.get(this.messageField).should("be.visible");
    cy.get(this.submitButton).should("be.visible");
    cy.get(this.cancelButton).should("be.visible");
    return this;
  }

  verifyFormLabels() {
    cy.get(this.nameLabel).should("be.visible");
    cy.get(this.emailLabel).should("be.visible");
    cy.get(this.messageLabel).should("be.visible");
    return this;
  }

  verifyNameError() {
    cy.get(this.nameError).should("be.visible");
    return this;
  }

  verifyEmailError() {
    cy.get(this.emailError).should("be.visible");
    return this;
  }

  verifyMessageRequiredError() {
    cy.get(this.messageRequiredError).should("be.visible");
    return this;
  }

  verifyMessageLengthError() {
    cy.get(this.messageLengthError).should("be.visible");
    return this;
  }

  verifyNoErrors() {
    cy.get("mat-error").should("not.exist");
    return this;
  }

  verifySubmitButtonDisabled() {
    cy.get(this.submitButton).should("be.disabled");
    return this;
  }

  verifySubmitButtonEnabled() {
    cy.get(this.submitButton).should("not.be.disabled");
    return this;
  }

  verifyFormValidation() {
    // Test empty form
    this.clearForm();
    this.submitForm();
    this.verifyNameError();
    this.verifyEmailError();
    this.verifyMessageRequiredError();

    // Test invalid email
    this.fillNameField("Test User");
    this.fillEmailField("invalid-email");
    this.fillMessageField("Test message");
    this.submitForm();
    this.verifyEmailError();

    // Test message too long (over 1000 characters)
    const longMessage = "a".repeat(1001);
    this.fillEmailField("test@example.com");
    this.fillMessageField(longMessage);
    this.verifyMessageLengthError();

    return this;
  }
}
