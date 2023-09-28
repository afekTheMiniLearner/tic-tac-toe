const playSound = (sound) => {
  if (isSoundMuted && sound !== 'unmute') return;
  new Audio(`./assets/sounds/${sound}.mp3`).play();
};

function getInitializedBoardCell(num) {
  const cellElement = document.getElementById(`board-cell-${num}`);
  cellElement.addEventListener('click', () => {
    const isDisabled = cellElement.getAttribute('disabled');
    if (!isDisabled) selectBoardCell(num);
  });

  return { cellElement, sign: null };
}

function updateCurrentTurnStatus() {
  const isTurnOfBot = isCurrentBotTurn();
  currentTurnStatusDisplay.innerText = `Next Move: \n ${currentTurnSign.toUpperCase()} - ${
    isTurnOfBot ? 'Bot' : 'Player'
  }`;
}

function modifyElementsOnFinishedGame() {
  startGameButton.innerText = 'Play-Again';
  startGameButton.classList.remove(GAME_ELEMENT_MODES.HIDDEN);
  currentTurnStatusDisplay.classList.add(GAME_ELEMENT_MODES.HIDDEN);
}

function modifyElementsOnGameStart() {
  startGameButton.classList.add(GAME_ELEMENT_MODES.HIDDEN);
  currentTurnStatusDisplay.classList.remove(GAME_ELEMENT_MODES.HIDDEN);
}

function lockUnselectedBoardCells() {
  const boardCells = getAllBoardCells();
  boardCells
    .filter(({ sign }) => sign === null)
    .forEach(({ cellElement }) => {
      cellElement.classList.remove(currentTurnSign);
      cellElement.classList.add('locked');
      cellElement.setAttribute('disabled', true);
    });
}

function updateBoardCellsOnChange() {
  const oppositeTurn = getOppositeTurn();
  const classes = {
    add: currentTurnSign,
    remove: oppositeTurn,
  };

  const boardCells = getAllBoardCells();
  boardCells.forEach(({ cellElement }) => {
    const isNotDisabled = !cellElement.classList.contains('locked');

    if (isGameFinished || isNotDisabled) {
      cellElement.classList.remove(
        GAME_ELEMENT_MODES.EMPTY,
        GAME_ELEMENT_MODES.LOCKED,
        GAME_ELEMENT_MODES.WINNER,
        classes.remove
      );

      cellElement.classList.add(classes.add);
    }
  });
}

function resetBoardCells() {
  const boardCells = getAllBoardCells();

  boardCells.forEach((boardCell, i) => {
    boardCell.cellElement.classList.remove(GAME_ELEMENT_MODES.LOCKED);
    // eslint-disable-next-line no-param-reassign
    boardCell.sign = null;

    boardCell.cellElement.removeAttribute('disabled');
  });
  updateBoardCellsOnChange();
}

const highlightWinningBoardCells = () => {
  const winningBoardCells = getWinningCells();
  winningBoardCells.forEach(({ cellElement }) =>
    cellElement.classList.add(GAME_ELEMENT_MODES.WINNER)
  );
};

const toggleMuteStatus = () => {
  const soundModeToSet = isSoundMuted ? 'unmute' : 'mute';

  playSound(soundModeToSet);
  isSoundMuted = !isSoundMuted;
  toggleMuteButton.removeAttribute('src');
  toggleMuteButton.setAttribute(
    'src',
    `./assets/pictures/${soundModeToSet}.png`
  );
};
