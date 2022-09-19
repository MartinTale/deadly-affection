type Effect = {
	root: HTMLElement;
	target: HTMLElement;
	active: boolean;
	animationCallbacks: (() => void)[];
};

export const effects: (Effect | null)[] = [];

export function showBoxShadow(target: HTMLElement, particleSize: number, color: string) {
	target.style.boxShadow = `0 0 ${particleSize}px ${color}, 0 0 ${particleSize * 2}px ${color}, 0 0 ${particleSize * 3}px ${color}`
}

export function hideBoxShadow(target: HTMLElement) {
	target.style.boxShadow = '';
}
