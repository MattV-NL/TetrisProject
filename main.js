let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random() * allTetrominos.length);
let current = allTetrominos[random][currentRotation];
let nextRandom = 0;
let timerId = null;
let score = 0;

//draw the tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
        squares[currentPosition + index].style.backgroundColor = colors[random];
    })
}

//undraw the tetromino
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
        squares[currentPosition + index].style.backgroundColor = '';
    })
}

function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
}

// Stop piece and freeze it in place when it reachs the bottom of the board or touches another piece
function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('boundary'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('boundary'))
        random = nextRandom
        nextRandom = Math.floor(Math.random() * allTetrominos.length)
        current = allTetrominos[random][currentRotation]
        currentPosition = 4
        draw();
        displayShape();
        addScore();
        gameOver();
    }
}

// move the tetromino left and stop it when it reaches the boundary
function moveLeft() {
    undraw();
    const leftBoundary = current.some(index => (currentPosition + index) % width === 0)
    if (!leftBoundary) currentPosition -= 1

    if(current.some(index => squares[currentPosition + index].classList.contains('boundary'))) {
        currentPosition += 1
    }
    draw();
}

//move the tetromino right and stop it once it reaches the boundary
function moveRight() {
    undraw();
    const rightBoundary = current.some(index => (currentPosition + index) % width === width - 1)
    if (!rightBoundary) currentPosition += 1

    if(current.some(index => squares[currentPosition + index].classList.contains('boundary'))) {
        currentPosition -= 1
    }
    draw();
}

//rotate the tetromino
function rotate() {
    undraw()
    currentRotation ++
    if (currentRotation === current.length) {
        currentRotation = 0
    }
    current = allTetrominos[random][currentRotation]
    draw()
}

//assigning input control to arrow keys for the game
function control(e) {
    if (e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 40) {
        moveDown();
    }
}

document.addEventListener('keydown', control);

//display next up tetromino in the small display next to the play area
function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('tetromino');
        square.style.backgroundColor = '';
    })
    nextUpTetrominos[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino');
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
    })
}

//add funcitonality to start button
startButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    } else {
        draw();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * allTetrominos.length);
        displayShape();
    }
    changeButtonStyle();
})

//change start button to pause while playing the game
function changeButtonStyle() {
    if (startButton.classList.contains('start-button')) {
        startButton.classList.remove('start-button');
        startButton.classList.add('pause-button');
        startButton.innerHTML = "PAUSE";
    } else {
        startButton.classList.remove('pause-button');
        startButton.classList.add('start-button');
        startButton.innerHTML = "START";
    }
}

//adding score to the pieces and adding score to display
function addScore() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('boundary'))) {
            score += 100
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('boundary')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = '';
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

//defining game over
let gameOverMessage = document.getElementById('gameover-message-background');
let closeGameOver = document.getElementById('close-button');

function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('boundary'))) {
        gameOverMessage.style.display = 'flex'
        clearInterval(timerId)
    }
}

//add funcitonality to reset button, not working yet
resetButton.addEventListener('click', clearBoard)

function clearBoard() {
    for (let i = 0; i < 200; i++) {
        squares[i].classList.remove('tetromino');
        squares[i].classList.remove('boundary');
        squares[i].style.backgroundColor = '';
        score = 0;
        scoreDisplay.innerHTML = score;
    }
    undraw();
    currentPosition = 4;
    draw();
    undraw();
}

//close button in gameover message
closeGameOver.addEventListener('click', () => {
    gameOverMessage.style.display = 'none';
    clearBoard();
})

//set up instructions window
let instructionsButton = document.getElementById('instructions-button');
let instructionsMessage = document.getElementById('instructions-message-background');
let closeInstructions = document.getElementById('close-button-instructions');

instructionsButton.addEventListener('click', () => {
    instructionsMessage.style.display = 'flex';
})

closeInstructions.addEventListener('click', () => {
    instructionsMessage.style.display = 'none';
})