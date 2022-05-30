import {header, content, footer} from './page_content'
import "./style.css";

const initialize = ( ()=>{
	const body = document.body;
	body.append( header() );
	body.append( content() );
	body.append( footer() );
})();