import { Rotation } from './../data/levels';
import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { state } from '../systems/state';
import { colorSchemes } from '../systems/game';
import { Base, PathDirection } from './base';

export class Start extends Base {
	constructor(
		rotation: number,
		cellKey: string,
		outputs?: (Rotation | null)[],
	) {
		const scheme = colorSchemes[state.colorScheme];
		const iconSvg = getSVGElement(SVGs[scheme.icon]);

		const out: PathDirection[] = [];
		for (let i = 0; i < 4; i += 1) {
			if (outputs?.includes(i as Rotation)) {
				out[i] = i as PathDirection;
			} else {
				out[i] = null;
			}
		}

		super(
			'start',
			cellKey,
			el('div.cell'),
			iconSvg,
			rotation,
			true,
			true,
			out as [PathDirection, PathDirection, PathDirection, PathDirection],
		);

		this.inputs = [true, true, true, true];
	}
}
