import {header, content, footer} from './page_content'
import {game} from './game'
import {showEndScreen} from './end_screen'
import "./style.css";

const initialize = ( ()=>{

	const mainGame = game();

	const body = document.body;
	body.append( header() );
	body.append( content(mainGame) )
	body.append( footer() );

	const checkEnding = setInterval(()=>{
		let winner = mainGame.shouldEnd();
		if (winner!= false){
			clearInterval(checkEnding);
			showEndScreen(body, winner, mainGame)
		}
	}, 1000/30)

});

initialize(); 