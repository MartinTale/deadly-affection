import { EntityCollectable } from './../data/levels';
import { el, mount } from 'redom';
import { SVGs } from '../helpers/svgs';
import { levels } from '../data/levels';
import { state } from '../systems/state';
import { getSVGElement } from '../helpers/utilities';
import { playLevel } from '../systems/play';
import { playSound } from '../components/music';

const levelScreen = el('div.screen');

export function createLevelsScreen() {
	renderLevels();

	return levelScreen;
}

export function renderLevels() {
	levelScreen.innerHTML = '';
	for (let i = 0; i < levels.length; i += 1) {
		const level = levels[i];

		const collectablesInLevel = level[1].filter(entity => entity?.[0] === EntityCollectable).length;
		const collectablesCollected = state.progress[i]?.[1] ?? 0;

		const collectableElements = [];

		for (let j = 0; j < collectablesInLevel; j += 1) {
			const collectableElement = getSVGElement(SVGs.hearts);

			if (collectablesCollected > j) {
				collectableElement.classList.add('done');
			}

			collectableElements.push(collectableElement);
		}

		const levelContainer = el('div.level', [
			el('b', (i + 1).toString()),
			el('div.hearts', collectableElements),
		]);

		if (state.progress[i]?.[0]) {
			levelContainer.classList.add('done');
		}

		levelContainer.onclick = async () => {
			playSound('tap');
			playLevel(i);
		};

		if (i === state.level) {
			levelContainer.classList.add('current-level');
		}

		mount(levelScreen, levelContainer);

		if (i == 11) {
			mount(levelScreen, el('b.sep', 'Normal'));
		}
		if (i == 14) {
			mount(levelScreen, el('b.sep', 'Medium'));
		}
	}
}
