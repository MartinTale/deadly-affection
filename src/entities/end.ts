import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { Base } from './base';

export class End extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'end',
			cellKey,
			el('div.cell'),
			getSVGElement(SVGs.fairy),
			rotation,
			false,
			true,
		);
	}
}
