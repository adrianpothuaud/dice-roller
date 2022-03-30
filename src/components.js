const playerSetupScreen = (playerId) => `
<article class="player-screen" id="player-${playerId}-screen">
    <div class="flex flex-col justify-center items-center">
        <h2>Player ${playerId}</h2>
        <p class="font-bold text-center">Type your nickname below<br/>and press 'ENTER'</p>
        <input id="player-${playerId}-nickname" name="player-${playerId}-nickname" type="text" />
    </div>
</article>
`;

const loaderImage = `
<img alt="Loading dice animation" id="dice-roll-gif" src="/assets/dice-roll.gif" />
`;

const playerScreen = (playerId, nickname, isActive, round, global) => `
<article class="player-screen" id="player-${playerId}-screen">
    <div class="flex flex-col justify-around items-center">
        <h2>${nickname}${isActive ? '&nbsp;🔵' : ''}</h2>
        <div class="flex flex-col justify-between items-center m-16 p-16 rounded" id="score-round">
            <div class="p-8">ROUND</div>
            <div class="font-bold p-8" id="player-${playerId}-round">${round}</div>
        </div>
        <div class="flex flex-col justify-between items-center m-16 p-16 rounded bg-black border text-xl" id="score-global">
            <div class="p-8">GLOBAL</div>
            <div class="font-bold p-8" id="player-${playerId}-global">${global}</div>
        </div>
    </div>
</article>
`;

const gameScreen = `
<article class="game-screen" id="game-screen">
    <button id="new-game">New Game</button>
    <img alt="Dice image" id="current-dice" height="108" src="/assets/dice-target.png" width="108" />
    <button id="roll-dice">Roll Dice</button>
    <button id="hold">Hold</button>
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
