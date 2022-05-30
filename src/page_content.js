import {elementListener} from "./listener"

export const header = () =>{
	const node = document.createElement('h1');
	node.textContent = 'Battleship!';
	return node
}

export const content = () =>{
	const node = document.createElement('div');
	node.id = 'content'
	create_grid(node, 10);
	return node
}

function create_grid(container, n){
	for(let i=0;i<n;i++){
		const row_grid=document.createElement('div');
		row_grid.classList.add('row');
		container.appendChild(row_grid);
		for(let j=0;j<n;j++){
			const element=document.createElement('div');
			element.classList.add('child');
			element.x = i;
			element.y = j;
			row_grid.appendChild(element);
			element.addEventListener('click', ()=>{
				elementListener(i,j)
			});    
		}
	}
}

export const footer = () =>{
	const node = document.createElement('footer');
	node.textContent = '@warstilide49';
	return node
}