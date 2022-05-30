import {elementListener} from "./listener"

export const header = () =>{
	const node = document.createElement('h1');
	node.textContent = 'Battleship!';
	return node
}

export const content = (gameBoard) =>{
	const node = document.createElement('div');
	node.id = 'content'
	create_grid(node, 10, gameBoard);
	return node
}

const create_grid = (container, n, gameBoard) =>{
	for(let i=0;i<n;i++){
		const row_grid=document.createElement('div');
		row_grid.classList.add('row');
		container.appendChild(row_grid);
		for(let j=0;j<n;j++){
			const element=document.createElement('div');
			element.classList.add('child');
			element.x = j;
			element.y = i;
			row_grid.appendChild(element);
			element.addEventListener('click', (e)=>{
				let colour = elementListener(j,i, gameBoard);
				e.target.style.background = colour;
			});    
		}
	}
}

export const footer = () =>{
	const node = document.createElement('footer');
	node.textContent = '@warstilide49';
	return node
}