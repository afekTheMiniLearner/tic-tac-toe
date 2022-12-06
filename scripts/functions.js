function displayCurrentTurn() {
    const playerOTurn = document.getElementById(ELEMENTS_IDS.playerOTurn);
    const playerXTurn = document.getElementById(ELEMENTS_IDS.playerXTurn);

    if (turn % 2) {
        addClasses(playerXTurn, 'off');
        removeClasses(playerOTurn, 'off');
    } else {
        addClasses(playerOTurn, 'off');
        removeClasses(playerXTurn, 'off');
    }
}

function changeButtonsToCurrentTurn() {
    const classToAdd = turn % 2 ? 'buttonO' : 'buttonX';
    const classToRemove = turn % 2 ? 'buttonX' : 'buttonO';
    //in class
    const buttonsElements = document.querySelectorAll('.actionButton');

    buttonsElements.forEach((element) => {
        if (!element.classList.contains('locked') || isFinishedGame) {
            removeClasses(element, [
                'defaultLogo',
                classToRemove,
                'locked',
                'winnerButton',
            ]);

            addClasses(element, classToAdd);
        }
    });
}

function resetGame() {
    hidePopupButtons();
    resetGameButtons();
    isFinishedGame = false;
    turn = 1;
}

function lockButtonFromAction(id) {
    //in class
    const element = document.getElementById(id);

    addClasses(element, 'locked');
    removeAttributes(element, ['onclick', 'name']);

    if (isFinishedGame) addClasses(element, 'gameOver');
}

function finishGame(hidePopupButton = false) {
    lockEmptyButtons();
    if (!hidePopupButton) showPlayAgainButton();
    resetGameMatrix();
}
