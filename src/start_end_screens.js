import {create_grid} from './page_content'

export const showStartScreen = (gameBoard, game) =>{
	let {container, modal} = createModal(document.body , 50, 50, 'end_screen')
	modal.innerHTML = 
		`<h3>Hi, place your ships to get started</h3>
		<div id='start_screen_content'>
			<div id='gameBoard' class='preGame'></div>
			<div id='sidebar'></div>
		</div>`

	const lengths = [5,4,3,3,2];
	const names = ["Carrier", "Battleship", "Destroyer", "Submarine", "Patrol Boat"];

	const gameBoardDOM = modal.querySelector('#gameBoard');
	create_grid(gameBoardDOM, 10, null);
	gameBoardDOM.shipNumber = 0;		// Tracker for which ship to place
	gameBoardDOM.rotation = [0,1];		// Default direction is vertical

	gameBoardDOM.addEventListener("dragover", (e)=> {
		e.preventDefault();
	});

	const sidebar = modal.querySelector('#sidebar')
	sidebar.innerHTML = 
		`<h6>${names[0]}</h6>
		<div id='ship' draggable='true'></div>
		<button>Rotate</button>`

	const ship = sidebar.querySelector('#ship');
	populateShip(ship, lengths[0], gameBoardDOM.rotation);

	const rotate_button = sidebar.querySelector('button');
	rotate_button.addEventListener('click', ()=>{
		if(gameBoardDOM.rotation[0]==0){
			gameBoardDOM.rotation = [1,0];
		}
		else{
			gameBoardDOM.rotation = [0,1];
		}
		rotateShipSidebar(sidebar, gameBoardDOM.rotation)
	})

	gameBoardDOM.addEventListener('drop', (e)=>{
		e.preventDefault();
		const i = gameBoardDOM.shipNumber;
		const success = placeShip(gameBoardDOM, gameBoard, e.target, lengths[i], names[i])	// Placing the ship
		
		const current = gameBoardDOM.shipNumber
		if(current==names.length){				// Change this to names.length when the endgame detector has been fixed
			game.shouldStart = true;			// checking for game end begins after placing the ships
			container.remove()
		}

		showInBoard(gameBoardDOM, gameBoard)						// Showing the created ship in board
		changeShip(sidebar, gameBoardDOM, lengths, names, success);					// Changing the sidebar if ship was successfully placed
		
	})
}

const placeShip = (gameBoardDOM, gameBoard, element, length, name) =>{
	const direction = gameBoardDOM.rotation
	
	try{
		gameBoard.placeShip(name, {x:element.x, y:element.y}, length, direction)
	}
	catch(e){
		alert(e);
		return false;
	}

	gameBoardDOM.shipNumber +=1;
	return true;

}

const showInBoard = (gameBoardDOM, gameBoard) =>{
	const ships = gameBoard.ships_array
	for(let i=0; i<ships.length; i++){
		const all_coords = ships[i].all_coords
		for(let j=0; j<all_coords.length; j++){
			gameBoardDOM.children[all_coords[j].y].children[all_coords[j].x].style.background = 'red'		
		}
	}
}

const populateShip = (container, length, direction) =>{
	for(let i=0; i<length; i++){
		const block = document.createElement('div');
		block.classList.add('block');
		container.append(block);
	}
};

const changeShip = (sidebar, gameBoardDOM, lengths, names, success) =>{
	if(!success)
		return;

	const i = gameBoardDOM.shipNumber;
	
	const shipName = sidebar.querySelector('h6');
	shipName.textContent = names[i]

	const ship = sidebar.querySelector('#ship');
	ship.textContent = '';
	populateShip(ship, lengths[i], gameBoardDOM.rotation);
}

const rotateShipSidebar = (sidebar, direction) =>{
	const ship = sidebar.querySelector('#ship');
	if(direction[0]==0){
		ship.style.flexDirection = 'column';
	}
	else{
		ship.style.flexDirection = 'row';	
	}
}

export const showEndScreen = (winner, game) =>{
	let {container, modal} = createModal(document.body , 50, 50, 'end_screen')
	modal.innerHTML = `<p><strong>${winner} won!</strong></p>
						<button class="modal_submit">Play Again</button>`

	const restartButton = modal.querySelector('button');
	restartButton.addEventListener('click', ()=>{
		window.location.reload()
	})
};

function createModal(body, width, height, modalId){
	let container=document.createElement("div");
	container.classList.add('modal_bg')

	let modal=document.createElement("div")
	modal.classList.add("modal");
	modal.id=modalId;
	modal.style.height=height;
	modal.style.width=width;

	container.appendChild(modal);

	body.append(container);
	return {container, modal}
}