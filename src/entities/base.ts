import { playSound } from '../components/music';
import { el, mount } from 'redom';
import { screens } from '../systems/game';
import { recreateAllLines } from '../systems/play';
import { Rotation } from './../data/levels';

export type PathDirection = Rotation[] | Rotation | null;

export class Base {
	public left = 0;
	public bottom = 0;
	public distanceToCenter = 0;

	public neighbors!: [Base, Base, Base, Base];

	public inputs: [boolean, boolean, boolean, boolean] = [false, false, false, false];
	public outputs: [boolean, boolean, boolean, boolean] = [false, false, false, false];

	public lines: [HTMLElement | null, HTMLElement | null, HTMLElement | null, HTMLElement | null] = [null, null, null, null];

	constructor(
		public name: string,
		public cellKey: string,
		public cellElement: HTMLElement,
		public iconElement: HTMLElement,
		public rotation: number,
		public rotatable = false,
		public withBackground = false,
		public paths: [PathDirection, PathDirection, PathDirection, PathDirection] = [null, null, null, null],
	) {
		this.rotation += 10000;

		this.cellElement.style.transform = 'rotate(' + (90 * this.rotation) + 'deg)';
		for (let i = 0; i < this.rotation; i += 1) {
			// Move first element to end of array
			const poppedpath = this.paths.pop();
			this.paths.unshift(poppedpath != null ? poppedpath : null);
		}

		if (this.rotatable) {
			this.cellElement.onclick = () => {
				this.rotate(-1);
			}

			this.cellElement.oncontextmenu = (ev) => {
				ev.preventDefault();
				this.rotate(1);
				return false;
			};
		} else {
			this.cellElement.style.pointerEvents = 'none';
		}

		if (this.withBackground === false) {
			this.cellElement.style.background = 'transparent';
			this.cellElement.style.borderColor = 'transparent';
		}

		this.cellElement.classList.add(this.name);
		this.iconElement.classList.add(this.name);

		this.cellElement.classList.toggle('active', this.isActive());
		this.iconElement.classList.toggle('active', this.isActive());
	}

	rotate(direction: -1 | 1) {
		playSound('rotate');

		this.rotation = this.rotation + direction;
		this.cellElement.style.transform = 'rotate(' + (90 * this.rotation) + 'deg)';

		const img = this.cellElement.querySelector('img');
		if (img) {
			img.style.transform = 'rotate(' + (-90 * this.rotation) + 'deg)';
		}

		// Move first element to end of array and vice versa
		if (direction === 1) {
			const poppedpath = this.paths.pop();
			this.paths.unshift(poppedpath != null ? poppedpath : null);
		} else {
			const poppedpath = this.paths.shift();
			this.paths.push(poppedpath != null ? poppedpath : null);
		}

		recreateAllLines();
	}

	interact(action: 'add' | 'remove', from?: number, checked: string[] = []) {
		if (action === 'remove' && from != null && this.name !== 'start') {
			if (this.inputs[from] === false) {
				return checked;
			}

			this.inputs[from] = false;
		}

		if (action === 'add' && from != null) {
			if (this.inputs[from] === true) {
				return checked;
			}

			this.inputs[from] = true;
		}

		const newOutputs: [boolean, boolean, boolean, boolean] = [false, false, false, false];

		for (let i = 0; i < this.inputs.length; i += 1) {
			if (this.inputs[i] === true) {
				const path = this.paths[i];

				if (typeof path === 'number') {
					newOutputs[(path + this.rotation) % 4] = true;
				} else if (Array.isArray(path)) {
					for (let j = 0; j < path.length; j += 1) {
						newOutputs[(path[j] + this.rotation) % 4] = true;
					}
				}
			}
		}

		for (let i = 0; i < this.outputs.length; i += 1) {
			const oldOutput = this.outputs[i];
			const newOutput = newOutputs[i];

			// if (checked.includes(this.cellKey + i)) {
			// 	continue;
			// }

			checked.push(this.cellKey + i);
			if (oldOutput === false && newOutput === true) {
				this.outputs[i] = true;

				this.addLine(i as 0 | 1 | 2 | 3);

				if (this.neighbors[i]) {
					checked = this.neighbors[i].interact('add', (i + 2) % 4, checked);
				}
			}
		}

		return checked;
	}

	addLine(direction: 0 | 1 | 2 | 3) {
		const line = el('div.line');

		const lineLength = this.distanceToCenter * 2.75;

		line.style.width = '2px';
		line.style.height = lineLength + 'px';
		line.style.bottom = (this.bottom + this.distanceToCenter) + 'px';
		line.style.left = (this.left + this.distanceToCenter) + 'px';
		line.style.transform = 'rotate(' + 90 * direction + 'deg)';

		mount(screens.screens.game, line);

		this.lines[direction] = line;
	}

	removeLine(direction: 0 | 1 | 2 | 3) {
		this.lines[direction]?.remove();
	}

	isActive() {
		return this.inputs.some(input => input);
	}

	isActiveOutput() {
		return this.outputs.some(output => output);
	}
}
