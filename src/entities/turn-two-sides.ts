import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { Base } from './base';

export class TurnTwoSides extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'turn-two-sides',
			cellKey,
			el('div.cell', getSVGElement(SVGs['turn-two-sides'])),
			el('div.empty'),
			rotation,
			true,
			false,
			[1, 0, 3, 2],
		);
	}
}
