describe('Interactions - Player 1 holds', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.document().then((document) => {
      document.game.dice.face = 6;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('#hold').click();
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
  it('Player 1 has a global score of 6', () => {
    cy.get('#player-1-global').should('be.visible').and('have.text', '6');
  });
  it('Player 2 has a round score of 0', () => {
    cy.get('#player-2-round').should('be.visible').and('have.text', '0');
  });
  it('Player 2 has a global score of 0', () => {
    cy.get('#player-2-global').should('be.visible').and('have.text', '0');
  });
});

describe('Interactions - Player 2 holds', () => {
  before(() => {
    cy.visit('/');
    cy.get('input#player-1-nickname').type('foo').type('{ENTER}');
    cy.get('input#player-2-nickname').type('bar').type('{ENTER}');
    cy.document().then((document) => {
      document.game.dice.face = 6;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('#hold').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.document().then((document) => {
      document.game.dice.face = 5;
      document.handleDiceRolled();
      document.reRenderGameStarted(document.game);
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.get('#hold').click();
  });
  it('Player switch notification is toggled', () => {
    cy.get('#notifications-area .notification p').should('be.visible')
        .and('contain.text', 'Player 2, please let Player 1 play');
  });
  it('Dice image is face target', () => {
    cy.get('#current-dice').should('have.attr', 'src', '/assets/images/dice-target.png');
  });
  it('Player 1 is active player', () => {
    cy.get('#player-1-active').should('be.visible');
    cy.get('#player-2-active').should('not.exist');
  });
  it('Player 1 has a round score of 0', () => {
    cy.get('#player-1-round').should('be.visible').and('have.text', '0');
  });
  it('Player 1 has a global score of 6', () => {
    cy.get('#player-1-global').should('be.visible').and('have.text', '6');
  });
  it('Player 2 has a round score of 0', () => {
    cy.get('#player-2-round').should('be.visible').and('have.text', '0');
  });
  it('Player 2 has a global score of 5', () => {
    cy.get('#player-2-global').should('be.visible').and('have.text', '5');
  });
});
