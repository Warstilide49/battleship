const gameBoard = require('../gameBoardFactory');
let example

beforeEach(()=>{
	example = gameBoard.gameBoard(10);
});

test('ships can be placed', ()=>{
	let coords = {x:9, y:9};
	example.placeShip("test", coords, 1, [0,1]);
	example.receiveAttack(coords);
	expect(example.areShipsGone()).toBe(true);
});

test.failing('cannot place wrong dimensional ships', ()=>{
	let coords = {x:10, y:10};
	example.placeShip("test", coords, 1, [0,1]);
});

test('ships cannot be overloaded', ()=>{
	let coords = {x:9, y:9};

	// Trying every single way of overloading
	example.placeShip("test", coords, 1, [0,1]);
	example.placeShip("test", {x:8, y:9}, 2, [1,0]);
	example.placeShip("test", {x:9, y:8}, 2, [0,1]);
	example.placeShip("test", {x:5, y:9}, 5, [1,0]);


	example.receiveAttack(coords);
	expect(example.areShipsGone()).toBe(true);
})

test('ships placed randomly works', ()=>{
	let small_gameboard = gameBoard.gameBoard(5);
	small_gameboard.placeShipsRandomly();

	for(let i=0; i<25; i++){
		small_gameboard.receiveAttack( {x:Math.floor(i/5), y:i%5} );
	}

	expect(small_gameboard.missed_attacks.length).toBe(8);
});

test('can receive attack' ,()=>{
	let coords = {x: 5,y: 5};
	example.placeShip("test", coords, 1, [1,0]);

	let a=example.receiveAttack(coords);
	expect(a).not.toBe(false)
	expect(example.areShipsGone()).toBe(true);
});


test('detects false attacks' ,()=>{
	let coords = {x:1, y:1};
	example.placeShip("test", coords, 4, [1,0]);

	let attackCoords, a
	
	// Horizontally exceeded
	attackCoords = {x:5,y:1};
	a=example.receiveAttack(attackCoords);
	expect(a).toBe(false)

	// Vertically exceeded
	attackCoords = {x:1,y:2};
	a=example.receiveAttack(attackCoords);
	expect(a).toBe(false)

	//Both vertically and horizontally exceeded
	attackCoords = {x:2,y:2};
	a=example.receiveAttack(attackCoords);
	expect(a).toBe(false)
});

test('records missed attacks', ()=>{
	let coords = {x:1, y:1};
	example.placeShip("test", coords, 5, [0,1]);

	example.receiveAttack({x:1,y:2});
	example.receiveAttack({x:2,y:1});
	example.receiveAttack({x:3,y:2});

	let missed_attacks = example.missed_attacks.length
	expect(missed_attacks).toBe(2)
})

test('have all ships sank', ()=>{

	example.placeShip("test", {x:1,y:1}, 4, [0,1]);
	example.placeShip("test", {x:2,y:4}, 4, [1,0]);

	for(let i=0; i<4; i++){
		example.receiveAttack({x:1, y:i+1});
		example.receiveAttack({x:2+i, y:4});
	}

	expect(example.areShipsGone()).toBe(true)

	example.placeShip("test", {x:1,y:6}, 1, [0,1]);
	expect(example.areShipsGone()).toBe(false);
})