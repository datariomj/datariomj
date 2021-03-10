Feature: CV

  CV page

  Background:
    Given User visits cv page

  @regression @smoke @cv
  Scenario: User loads proper metadata
    Then User will load proper metadata

  @regression @smoke @cv
  Scenario: User loads cv list
    Then User will load cv list

  @regression @smoke @cv
  Scenario: User toggles cv list
    When User toggles cv list
    And Child cv details will be hidden
    And User toggles cv list
    Then Child cv details will be visible

  @regression @smoke @cv
  Scenario: User toggles cv list via icon
    When User toggles cv list via icon
    And Child cv details will be hidden
    And User toggles cv list via icon
    Then Child cv details will be visible

  @regression @smoke @cv
  Scenario: User access cv detail
    When User clicks cv detail
    Then User will load cv detail
