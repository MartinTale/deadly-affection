import { el } from 'redom';
import { Base } from './base';

export class Empty extends Base {
	constructor(
		rotation: number,
		cellKey: string,
	) {
		super(
			'empty',
			cellKey,
			el('div.empty'),
			el('div.empty'),
			rotation,
			false,
			false,
			[2, 3, 0, 1],
		);
	}
}
