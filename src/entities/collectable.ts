import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { Base } from './base';

export class Collectable extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'collectable',
			cellKey,
			el('div.cell', getSVGElement(SVGs.hearts)),
			el('div.empty'),
			rotation,
			false,
			false,
			[2, 3, 0, 1],
		);
	}
}
