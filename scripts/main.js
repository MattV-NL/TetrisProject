let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random() * allTetrominos.length);
let current = allTetrominos[random][currentRotation];
let nextRandom = 0;

//draw the tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
    })
}

//undraw the tetromino
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
    })
}

//setting game time to auto move the tetrominos down the screen
timerId = setInterval(moveDown, 1000);

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

function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('tetromino');
    })
    nextUpTetrominos[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino');
    })
}

console.log()