import { el } from 'redom';
import { playSound } from './music';

export type ButtonType = 'normal' | 'primary' | 'danger' | 'disabled';

export type Button = {
	type: ButtonType,
	content: string | HTMLElement | HTMLElement[],
	onClickCallback: ((e: Event) => void) | null,
};

export function createButton(
	contentOrButton: string | HTMLElement | HTMLElement[],
	onClickCallback: (e: any) => void,
	type: ButtonType,
): HTMLElement {
	const buttonContent = typeof contentOrButton === 'string' ? contentOrButton : '';

	const button = el('button.' + type, buttonContent) as HTMLButtonElement;
	button.onclick = (e) => {
		playSound('tap');
		onClickCallback(e);
	}

	return button;
}
