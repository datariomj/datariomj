Feature: Navigation

  As a user visiting the portfolio website
  I want to navigate between different sections
  So that I can explore all content areas

  Background:
    Given User visits home page

  @regression @smoke @navigation
  Scenario: User navigates through all main sections
    When User clicks CV navigation link
    Then User should be on CV page with proper metadata
    When User clicks Home navigation link
    Then User should be on Home page with proper metadata
    When User clicks Stack navigation link
    Then User should be on Stack page
    When User clicks Blog navigation link
    Then User should be on Blog page

  @regression @navigation
  Scenario: User navigates to legal pages
    When User clicks Terms navigation link
    Then User should be on Terms page with proper metadata
    When User clicks Privacy navigation link
    Then User should be on Privacy page with proper metadata

  @regression @navigation @responsive
  Scenario: Mobile navigation works correctly
    Given User is on mobile viewport
    When User navigates through main sections on mobile
    Then Navigation should work correctly on mobile
    And Mobile navigation bar should be visible

  @regression @navigation @desktop
  Scenario: Desktop navigation drawer behavior
    Given User is on desktop viewport
    Then Desktop navigation drawer should be visible
    And Desktop navigation drawer should remain open
    When User navigates between sections
    Then Desktop navigation drawer should stay open

  @regression @navigation @accessibility
  Scenario: Navigation accessibility
    Given User visits home page
    Then Navigation should be accessible
    And Navigation links should have proper aria labels
    And Navigation should be keyboard navigable

  @regression @navigation @browser
  Scenario: Browser navigation works correctly
    Given User visits CV page
    When User uses browser back button
    Then User should be on previous page
    When User uses browser forward button
    Then User should return to CV page

  @regression @navigation @url
  Scenario: Direct URL access works correctly
    When User visits "/cv" directly
    Then User should be on CV page with proper metadata
    When User visits "/terms" directly
    Then User should be on Terms page with proper metadata
    When User visits "/privacy" directly
    Then User should be on Privacy page with proper metadata
