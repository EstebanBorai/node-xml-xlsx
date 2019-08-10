import {
	footer as xmlFooter,
	header as createXMLHeader,
	row
} from '../templates/sheet';

type XLSXValue = string | number;

interface IRowValues {
	[key: string]: XLSXValue
}

interface ISheet {
	rowCount: number;
	addRowFromObject: (values: IRowValues) => number;
	build(): string;
}

class Sheet implements ISheet {
	public rowCount: number;
	private sheetData: string;
	private headers: Array<string>;
	/* private lastColumnIndex: number; */

	constructor() {
		this.sheetData = createXMLHeader('A1:AA:1');
		this.rowCount = 0;
		/* this.lastColumnIndex = 0; */
		this.headers = [];
	}

	/**
	 *
	 * @param values - Values to append to the sheet
	 * 
	 * Receives an object where the `key` is equivalent to a Sheet
	 * column and the `value` to the current row value at the given
	 * `key`.
	 * 
	 * Eg:
	 * ```
	 * const row = {
	 *   name: 'Esteban'
	 * }
	 * 
	 * sheet.addRowFromObject(row);
	 * ```
	 * 
	 * Will add the following to the Sheet:
	 * 
	 * | name    |
	 * | ------- |
	 * | Esteban |
	 * 
	 */
	public addRowFromObject(values: IRowValues): number {
		if (this.headers.length === 0 && this.rowCount === 0) {
			// Adds the first row to the XLSX file given an object

			this.rowCount++;
			this.headers = Object.keys(values);
			this.sheetData += row(this.rowCount, Object.keys(values));
		}

		this.rowCount++;
		this.sheetData += row(this.rowCount, this.headers.map((header) => values[header]));

		return this.rowCount;
	}

	/**
	 * Returns the XML for this `sheet` file.
	 */
	public build(): string {
		return  this.sheetData + xmlFooter;
	}
}

export default Sheet;

const sheet = new Sheet();
sheet.addRowFromObject({
	name: 'Esteban'
});

console.log(sheet.build());
