import { Howl } from 'howler';
import { randomIntFromInterval } from '../helpers/utilities';
import { gameContainer, soundToggle } from '../systems/game';
import { state } from '../systems/state';
import { 
	initAudioContext,
	zzfx,  
	zzfxX,
} from '../systems/zzfx';
import { zzfxM } from '../systems/zzfxm';
import { openModal } from './modal';

let musicStarted = false;
export let backgroundMusicInstance: Howl;

export function initMusic() {
	if (state.sound == null) {
		openModal(gameContainer, 'Play with sound?', '', [
			{
				type: 'danger',
				content: 'No',
				onClickCallback: () => {
					state.sound = false;
					backgroundMusicInstance.pause();
				},
			}, {
				type: 'primary',
				content: 'Rock ON!',
				onClickCallback: () => {
					state.sound = true;
					backgroundMusicInstance.play();
					if (soundToggle) {
						soundToggle.renderState(state.sound);
					}
				},
			}
		], null);
	}
	
	document.body.onclick = () => {
		if (!musicStarted) {
			musicStarted = true;
			initAudioContext();
    		// zzfxP(...music).loop = true;

			if (state.sound) {
				zzfxX!.resume();
			} else {
				zzfxX!.suspend();
			}

			backgroundMusicInstance = new Howl({
				src: 'audio/background-music.webm',
				autoplay: state.sound as boolean,
				loop: true,
				volume: 1,
			});
		}
	}
}

export function playSound(sound: keyof typeof sounds) {
	if (state.sound && zzfxX != null) {
		zzfx(...sounds[sound]);
	}
}

export const sounds = {
	tap: [1.03,.5,355,,,0,,.71,12,,-752,.03,,,,,,.22,.01],
	rotate: [1.02,.5,1133,,.01,.01,1,1.06,,.3,,,,.1,52,,,.13,.01],
	victory: [1.37,,1133,1,.1,.27,,1.45,-2,,136,.09,.18,.2,,,.1,.83,.13],
};

const volume = 0.5;

export const music = zzfxM([
	[volume,0,43,,,.25,,,,,,,,.1]
],
[
	[
		[0,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33]
	],
	[
		[0,-1,21,21,33,21,21,33,21,21,33,21,21,33,21,21,33,33]
	]
],[0],50);
