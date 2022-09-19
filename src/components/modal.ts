import { el, mount } from 'redom';
import { Button, createButton } from './button';

let modalElement: HTMLElement;

export function openModal(
	container: HTMLElement,
	header: string | HTMLElement | HTMLElement[],
	content: string | HTMLElement | HTMLElement[],
	buttons: Button[] = [],
	onCloseCallback: (() => void) | null,
	className = 'none',
) {
	closeModal();

	const modalOverlay = el('div.modal-overlay');
	modalOverlay.onclick = () => {
		closeModal();

		if (onCloseCallback != null) {
			onCloseCallback();
		}
	};

	let buttonElements: HTMLElement[] = [];
	for (let i = 0; i < buttons.length; i += 1) {
		const button = buttons[i];

		buttonElements.push(createButton(
			button.content,
			(e) => {
				if (button.onClickCallback != null) {
					button.onClickCallback(e);
				}

				closeModal();

				if (onCloseCallback != null) {
					onCloseCallback();
				}
			},
			button.type,
		));
	}

	if (typeof header === 'string') {
		header = el('h1', header);
	}

	if (typeof content === 'string') {
		content = el('p', content);
	}

	modalElement = el('div.modal.' + className, [
		modalOverlay,
		el('div.modal-container', [
			el('header', header),
			el('main', content),
			el('footer', buttonElements),
		]),
	]);

	mount(container, modalElement);

	requestAnimationFrame(() => {
		modalElement.classList.add('active');
	});

	return modalElement;
}

export function closeModal() {
	if (modalElement != null) {
		modalElement.remove();
	}
}
