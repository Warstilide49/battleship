const player = require('../playerFactory');

test('can attack another player', ()=>{
	const p1 = player.player('a', 10);
	const p2 = player.player('b', 10);

	p1.myGameBoard.placeShip("test", {x:1,y:1}, 5, [0,1]);
	p2.myGameBoard.placeShip("test", {x:5,y:5}, 1, [1,0]);

	// Attacks
	p1.attack(p2.myGameBoard, {x:5,y:5});
	p2.attack(p1.myGameBoard, {x:1,y:1});

	expect(p2.myGameBoard.areShipsGone()).toBe(true);
});

test('random attack clears out n dimensional in n**2 attacks', ()=>{
	let dimensions = 3
	const p1 = player.player('a', dimensions);
	const ai = player.player('twat', dimensions);

	p1.myGameBoard.placeShip("test", {x:0, y:0}, dimensions, [0,1]);

	for (let i=0; i< dimensions**2; i++){
		ai.randomAttack(p1.myGameBoard);
	}

	expect(p1.myGameBoard.areShipsGone()).toBe(true);
	expect(p1.myGameBoard.missed_attacks.length).toBe(dimensions**2 - dimensions);
});

