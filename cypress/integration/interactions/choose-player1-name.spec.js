describe('Interactions - Player 1 type his name', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
  });
  it('Then player 2 nickname field is focused', () => {
    cy.get('input#player-2-nickname').should('be.focused');
  });
});
