//Set up play area

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
const columns = 10;
const rows = 20;
const block_size = 30;

ctx.canvas.width = columns * block_size;
ctx.canvas.height = rows * block_size;
ctx.scale(block_size, block_size);

class board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.getEmptyBoard();
    }

    getEmptyBoard() {
        return Array.from(
            {length: rows}, () => Array(columns).fill(0)
        );
    }
}

function newBoard() {
    board = new board(ctx);
    console.table(board.grid);
}

newBoard();

let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random()*allTetrominos.length);

console.log(random)

let current = allTetrominos[random][currentRotation];

function draw() {
    current.forEach(value => {
        if (value !== 0) {
            for(let r = 0; r < current.length; r++) {
                for(let c = 0; c < current.length; c++) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(r, c, 1, 1);
                }
            }
        }
    });
}

draw();