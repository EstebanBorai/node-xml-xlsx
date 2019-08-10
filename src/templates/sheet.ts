import { toOneLine, getColumnIndex, getCellValueType } from '../utils';

/**
 * 
 * @param dimensions - Columns range
 * 
 * Returns the header of the `sheet` XML file.
 * 
 */
export const header = (dimensions: string) => toOneLine(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet
	xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" 
	xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
>
<dimension ref="${dimensions}"/>
<sheetViews>
	<sheetView workbookViewId="0"/>
</sheetViews>
<sheetFormatPr defaultRowHeight="12.8"></sheetFormatPr>
<cols>
	<col collapsed="false" hidden="false" max="1025" min="1" style="0" width="12" />
</cols>
<sheetData>`);

/**
 * 
 * @param rowIndex - Current row index
 * @param values - List of values (cells) in this row
 * 
 * Returns the XML-XLSX row template
 * 
 */
export const row = (rowIndex: number, values: Array<string | number>): string => {
	let _row = `<row r="${rowIndex}" ht="13" hidden="false" customHeight="false" outlineLevel="0" collapsed="false">`;
	_row = _row.concat(values.map((cellValue, index) => (
		`<c r="${getColumnIndex(index)}${rowIndex}" t="${getCellValueType(cellValue)}"><v>${cellValue}</v></c>`
	)).join('')).concat('</row>');

	return _row;
}

/**
 * Returns the footer of the XML `sheet` file.
 */
export const footer = `</sheetData></worksheet>`;
