import { login } from "../../src/common/auth";

Cypress.Commands.add("login", (email, password) => {
  login(email, password);
  cy.reload();
});
