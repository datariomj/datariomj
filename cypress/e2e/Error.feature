Feature: Error

  Error page

  Background:
    Given User visits error page

  @regression @smoke @error
  Scenario: User should load proper metadata
    Then User will load proper metadata

