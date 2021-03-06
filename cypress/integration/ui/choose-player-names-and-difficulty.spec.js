describe('Game UI - On Player names and difficulty selection', () => {
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
  it('And players have to choose a difficulty between easy and normal', () => {
    cy.get('#choose-difficulty').should('be.visible');
    cy.get('#choose-difficulty').select('easy');
    cy.get('#choose-difficulty').select('normal');
  });
});
