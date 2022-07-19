let ourBoard;
const maxAI = "X";
const minplayer = "O";

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const boxes = document.querySelectorAll(".box");
function startGame() {
    document.querySelector("#game-over-area").className = 'visible'
    ourBoard = Array.from(Array(9).keys());
        for(i = 0; i < boxes.length; i++) {
            boxes[i].innerText = ""
            boxes[i].addEventListener('click', turnClick, false)
        }
}

function turnClick(square) {
    console.log(square.target.id)
        turn(square.target.id, minplayer)
}

function turn(squareId, player) {
    ourBoard[squareId] = player;
    document.getElementById(squareId).innerText = player
}
startGame()