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
			try {
				let valueType = this.getCellValueType(value);
	
				return {
					type: valueType,
					value: this.getFinalValue(value, valueType)
				}
			} catch (err) {
				// If an error is thrown here, means that a value
				// is invalid or not supported for the spreadsheet.

				// TODO: Create error objects to extract error details
				// and expose the reason to the client otherwise will
				// be tedious to find the wrong value and fix it.

				// IMPROVEMENT: Sanitizing values would be great
				// in order to avoid endup here but at the same time
				// is risky because it possible to cause data losses
				throw new Error('Unable to fill sheet with given values.');
			}
		});

		const isFirst = this.rowCount === 0;

		this.rowCount++;
		const rowString = row(this.rowCount, rowValues as IRowTemplateValues[]);
		this.sheetData += rowString;

		if (isFirst) {
			return this.sheetData;
		}

		return rowString;
	}

	private getCellValueType(value: any): XLSXValueTypes {
		const type = typeof value;

		if (type === 'string') {
			return XLSXValueTypes.string;
		}

		if (type === 'number') {
			return XLSXValueTypes.number;
		}

		throw new Error(`Invalid value of type ${type} for value ${value}`);
	}

	private getFinalValue(value: any, type: XLSXValueTypes): any {
		if (type === XLSXValueTypes.string) {
			return this.sharedStrings.fromString(value as string);
		}

		if (type === XLSXValueTypes.number) {
			return value;
		}

		throw new Error(`Invalid value of type ${type} for value ${value}`);
	}
}

export default Sheet;
