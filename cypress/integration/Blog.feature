Feature: Blog

  Blog page

  Background:
    Given User visits blog page

  @regression @smoke @blog
  Scenario: User should load proper metadata
    Then User will load proper metadata
