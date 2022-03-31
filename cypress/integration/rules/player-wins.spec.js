describe('Rule - Player 1 wins with difficulty easy', () => {
  before(() => {
    cy.visit('/');
    cy.get('select#choose-difficulty').select('easy');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.document().then((document) => {
      document.game.player1.score.round = 0;
      document.game.player1.score.global = 46;
      document.game.player2.score.round = 0;
      document.game.player2.score.global = 23;
      document.game.dice.face = 4;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('#hold').click();
  });
  it('Show end of game popup', () =>{
    cy.get('article.end-game').should('be.visible');
  });
  it('Player 1 wins', () =>{
    cy.contains('Congratulations to Player 1 (foo) who won!!!').should('be.visible');
    cy.contains('Player 2 (bar) is a looser!!!').should('be.visible');
  });
});

describe('Rule - Player 1 wins with difficulty normal (default)', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.document().then((document) => {
      document.game.player1.score.round = 0;
      document.game.player1.score.global = 96;
      document.game.player2.score.round = 0;
      document.game.player2.score.global = 83;
      document.game.dice.face = 4;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('#hold').click();
  });
  it('Show end of game popup', () =>{
    cy.get('article.end-game').should('be.visible');
  });
  it('Player 1 wins', () =>{
    cy.contains('Congratulations to Player 1 (foo) who won!!!').should('be.visible');
    cy.contains('Player 2 (bar) is a looser!!!').should('be.visible');
  });
});
