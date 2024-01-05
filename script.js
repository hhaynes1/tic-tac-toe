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

    function getBoard() {
        return board;
    }

    function setBoard(i, symbol) {
        board[i] = symbol;
    }

    function checkWin() {

        // check for winning moves or no moves left
        winningMoves.forEach(winningMove => {
            let check = '';
            for (let i = 0; i < 3; i++) {
                check += board[winningMove[i]];
            }

            if (check === 'XXX' || check === 'OOO') {
                gameSession = false;
                console.log(`gamesession: ${gameSession}, winning move: ${winningMove}`);
            } else if (!board.includes('')) {
                gameSession = false;
                console.log(`gamesession: ${gameSession}, no moves left`);
            }
        })

    }

    function getSession() {
        return gameSession;
    }

    function clearBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        gameSession = true;
        console.log(`gamesession: ${gameSession}`);
    }

    return { getBoard, setBoard, checkWin, getSession, clearBoard }
})();


function createPlayer(name, symbol) {
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return { name, symbol, getScore, giveScore };
}

(function gameController() {
    // create players
    let playerOne = createPlayer('Player 1', 'X');
    let playerTwo = createPlayer('Player 2', 'O');

    // turn counter
    let playerTurn = 0;

    // DOM elements
    const boardContainer = document.querySelector('.gameboard');
    const resetBtn = document.getElementById('reset-button');
    const playerOneName = document.getElementById('player-one');
    const playerTwoName = document.getElementById('player-two');


    // event handlers
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardContainer.appendChild(cell);

        cell.addEventListener('click', () => {
            // only register clicks if game in session
            if (gameBoard.getSession() === true) {
                // only change if cell is empty
                if (cell.textContent === '') {
                    if (playerTurn % 2) {
                        gameBoard.setBoard(i, 'O');
                        cell.textContent = 'O';
                    } else {
                        gameBoard.setBoard(i, 'X');
                        cell.textContent = 'X';
                    }
                    playerTurn++;
                    gameBoard.checkWin();
                }
            }
        });
    }

    resetBtn.addEventListener('click', () => {
        // clear old board
        gameBoard.clearBoard();
        let cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
        }
        playerTurn = 0;

        // 
    });


    // allow change P1 name
    playerOneName.addEventListener('dblclick', () => {
        let name = prompt('Enter player name: ', 'Player one');
        if (name === null || name === '') {
            playerOneName.textContent = 'Player 1';
        } else {
            playerOneName.textContent = name;
        }
    })

    // allow change P2 name
    playerTwoName.addEventListener('dblclick', () => {
        let name = prompt('Enter player name: ', 'Player two');
        if (name === null || name === '') {
            playerTwoName.textContent = 'Player 2';
        } else {
            playerTwoName.textContent = name;
        }
    })

    return { }
})();