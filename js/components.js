const playerSetupScreen = (playerId) => `
<article class="player-screen" id="player-${playerId}-screen">
    <h2>Player ${playerId}</h2>
    <p class="font-bold text-center">Type your nickname below<br/>and press 'ENTER'</p>
    <label class="hidden" for="player-${playerId}-nickname">nickname</label>
    <input id="player-${playerId}-nickname" name="player-${playerId}-nickname" type="text" />
</article>
`;

const loaderImage = `
<img alt="Loading dice animation" id="dice-roll-gif" src="/assets/images/dice-roll.gif" />
`;

const playerScreen = (playerId, nickname, isActive, round, global) => `
<article class="player-screen player-screen-game-started" id="player-${playerId}-screen">
    <h2>${nickname}${isActive ? `<span class="active-player-icon" id="player-${playerId}-active">🔵<span>` : ''}</h2>
    <div class="round-score-wrapper" id="score-round">
        <div class="p-8">ROUND</div>
        <div class="font-bold p-8" id="player-${playerId}-round">${round}</div>
    </div>
    <div class="flex flex-col justify-between items-center m-16 p-16 rounded bg-black border text-xl" id="score-global">
        <div class="p-8">GLOBAL</div>
        <div class="font-bold p-8" id="player-${playerId}-global">${global}</div>
    </div>
</article>
`;

const gameScreen = (diceImgSrc) => `
<article class="game-screen" id="game-screen">
    <button class="icon-button" id="new-game">
        <img alt="New Game Icon" height="28" src="/assets/images/plus-icon.png" width="28" />
        <span>New Game</span>
    </button>
    <img alt="Dice image" id="current-dice" height="108" src="${diceImgSrc}" width="108" />
    <button class="icon-button" id="roll-dice">
        <img alt="Roll Dice Icon" height="28" src="/assets/images/reload-icon.png" width="28" />
        <span>Roll Dice</span>
    </button>
    <button class="icon-button" id="hold">
        <img alt="Hold score Icon" height="28" src="/assets/images/save-icon.png" width="28" />
        <span>Hold</span>
    </button>
</article>
`;

const switchPlayerNotification = (playerIdBefore, playerIdAfter) => `
<aside id="notifications-area">
    <article class="notification">
        <p class="font-bold text-xl">Player ${playerIdBefore}, please let Player ${playerIdAfter} play now.</p>
    </article>
</aside>
`;

const endOfGamePopup = (winnerId, winnerNickname, looserId, looserNickname) => `
<aside id="popup-area">
    <article class="end-game">
        <p class="font-bold text-xl">Congratulations to Player ${winnerId} (${winnerNickname}) who won!!!</p>
        <p class="font-bold text-xl">Player ${looserId} (${looserNickname}) is a looser!!!</p>
        <div class="w-300 mt-32">
            <button id="new-game-2">Start a New Game</button>
        </div>
    </article>
</aside>
`;
