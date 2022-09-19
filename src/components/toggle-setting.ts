import { getSVGElement } from '../helpers/utilities';
import { Setting, state } from '../systems/state';
import { el, mount } from 'redom';
import { zzfxX } from '../systems/zzfx';
import { backgroundMusicInstance, playSound } from './music';
import { screens } from '../systems/game';

export class ToggleSetting {
	root: HTMLElement;

	constructor(
		container: HTMLElement,
		icon: string,
		private path: Setting,
		top: number,
		right: number
	) {
		this.root = el('div.setting', getSVGElement(icon, '#fff'));
		this.root.style.top = `${top}px`;
		this.root.style.right = `${right}px`;

		mount(container, this.root);

		if (path === 'screen') {
			screens.openScreen('game');
			this.renderState(screens.screen === 'levels');
			this.root.onclick = () => {
				playSound('tap');
				screens.openScreen(screens.screen === 'game' ? 'levels' : 'game');
				this.renderState(screens.screen === 'levels');
			};
		} else {
			this.renderState(state[path] as boolean);
			this.root.onclick = () => {
				playSound('tap');
				state[path] = !state[path];
				this.renderState(state[path] as boolean);
			};
		}
	}

	public renderState = (newState: boolean) => {
		this.root.classList.toggle('active', newState);

		if (this.path === 'sound') {
			if (zzfxX != null) {
				newState ? zzfxX.resume() : zzfxX.suspend();
			}

			if (backgroundMusicInstance) {
				if (newState) {
					backgroundMusicInstance.play();
				} else {
					backgroundMusicInstance.pause();
				}
			}
		}
	};
}
