import './style.scss';
import { initGame, gameContainer, headerContainer } from './systems/game';
import { initGameState, saveState, state } from './systems/state';
import { initMusic } from './components/music';
import { initNEAR } from './systems/near';
import { initCoil } from './systems/coil';
import { playLevel } from './systems/play';
import { getSVGElement } from './helpers/utilities';
import { SVGs } from './helpers/svgs';
import { el, mount } from 'redom';

let fireflyColor = '#8be9ff';
let introInProgress = true;

const necromancer = getSVGElement(SVGs.necromancer);
necromancer.classList.add('necromancer');
const death = el('h1.death', 'DEATH');
const isJustABeginning = el('b', 'is just a beginning');
const ofEternal = el('b', 'of eternal');
const love = el('h1.love', 'LOVE');

const fairy = getSVGElement(SVGs.fairy);
fairy.classList.add('fairy');
const hearts = el('div', [
	getSVGElement(SVGs.hearts),
	getSVGElement(SVGs.hearts),
	fairy,
	getSVGElement(SVGs.hearts),
	getSVGElement(SVGs.hearts),
]);
const skip = el('small', 'tap to skip');

const intro = el('div.intro', [
	necromancer,
	death,
	isJustABeginning,
	ofEternal,
	love,
	hearts,
	skip,
]);

const heart = getSVGElement(SVGs.hearts);
heart.classList.add('heart1')
const fairy2 = fairy.cloneNode(true) as HTMLElement;
const intro2 = el('div.intro2', [
	el('div', [
		necromancer.cloneNode(true) as HTMLElement,
		heart,
		fairy2,
	]),
	el('h1.death', 'Deadly'),
	el('h1.love', 'Affection'),
	el('small', 'tap to play'),
]);
intro2.style.opacity = '0';

function revealIntro(element: HTMLElement) {
	if (introInProgress) {
		element.style.opacity = '1';
		element.style.transform = 'translateY(0)';
	}
}

function completeIntro() {
	if (introInProgress) {
		introInProgress = false;
		if (state.arcadian.image != '') {
			document.documentElement.style.setProperty('--bg', state.arcadian.bg);
			document.documentElement.style.setProperty('--color', state.arcadian.color);
			document.documentElement.style.setProperty('--shadow', state.arcadian.shadow);
			fireflyColor = state.arcadian.color;
		} else {
			document.documentElement.style.setProperty('--bg', '#03182b');
			fireflyColor = '#8be9ff';
		}

		intro.style.opacity = '0';
		intro.style.pointerEvents = 'none';
		intro2.style.opacity = '0';
		intro2.style.pointerEvents = 'none';
		gameContainer.style.opacity = '1';
		headerContainer.style.opacity = '1';
	}
}

function draw(f: any, w: any, h: any, firefly: any) {
	if(f.length < 100){
	for(let j = 0; j < 10; j++){
	f.push(new firefly());
	}
	}
	//animation
	for(let i = 0; i < f.length; i++){
	f[i].move();
	f[i].show();
	if(f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h){
		f.splice(i,1);
		}
	}
}

function loop(c: any, f: any, w: any, h: any, firefly: any) {
	// window.requestAnimFrame(loop);
	if (c) {
		c.clearRect(0, 0, w, h);
	}
	draw(f, w, h, firefly);
}

window.addEventListener('DOMContentLoaded', () => {
	initGameState();
	initNEAR();
	initCoil();
	initGame();
	initMusic();

	playLevel(state.level);

	let canvas = document.getElementById('canvas') as HTMLCanvasElement;

	if (canvas) {
		let c = canvas.getContext("2d"),
		w = (canvas.width = window.innerWidth),
		h = (canvas.height = window.innerHeight);

		if (c) {
			class firefly {
				x;
				y;
				s;
				ang;
				v;
				constructor(){
				this.x = Math.random()*w;
				this.y = Math.random()*h;
				this.s = Math.random()*2;
				this.ang = Math.random()*2*Math.PI;
				this.v = this.s*this.s/4;
				}
				move(){
				this.x += this.v*Math.cos(this.ang);
				this.y += this.v*Math.sin(this.ang);
				this.ang += Math.random()*20*Math.PI/180-10*Math.PI/180;
				}
				show(){
					if (c) {
						c.beginPath();
						c.arc(this.x,this.y,this.s,0,2*Math.PI);
						c.fillStyle = fireflyColor;
						c.fill();
					}
				}
			}

			let f: firefly[] = [];


			

			window.addEventListener("resize", function() {
				(w = canvas.width = window.innerWidth),
				(h = canvas.height = window.innerHeight);
				loop(c, f, w, h, firefly);
			});

			loop(c, f, w, h, firefly);
			setInterval(() => {
				loop(c, f, w, h, firefly);
			}, 1000 / 30);
		}
	}

	intro.onclick = completeIntro;
	intro2.onclick = completeIntro;

	revealIntro(skip);

	setTimeout(() => { revealIntro(death) }, 500);
	setTimeout(() => { revealIntro(isJustABeginning) }, 2000);
	setTimeout(() => { revealIntro(ofEternal) }, 3500);
	setTimeout(() => {
		revealIntro(love);
		if (introInProgress) {
			document.documentElement.style.setProperty('--bg', '#442828');
			fireflyColor = '#fa7c7c';
		}
	}, 5000);
	setTimeout(() => { revealIntro(hearts) }, 5000);
	setTimeout(() => {
		if (introInProgress) {
			intro.style.opacity = '0'
		}
	}, 8000);
	setTimeout(() => {
		if (introInProgress) {
			intro2.style.opacity = '1'
		}
	}, 8000);
	setTimeout(() => {
		if (introInProgress) {
			fairy2.classList.add('active')
		}
	}, 9000);
	// setTimeout(completeIntro, 10000);

	mount(document.body, intro);
	mount(document.body, intro2);
});

window.addEventListener('beforeunload', function () {
	saveState();
});

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker.register('/service-worker.js').then(registration => {
// 			console.log('SW registered: ', registration);
// 		}).catch(registrationError => {
// 			console.log('SW registration failed: ', registrationError);
// 		});
// 	});
// }
