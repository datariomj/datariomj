Feature: Stack

  Stack page

  Background:
    Given User visits stack page

  @regression @smoke @stack
  Scenario: User should load proper metadata
    Then User will load proper metadata

  @regression @smoke @stack
  Scenario: User loads stack list
    Then User will load stack list
