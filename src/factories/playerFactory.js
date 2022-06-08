import {gameBoard} from './gameBoardFactory'

export const player= (name, dimensions, turn=false) =>{

	const myGameBoard = gameBoard(dimensions);

	const playedMoves = [];

	const movesRemaining = []
	for (let i=0; i<dimensions**2; i++){
		movesRemaining.push(i);
	}

	const attack = (enemyGameBoard, coords) =>{
		enemyGameBoard.receiveAttack(coords)
		playedMoves.push(coords)
	}

	const randomAttack = (enemyGameBoard) =>{
		// Implement for AI
		// (done)Shouldn't shoot the same coordinate twice
		// (Not done)Should try to hit nearby coords if it got a hit
		if (movesRemaining.length<=0)
			return;

		let index = Math.floor(Math.random() * movesRemaining.length)
		const element = movesRemaining[index];

		const randomCoord = {
			x :Math.floor(element/dimensions),
			y :element % dimensions,
		}
		
		enemyGameBoard.receiveAttack(randomCoord)
		movesRemaining.splice(movesRemaining.indexOf(element), 1)
		// Write tests for this I am not so sure if itll work
	}

	const didPlayerWin = (enemyGameBoard) =>{
		if (enemyGameBoard.areShipsGone()){
			return true;
		}
		return false;
	}

	return{name, turn, myGameBoard, attack, randomAttack, playedMoves, didPlayerWin}
}