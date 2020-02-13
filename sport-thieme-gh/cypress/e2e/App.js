describe('test app', () => {
  it('can access app', () => {
    cy.visit('/')
      .findByText(/Learn React/i)
      .should('exist');
  });
});
