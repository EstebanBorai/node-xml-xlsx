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
	addFromArray: (values: XLSXValue[]) => string;
}

interface IColumnValueTypes {
	[s: string]: XLSXValue;
}

class Sheet implements ISheet {
	public rowCount: number;
	private sheetData: string;
	private headers: Array<string>;
	private columnValueTypes: IColumnValueTypes;
	/* private lastColumnIndex: number; */

	constructor() {
		this.sheetData = createXMLHeader('A1');
		this.rowCount = 0;
		this.headers = [];
		this.columnValueTypes = {};
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

	/**
	 * 
	 * @param values - Values to append to the current sheet
	 * 
	 * Receives an array of values and appends it to the current sheet.
	 * 
	 * Note: Values should be aligned with the column order, otherwise
	 * columns will mismatch values in the resulting sheet.
	 * 
	 * In order to keep values aligned with columns use `addRowsFromObject`
	 * instead.
	 */
	public addFromArray(values: XLSXValue[]): string {
		if (this.columnValueTypes.length === 0) {
			this.columnValueTypes = this.getValueTypes(values);
		}

		if (this.headers.length === 0 && this.rowCount === 0) {
			this.rowCount++;
			this.sheetData += row(this.rowCount, values);

			// The first time a row is added, return the complete header and data of the sheet
			return this.sheetData;
		}

		this.rowCount++;
		const currentRow = row(this.rowCount, values);
		
		// Otherwise returns the recently created row
		return currentRow;
	}

	/**
	 * 
	 * @param values - Iterable of row values
	 * 
	 * Checks the `typeof` every value in an row and
	 * returns it as an array of strings in the same
	 * order as the given `values` object.
	 * 
	 * Note: Column headers are required in order to gather
	 * value types.
	 * 
	 */
	private getValueTypes(values: XLSXValue[] | IRowValues): IColumnValueTypes {
		if (this.headers.length === 0) {
			throw new Error('Unable to set column values. Missing column headers.');
		}
		
		let columnValueTypes: IColumnValueTypes = {};

		if (Array.isArray(values)) {
			for (const headerIndex in this.headers) {
				const currentHeader = this.headers[headerIndex];

				columnValueTypes[currentHeader] = typeof values[headerIndex];
			}

			return columnValueTypes;
		}

		if (typeof values === 'object') {
			for (const key in values) {
				columnValueTypes[key] = typeof values[key];
			}

			return columnValueTypes;
		}

		throw new Error('Unexpected values object. Unable to gather values.');
	}
}

export default Sheet;
