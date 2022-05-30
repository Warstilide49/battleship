export const elementListener = (x, y, gameBoard) => {
	let coords = { x, y }
	gameBoard.receiveAttack(coords)
	
	for (let i=0; i<gameBoard.hits.length; i++){
		if (x==gameBoard.hits[i].x && y==gameBoard.hits[i].y)
			return 'red';
	}

	for(let i=0; i<gameBoard.missed_attacks.length; i++){
		if (x==gameBoard.missed_attacks[i].x && y==gameBoard.missed_attacks[i].y)
			return 'green';	
	}
};