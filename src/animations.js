const animateDiceRoll = () => {
    const tl = anime.timeline({
        easing: 'linear',
        duration: 250
    });
    tl.add({
        targets: '#current-dice',
        rotateY: '360deg',
    });
    tl.add({
        targets: '#current-dice',
        rotateY: '0',
    });
}

const animatePlayerRoundScore = (playerId, scoreBefore, scoreAfter) => {
    anime({
        targets: `#player-${playerId}-round`,
        innerHTML: [scoreBefore, scoreAfter],
        round: 1,
        easing: 'easeInOutExpo',
        duration: 100 * Math.abs(scoreBefore - scoreAfter)
    })
}

const animatePlayerGlobalScore = (playerId, scoreBefore, scoreAfter) => {
    anime({
        targets: `#player-${playerId}-global`,
        innerHTML: [scoreBefore, scoreAfter],
        round: 1,
        easing: 'easeInOutExpo',
        duration: 100 * Math.abs(scoreBefore - scoreAfter)
    })
}
