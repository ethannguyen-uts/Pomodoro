Feature: Pomodoro Timer

  Scenario: User starts the timer
    Given I am on the home page
    Then I should see "25:00"
    When I click the "Start" button
    Then I should see the "Pause" button
    And I wait for 2 seconds
    Then the timer should be less than "25:00"

  Scenario: User switches modes
    Given I am on the home page
    When I click the "Break" button
    Then I should see "05:00"
    And the "Break" button should be active

  Scenario: User resets the timer
    Given I am on the home page
    When I click the "Start" button
    And I wait for 1 seconds
    And I click the "Reset" button
    Then I should see "25:00"
