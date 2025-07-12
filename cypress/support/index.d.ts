/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username?: string, password?: string): Chainable<void>;
    logout(): Chainable<void>;
  }
}
