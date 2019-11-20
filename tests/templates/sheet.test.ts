import {
	sheetHeader,
	row
} from '../../src/templates';
import { IRowTemplateValues } from '../../src/templates/sheet';
import { XLSXValueTypes } from '../../src/utils';

describe('templates :: sheet :: sheetHeader', () => {
	it('creates the sheet header with dimensions', () => {
		const have = sheetHeader('A1:X11');
		const want = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <worksheet  xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"   xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" > <dimension ref=\"A1:X11\"/> <sheetViews>  <sheetView workbookViewId=\"0\"/> </sheetViews> <sheetFormatPr defaultRowHeight=\"12.8\"></sheetFormatPr> <cols>  <col collapsed=\"false\" hidden=\"false\" max=\"1025\" min=\"1\" style=\"0\" width=\"12\" /> </cols> <sheetData>`;

		expect(have).toBe(want);
	});
});

describe('templates :: sheet :: row', () => {
	it('creates a row xml template', () => {
		const rowValues: IRowTemplateValues[] = [
			{
				type: XLSXValueTypes.number,
				value: 10
			},
			{
				type: XLSXValueTypes.string,
				value: 0
			}
		];

		const have = row(1, rowValues);
		const want = `<row r=\"1\" ht=\"13\" hidden=\"false\" customHeight=\"false\" outlineLevel=\"0\" collapsed=\"false\"><c r=\"A1\" t=\"n\"><v>10</v></c><c r=\"B1\" t=\"s\"><v>0</v></c></row>`;

		expect(have).toBe(want);
	});
});
