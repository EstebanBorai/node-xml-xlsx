import {
	header as createXMLHeader,
	row
} from '../templates/sheet';

export type XLSXValue = string | number;

export interface IRowValues {
	[key: string]: XLSXValue
}

interface ISheet {
	rowCount: number;
	addRowFromObject: (values: IRowValues) => string;
}

class Sheet implements ISheet {
	public rowCount: number;
	private sheetData: string;
	private headers: Array<string>;
	/* private lastColumnIndex: number; */

	constructor() {
		this.sheetData = createXMLHeader('A1');
		this.rowCount = 0;
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
	public addRowFromObject(values: IRowValues): string {
		let isFirstAdd = false;

		if (this.headers.length === 0 && this.rowCount === 0) {
			// Adds the first row to the XLSX file given an object

			isFirstAdd = true;
			this.rowCount++;
			this.headers = Object.keys(values);
			this.sheetData += row(this.rowCount, Object.keys(values));
		}

		this.rowCount++;
		let currentRow = row(this.rowCount, this.headers.map((header) => values[header]));
		this.sheetData += currentRow;

		if (isFirstAdd) {
			// The first time a row is added, return the complete header and data of the sheet
			return this.sheetData;
		}

		// Otherwise returns the recently created row
		return currentRow;
	}
}

export default Sheet;
