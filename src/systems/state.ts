const localStorageKey = 'deadly-affection';

export type Setting = 'sound' | 'screen';

export type State = {
	sound: boolean | null;
	coilTotal: number;
	near: boolean;
	wallet: string;
	nfts: any[];
	arcadian: {
		bg: string;
		color: string;
		shadow: string;
		image: string;
	};
	level: number;
	progress: { [key: number]: [boolean, number] };
};

export const emptyState: State = {
	sound: null,
	coilTotal: 0,
	near: false,
	wallet: '',
	nfts: [],
	arcadian: {
		bg: '',
		color: '',
		shadow: '',
		image: '',
	},
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
