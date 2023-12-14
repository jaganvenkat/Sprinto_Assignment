/// <reference types="cypress" />

export class BookingPage {
  getClearTripLogo() {
    return cy.get('[data-test-attrib="cleartrip-logo"]');
  }

}
