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

function play() {
    board = new board(ctx);
    console.table(board.grid);
}

play();

document.addEventListener("keydown", (event) => {
    console.log(event.key)
});

const player = {
    pos: { x:3, y: 3},
    piece: z[1],
};

function drawTetromino(piece) {
    piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !==0) {
                ctx.fillSytle = "red";
                ctx.fillRect(x , y, 1, 1);
            }
        });
    });
}

function draw() {
    ctx.fillSytle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTetromino(piece.piece, piece.pos);
}

draw();

//need to solve how to draw the created arrays for each of the pieces