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

			const backgroundMusic = [
				'audio/Ambient 1.wav',
				'audio/Dark Ambient 1.wav',
				'audio/Dark Ambient 3.wav',
				'audio/frozen_winter.ogg',
				'audio/Light Ambience 1.wav',
				'audio/Light Ambience 3.wav',
				'audio/Light Ambience 5.wav',
				'audio/Ludum Dare 30 - Track 5.wav',
				'audio/Ludum Dare 32 - Track 5.wav',
				'audio/Patreon Goal Reward Loops - Track 01.wav',
			];

			const backgroundMusicTrack = backgroundMusic[randomIntFromInterval(0, backgroundMusic.length - 1)];

			console.warn(backgroundMusicTrack);

			backgroundMusicInstance = new Howl({
				src: backgroundMusicTrack,
				autoplay: state.sound as boolean,
				loop: true,
				volume: 0.75,
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
	// switchScreen: [2.05,1,537,.01,.01,.01,,.48,94,-31,-801,.2,.11,,,,.24,.54],
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
