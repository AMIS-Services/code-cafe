import { screenResolutions } from "../support/helpers";
import { createAccommodation } from "../../src/store/accommodations/actions";

context("dashboard", () => {
  screenResolutions.forEach(screenResolution => {
    context(screenResolution + " resolution", function() {
      beforeEach(() => {
        cy.viewport(screenResolution[0], screenResolution[1]);
        cy.visit("http://localhost:3000/");
      });

      it("displays the accommodations", () => {
        cy.get("[data-test=accommodationCard]")
          .should("exist")
          .should("have.length", 5)
          .should($cards => {
            expect($cards.eq(0)).to.contain("Bezemkast in Amsterdam");
            expect($cards.eq(0)).to.contain("Amsterdam");
            expect($cards.eq(0)).to.contain(
              "De beste woning die je in Amsterdam gaat vinden onder de 500 euro per nacht. Accepteer de realiteit van de woningnood en zie de positieve kant in: het is erg knus."
            );
          })
          .first()
          .find("img")
          .should("exist")
          .click();
        cy.url().should("contain", "/accommodation/");
      });

      it("has the toggleable favorite house when logged in", () => {
        cy.get("[data-test=favorite-icon]").should("not", "exist");

        cy.login("bram.kaashoek@amis.nl", "123");

        cy.get("[data-test=favorite-icon]")
          .should("exist")
          .should("have.length", 5)
          .first()
          .should("have.css", "fill")
          .and("eq", "rgb(211, 211, 211)");

        cy.get("[data-test=favorite-icon]")
          .first()
          .click()
          .should("have.css", "fill")
          .and("eq", "rgb(255, 0, 0)");

        cy.reload();

        cy.get("[data-test=favorite-icon]")
          .first()
          .should("have.css", "fill")
          .and("eq", "rgb(255, 0, 0)");

        cy.get("[data-test=favorite-icon]")
          .first()
          .click()
          .should("have.css", "fill")
          .and("eq", "rgb(211, 211, 211)");
      });

      it("cypress can access the redux store and trigger dispatches", () => {
        // cy.login("bram.kaashoek@amis.nl", "123");
        cy.get("[data-test=accommodationCard]").should("exist");
        cy.window()
          .its("store")
          .invoke("getState")
          .its("accommodations")
          .should("have.length", 5);

        const accs = cy
          .window()
          .its("store")
          .invoke("getState")
          .its("accommodations");

        // cy.window()
        //   .its("store")
        //   .invoke("dispatch", createAccommodation(accs[0]));
      });
    });
  });
});
