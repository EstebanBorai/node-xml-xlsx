import Archiver, { Archiver as IArchiver } from 'archiver';
import { PassThrough } from 'stream';
import Sheet, { XLSXValue } from './Sheet';
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
		this.sharedStrings = new SharedStrings();
		this.sheet = new Sheet(this.sharedStrings);
		this.sheetStream = new PassThrough({ objectMode: true });

		this.xlsxFile.append(this.sheetStream, {
			name: 'xl/worksheets/sheet1.xml'
		});
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

	public addRow(values: XLSXValue[]): void {
		this.sheetStream.write(this.sheet.addRow(values));
	}
}

export default Xlsx;
