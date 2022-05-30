import {header, content, footer} from './page_content'
import {player} from './factories/playerFactory'
import "./style.css";

const initialize = ( ()=>{

	const p1 = player("Checking mate", 10);
	p1.myGameBoard.placeShip("trial", {x: 0, y:0}, 5, [1,0]);

	const body = document.body;
	body.append( header() );
	body.append( content(p1.myGameBoard) );
	body.append( footer() );
})();