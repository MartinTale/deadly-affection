import { el } from 'redom';
import { SVGs } from '../helpers/svgs';
import { getSVGElement } from '../helpers/utilities';
import { Base } from './base';

export class Tunnel extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'tunnel',
			cellKey,
			el('div.cell', getSVGElement(SVGs.tunnel)),
			el('div.empty'),
			rotation,
			true,
			false,
			[2, null, 0, null],
		);
	}
}
