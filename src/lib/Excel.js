import { Readable } from 'stream';
import { headerString, toRow } from './utils';

/**
 * ExcelXML Constructor
 */
function Excel() {
	this._head = null;
	this._table = null;
	this._readableStream = null;
};

/**
 * Initializes ExcelXML
 */
Excel.prototype.init = function() {
	this._head = headerString();
	this._table = '<table><tbody>';

	if (this._readableStream !== null) {
		this._readableStream.push(this._head);
		this._readableStream.push(this._table);
	}
}

/**
 * Creates a Readable and returns a reference to it.
 *
 * Every interaction will be pushed to the readable stream as
 * a string after this function is called.
 * 
 */
Excel.prototype.getReadableStream = function() {
	if (this._readableStream === null) {
		this._readableStream = new Readable({ objectMode: true });
		this._readableStream._read = () => {};
	}

	return this._readableStream;
}

/**
 *
 * @param {any[]} row - An array of values to append
 *
 * Appends a row to the ExcelXML workbook sheet
 */
Excel.prototype.addRow = function(row) {
	const strRow = toRow(row);
	this._table += strRow;

	if (this._readableStream !== null) {
		this._readableStream.push(strRow);
	}
}

/**
 * Closes the workbook and return ExcelXML as a string
 */
Excel.prototype.end = function() {
	let workbook = this._head + this._table;
	workbook += `</tbody></table></body></html>`;

	if (this._readableStream !== null) {
		this._readableStream.push(`</tbody></table></body></html>`);
		this._readableStream.push(null);
	}

	return workbook;
}

export default Excel;
