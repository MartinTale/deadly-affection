const localStorageKey = 'deadly-affection';

export type Setting = 'sound' | 'screen';

export type State = {
	sound: boolean | null;
	colorScheme: number;
	level: number;
	progress: { [key: number]: [boolean, number] };
};

export const emptyState: State = {
	sound: null,
	colorScheme: 0,
	level: 0,
	progress: {},
};

export let state: State;

export function initGameState() {
	state = loadState();

	setInterval(saveState, 5000);
}

export function loadState() {
	const savedState = localStorage.getItem(localStorageKey);

	if (savedState) {
		return Object.assign({ ...emptyState }, JSON.parse(savedState));
	}

	return { ...emptyState };
}

export function saveState() {
	localStorage.setItem(localStorageKey, JSON.stringify(state));
}
