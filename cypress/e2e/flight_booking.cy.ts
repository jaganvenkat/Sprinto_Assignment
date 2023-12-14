import { HomePage } from "../page-object/homePage";
import { ResultPage } from "../page-object/resultPage";
import { BookingPage } from "../page-object/bookingPage";

const home = new HomePage();
const result = new ResultPage();
const booking = new BookingPage();
describe("Clear trip booking", () => {
  
    const currentDate = new Date();
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const oneWeekFromToday = new Date();
    oneWeekFromToday.setDate(currentDate.getDate() + 7);
    const oneWeekFrmToday = `${weekday[oneWeekFromToday.getDay()]} ${monthNames[oneWeekFromToday.getMonth()]} ${oneWeekFromToday.getDate()} ${oneWeekFromToday.getFullYear()}`;
    before(()=>{
      cy.visit("/");
      cy.get('[class*="flex-top flex-between"] path').should('exist').click();
      cy.fixture('bookingData').then(function (data) {
        this.data = data;
    })
    })

  it.only("To test flight booking for one week from today", function()  {
    
    cy.intercept('POST', 'https://www.cleartrip.com/itin/v3/itinerary/create').as('bookingRequest');
    home.selectSource(this.data.source);
    home.selectDestination(this.data.destination);
    home.selectDepartureDate(oneWeekFrmToday);
    home.getSearchBtn().click();

    result.getCheapestPrice().then(price => {
      let cheapestPrice = price.text();
      cy.wrap(cheapestPrice).as('cheapestPrice');
    });

    result.getCheapestFlight().click();

    cy.wait('@bookingRequest')
      .its('response.body')
      .then((body) => {
      cy.visit(`/flights/itinerary/${body.itineraryId}/info?ancillaryEnabled=true`)
    })

    booking.getClearTripLogo().should('be.visible');

    cy.get('@cheapestPrice').then(cheapestPrice => {
      cy.contains("Total price").next().should('have.text',cheapestPrice);
   });

  });

  
});
