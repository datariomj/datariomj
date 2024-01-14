Feature: Privacy

  Privacy page

  Background:
    Given User visits privacy page

  @regression @smoke @privacy
  Scenario: User should load proper metadata
    Then User will load proper metadata

