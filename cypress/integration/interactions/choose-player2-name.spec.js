describe('Interactions - Player 2 type his name', () => {
  it('When Player 1 is not selected, Then player 1 nickname field is focused', () => {
    cy.visit('/');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    cy.get('input#player-1-nickname').should('be.focused');
  });
  it('When Player 1 is selected, Then the Game starts', () => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');

    cy.get('#player-1-screen').should('be.visible');
    cy.get('#player-1-round').should('be.visible');
    cy.get('#player-1-global').should('be.visible');

    cy.get('#player-2-screen').should('be.visible');
    cy.get('#player-2-round').should('be.visible');
    cy.get('#player-2-global').should('be.visible');
  });
});
