// this after change
function isGameOver() {
    const metrixWinnerItems =
        getMatrixItemsWinnerByRow() || isWinnerByColumn() || isWinnerBySlant();

    if (metrixWinnerItems) {
        soundButton.play('win');
        // this after change
        metrixWinnerItems.forEach((item) => item.highlight());
        showPopups();
        return true;
    } else if (turn < 9) {
        soundButton.play('action');
        return false;
    }

    soundButton.play('fullBoard');
    showPopups(true);
    return true;
}

// this after change
function getMatrixItemsWinnerByRow() {
    for (let i = 0; i < gameMatrix.length; i++) {
        if (
            gameMatrix[i][0].sign !== null &&
            gameMatrix[i][0].sign === gameMatrix[i][1].sign &&
            gameMatrix[i][1].sign === gameMatrix[i][2].sign
        ) {
            return [gameMatrix[i][0], gameMatrix[i][1], gameMatrix[i][2]];
        }
    }
    return false;
}

function isWinnerByColumn() {
    for (let j = 0; j < gameMatrix.length; j++) {
        if (
            gameMatrix[0][j].sign !== null &&
            gameMatrix[0][j].sign === gameMatrix[1][j].sign &&
            gameMatrix[1][j].sign === gameMatrix[2][j].sign
        ) {
            gameMatrix[0][j].highlight();
            gameMatrix[1][j].highlight();
            gameMatrix[2][j].highlight();
            return true;
        }
    }
    return false;
}

function isWinnerBySlant() {
    if (
        gameMatrix[0][0].sign !== null &&
        gameMatrix[0][0].sign === gameMatrix[1][1].sign &&
        gameMatrix[1][1].sign === gameMatrix[2][2].sign
    ) {
        gameMatrix[0][0].highlight();
        gameMatrix[1][1].highlight();
        gameMatrix[2][2].highlight();
        return true;
    }

    if (
        gameMatrix[0][2].sign !== null &&
        gameMatrix[0][2].sign === gameMatrix[1][1].sign &&
        gameMatrix[1][1].sign === gameMatrix[2][0].sign
    ) {
        gameMatrix[0][2].highlight();
        gameMatrix[1][1].highlight();
        gameMatrix[2][0].highlight();
        return true;
    }

    return false;
}
