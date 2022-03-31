describe('UI - End of Game', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.document().then((document) => {
      document.game.player1.score.round = 0;
      document.game.player1.score.global = 94;
      document.game.player2.score.round = 0;
      document.game.player2.score.global = 65;
      document.game.dice.face = 6;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get('#hold').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
  });
  it('Show end of game popup', () =>{
    cy.get('article.end-game').should('be.visible');
  });
});
