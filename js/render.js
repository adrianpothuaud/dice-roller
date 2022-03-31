const renderGameSetup = () => {
  const playerScreen1 = playerSetupScreen(1);
  const loader = loaderImage;
  const playerScreen2 = playerSetupScreen(2);

  $('#game-board')
      .append(playerScreen1)
      .append(loader)
      .append(playerScreen2);
};

const renderGameStart = (game) => {
  const playerScreen1Component = playerScreen(1, game.player1.nickname, game.activePlayer === 1, game.player1.score.round, game.player1.score.global);
  const gameScreenComponent = gameScreen(game.dice.getImage());
  const playerScreen2Component = playerScreen(2, game.player2.nickname, game.activePlayer === 2, game.player2.score.round, game.player2.score.global);

  $('#game-board')
      .append(playerScreen1Component)
      .append(gameScreenComponent)
      .append(playerScreen2Component);
};

const reRenderGameStarted = (game) => {
  $('#player-1-screen').remove();
  $('#game-screen').remove();
  $('#player-2-screen').remove();

  const playerScreen1Component = playerScreen(1, game.player1.nickname, game.activePlayer === 1, game.player1.score.round, game.player1.score.global);
  const gameScreenComponent = gameScreen(game.dice.getImage());
  const playerScreen2Component = playerScreen(2, game.player2.nickname, game.activePlayer === 2, game.player2.score.round, game.player2.score.global);

  $('#game-board')
      .append(playerScreen1Component)
      .append(gameScreenComponent)
      .append(playerScreen2Component);

  handleGameEvents();
};
