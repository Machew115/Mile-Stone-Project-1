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
    document.querySelector("#game-over-area").className = 'hide'
    document.querySelector("#start-box").className = 'hide'
    ourBoard = Array.from(Array(9).keys());
        for(i = 0; i < boxes.length; i++) {
            boxes[i].innerText = "";
            boxes[i].style.removeProperty('background-color');
            boxes[i].addEventListener('click', turnClick, false)
            
        }
}

function turnClick(square) {
    if (typeof ourBoard[square.target.id] == 'number' ){
        turn(square.target.id, minplayer)
        if (!checkWin(ourBoard, minplayer) && !checkTie()) turn(bestSpot(), maxAI)
    }
}

function turn(squareId, player) {
    ourBoard[squareId] = player;
    document.getElementById(squareId).innerText = player
    let gameWon = checkWin(ourBoard, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
        return gameWon;    
}

function gameOver(gameWon) {
    for(let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == minplayer ? "blue" : "red" ;
    }
    for (i=0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == minplayer ? "Humans Win!" : "Robots Win!")
}

function declareWinner(results) {
    document.querySelector("#game-over-area").className = "visible";
    document.querySelector("#replay-screen").innerText = results;
}

function emptySquare() {
    return ourBoard.filter(s => typeof s == 'number')
}

function bestSpot() {
    return minimax(ourBoard, maxAI).index;
}

function checkTie() {
    if (emptySquare().length == 0){
        for (i=0; i< boxes.length; i++){
        boxes[i].style.backgroundColor = "green";
        boxes[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Stalemate")
    return true;
    }
    return false;
}

     