export const screenResolutions = [[1920, 1080], [1024, 1366], [360, 640]];

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
          .should("exist");
      });
    });
  });
});
