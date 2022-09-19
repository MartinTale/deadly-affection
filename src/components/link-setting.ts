import { el, mount } from 'redom';
import { getSVGElement } from '../helpers/utilities';
import { createExternalLink } from './external-link';
import { playSound } from './music';

export class LinkSetting {
	root: HTMLElement;

	constructor(container: HTMLElement, icon: string, color: string, top: number, right: number, link: string | (() => void)) {
		const iconElement = getSVGElement(icon, color);
		iconElement.style.fill = color;

		if (typeof link === 'function') {
			this.root = el('div', iconElement);
			this.root.onclick = () => {
				playSound('tap');
				link();
			}
		} else {
			this.root = createExternalLink(iconElement, link);
		}

		this.root.style.borderColor = color;
		this.root.classList.add('setting', 'link');

		this.root.style.top = `${top}px`;
		this.root.style.right = `${right}px`;

		mount(container, this.root);
	}
}
