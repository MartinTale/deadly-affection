import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { Base } from './base';

export class Split extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'split',
			cellKey,
			el('div.cell', getSVGElement(SVGs['split-3'])),
			el('div.empty'),
			rotation,
			true,
			false,
			[[1, 3], [0, 3], null, [0, 1]],
		);
	}
}
