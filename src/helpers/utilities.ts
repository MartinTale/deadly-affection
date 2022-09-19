const defaultOptions = {
	padding: true,
	symbols: ['', 'k', 'M', 'G', 'T', 'P', 'E'],
};

export function randomIntFromInterval(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function abbreviateNumber(num: number, digit: number = 1, options: any = {}) {
	if (digit === void 0) {
		digit = 1;
	}
	// Previous options style
	if (Array.isArray(options)) {
		options = { symbols: options };
	}
	var _a = Object.assign({}, defaultOptions, options),
		symbols = _a.symbols,
		padding = _a.padding;
	// handle negatives
	var sign = Math.sign(num) >= 0;
	num = Math.abs(num);
	// what tier? (determines SI symbol)
	var tier = (Math.log10(num) / 3) | 0;
	// if zero, we don't need a suffix
	if (tier == 0) return (!sign ? '-' : '') + num.toString();
	// get suffix and determine scale
	var suffix = symbols[tier];
	if (!suffix) throw new RangeError();
	var scale = Math.pow(10, tier * 3);
	// scale the number
	var scaled = num / scale;
	var rounded = (Math.floor(scaled * 10 * digit) / (10 * digit)).toFixed(digit);
	if (!padding) {
		rounded = String(Number(rounded));
	}
	// format number and add suffix
	return (!sign ? '-' : '') + rounded + suffix;
}

export function getSVGElement(svgString: string, color?: string): HTMLElement {
	if (color) {
		svgString = svgString.replace('[fill]', `fill="${color}"`);
	}

	const parser = new DOMParser();
	return parser.parseFromString(svgString, 'image/svg+xml').documentElement;
}
