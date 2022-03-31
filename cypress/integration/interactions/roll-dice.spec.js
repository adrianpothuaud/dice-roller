describe('Interactions - Player 1 Rolls the dice (face is 6)', () => {
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
  });
  it('Player 1 is active player', () => {
    cy.get('#player-1-active').should('be.visible');
    cy.get('#player-2-active').should('not.exist');
  });
  it('Dice image is face with six dots', () => {
    cy.get('#current-dice').should('have.attr', 'src', '/assets/images/dice-six-faces-six.png');
  });
  it('Player 1 has a round score of 6', () => {
    cy.get('#player-1-round').should('be.visible').and('have.text', '6');
  });
});

describe('Interactions - Player 2 Rolls the dice (face is 5)', () => {
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
    cy.get('#hold').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.document().then((document) => {
      document.game.dice.face = 5;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
  });
  it('Player 2 is active player', () => {
    cy.get('#player-2-active').should('be.visible');
    cy.get('#player-1-active').should('not.exist');
  });
  it('Dice image is face with five dots', () => {
    cy.get('#current-dice').should('have.attr', 'src', '/assets/images/dice-six-faces-five.png');
  });
  it('Player 2 has a round score of 5', () => {
    cy.get('#player-2-round').should('be.visible').and('have.text', '5');
  });
  describe('Interactions - Player 2 Rolls the dice (face is 5)', () => {
    before(() => {
      cy.document().then((document) => {
        document.game.dice.face = 5;
        document.handleDiceRolled();
        document.reRenderGameStarted(document.game);
      });
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500);
    });
    it('Player 2 is active player', () => {
      cy.get('#player-2-active').should('be.visible');
      cy.get('#player-1-active').should('not.exist');
    });
    it('Dice image is face with five dots', () => {
      cy.get('#current-dice').should('have.attr', 'src', '/assets/images/dice-six-faces-five.png');
    });
    it('Player 2 has a round score of 10', () => {
      cy.get('#player-2-round').should('be.visible').and('have.text', '10');
    });
  });
});
