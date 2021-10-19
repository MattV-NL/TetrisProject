//Constants
const grid = document.querySelector('.grid');
const width = 10;
const scoreDisplay = document.getElementById('score-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

//Variables
let squares = Array.from(document.querySelectorAll('.grid div'));

//Tertominos
/* With the way I have set up the array the game will be played on a piece is drawn using the vaule of the index of the game array. For the first example, the "l" Tetromino, the values of the piece locations would be [ 1, 11, 21, 2] which would form the shape in a 10x20 array going from 0 to 199*/
const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width +1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetromino = [
    [0, 1, width + 1, width + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2]
]

const tTetromino = [
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1]
]

const oTertomino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]

const sTetromino = [
    [1, 2, width, width +1],
    [1, width + 1, width + 2, width * 2 + 2],
    [1, 2, width, width +1],
    [1, width + 1, width + 2, width * 2 + 2]
]

const iTetromino = [
    [1, width +1, width * 2 +1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width +1, width * 2 +1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
]

const jTetromino = [
    [0, width, width + 1, width + 2],
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 1 + 1]
]

const allTetrominos = [
    jTetromino, iTetromino, sTetromino, zTetromino, tTetromino, oTertomino, lTetromino
]