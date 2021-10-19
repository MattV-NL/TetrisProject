let currentPosition = 4
let current = allTetrominos[0][0]

//draw the first tertomino in the first rotation

function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
}

draw();