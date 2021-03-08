Feature: Home

  Home page

  Background:
    Given User visits home page

  @regression @smoke @home
  Scenario: User clicks hire me
    When User clicks hire me
    Then User will see contact modal
