describe('Interactions - New Game request', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.document().then((document) => {
      document.game.dice.face = 6;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('#new-game').click();
  });
  it('Then the Dice loader is visible', () => {
    cy.get('img#dice-roll-gif').should('be.visible');
  });
  it('And players have to choose their nicknames', () => {
    cy.get('input#player-1-nickname').should('be.visible');
    cy.get('input#player-2-nickname').should('be.visible');
  });
  it('And focus is on player 1 nickname field', () => {
    cy.get('input#player-1-nickname').should('be.focused');
  });
});
