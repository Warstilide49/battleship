import {elementListener} from "./listener"

export const header = () =>{
	const node = document.createElement('h1');
	node.textContent = 'Battleship!';
	return node
}

export const content = (game) =>{
	const node = document.createElement('div');
	node.id = 'content'
	node.append(createGameBoard(game.user.myGameBoard))
	node.append(createGameBoard(game.ai.myGameBoard))

	return node
}

const createGameBoard = (gameBoard) =>{
	const node = document.createElement('div');
	node.id = 'gameBoard'
	create_grid(node, gameBoard.dimensions, gameBoard);

	let interval = setInterval(()=>{
		update_grid(gameBoard, node);
	}, 1000/30)

	return node
}

const create_grid = (container, n, gameBoard) =>{
	for(let i=0;i<n;i++){
		const row_grid=document.createElement('div');
		row_grid.classList.add('row');
		row_grid.y = i;
		container.append(row_grid);
		for(let j=0;j<n;j++){
			const element=document.createElement('div');
			element.classList.add('child');
			element.x = j;
			element.y = i;
			row_grid.append(element);
			element.addEventListener('click', (e)=>{
				let colour = elementListener(j,i, gameBoard);
				e.target.style.background = colour;
				e.target.classList.add('disabled')
			});    
		}
	}
}

const update_grid = (gameBoard, node) =>{
	const hits = gameBoard.hits;
	const missed_attacks = gameBoard.missed_attacks;

	for(let i=0; i<hits.length; i++){
		node.children[hits[i].y].children[hits[i].x].style.background = 'red'
	}

	for(let i=0; i<missed_attacks.length; i++){
		node.children[missed_attacks[i].y].children[missed_attacks[i].x].style.background = 'green'
	}
}

export const footer = () =>{
	const node = document.createElement('footer');
	node.textContent = '@warstilide49';
	return node
}