/// <reference types="cypress" />

export class HomePage {
  selectSource(source: string ) {
    cy.get('[placeholder="Where from?"]').type(source);
    cy.wait(500);
    cy.get('ul.airportList li').contains(source).should('be.visible').click();
  }

  selectDestination(destination:string ) {
    cy.get('[placeholder="Where to?"]').type(destination);
    cy.wait(500);
    cy.get('ul.airportList li').contains(destination).should('be.visible').click();
  }

  selectDepartureDate(departureDate:string ) {
    
    cy.get('.homeCalender button:first-child').click();
    cy.get(`[aria-label="${departureDate}"]`).click();
  }

  getSearchBtn(){
    return cy.get('div.home-search-btn');
  }



  

  verifySubtotal() {
    let subtotal = 0;
    cy.get("div.sc-11uohgb-0").each(($product) => {
      const priceText = $product.find(".sc-11uohgb-4 p").text();
      const price = parseFloat(priceText.replace("$  ", ""));

      const quantityText = $product
        .find("p:nth-child(2)")
        .text()
        .match(/(\d+)/);

      // @ts-ignore
      const quantity = parseInt(quantityText);

      // Calculate the item subtotal
      const itemSubtotal = price * quantity;

      // Add the item subtotal to the overall subtotal
      subtotal += itemSubtotal;
    });

    // compare values
    cy.get(".sc-1h98xa9-8 p").first().invoke("text").as("value");
    cy.get("@value").then((value) => {
      expect(value).to.equal(`$ ${subtotal.toFixed(2)}`);
    });
  }
}
