const shipFactory = require('../shipFactory')

test('creates a ship', ()=>{
	const example = shipFactory.ship(2)
	expect(example.length).toBe(2)
});

test('a ship can be sunk', ()=>{
	const example = shipFactory.ship(2);
	example.hit(0);
	example.hit(1);
	expect(example.isSunk()).toBe(true);
})