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

