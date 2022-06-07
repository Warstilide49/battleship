import {player} from './factories/playerFactory'

export const game = () => {
	let user = player("Player", 10, true);
	let ai = player("AI", 10);

	user.myGameBoard.placeShip("trial", {x: 7, y:5}, 1, [0,1]);

	ai.myGameBoard.placeShipsRandomly();

	const getTurn = () =>{
		if(user.turn==true){
			return user
		}
		else{
			return ai
		}
	}

	const changeTurn = () =>{
		if(user.turn == true){
			user.turn=false
			ai.turn=true
		}
		else{
			user.turn=true
			ai.turn=false;
		}
	}

	const shouldEnd = () =>{
		if( user.didPlayerWin(ai.myGameBoard) ){
			return user.name
		}
		else if( ai.didPlayerWin(user.myGameBoard) ){
			return ai.name
		}
		return false
	} 

	return {user, ai, getTurn, changeTurn, shouldEnd}
}