describe('Dice Roller App', () => {
  describe('When new Game is Loaded', () => {
    before(() => {
      cy.visit('/');
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
  describe('Players identification step', () => {
    it('When player 1 set his nickname and type ENTER', () => {
      cy.get('input#player-1-nickname').type('player1').type('{ENTER}');
    });
    it('Then player 2 nickname field is focused', () => {
      cy.get('input#player-2-nickname').should('be.focused');
    });
    it('When player 2 set his nickname and type ENTER', () => {
      cy.get('input#player-2-nickname').type('player2').type('{ENTER}');
    });
    it('Then the Game starts', () => {
      cy.get('#player-1-screen').should('be.visible');
      cy.get('#player-1-round').should('be.visible');
      cy.get('#player-1-global').should('be.visible');

      cy.get('#player-2-screen').should('be.visible');
      cy.get('#player-2-round').should('be.visible');
      cy.get('#player-2-global').should('be.visible');
    });
  });
});
