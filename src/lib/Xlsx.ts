import Archiver, { Archiver as IArchiver } from 'archiver';
import { PassThrough } from 'stream';
import { createWriteStream, WriteStream } from 'fs';
import Sheet, { IRowValues } from './Sheet';
import * as template from '../templates';

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

	constructor(options?: IXlsxOptions) {
		this.xlsxFile = Archiver('zip');
		this.stdout = new PassThrough(); /* PassThrough should be created only when a path to `fs` is not available */
		this.sheet = new Sheet();
		
		// Append the first sheet of the XLSX file
		// to the ZIP.
		this.xlsxFile.append(this.stdout, {
			name: 'xl/worksheets/sheet1.xml'
		});
	}

	public addRow(rowData: IRowValues): void {
		const row = this.sheet.addRowFromObject(rowData);
		this.stdout.write(row);
	}

	public build(): void {

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
		}).finalize();

		// Missing xl/worksheets/_rels/sheet1.xml.rels
		// Missing xl/sharedStrings.xml
	}
}

export default Xlsx;
