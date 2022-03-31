describe('Rules - Hold lock on Round start', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.document().then((document) => {
      document.game.player1.score.round = 0;
      document.game.player1.score.global = 94;
      document.game.player2.score.round = 0;
      document.game.player2.score.global = 65;
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });
  it('Hold button is locked', () => {
    cy.get('#hold').should('be.disabled');
  });
});

describe('Rules - Hold unlocked on Dice roll', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.document().then((document) => {
      document.game.player1.score.round = 0;
      document.game.player1.score.global = 94;
      document.game.player2.score.round = 0;
      document.game.player2.score.global = 65;
      document.game.dice.face = 3;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });
  it('Hold button is unlocked', () => {
    cy.get('#hold').should('be.enabled');
  });
});
