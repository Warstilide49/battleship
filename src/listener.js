export const elementListener = (x, y, gameBoard) => {
	let coords = { x, y }
	gameBoard.receiveAttack(coords)
	
};