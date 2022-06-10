import {ship} from './shipFactory'

export const gameBoard = (dimensions) =>{

	// contains ship objects with coordinates, the ship object and if it's horizontal or not
	const ships_array = [];
	const missed_attacks = [];
	const hits = [];

	// coords is short for coordinates which is an object having x and y values
	// direction is a unit vector Ex: [0,1] or [1,0]
	const placeShip = (name, coords, length, direction) => {
		testDimensions(coords, length, direction);
		//testOneSpaceAway(); Maybe wont do this lol
		let all_coords = getAllPoints(coords, length, direction);
		if(checkOverload(all_coords))
			return false;

		if(ships_array.length>=5)
			return false;

		ships_array.push({
			all_coords,
			ship : ship(length, name),
		});
	}

	const placeShipsRandomly = () =>{
		const lengths = [5,4,3,3,2];
		const names = ["Carrier", "Battleship", "Destroyer", "Submarine", "Patrol Boat"];
		
		// Not allowing random placement after a ship has been placed
		if (ships_array.length!=0)
			return;

		// Check for overload with random coords and add these guys
		let i = 0;
		while(i<5){
			const randomCoords =  {
				x :Math.floor(Math.random() * dimensions),
				y :Math.floor(Math.random() * dimensions)
			}
			const direction = Math.floor(Math.random() * 2)==0 ? [0,1] : [1,0]; 
			try{
				placeShip(names[i], randomCoords, lengths[i], direction);
			}
			catch(e){
				continue
			}
			if(ships_array.length==i+1)
				i+=1
		}
	}

	const checkOverload = (incoming_ship) =>{
		for(let i=0; i<ships_array.length; i++){
			for(let j=0; j<ships_array[i].all_coords.length; j++){
				let existing_ship = ships_array[i].all_coords
				for(let k=0; k<incoming_ship.length; k++){
					if (incoming_ship[k].x == existing_ship[j].x && incoming_ship[k].y == existing_ship[j].y)
						return true
				}
			}
		}
		return false
	}

	const receiveAttack = (coords) =>{
		testDimensions(coords);
		
		for (let i=0; i<ships_array.length; i++){

			for(let j=0; j<ships_array[i].all_coords.length; j++){

				let x_value = ships_array[i].all_coords[j].x;
				let y_value = ships_array[i].all_coords[j].y;
				if (x_value == coords.x && y_value == coords.y){
					ships_array[i].ship.hit(j);
					pushIntoArray(hits, coords);
					return true
				}
			}
		}

		pushIntoArray(missed_attacks, coords);
		return false;
	}

	const pushIntoArray = (array, coords) =>{
		for (let i=0; i<array.length; i++){
			if (coords.x==array[i].x && coords.y==array[i].y)
				return;
		}
		array.push(coords);
	}

	const areShipsGone = () =>{
		for(let i=0; i<ships_array.length; i++){
			if (!ships_array[i].ship.isSunk())
				return false
		}
		return true
	}

	const testDimensions = (coords, length = 0, direction = [0,0]) =>{

		let end_x = coords.x + (length-1)*direction[0];
		let end_y = coords.y + (length-1)*direction[1];

		let front_condition = (coords.x < dimensions && coords.x >= 0 && coords.y < dimensions && coords.y >= 0)
		let end_condition = (end_x < dimensions && end_x >= 0 && end_y < dimensions && end_y >= 0)
		
		if (front_condition && end_condition){
			return true
		}

		throw Error('exceeds dimensions');
	}

	const getAllPoints = (coords, length, direction) =>{
		let array=[];
		for(let i=0; i<length; i++){
			array.push({
				x: coords.x + i* direction[0],
				y: coords.y + i* direction[1]
			})
		}
		return array
	}

	const getNumberOfShips = () =>{
		return ships_array.length;
	}

	return {dimensions, getNumberOfShips, hits, missed_attacks, receiveAttack, placeShip, placeShipsRandomly, areShipsGone}
}