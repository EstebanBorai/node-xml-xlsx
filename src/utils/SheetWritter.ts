import {
	ValueType,
	cell,
	footer,
	header,
	row
} from '../templates/sheet';

interface ISheetWritter {
	sheetData: string;
	rowCount: number;
	headers: Array<string>;
}

class SheetWritter implements ISheetWritter {
	public sheetData;
	public rowCount: number;
	public headers: Array<string>;

	constructor() {
		this.sheetData = '';
		this.rowCount = 0;
		this.headers = [];
	}

	public addRow(values: object): number {
		if (this.headers.length === 0) {
			this.headers = Object.keys(values);
		}

		let cells = this.headers.map((header, index) => {
			if (typeof values[header] !== 'string' && typeof values[header] !== 'number') {
				throw new Error(`Unable to add "${values[header]}" of type ${typeof values[header]}.\nValid values are either "string" or "number".`);
			}

			return cell(index, values[header], ValueType[typeof values[header]]);
		});

		this.rowCount++;
		this.sheetData += row(this.rowCount, cells.join(''));

		return this.rowCount;
	}
}

export default SheetWritter;
