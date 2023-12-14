/// <reference types="cypress" />

export class ResultPage {
  getCheapestFlight() {
    return cy.get('div div[data-testid="tupple"] button').first();
  }

  getCheapestPrice(){

    return cy.get('[data-ct-handle="solutionPrice"] p:last-child').first();
  }


}
