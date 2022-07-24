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
    //https://youtu.be/P2TcQ3h0ipQ
    // this showed me how to make an array out of an array due to the minimax suprising me with
    //requiring it for it to work once it agian all it does is make an index with a value
    ourBoard = Array.from(Array(9).keys()); //makes an array from an array so boxes can be identified by a number and have a value of X,O, or a number
        boxes.forEach(elem =>{
            elem.innerText = "";
            elem.style.removeProperty('background-color');
            elem.addEventListener('click', turnClick, false)
        })
}

function turnClick(boxes) {
    if (typeof ourBoard[boxes.target.id] == 'number' ){
        turn(boxes.target.id, minplayer)
        if (!checkWin(ourBoard, minplayer)&& !checkTie()){ turn(bestSpot(), maxAI)}
    }
}

function turn(boxesId, player) {
    ourBoard[boxesId] = player;
    document.getElementById(boxesId).innerText = player
    let gameWon = checkWin(ourBoard, player)
    if (gameWon) gameOver(gameWon)
}

//https://youtu.be/P2TcQ3h0ipQ
// this video helped with how too make all if not most of the javascript but it help with finding a winning
//combinations with the boxes now having indexes and values 

function checkWin(board, player) {   //function that looks for winning combinations
    let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []); //collecting each boxes index that has an element = to player(x or O) creating an array of them
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {         //now we iterate through the win combos index and winning combination ex[012]
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
        gameWon.player == minplayer ? "rgb(140, 48, 48)" : "rgb(97, 92, 92)";
        // switch(gameWon.player){
           // case 'minplayer':
               // document.getElementById(index).style.backgroundColor = "rgb(140, 48, 48)";
                //break;
            //case 'maxAI':
                //document.getElementById(index).style.backgroundColor = "grey"; 
           // default:
                //document.getElementById(index).style.backgroundColor = "white"; 
       // }
    }
    boxes.forEach(elem => {
        removeEventListener('click', turnClick, false)
    })
    declareWinner(gameWon.player == minplayer ? "Humans Win!" : "The human race perished")
    //if(gameWon.player == 'minplayer'){
       //document.querySelector("#game-over-area").className = "visible";
    //document.querySelector("#replay-screen").innerText = "Humans Win";
    //}
    //else if(gameWon.player == 'maxAI'){
        //document.querySelector("#game-over-area").className = "visible";
   // document.querySelector("#replay-screen").innerText = "Robots win";
    //}
    //else if (emptySquare().length == 0){
       // boxes.forEach(elem => {
         //   elem.style.backgroundColor = "white";
        //    elem.removeEventListener('click', turnClick, false);  
        //})
        //document.querySelector("#game-over-area").className = "visible";
        //document.querySelector("#replay-screen").innerText = "The Human race lives another day";
}

function declareWinner(results) {
    document.querySelector("#game-over-area").className = "visible";
    document.querySelector("#replay-screen").innerText = results;
}

function emptySquare() {
    return ourBoard.filter(elem => typeof elem == 'number')  // looks for empty spots needed for minimax
}

function bestSpot() {
    return minimax(ourBoard, maxAI).index;
}

function checkTie() {
    if (emptySquare().length == 0){
        boxes.forEach(elem => {
            elem.style.backgroundColor = "white";
            elem.removeEventListener('click', turnClick, false);
        })
        declareWinner("The human race lives another day")
            return true;                                   
    }
    return false;
}