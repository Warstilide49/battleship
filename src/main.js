import {header, content, footer} from './page_content'
import {game} from './game'
import "./style.css";

const initialize = ( ()=>{

	const mainGame = game();

	const body = document.body;
	body.append( header() );
	body.append( content(mainGame) )
	body.append( footer() );
})();