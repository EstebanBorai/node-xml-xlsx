import Sheet from '../../src/lib/Sheet';

describe('lib :: Sheet', () => {
	let sheet: Sheet;
	
	beforeEach(() => {
		sheet = new Sheet();
	});

	it('initializes sheet header when creating a new Sheet instance', () => {
		const sheetData = sheet['sheetData'];
		const want = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <worksheet  xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"   xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" > <dimension ref=\"A1\"/> <sheetViews>  <sheetView workbookViewId=\"0\"/> </sheetViews> <sheetFormatPr defaultRowHeight=\"12.8\"></sheetFormatPr> <cols>  <col collapsed=\"false\" hidden=\"false\" max=\"1025\" min=\"1\" style=\"0\" width=\"12\" /> </cols> <sheetData>`;
		expect(sheetData).toBe(want);
	});
});

describe('lib :: Sheet :: addRowFromObject', () => {
	let sheet: Sheet;
	
	beforeEach(() => {
		sheet = new Sheet();
	});

	it('returns the header and appended row when the first row is added', () => {
		const created = sheet.addRowFromObject({
			foo: 'bar'
		});
		const want = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?> <worksheet  xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"   xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" > <dimension ref=\"A1\"/> <sheetViews>  <sheetView workbookViewId=\"0\"/> </sheetViews> <sheetFormatPr defaultRowHeight=\"12.8\"></sheetFormatPr> <cols>  <col collapsed=\"false\" hidden=\"false\" max=\"1025\" min=\"1\" style=\"0\" width=\"12\" /> </cols> <sheetData><row r=\"1\" ht=\"13\" hidden=\"false\" customHeight=\"false\" outlineLevel=\"0\" collapsed=\"false\"><c r=\"A1\" t=\"s\"><v>foo</v></c></row><row r=\"2\" ht=\"13\" hidden=\"false\" customHeight=\"false\" outlineLevel=\"0\" collapsed=\"false\"><c r=\"A2\" t=\"s\"><v>bar</v></c></row>`;
	
		expect(created).toBe(want);
	});

	it('returns the appended row', () => {
		sheet.addRowFromObject({
			foo: 'bar'
		});

		const secondRow = sheet.addRowFromObject({
			foo: 'zoo'
		});

		expect(secondRow).toBe('<row r=\"3\" ht=\"13\" hidden=\"false\" customHeight=\"false\" outlineLevel=\"0\" collapsed=\"false\"><c r=\"A3\" t=\"s\"><v>zoo</v></c></row>');
	});	
});
