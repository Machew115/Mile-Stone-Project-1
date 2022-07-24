function minimax(newBoard, player) {  //https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
									  // Originally I had followed this line of logic but when I couldn't figure out how to make indexs with a value instead of an array
									  //https://youtu.be/P2TcQ3h0ipQ <= this guy had used the same article and explained what I needed for the minimax to work and went along with his code
    let availSpots = emptySquare();    // look for empty spots on the the board use this function
	
	if (checkWin(newBoard, minplayer)) {  // these are "terminal states" they check for wins, loses, and ties
		return {score: -10};				// which return a value depending on if x or o win
	} 										// -10 human won, 10 ai won, 0 for a tie
	else if (checkWin(newBoard, maxAI)) {
		return {score: 10};
	} 
	else if (availSpots.length === 0) {
		return {score: 0};
	}

	let moves = [];										//collect the scores from each empty spot to evaluate

	for (var i = 0; i < availSpots.length; i++) {  		//So we loop through the available spots collecting their index and score 
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player; 				// The first available spot will be be given the value of the player being passed in the function

		if (player == maxAI) {							// now the newboard has changed from the one the we see 
			let result = minimax(newBoard, minplayer);  // depending who gets past through the function it will call itself
			move.score = result.score;  				// getting deeper into the game until it wins once it find the shortest path and maximaized win 
		} else {										// it will return the value to the first function which will pick the highest value 
			let result = minimax(newBoard, maxAI);		// resulting in a fast win or best move to pick
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === maxAI) {
		let bestScore = -10000;
		for(var i = 0; i < moves.length; i++) { // looping through the moves.length comparing values of the move pushing the best move to moves.array
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} 
	else {
		let bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}