import { screenResolutions } from "../support/helpers";

context("appbar", () => {
  screenResolutions.forEach(screenResolution => {
    context(screenResolution + " resolution", function() {
      beforeEach(() => {
        cy.viewport(screenResolution[0], screenResolution[1]);
        cy.visit("http://localhost:3000/");
      });

      it("logs the user in", () => {
        cy.get("[data-test=appbar]")
          .should("exist")
          .should("contain", "Login");
        cy.get("[data-test=login-dialog]").should("not", "exist");
        cy.get("[data-test=login-button]")
          .should("exist")
          .click();
        cy.get("[data-test=login-dialog]")
          .should("exist")
          .within(() => {
            cy.get("[data-test=email-input]")
              .should("exist")
              .within(() => {
                cy.get("input").type("bram.kaashoek@amis.nl");
              });
            cy.get("[data-test=password-input]")
              .should("exist")
              .within(() => {
                cy.get("input").type("123");
              });
            cy.get("[data-test=submit-button]")
              .should("exist")
              .click();
          });
        cy.get("[data-test=appbar]")
          .should("contain", "Accommodatie aanmaken")
          .should("contain", "Bram");
      });
    });
  });
});
