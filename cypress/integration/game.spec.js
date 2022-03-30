before(() => {
  cy.visit('/');
});

describe('Dice Roller App', () => {
/**
 * ==========================
 * Dice Roller Specifications
 * ==========================
 * v 1.0.0
 */
  describe('When new Game is Loaded', () => {
    /**
     * ==========
     * Game Setup
     * ==========
     * The Game setup step is when players have to choose their nicknames
     * before that game starts
     */
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
  // ==================================================
  });
  describe('Player 1 first round', () => {
    /**
     * =======================
     * First round of Player 1
     * =======================
     * Nominal game round
     * Player rolls the dice multiple times
     * Then he holds and second player could play
     */
    it('Dice image is face target', () => {
      cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-target.png');
    });
    it('Player 1 is active player', () => {
      cy.get('#player-1-active').should('be.visible');
      cy.get('#player-2-active').should('not.exist');
    });
    it('Player 1 has a round score of 0', () => {
      cy.get('#player-1-round').should('be.visible').and('have.text', '0');
    });
    it('Player 1 has a global score of 0', () => {
      cy.get('#player-1-global').should('be.visible').and('have.text', '0');
    });
    it('Player 2 has a round score of 0', () => {
      cy.get('#player-2-round').should('be.visible').and('have.text', '0');
    });
    it('Player 2 has a global score of 0', () => {
      cy.get('#player-2-global').should('be.visible').and('have.text', '0');
    });
    describe('When Player 1 rolls the dice and the face is 6', () => {
      before(() => {
        cy.document().then((document) => {
          document.game.dice.face = 6;
          document.handleDiceRolled();
          document.reRenderGameStarted(document.game);
        });
      });
      it('Dice image is face with six dots', () => {
        cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-six-faces-six.png');
      });
      it('Player 1 has a round score of 6', () => {
        cy.get('#player-1-round').should('be.visible').and('have.text', '6');
      });
    });
    describe('When Player 1 rolls the dice again and the face is 4', () => {
      before(() => {
        cy.document().then((document) => {
          document.game.dice.face = 4;
          document.handleDiceRolled();
          document.reRenderGameStarted(document.game);
        });
      });
      it('Dice image is face with four dots', () => {
        cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-six-faces-four.png');
      });
      it('Player 1 has a round score of 6 + 4 = 10', () => {
        cy.get('#player-1-round').should('be.visible').and('have.text', '10');
      });
    });
    describe('When Player 1 holds', () => {
      before(() => {
        cy.get('#hold').click();
      });

      it('Player switch notification is toggled', () => {
        cy.get('#notifications-area .notification p').should('be.visible')
            .and('contain.text', 'Player 1, please let Player 2 play');
      });
      it('Dice image is face target', () => {
        cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-target.png');
      });
      it('Player 2 is active player', () => {
        cy.get('#player-2-active').should('be.visible');
        cy.get('#player-1-active').should('not.exist');
      });
      it('Player 1 has a round score of 0', () => {
        cy.get('#player-1-round').should('be.visible').and('have.text', '0');
      });
      it('Player 1 has a global score of 10', () => {
        cy.get('#player-1-global').should('be.visible').and('have.text', '10');
      });
      it('Player 2 has a round score of 0', () => {
        cy.get('#player-2-round').should('be.visible').and('have.text', '0');
      });
      it('Player 2 has a global score of 0', () => {
        cy.get('#player-2-global').should('be.visible').and('have.text', '0');
      });
    });
    // ==================================================
  });
  describe('Player 2 first round', () => {
    /**
     * =======================
     * First round of Player 2
     * =======================
     * Nominal game round
     * Player rolls the dice multiple times
     * Then he holds and second player could play
     */
    it('Dice image is face target', () => {
      cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-target.png');
    });
    describe('When Player 2 rolls the dice and the face is 4', () => {
      before(() => {
        cy.document().then((document) => {
          document.game.dice.face = 4;
          document.handleDiceRolled();
          document.reRenderGameStarted(document.game);
        });
      });
      it('Dice image is face with four dots', () => {
        cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-six-faces-four.png');
      });
      it('Player 1 has a round score of 4', () => {
        cy.get('#player-2-round').should('be.visible').and('have.text', '4');
      });
    });
    describe('When Player 2 rolls the dice again and the face is 3', () => {
      before(() => {
        cy.document().then((document) => {
          document.game.dice.face = 3;
          document.handleDiceRolled();
          document.reRenderGameStarted(document.game);
        });
      });
      it('Dice image is face with four dots', () => {
        cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-six-faces-three.png');
      });
      it('Player 2 has a round score of 4 + 3 = 7', () => {
        cy.get('#player-2-round').should('be.visible').and('have.text', '7');
      });
    });
    describe('When Player 2 holds', () => {
      before(() => {
        cy.get('#hold').click();
      });

      it('Player switch notification is toggled', () => {
        cy.get('#notifications-area .notification p').should('be.visible')
            .and('contain.text', 'Player 2, please let Player 1 play');
      });
      it('Dice image is face target', () => {
        cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-target.png');
      });
      it('Player 1 is active player', () => {
        cy.get('#player-1-active').should('be.visible');
        cy.get('#player-2-active').should('not.exist');
      });
      it('Player 1 has a round score of 0', () => {
        cy.get('#player-1-round').should('be.visible').and('have.text', '0');
      });
      it('Player 1 has a global score of 10', () => {
        cy.get('#player-1-global').should('be.visible').and('have.text', '10');
      });
      it('Player 2 has a round score of 0', () => {
        cy.get('#player-2-round').should('be.visible').and('have.text', '0');
      });
      it('Player 2 has a global score of 7', () => {
        cy.get('#player-2-global').should('be.visible').and('have.text', '7');
      });
    });
    // ==================================================
  });
  describe('New Game request', () => {
    /**
     * ================================
     * Players ask for a fresh new game
     * ================================
     * Game reset
     */
    before(() => {
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
  describe('Player 1 rolls the dice and dice face is 1', () => {
    before(() => {
      cy.document().then((document) => {
        document.game.player1 = new document.Player('foo');
        document.game.player2 = new document.Player('bar');
        document.handleGameStart();
        document.game.player1.score = {round: 15, global: 43};
        document.game.player2.score = {round: 0, global: 67};
        document.game.dice.face = 1;

        document.handleDiceRolled();
        document.reRenderGameStarted(document.game);
      });
    });

    it('Player switch notification is toggled', () => {
      cy.get('#notifications-area .notification p').should('be.visible')
          .and('contain.text', 'Player 1, please let Player 2 play');
    });
    it('Dice image is face target', () => {
      cy.get('#current-dice').should('have.attr', 'src', '/assets/dice-target.png');
    });
    it('Player 2 is active player', () => {
      cy.get('#player-2-active').should('be.visible');
      cy.get('#player-1-active').should('not.exist');
    });
  });
});
