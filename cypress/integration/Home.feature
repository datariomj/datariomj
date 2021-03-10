Feature: Home

  Home page

  Background:
    Given User visits home page

  @regression @smoke @home
  Scenario: User should load proper metadata
    Then User will load proper metadata

  @regression @smoke @home
  Scenario: User clicks hire me
    When User clicks hire me
    Then User will see contact dialog
