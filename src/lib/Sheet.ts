import {
	header as createXMLHeader,
	row,
	IRowTemplateValues
} from '../templates/sheet';
import SharedStrings from './SharedStrings';
import { XLSXValueTypes } from '../utils';

export type XLSXValue = string | number;

export interface IRowValues {
	[key: string]: XLSXValue
}

interface ISheet {
	rowCount: number;
	sheetData: string;
	addRow: (values: XLSXValue[]) => string;
}

class Sheet implements ISheet {
	public rowCount: number;
	public sheetData: string;
	private sharedStrings: SharedStrings;

	constructor(sharedStrings: SharedStrings) {
		this.sheetData = createXMLHeader('A1');
		this.sharedStrings = sharedStrings;
		this.rowCount = 0;
	}

	public addRow(values: XLSXValue[]): string {
		let rowValues = values.map((value: XLSXValue) => {
			let valueType = typeof value;
			let finalValue;

			if (valueType === XLSXValueTypes.string) {
				finalValue = this.sharedStrings.fromString(value as string);
			}

			if (valueType === XLSXValueTypes.number) {
				finalValue = value;
			}

			return {
				type: valueType,
				value: finalValue
			}
		});

		this.rowCount++;
		const rowString = row(this.rowCount, rowValues as IRowTemplateValues[]);
		this.sheetData += rowString;

		return rowString;
	}
}

export default Sheet;
