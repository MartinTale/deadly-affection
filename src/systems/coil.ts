import { renderLevels } from '../screens/levels';
import { state } from './state';

declare global {
	interface Document {
		monetization: any; // 👈️ turn off type checking
	}
}

let scale: number;
let currency: string;

export function initCoil() {
	let oldCoilEarnings = state.coilTotal;
	if (document.monetization) {
		document.monetization.addEventListener('monetizationprogress', (ev: any) => {
			scale = ev.detail.assetScale;
			currency = ev.detail.assetCode;

			state.coilTotal += Number(ev.detail.amount);

			if (oldCoilEarnings <= 0) {
				oldCoilEarnings = state.coilTotal;
				renderLevels();
			}
		});
    }
}

export function coilIsEnabled() {
	return document.monetization && document.monetization.state === 'started';
}

export function getCoilEarnings() {
	if (scale && currency) {
		return (state.coilTotal * Math.pow(10, -scale)).toFixed(scale) + ' ' + currency;
	}

	return '0 USD';
}
