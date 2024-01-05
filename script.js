const gameBoard = (() => {

    const board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const winningMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let gameSession = true;
    let winningPlayer = '';
    let winningMove;

    function getWinningPlayer() {
        return winningPlayer;
    }

    function getWinningMove() {
        return winningMove;
    }

    function setBoard(i, symbol) {
        board[i] = symbol;
    }

    function checkWin() {
        // check for winning moves
        winningMoves.forEach(move => {
            let check = '';
            for (let i = 0; i < 3; i++) {
                check += board[move[i]];
            }

            if (check === 'XXX' || check === 'OOO') {
                gameSession = false;
                winningMove = move;
                check === 'XXX' ? winningPlayer = 'P1' : winningPlayer = 'P2';
            }
        })

        // no moves check comes after win check
        if (gameSession === true && !board.includes('')) {
            gameSession = false;
        }
    }

    function getSession() {
        return gameSession;
    }

    function clearBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        gameSession = true;
        winningPlayer = '';
        winningMove = [];
        console.log(`gamesession: ${gameSession}`);
    }

    return { getWinningPlayer, getWinningMove, setBoard, checkWin, getSession, clearBoard }
})();


function createPlayer(symbol) {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return { symbol, getScore, giveScore };
}

(function gameController() {
    // create players
    let playerOne = createPlayer('X');
    let playerTwo = createPlayer('O');

    // turn counter
    let playerTurn = 0;

    // DOM elements
    const resetBtn = document.getElementById('reset-button');
    const playerOneName = document.getElementById('player-one');
    const playerTwoName = document.getElementById('player-two');
    const cells = document.getElementsByClassName('cell');

    const playerOneScore = document.getElementById('score-one');
    const playerTwoScore = document.getElementById('score-two');
    const winBanner = document.querySelector('.win-banner');

    const playerOneCard = document.querySelector('.player-one-card');
    const playerTwoCard = document.querySelector('.player-two-card');

    // first time, highlight name card of player turn
    playerTurn % 2 ?
        playerTwoCard.style.backgroundColor = 'rgb(240,219,165)' :
        playerOneCard.style.backgroundColor = 'rgb(240,219,165)';

    // functions
    function handleWin(player, move) {
        // highlight winning move
        for (let i = 0; i < move.length; i++) {
            cells[move[i]].style.backgroundColor = 'rgb(133, 199, 147)';
        }

        // populate win banner and make visible
        winBanner.textContent = `Player ${player} wins.`;
        winBanner.style.visibility = "visible";
        playerOneCard.style.backgroundColor = 'whitesmoke';
        playerTwoCard.style.backgroundColor = 'whitesmoke';

        // increment player win score
        player === 'P1' ? playerOne.giveScore() : playerTwo.giveScore();
        playerOneScore.textContent = playerOne.getScore();
        playerTwoScore.textContent = playerTwo.getScore();
    }

    // event handlers
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            // only register clicks if game in session
            if (gameBoard.getSession() === true) {
                // only change if cell is empty
                if (cells[i].textContent === '') {
                    if (playerTurn % 2) {
                        gameBoard.setBoard(i, 'O');
                        cells[i].textContent = 'O';
                        playerOneCard.style.backgroundColor = 'rgb(240,219,165)';
                        playerTwoCard.style.backgroundColor = 'whitesmoke';
                    } else {
                        gameBoard.setBoard(i, 'X');
                        cells[i].textContent = 'X';
                        playerOneCard.style.backgroundColor = 'whitesmoke';
                        playerTwoCard.style.backgroundColor = 'rgb(240,219,165)';
                    }
                    playerTurn++;
                    gameBoard.checkWin()

                    if (gameBoard.getWinningPlayer()) {
                        handleWin(gameBoard.getWinningPlayer(), gameBoard.getWinningMove());
                    }
                }
            }
        });
    }

    resetBtn.addEventListener('click', () => {
        // clear old board
        gameBoard.clearBoard();
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].style.backgroundColor = 'gainsboro';
        }
        playerTurn = 0;
        playerOneCard.style.backgroundColor = 'rgb(240,219,165)';
        winBanner.style.visibility = "hidden";
        winBanner.textContent = '';
    });

    playerOneName.addEventListener('dblclick', () => {
        // allow change P1 name
        let name = prompt('Enter player name: ', 'Player one');
        if (name === null || name === '') {
            playerOneName.textContent = 'Player 1';
        } else {
            playerOneName.textContent = name;
        }
    })

    playerTwoName.addEventListener('dblclick', () => {
        // allow change P2 name
        let name = prompt('Enter player name: ', 'Player two');
        if (name === null || name === '') {
            playerTwoName.textContent = 'Player 2';
        } else {
            playerTwoName.textContent = name;
        }
    })

})();