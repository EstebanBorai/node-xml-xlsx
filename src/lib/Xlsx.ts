import Archiver, { Archiver as IArchiver } from 'archiver';
import { PassThrough } from 'stream';
import { createWriteStream, WriteStream } from 'fs';
import Sheet, { IRowValues, XLSXValue } from './Sheet';
import * as template from '../templates';
import SharedStrings from './SharedStrings';

export interface IXlsx {}

interface IXlsxOptions {
	outFile?: string;
}

interface ISetStdoutEventListeners {
	onEnd: () => void;
	onError: (err: Error) => void;
	onWarning: (warn: Error) => void;
}

/**
 * 
 * @param eventListeners - Event listeners for the writable stream
 * @param path - Optional path for file system WriteStream
 * 
 * Creates a `fs` `WriteStream` if a path is given, otherwise creates a `Writable` stream
 * and set event listeners for the created stream, then returns it.
 * 
 */
function setStdout(eventListeners: ISetStdoutEventListeners, path?: string): WriteStream | Writable {
	let stdout;

	if (path) {
		stdout = createWriteStream(path);
	} else {
		stdout = new PassThrough();
	}

	stdout.on('end', function() {
		eventListeners.onEnd();
	});

	stdout.on('error', function (err) {
		eventListeners.onError(err);
	});

	stdout.on('warning', function(warn) {
		eventListeners.onWarning(warn);
	});

	return stdout;
}

class Xlsx implements IXlsx {
	private xlsxFile: IArchiver;
	private stdout: PassThrough;
	private sheet: Sheet;
	private sharedStrings: SharedStrings;

	constructor(options?: IXlsxOptions) {
		this.xlsxFile = Archiver('zip');
		this.stdout = new PassThrough(); /* PassThrough should be created only when a path to `fs` is not available */
		this.sheet = new Sheet();
		this.sharedStrings = new SharedStrings();
		
		// Append the first sheet of the XLSX file
		// to the ZIP.
		this.xlsxFile.append(this.stdout, {
			name: 'xl/worksheets/sheet1.xml'
		});
	}

	public addRow(rowData: IRowValues): void {
		const row = this.sheet.addRowFromObject(this.normalize(rowData) as IRowValues);
		this.stdout.write(row);
	}

	private normalize(original: IRowValues | Array<XLSXValue>): IRowValues | Array<XLSXValue> {
		if (Array.isArray(original)) {
			return original.map((value) => {
				if (typeof value === 'string') {
					return this.sharedStrings.fromString(value);
				}

				return value;
			});
		}

		let normalizedObject: any = {};
		const originalKeys = Object.keys(original);

		for (let i = 0; i <= originalKeys.length; i++) {
			const key = originalKeys[i];

			if (typeof original[key] === 'string') {
				normalizedObject[key] = this.sharedStrings.fromString((original as any).original[key]);
			} else {
				normalizedObject[key] = original[key];
			}
		}

		return normalizedObject;
	}

	public async build(): Promise<void> {
		this.xlsxFile.write(this.sheet.build());
		await this.buildXlsx();
		this.xlsxFile.finalize();
	}

	private buildXlsx(): Promise<void> {
		return this.xlsxFile.append(template.contentTypes, {
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
}

export default Xlsx;
