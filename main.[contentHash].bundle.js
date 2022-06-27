(()=>{"use strict";const t=(t,e,r)=>{let n={x:t,y:e};r.myGameBoard.receiveAttack(n),r.turn=!0},e=t=>{const e=document.createElement("div");e.id="gameBoard",r(e,t.myGameBoard.dimensions,t);setInterval((()=>{n(t.myGameBoard,t.name,e)}),1e3/30);return e},r=(e,r,n)=>{for(let o=0;o<r;o++){const a=document.createElement("div");a.classList.add("row"),a.y=o,e.append(a);for(let e=0;e<r;e++){const r=document.createElement("div");if(r.classList.add("child"),r.x=e,r.y=o,a.append(r),n&&"AI"==n.name)r.addEventListener("click",(r=>{t(e,o,n),r.target.classList.add("disabled")}));else{if(!n||"AI"==n.name)continue;r.classList.add("disabled")}}}},n=(t,e,r)=>{const n=t.hits,o=t.missed_attacks,a=t.ships_array;if("Player"==e)for(let t=0;t<a.length;t++){const e=a[t].all_coords;for(let t=0;t<e.length;t++)r.children[e[t].y].children[e[t].x].style.background="rgba(74,74,74,0.5)"}for(let t=0;t<n.length;t++)r.children[n[t].y].children[n[t].x].style.background="rgba(200,10,10,0.9)";for(let t=0;t<o.length;t++)r.children[o[t].y].children[o[t].x].style.background="rgba(20,200,10,0.8)"},o=(t,e="default")=>{let r=[];for(let e=0;e<t;e++)r.push(!1);return{name:e,length:t,hit:e=>{e>t-1||e<0||(r[e]=!0)},isSunk:()=>{for(let e=0;e<t;e++)if(0==r[e])return!1;return!0}}},a=(t,e,r=!1)=>{const n=(t=>{const e=[],r=[],n=[],a=(t,r,n,a)=>{i(r,n,a);let d=s(r,n,a);if(l(d))throw Error("overloading");if(e.length>=5)throw Error("maximum of 5 ships allowed");e.push({all_coords:d,ship:o(n,t)})},l=t=>{for(let r=0;r<e.length;r++)for(let n=0;n<e[r].all_coords.length;n++){let o=e[r].all_coords;for(let e=0;e<t.length;e++)if(t[e].x==o[n].x&&t[e].y==o[n].y)return!0}return!1},d=(t,e)=>{for(let r=0;r<t.length;r++)if(e.x==t[r].x&&e.y==t[r].y)return;t.push(e)},i=(e,r=0,n=[0,0])=>{let o=e.x+(r-1)*n[0],a=e.y+(r-1)*n[1];if(e.x<t&&e.x>=0&&e.y<t&&e.y>=0&&o<t&&o>=0&&a<t&&a>=0)return!0;throw Error("exceeds dimensions")},s=(t,e,r)=>{let n=[];for(let o=0;o<e;o++)n.push({x:t.x+o*r[0],y:t.y+o*r[1]});return n};return{ships_array:e,dimensions:t,hits:n,missed_attacks:r,receiveAttack:t=>{i(t);for(let r=0;r<e.length;r++)for(let o=0;o<e[r].all_coords.length;o++){let a=e[r].all_coords[o].x,l=e[r].all_coords[o].y;if(a==t.x&&l==t.y)return e[r].ship.hit(o),d(n,t),!0}return d(r,t),!1},placeShip:a,placeShipsRandomly:()=>{const r=[5,4,3,3,2],n=["Carrier","Battleship","Destroyer","Submarine","Patrol Boat"];if(0!=e.length)return;let o=0;for(;o<5;){const l={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*t)},d=0==Math.floor(2*Math.random())?[0,1]:[1,0];try{a(n[o],l,r[o],d)}catch(t){continue}e.length==o+1&&(o+=1)}},areShipsGone:()=>{for(let t=0;t<e.length;t++)if(!e[t].ship.isSunk())return!1;return!0}}})(e),a=[],l=[];for(let t=0;t<e**2;t++)l.push(t);return{name:t,turn:r,myGameBoard:n,attack:(t,e)=>{t.receiveAttack(e),a.push(e)},randomAttack:t=>{if(l.length<=0)return;let r=Math.floor(Math.random()*l.length);const n=l[r],o={x:Math.floor(n/e),y:n%e};t.receiveAttack(o),l.splice(l.indexOf(n),1)},playedMoves:a,didPlayerWin:t=>!!t.areShipsGone()}},l=(t,e,r,n,o)=>{const a=t.rotation;try{e.placeShip(o,{x:r.x,y:r.y},n,a)}catch(t){return alert(t),!1}return t.shipNumber+=1,!0},d=(t,e)=>{const r=e.ships_array;for(let e=0;e<r.length;e++){const n=r[e].all_coords;for(let e=0;e<n.length;e++)t.children[n[e].y].children[n[e].x].style.background="rgba(74,74,74,0.5)"}},i=(t,e,r)=>{for(let r=0;r<e;r++){const e=document.createElement("div");e.classList.add("block"),t.append(e)}},s=(t,e,r,n,o)=>{if(!o)return;const a=e.shipNumber;t.querySelector("h6").textContent=n[a];const l=t.querySelector("#ship");l.textContent="",i(l,r[a],e.rotation)},c=(t,e)=>{const r=t.querySelector("#ship");0==e[0]?r.style.flexDirection="column":r.style.flexDirection="row"};function u(t,e,r,n){let o=document.createElement("div");o.classList.add("modal_bg");let a=document.createElement("div");return a.classList.add("modal"),a.id=n,a.style.height=r,a.style.width=e,o.appendChild(a),t.append(o),{container:o,modal:a}}(()=>{const t=(()=>{let t=a("Player",10,!0),e=a("AI",10);return e.myGameBoard.placeShipsRandomly(),{user:t,ai:e,getTurn:()=>0==e.turn?"user":"AI",changeTurn:()=>{1==t.turn?(t.turn=!1,e.turn=!0):(t.turn=!0,e.turn=!1)},shouldStart:!1,shouldEnd:()=>t.didPlayerWin(e.myGameBoard)?t.name:!!e.didPlayerWin(t.myGameBoard)&&e.name}})(),n=document.body;n.append((()=>{const t=document.createElement("h1");return t.textContent="Battleship!",t})()),n.append((t=>{const r=document.createElement("div");return r.id="content",r.append(e(t.user)),r.append(e(t.ai)),setInterval((()=>{"AI"==t.getTurn()&&(t.ai.randomAttack(t.user.myGameBoard),t.ai.turn=!1)}),1e3/15),r})(t)),n.append((()=>{const t=document.createElement("footer");return t.textContent="@warstilide49",t})()),((t,e)=>{let{container:n,modal:o}=u(document.body,50,50,"end_screen");o.innerHTML="<h3>Hi, place your ships to get started</h3>\n\t\t<div id='start_screen_content'>\n\t\t\t<div id='gameBoard' class='preGame'></div>\n\t\t\t<div id='sidebar'></div>\n\t\t</div>";const a=[5,4,3,3,2],h=["Carrier","Battleship","Destroyer","Submarine","Patrol Boat"],m=o.querySelector("#gameBoard");r(m,10,null),m.shipNumber=0,m.rotation=[0,1],m.addEventListener("dragover",(t=>{t.preventDefault()}));const y=o.querySelector("#sidebar");y.innerHTML=`<h6 style="margin: 0;">${h[0]}</h6>\n\t\t<div id='ship' draggable='true'></div>\n\t\t<button>Rotate</button>`;const p=y.querySelector("#ship");i(p,a[0],m.rotation),y.querySelector("button").addEventListener("click",(()=>{0==m.rotation[0]?m.rotation=[1,0]:m.rotation=[0,1],c(y,m.rotation)})),m.addEventListener("drop",(r=>{r.preventDefault();const o=m.shipNumber,i=l(m,t,r.target,a[o],h[o]);m.shipNumber==h.length&&(e.shouldStart=!0,n.remove()),d(m,t),s(y,m,a,h,i)}))})(t.user.myGameBoard,t);const o=setInterval((()=>{let e=t.shouldEnd();0!=e&&t.shouldStart&&(clearInterval(o),((t,e)=>{let{container:r,modal:n}=u(document.body,50,50,"end_screen");n.innerHTML=`<p><strong>${t} won!</strong></p>\n\t\t\t\t\t\t<button class="modal_submit">Play Again</button>`,n.querySelector("button").addEventListener("click",(()=>{window.location.reload()}))})(e))}),1e3/30)})()})();