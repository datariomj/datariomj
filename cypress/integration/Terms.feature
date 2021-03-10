Feature: Terms

  Terms page

  Background:
    Given User visits terms page

  @regression @smoke @terms
  Scenario: User should load proper metadata
    Then User will load proper metadata

