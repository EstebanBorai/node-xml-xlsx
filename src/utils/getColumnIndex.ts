/**
 * 
 * @param index - Column index in a range from 0 - Infinity
 * 
 * Returns the `sheet` column equivalent for an index.
 * 
 * Eg: index: 5, column: F
 * Eg: index: 27, column: AB
 * 
 */
function getColumnIndex(index: number): string {
	let column = '';

	if (index > 25) {
		const next = toNatural((index - 1) - 25);

		column += getColumnIndex(toNatural(Math.floor(index / 25) - 2));
		column += getColumnIndex(next);
	} else {
		column += String.fromCharCode(index + 65);
	}

	return column;
}

function toNatural(num: number): number {
	return num >= 0 ? num : 0;
}

export default getColumnIndex;
