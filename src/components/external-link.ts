import { el } from 'redom';

export function createExternalLink(
	content: string | HTMLElement | HTMLElement[],
	link: string,
) {
	const linkElement = el('a', content) as HTMLAnchorElement;

	linkElement.href = link;
	linkElement.target = '_blank';

	return linkElement;
}
