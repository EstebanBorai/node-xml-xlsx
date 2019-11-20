import { Sheet, SharedStrings } from '../../src/lib';

describe('lib :: Sheet', () => {
	let sheet: Sheet;
	let sharedStrings: SharedStrings;
	
	beforeEach(() => {
		sheet = new Sheet(sharedStrings);
	});

	it('initializes sheet header when creating a new Sheet instance', () => {
		const sheetData = sheet['sheetData'];
		const want = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <worksheet  xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"   xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" > <dimension ref=\"A1\"/> <sheetViews>  <sheetView workbookViewId=\"0\"/> </sheetViews> <sheetFormatPr defaultRowHeight=\"12.8\"></sheetFormatPr> <cols>  <col collapsed=\"false\" hidden=\"false\" max=\"1025\" min=\"1\" style=\"0\" width=\"12\" /> </cols> <sheetData>`;
		expect(sheetData).toBe(want);
	});
});

describe('lib :: Sheet :: addRow', () => {
	let sheet: Sheet;
	let sharedStrings: SharedStrings;
	
	beforeEach(() => {
		sharedStrings = new SharedStrings();
		sheet = new Sheet(sharedStrings);
	});

	it('adds the new row to the sheet and returns the new row with headers (the first time)', () => {
		expect.assertions(2);

		const have = sheet['addRow'](['foo', 1, 'bar', 30.00]);
		const want = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <worksheet  xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"   xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" > <dimension ref=\"A1\"/> <sheetViews>  <sheetView workbookViewId=\"0\"/> </sheetViews> <sheetFormatPr defaultRowHeight=\"12.8\"></sheetFormatPr> <cols>  <col collapsed=\"false\" hidden=\"false\" max=\"1025\" min=\"1\" style=\"0\" width=\"12\" /> </cols> <sheetData><row r=\"1\" ht=\"13\" hidden=\"false\" customHeight=\"false\" outlineLevel=\"0\" collapsed=\"false\"><c r=\"A1\" t=\"s\"><v>0</v></c><c r=\"B1\" t=\"n\"><v>1</v></c><c r=\"C1\" t=\"s\"><v>1</v></c><c r=\"D1\" t=\"n\"><v>30</v></c></row>`;

		expect(sheet['sheetData']).toBe(want);
		expect(have).toBe(want);
	});
});
