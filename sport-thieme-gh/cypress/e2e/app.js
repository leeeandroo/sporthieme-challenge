describe('test app', () => {
  it('can access app', () => {
    cy.visit('/')
      .findByAltText(/Sport-Thieme/i)
      .should('exist');
  });
});
