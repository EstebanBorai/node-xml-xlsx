import SheetWritter from '../../src/utils/SheetWritter';

it('add rows', () => {
	const sheet = new SheetWritter();
	sheet.addRow({
		foo: 'bar',
		see: 1
	});

	expect(sheet.sheetData).toBe("<row r=\"1\"><c r=\"0\" t=\"s\"><v>bar</v></c><c r=\"1\" t=\"n\"><v>1</v></c></row>");
});
