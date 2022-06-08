export const showEndScreen = (body, winner, game) =>{
	let {container, modal} = createModal(body, 50, 50, 'end_screen')
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