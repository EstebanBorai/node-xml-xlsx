import Archiver, { Archiver as IArchiver } from 'archiver';
import { PassThrough } from 'stream';
import Sheet, { IRowValues } from './Sheet';
import * as template from '../templates';
import SharedStrings from './SharedStrings';

export interface IXlsx {}

class Xlsx implements IXlsx {
	private xlsxFile: IArchiver;
	private sheetStream: PassThrough;
	private sheet: Sheet;
	private sharedStrings: SharedStrings;

	constructor() {
		this.xlsxFile = Archiver('zip');
		this.sheet = new Sheet();
		this.sharedStrings = new SharedStrings();
		this.sheetStream = new PassThrough({ objectMode: true });

		// Append the first sheet of the XLSX file
		// to the ZIP.
		this.xlsxFile.append(this.sheetStream, {
			name: 'xl/worksheets/sheet1.xml'
		});
	}

	public addRow(rowData: IRowValues): void {
		const row = this.sheet.addRowFromObject(this.normalize(rowData));
		this.sheetStream.write(row);
	}

	public getStream(): IArchiver {
		return this.xlsxFile;
	}

	public async build(): Promise<void> {
		this.sheetStream.write(template.sheetFooter);
		this.sheetStream.end();
		return await this.xlsxFile.append(template.contentTypes, {
			name: '[Content_Types].xml'
		}).append(template.rels, {
			name: '_rels/.rels'
		}).append(template.workbook, {
			name: 'xl/workbook.xml'
		}).append(template.styles, {
			name: 'xl/styles.xml'
		}).append(template.workbookRels, {
			name: 'xl/_rels/workbook.xml.rels'
		}).append(this.sharedStrings.build(), {
			name: 'xl/sharedStrings.xml'
		}).finalize();

		// Missing xl/worksheets/_rels/sheet1.xml.rels
	}

	private normalize(original: IRowValues): IRowValues {
		let normalizedObject: any = {};
		const originalKeys = Object.keys(original);

		for (let i = 0; i < originalKeys.length; i++) {
			const key = originalKeys[i];

			if (typeof original[key] === 'string') {
				normalizedObject[key] = this.sharedStrings.fromString(original[key] as string);
			} else {
				normalizedObject[key] = original[key];
			}
		}

		return normalizedObject;
	}
}

export default Xlsx;
