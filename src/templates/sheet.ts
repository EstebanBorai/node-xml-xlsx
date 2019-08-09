import { toOneLine } from '../utils';

export enum ValueType {
	string = 's',
	number = 'n'
}

export const header = (dimensions: number) => toOneLine(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet
	xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
	xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
	xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
	mc:Ignorable="x14ac"
	xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
>
<dimension ref="${dimensions}"/>
<sheetViews>
	<sheetView workbookViewId="0"/>
</sheetViews>
<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>
<sheetData>`);

export const row = (row: number, body: string) => toOneLine(`
<row r="${row}">
	${body}
</row>
`);

export const cell = (row, value, valueType: ValueType) => `<c r="${row}" t="${valueType}"><v>${value}</v></c>`;

export const footer = `</sheetData></worksheet>`;
