import {player} from './factories/playerFactory'

export const game = () => {
	const user = player("None", 10, true);
	const ai = player("AI", 10);

	user.myGameBoard.placeShip("trial", {x: 7, y:5}, 5, [0,1]);
	user.myGameBoard.placeShip("bruh", {x:5,y:4}, 5, [0,1])
	user.myGameBoard.placeShip("sdfs", {x:1,y:2}, 5, [1,0])

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

	return {user, ai, getTurn, changeTurn}
}