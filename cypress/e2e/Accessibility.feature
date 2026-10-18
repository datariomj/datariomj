Feature: Accessibility

  As a user with assistive technologies
  I want the website to be fully accessible
  So that I can navigate and interact with all content

  Background:
    Given User visits home page

  @regression @accessibility @a11y
  Scenario: Website passes accessibility audit
    When User runs accessibility audit on home page
    Then Home page should have no accessibility violations
    When User navigates to CV page
    And User runs accessibility audit on CV page
    Then CV page should have no accessibility violations

  @regression @accessibility @keyboard
  Scenario: Keyboard navigation works throughout the site
    When User navigates using only keyboard
    Then All interactive elements should be reachable via keyboard
    And Focus indicators should be visible
    And Tab order should be logical
    When User presses Enter on navigation links
    Then Navigation should work with keyboard

  @regression @accessibility @screen-reader
  Scenario: Screen reader compatibility
    When User simulates screen reader navigation
    Then All content should have proper headings structure
    And Images should have alt text
    And Form fields should have proper labels
    And Interactive elements should have accessible names

  @regression @accessibility @aria
  Scenario: ARIA attributes and roles
    When User checks ARIA implementation
    Then Navigation should have proper ARIA roles
    And Dynamic content should have ARIA live regions
    And Form validation should announce errors
    And Modal dialogs should have proper ARIA attributes

  @regression @accessibility @focus
  Scenario: Focus management
    When User navigates to contact page
    Then Focus should be managed appropriately

  @regression @accessibility @color
  Scenario: Color and contrast accessibility
    When User checks color contrast
    Then All text should meet WCAG contrast requirements
    And Color should not be the only way to convey information
    And Focus indicators should have sufficient contrast

  @regression @accessibility @responsive
  Scenario: Accessibility on mobile devices
    Given User is on mobile viewport
    When User runs accessibility audit on mobile
    Then Mobile layout should be accessible
    And Touch targets should meet minimum size requirements
    And Content should be readable without zooming

  @regression @accessibility @forms
  Scenario: Form accessibility
    When User navigates to contact page
    Then Form should be accessible

  @regression @accessibility @language
  Scenario: Language and internationalization
    When User checks page language
    Then Page should have proper language attributes
    And Content should be properly marked for language
    And Text direction should be correct

  @regression @accessibility @media
  Scenario: Media accessibility
    When User checks media content
    Then Images should have meaningful alt text
    And Decorative images should be marked appropriately
    And Videos should have captions if present
    And Audio content should have transcripts if present
