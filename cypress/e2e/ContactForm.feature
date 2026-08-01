Feature: Contact Form

  As a user wanting to get in touch
  I want to use the contact form
  So that I can send a message

  Background:
    Given User visits home page

  @regression @smoke @contact
  Scenario: User opens contact page
    When User navigates to contact page
    Then Contact page should be visible

  @regression @contact @success
  Scenario: User successfully submits contact form
    When User navigates to contact page
    And User fills valid contact information
    And User submits contact form
    Then Contact form should show transmitting state

  @regression @contact @fields
  Scenario: Contact form field behavior
    When User navigates to contact page
    Then All contact form fields should be visible
    And Contact form labels should be displayed
    When User types in each field
    Then Field values should be updated correctly

  @regression @contact @accessibility
  Scenario: Contact form accessibility
    When User navigates to contact page
    Then Contact form should be accessible
    And Form fields should have proper labels

  @regression @contact @responsive
  Scenario: Contact form responsive behavior
    Given User is on mobile viewport
    When User navigates to contact page
    Then Contact page should fit mobile screen
    And Form fields should be properly sized for mobile
