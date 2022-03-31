describe('Rule - Dice is rolled and face is 1', () => {
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
      document.game.dice.face = 1;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });
  it('Player switch notification is toggled', () => {
    cy.get('#notifications-area .notification p').should('be.visible')
        .and('contain.text', 'Player 1, please let Player 2 play');
  });
  it('Dice image is face target', () => {
    cy.get('#current-dice').should('have.attr', 'src', '/assets/images/dice-target.png');
  });
  it('Player 2 is active player', () => {
    cy.get('#player-2-active').should('be.visible');
    cy.get('#player-1-active').should('not.exist');
  });
  it('Player 1 has a round score of 0', () => {
    cy.get('#player-1-round').should('be.visible').and('have.text', '0');
  });
  it('Player 1 has a global score of 94', () => {
    cy.get('#player-1-global').should('be.visible').and('have.text', '94');
  });
  it('Player 2 has a round score of 0', () => {
    cy.get('#player-2-round').should('be.visible').and('have.text', '0');
  });
  it('Player 2 has a global score of 65', () => {
    cy.get('#player-2-global').should('be.visible').and('have.text', '65');
  });
});
