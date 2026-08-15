Feature: Responsive Design

  As a user on different devices
  I want the website to work properly on all screen sizes
  So that I can have a good experience regardless of my device

  @regression @responsive @mobile
  Scenario: Mobile viewport navigation
    Given User is on mobile viewport
    When User visits home page
    Then Mobile navigation should be displayed
    And Desktop drawer should be hidden
    When User navigates through sections
    Then Mobile navigation should remain functional

  @regression @responsive @tablet
  Scenario: Tablet viewport behavior
    Given User is on tablet viewport
    When User visits home page
    Then Layout should adapt to tablet size
    When User visits CV page
    Then CV layout should work on tablet

  @regression @responsive @desktop
  Scenario: Desktop viewport behavior
    Given User is on desktop viewport
    When User visits home page
    Then Desktop layout should be displayed
    And Navigation drawer should be visible
    When User resizes window
    Then Layout should adapt responsively

  @regression @responsive @breakpoints
  Scenario: Responsive breakpoint testing
    Given User visits home page
    When User tests all viewport breakpoints
    Then Layout should adapt at each breakpoint
    And Content should remain accessible
    And Navigation should work at all sizes

  @regression @responsive @content
  Scenario: Content adaptation across devices
    Given User visits home page
    When User switches between mobile and desktop
    Then Content should reflow properly
    And Images should scale appropriately
    And Text should remain readable

  @regression @responsive @cv
  Scenario: CV page responsive behavior
    Given User visits CV page
    When User is on mobile viewport
    Then CV drawer should be collapsed
    And Mobile CV menu should be available
    When User switches to desktop viewport
    Then CV drawer should expand automatically

  @regression @responsive @forms
  Scenario: Form responsive behavior
    Given User opens contact dialog on mobile
    Then Form should fit mobile screen
    And Form fields should be touch-friendly
    When User switches to desktop
    Then Form should adapt to larger screen

  @regression @responsive @performance
  Scenario: Responsive performance
    Given User is on mobile viewport
    When User navigates through the site
    Then Page load times should be acceptable on mobile
    And Animations should be smooth on mobile
    And Touch interactions should be responsive

  @regression @responsive @orientation
  Scenario: Device orientation changes
    Given User is on mobile viewport in portrait
    When User rotates device to landscape
    Then Layout should adapt to landscape mode
    And Navigation should remain functional
    When User rotates back to portrait
    Then Layout should return to portrait mode

  @regression @responsive @accessibility
  Scenario: Responsive accessibility
    Given User is on mobile viewport
    Then Mobile layout should be accessible
    And Touch targets should be properly sized
    And Content should be readable without zooming
    When User uses screen reader on mobile
    Then Content should be properly announced
