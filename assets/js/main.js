// define elements
const gameAreas = document.querySelectorAll('.game-area');
const gameBoard = document.querySelector('.game-board');
const gameSqaures = document.querySelector('.game-squares');
const squares = document.querySelector('.squares');
const difficultyBtnsContainer = document.querySelector('#intro-btn-container');

let playerPosition = 0;
let leaderPosition = 0;
let leader = '<div class="leader"></div>';
let player = '<div class="player"></div>'

// difficulty settings
const difficulties = [{
    mode: 'Easy',
    squares: 16,
    startingSpeed: 1.5
}, {
    mode: 'Medium',
    squares: 49,
    startingSpeed: 1.25
}, {
    mode: 'Hard',
    squares: 100,
    startingSpeed: 1
}];

// functions
/**This function generates the amount of sqaures based off the mode's squares in the difficulties object and sets their width */
const generateSquares = difficulty => {
    for (let i = 0; i < difficulty.squares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${100 / (Math.sqrt(difficulty.squares))}%`;
        square.style.height = `${100 / (Math.sqrt(difficulty.squares))}%`;
        squares.append(square);
    }
};

const generateLeader = difficulty => {
    let square = document.querySelectorAll('.square');
    for (let i of square) {
        i.innerHTML = '';
    }
    square[leaderPosition].innerHTML = leader;
}

const updateLeaderPosition = (move) => {
    leaderPosition += move;
}

const determineLeaderPosition = (difficulty) => {
    console.log(leaderPosition);

    if (leaderPosition % Math.sqrt(difficulty.sqaures) === (Math.sqrt(difficulty.sqaures) - 1)) {
        updateLeaderPosition(10);
        return;
    } else if (leaderPosition >= (difficulty.squares - Math.sqrt(difficulty.sqaures))) {
        updateLeaderPosition(1);
        return;
    }

    let randomNumber = Math.floor(Math.random() * 2);

    if (randomNumber === 0) {
        updateLeaderPosition(1)
        return;
    } else {
        updateLeaderPosition(10);
        return;
    }
}

const leadersTurn = difficulty => {
    if (leaderPosition === difficulty.squares) {
        console.log('Horray!');
    } else {
        generateLeader(difficulty);
        determineLeaderPosition(difficulty);
        setTimeout(function() {
            leadersTurn(difficulty);
        }, 1500);
    }
}

const startGame = difficulty => {
    gameAreas.forEach((area) => {
        area.classList.add('d-none');
    });
    gameBoard.classList.remove('d-none');
    generateSquares(difficulty);
    generateLeader(difficulty);
    leadersTurn(difficulty);
}

const createDifficultyButtons = () => {
    difficulties.forEach((difficulty, i) => {
        const button = document.createElement('a');
        button.setAttribute('href', '#');
        button.setAttribute('class', 'intro-btn');
        button.innerText = difficulty.mode;
        button.addEventListener('click', function() {
            startGame(difficulty);
        });
        difficultyBtnsContainer.appendChild(button);
    })
}

createDifficultyButtons();

let leaderMoves = function() {
        
}