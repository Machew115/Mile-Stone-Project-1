function minimax(newBoard, player) {
    let availSpots = emptySquare();
	
	if (checkWin(newBoard, minplayer)) {
		return {score: -10};
	} 
	else if (checkWin(newBoard, maxAI)) {
		return {score: 10};
	} 
	else if (availSpots.length === 0) {
		return {score: 0};
	}

	let moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == maxAI) {
			let result = minimax(newBoard, minplayer);
			move.score = result.score;
		} else {
			let result = minimax(newBoard, maxAI);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === maxAI) {
		let bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
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