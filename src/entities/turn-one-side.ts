import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { Base } from './base';

export class TurnOneSide extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'turn-one-side',
			cellKey,
			el('div.cell', getSVGElement(SVGs['turn-one-side'])),
			el('div.empty'),
			rotation,
			true,
			false,
			[1, 0, null, null],
		);
	}
}
