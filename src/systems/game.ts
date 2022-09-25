import { Button } from './../components/button';
import { LinkSetting } from '../components/link-setting';
import { closeModal, openModal } from '../components/modal';
import { Screens } from '../components/screens';
import { ToggleSetting } from '../components/toggle-setting';
import { el, mount } from 'redom';
import { SVGs } from '../helpers/svgs';
import { createGameScreen } from '../screens/game';
import { createLevelsScreen } from '../screens/levels';
import { randomIntFromInterval } from '../helpers/utilities';
import { state } from './state';
import { playLevel } from './play';

declare global {
	interface Window{
	  _ethers: any;
	  ethereum: any;
	  Moralis: any;
	}
  }

export let levelIndicator: HTMLElement;
export let headerContainer: HTMLElement;
export let gameContainer: HTMLElement;

export let screens: Screens;

function getAverageRGB(imgEl: HTMLImageElement) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}

function resetTheme() {
	state.arcadian = {
		bg: '',
		color: '',
		shadow: '',
		image: '',
	};

	document.documentElement.style.setProperty('--bg', '#03182b');
	document.documentElement.style.setProperty('--color', '#8be9ff');
	document.documentElement.style.setProperty('--shadow', '#4f838f');

	playLevel(state.level);
	screens.openScreen('game');
}

async function addArcadian(container: HTMLElement, id: string) {
	const image = el('img') as HTMLImageElement;
	mount(container, image);

	const arcadian = await (await fetch('https://api.arcadians.io/' + id)).json();

	if (arcadian?.image) {
		let blob = await fetch(arcadian.image).then(r => r.blob());
		let dataUrl: string = await new Promise(resolve =>
		{
			let reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.readAsDataURL(blob);
		});

		image.onload = () => {
			const colorValues = getAverageRGB(image);

			const bg = 'rgb(' + (Math.max(0, colorValues.r * 0.25)) + ',' + (Math.max(0, colorValues.g * 0.25)) + ',' + (Math.max(0, colorValues.b * 0.25)) + ')';
			const color = 'rgb(' + (Math.min(255, colorValues.r * 1.5)) + ',' + (Math.min(255, colorValues.g * 1.5)) + ',' + (Math.min(255, colorValues.b * 1.5)) + ')';
			const shadow = 'rgb(' + (Math.min(255, colorValues.r * 1.2)) + ',' + (Math.min(255, colorValues.g * 1.2)) + ',' + (Math.min(255, colorValues.b * 1.2)) + ')';

			image.style.borderColor = color;
			image.style.boxShadow = '0 0 0 2px ' + color + ', 0 0 5px ' + shadow + ', 0 0 8px ' + shadow + ', 0 0 11px ' + shadow;

			image.classList.add('active');

			image.onclick = () => {
				state.arcadian = {
					bg,
					color,
					shadow,
					image: dataUrl,
				};

				document.documentElement.style.setProperty('--bg', bg);
				document.documentElement.style.setProperty('--color', color);
				document.documentElement.style.setProperty('--shadow', shadow);

				playLevel(state.level);
				screens.openScreen('game');

				closeModal();
			}
		};

		image.src = dataUrl;
	}
}

function showMyArcadians(container: HTMLElement) {
	if (state.nfts.length > 0) {
		container.innerHTML = '';

		for (let i = 0; i < state.nfts.length; i += 1) {
			const nftId = state?.nfts?.[i]?.token_id ?? '9999';
			addArcadian(container, nftId);
		}
	}
}

export async function openArcadiaScreen() {
	const myArcadianContainer = el('div.arcadians', 'Login to use your Arcadians');
	const randomArcadianContainer = el('div.arcadians');

	const buttons: Button[] = [];

	if (state.wallet !== '') {
		buttons.push({
			type: 'danger',
			content: 'Logout',
			onClickCallback: () => {
				state.wallet = '';
				state.nfts = [];

				resetTheme();
			},
		});
	}

	buttons.push({
		type: 'normal',
		content: 'Reset',
		onClickCallback: resetTheme,
	}, {
		type: 'normal',
		content: 'Close',
		onClickCallback: () => {},
	}, {
		type: 'normal',
		content: 'Refresh',
		onClickCallback: () => {
			requestAnimationFrame(openArcadiaScreen);
		},
	});

	if (state.wallet === '') {
		buttons.push({
			type: 'primary',
			content: 'Login',
			onClickCallback: async () => {
				if (window.ethereum) {
					const provider = new window._ethers.providers.Web3Provider(window.ethereum, "any");
					await provider.send("eth_requestAccounts", []);
					const signer = provider.getSigner();

					let wallet = await signer.getAddress();

					if (wallet) {
						state.wallet = wallet;

						const options = {method: 'GET', headers: {Accept: 'application/json', 'X-API-Key': 'T25ZjLSEEP76wQrXEgTrSKfnr5MWAcWvwLJuNsPdf0tuiArk7KcQMwpJimnzXfsm'}};

						fetch('https://deep-index.moralis.io/api/v2/' + wallet + '/nft?chain=eth&format=decimal&token_addresses=0xc3c8a1e1ce5386258176400541922c414e1b35fd', options)
							.then(response => response.json())
							.then(response => {
								state.nfts = response.result;

								showMyArcadians(myArcadianContainer);
								requestAnimationFrame(openArcadiaScreen);
							})
							.catch(err => alert(err.message));

						return;
					}
				}

				alert('No wallet installed in browser :(');
			},
		});
	} else {
		myArcadianContainer.innerHTML = 'You have no Arcadians :(';
	}

	showMyArcadians(myArcadianContainer);

	openModal(gameContainer, 'Arcadia', [
		el('p', 'Pick an Arcadian to change the theme!'),
		el('b.sep', 'Your Arcadians'),
		myArcadianContainer,
		el('b.sep', 'Random Arcadians'),
		randomArcadianContainer,
	], buttons, () => {}, 'arcadian-modal');

	for (let i = 0; i < 9; i += 1) {
		addArcadian(randomArcadianContainer, randomIntFromInterval(1, 3000).toString());
	}
}

export let soundToggle: ToggleSetting;


let deferredPrompt: any = null;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;

	new LinkSetting(headerContainer, SVGs.install, '#ffffff', 112, 360, async () => {
		if (deferredPrompt !== null) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				deferredPrompt = null;
			}
		}
	});
});

export function initGame() {
	headerContainer = el('div.header');
	gameContainer = el('div.game');

	screens = new Screens(gameContainer, {
		levels: createLevelsScreen(),
		game: createGameScreen(),
	});

	new LinkSetting(headerContainer, SVGs.discord, '#5865F2', 4, 360, 'https://discord.gg/kPf8XwNuZT');
	new LinkSetting(headerContainer, SVGs.coffee, '#FBAA19', 40, 360, 'https://ko-fi.com/martintale?ref=deadly-affection');

	new LinkSetting(headerContainer, SVGs.joystick, '#ff3ed9', 76, 360, openArcadiaScreen);

	soundToggle = new ToggleSetting(headerContainer, SVGs.sound, 'sound', 4, 4);

	new ToggleSetting(headerContainer, SVGs.levels, 'screen', 40, 4);

	levelIndicator = el('b', '');
	mount(headerContainer, levelIndicator);

	mount(document.body, headerContainer);
	mount(document.body, gameContainer);

	globalThis.onresize = resizeGame;
	resizeGame();
}

export function getScale() {
	return Math.min(globalThis.innerWidth / 400, globalThis.innerHeight / 800);
}

function resizeGame() {
	gameContainer.style.transform = `scale(${getScale()})`;
	headerContainer.style.transform = `scale(${getScale()})`;
}
