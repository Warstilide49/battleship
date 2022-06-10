import {create_grid} from './page_content'

export const showStartScreen = () =>{
	let {container, modal} = createModal(document.body , 50, 50, 'end_screen')
	modal.innerHTML = 
		`<h3>Hi, place your ships to get started</h3>
		<div id='start_screen_content'>
			<div id='gameBoard' class='preGame'></div>
			<div id='sidebar'></div>
		</div>`

	const gameBoard = modal.querySelector('#gameBoard');
	create_grid(gameBoard, 10, null);

	const sidebar = modal.querySelector('#sidebar')
	sidebar.innerHTML = 
		`<h6>Ship Name</h6>
		<div id='ship'></div>
		<button>Rotate</button>`
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