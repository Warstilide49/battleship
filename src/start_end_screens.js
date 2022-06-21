import {create_grid} from './page_content'

export const showStartScreen = (gameBoard) =>{
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

	gameBoardDOM.addEventListener("dragover", (e)=> {
		e.preventDefault();
	});

	gameBoardDOM.addEventListener('drop', (e)=>{
		e.preventDefault();
		const i = gameBoardDOM.shipNumber;
		const success = placeShip(gameBoardDOM, gameBoard, e.target, lengths[i], names[i])	// Placing the ship
		
		if(gameBoardDOM.shipNumber==names.length-1){				// Change this to names.length when the endgame detector has been fixed
			console.log('burh')
			container.remove()
		}

		showInBoard(e.target, success)																// Showing the created ship in board
		changeSidebar(success);																// Changing the sidebar if ship was successfully placed
		
	})

	const sidebar = modal.querySelector('#sidebar')
	sidebar.innerHTML = 
		`<h6>Ship Name</h6>
		<div id='ship'></div>
		<img src='chrome://global/skin/icons/indicator-private-browsing.svg'>
		<button>Rotate</button>`
}

const placeShip = (gameBoardDOM, gameBoard, element, length, name) =>{
	const direction = [0,1]	// To be recieved from a parameter from the rotate button, vertical for now
	
	try{
		gameBoard.placeShip(name, {x:element.x, y:element.y}, length, direction)
	}
	catch(e){
		alert(e);
		return false;
	}

	gameBoardDOM.shipNumber +=1;
	return true

}

const showInBoard = (element, success) =>{
	console.log(element)
	if(success){
		element.style.backgroundColor = 'red';
	}
}

const changeSidebar = (success) =>{

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