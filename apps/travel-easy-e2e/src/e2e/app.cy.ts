describe("travel-easy", () => {
  beforeEach(() => cy.visit("/?date_time=2023-04-25T03%3A00%3A00"));

  it("should display locations", () => {
    cy.get('input').first().should('have.value', '04/25/2023⁩ ⁦03:00⁩ ⁦AM');
    cy.get('ul > div > div > span').first().should('have.html', 'Ang Mo Kio');
  });
});
