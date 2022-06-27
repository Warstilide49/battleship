import {header, content, footer} from './page_content'
import {game} from './game'
import {showStartScreen, showEndScreen} from './start_end_screens'
import "./style.css";

const initialize = ( ()=>{

	const mainGame = game();

	const body = document.body;
	body.append( header() );
	body.append( content(mainGame) )
	body.append( footer() );

	showStartScreen(mainGame.user.myGameBoard, mainGame);

	const checkEnding = setInterval(()=>{
		let winner = mainGame.shouldEnd();
		if (winner!= false && mainGame.shouldStart){
			clearInterval(checkEnding);
			showEndScreen(winner, mainGame)
		}
	}, 1000/30)

});

initialize(); 