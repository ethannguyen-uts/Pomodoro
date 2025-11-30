import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the home page", () => {
    cy.visit("/");
});

Then("I should see {string}", (text: string) => {
    cy.contains(text).should("be.visible");
});

When("I click the {string} button", (text: string) => {
    if (text === "Reset") {
        cy.get('button[title="Reset"]').click();
    } else {
        cy.contains("button", text).click();
    }
});

Then("I should see the {string} button", (text: string) => {
    cy.contains("button", text).should("be.visible");
});

When("I wait for {int} seconds", (seconds: number) => {
    cy.wait(seconds * 1000);
});

Then("the timer should be less than {string}", (time: string) => {
    cy.get('.text-6xl').invoke('text').then((text) => {
        expect(text.trim()).not.to.equal(time);
    });
});

Then("the {string} button should be active", (text: string) => {
    cy.contains("button", text).should('have.class', 'bg-notion-bg');
});
