export const elementListener = (x, y, ai) => {
	let coords = { x, y }
	ai.myGameBoard.receiveAttack(coords)
	ai.turn = true
};