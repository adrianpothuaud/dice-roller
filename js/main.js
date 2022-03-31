let game = undefined;

const handleGameSetup = () => {
  // start new game on page load
  game = new Game();
  // render setup components
  renderGameSetup();
  // focus on first input and add onChange event listeners
  $('#player-1-nickname')
      .focus()
      .change((e) => {
        game.player1 = new Player(e.target.value);
        if (game.player2 === undefined) $('#player-2-nickname').focus();
        else handleGameStart();
      });
  $('#player-2-nickname')
      .change((e) => {
        game.player2 = new Player(e.target.value);
        if (game.player1 === undefined) $('#player-1-nickname').focus();
        else handleGameStart();
      });
  // add difficulty change event listener
  $('#choose-difficulty')
      .change((e) => {
        game.difficulty = e.target.value;
      });
};

const handleGameStart = () => {
  $('#player-1-screen').remove();
  $('#setup-middle-bloc').remove();
  $('#player-2-screen').remove();
  game.dice = new Dice();
  renderGameStart(game);
  handleGameEvents(game);
};

const handleGameEvents = () => {
  $('#new-game').click(() => {
    console.log('New Game clicked!');
    $('#player-1-screen').remove();
    $('#game-screen').remove();
    $('#player-2-screen').remove();
    handleGameSetup();
  });
  $('#roll-dice').click(() => {
    $('#roll-dice').prop('disabled', true);
    animateDiceRoll();
    game.dice.roll();
    handleDiceRolled();
  });
  $('#hold').click(() => {
    let timeout;
    let endOfGame = false;
    if (game.activePlayer === 1) {
      const globalBefore = game.player1.score.global;
      game.player1.score.global += game.player1.score.round;
      animatePlayerGlobalScore(1, globalBefore, game.player1.score.global);
      const roundBefore = game.player1.score.round;
      game.player1.score.round = 0;
      animatePlayerRoundScore(1, roundBefore, game.player1.score.round);
      timeout = 100 * Math.max(Math.abs(globalBefore - game.player1.score.global), Math.abs(roundBefore - game.player1.score.round));
      if (game.player1.score.global >= (game.difficulty === 'normal' ? 100 : 50)) {
        endOfGame = true;
        handleEndOfGame(1, game.player1.nickname, 2, game.player2.nickname);
      }
    } else {
      const globalBefore = game.player2.score.global;
      game.player2.score.global += game.player2.score.round;
      animatePlayerGlobalScore(2, globalBefore, game.player2.score.global);
      const roundBefore = game.player2.score.round;
      game.player2.score.round = 0;
      animatePlayerRoundScore(2, roundBefore, game.player2.score.round);
      timeout = 100 * Math.max(Math.abs(globalBefore - game.player2.score.global), Math.abs(roundBefore - game.player2.score.round));
      if (game.player2.score.global >= (game.difficulty === 'normal' ? 100 : 50)) {
        endOfGame = true;
        handleEndOfGame(2, game.player2.nickname, 1, game.player1.nickname);
      }
    }
    if (!endOfGame) handlePlayerSwitch(timeout);
  });
};

const handleDiceRolled = () => {
  setTimeout(() => {
    $('#current-dice').attr('src', game.dice.getImage());
    if (game.dice.face === 1) {
      if (game.activePlayer === 1) game.player1.score.round = 0;
      else game.player2.score.round = 0;
      handlePlayerSwitch();
    } else {
      $('#hold').prop('disabled', false);
      if (game.activePlayer === 1) {
        const player1roundBefore = game.player1.score.round;
        game.player1.score.round += game.dice.face;
        animatePlayerRoundScore(1, player1roundBefore, game.player1.score.round);
      } else {
        const player2roundBefore = game.player2.score.round;
        game.player2.score.round += game.dice.face;
        animatePlayerRoundScore(2, player2roundBefore, game.player2.score.round);
      }
      $('#roll-dice').prop('disabled', false);
    }
  }, 500);
};

const handlePlayerSwitch = (timeout = 500) => {
  const playerSwitchNotifComponent = switchPlayerNotification(game.activePlayer, game.activePlayer === 1 ? 2 : 1);
  $('#other').append(playerSwitchNotifComponent);

  setTimeout(() => {
    $('#notifications-area').remove();
  }, 2000);

  setTimeout(() => {
    game.activePlayer = game.activePlayer === 1 ? 2 : 1;
    game.dice.face = 0;
    reRenderGameStarted(game);
  }, timeout);
};

const handleEndOfGame = (winnerId, winnerNickname, looserId, looserNickname) => {
  const endOfGameComponent = endOfGamePopup(winnerId, winnerNickname, looserId, looserNickname);
  $('#other').append(endOfGameComponent);
  $('#new-game-2').click(() => {
    $('#player-1-screen').remove();
    $('#game-screen').remove();
    $('#player-2-screen').remove();
    $('#popup-area').remove();
    handleGameSetup();
  });
};

jQuery(() => {
  handleGameSetup();

  if (_CONFIG.TESTING_WITH_CYPRESS) {
    document.game = game;
    document.handleGameSetup = handleGameSetup;
    document.handleGameStart = handleGameStart;
    document.handleGameEvents = handleGameEvents;
    document.handleDiceRolled = handleDiceRolled;
    document.handlePlayerSwitch = handlePlayerSwitch;
    document.handleEndOfGame = handleEndOfGame;
    document.Player = Player;
    document.reRenderGameStarted = reRenderGameStarted;
  }
});
