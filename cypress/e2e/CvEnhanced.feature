Feature: CV Enhanced

  As a user visiting the CV section
  I want to explore detailed CV information
  So that I can learn about professional experience

  Background:
    Given User visits CV page with API mocks

  @regression @smoke @cv
  Scenario: User loads CV page and verifies structure
    Then User should see CV page loaded correctly
    And CV tree structure should be visible
    And CV list should load with correct data

  @regression @cv @interaction
  Scenario: User expands and collapses CV categories
    When User clicks first parent node
    Then Child CV details should be hidden
    When User clicks first parent node again
    Then Child CV details should be visible

  @regression @cv @interaction
  Scenario: User expands and collapses via expand icon
    When User clicks first expand icon
    Then Child CV details should be hidden
    When User clicks first expand icon again
    Then Child CV details should be visible

  @regression @cv @navigation
  Scenario: User navigates to CV detail page
    When User clicks first child node
    Then User should be on CV detail page
    And CV detail content should be visible
    And Tab navigation should be available

  @regression @cv @tabs
  Scenario: User opens multiple CV detail tabs
    When User clicks first child node
    And User clicks second child node
    And User clicks third child node
    Then Multiple tabs should be visible
    And User can close individual tabs
    And Tab navigation should work correctly

  @regression @cv @responsive
  Scenario: CV page responsive behavior
    Given User is on mobile viewport
    Then CV drawer should be closed by default
    And Mobile CV menu button should be visible
    When User clicks mobile CV menu button
    Then CV drawer should open
    When User switches to desktop viewport
    Then CV drawer should be open by default

  @regression @cv @detail
  Scenario: CV detail page content verification
    When User clicks first child node
    Then CV detail should show company information
    And CV detail should show duration information
    And CV detail should show description content
    And External links should work correctly

  @regression @cv @accessibility
  Scenario: CV page accessibility
    Then CV page should be accessible
    And CV tree should have proper ARIA attributes
    And CV tabs should be keyboard navigable

  @regression @cv @performance
  Scenario: CV page performance
    Then CV page should load within acceptable time
    And CV data should be cached correctly
    And Tree expansion should be smooth

  @regression @cv @error
  Scenario: CV page handles API errors gracefully
    Given API returns error for CV data
    Then User should see error handling
    And Page should remain functional

  @regression @cv @data
  Scenario: CV data integrity verification
    Then CV tree should show correct number of categories
    And Each category should have child items
    And CV details should contain required fields
    And Dates should be formatted correctly
