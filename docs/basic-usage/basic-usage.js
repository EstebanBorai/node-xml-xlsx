const fs = require('fs');
const Xlsx = require('../../dist/index');

const xlsx = new Xlsx();
const xlsxFileStream = xlsx.getStream();

xlsxFileStream.pipe(fs.createWriteStream('./new-workbook.xlsx'));

xlsx.addRow([
	'id',
	'first name',
	'last name',
	'age',
	'country',
	'date'
]);

xlsx.addRow([
	1,
	'John',
	'Appleseed',
	42,
	'EE.UU.',
]);

xlsx.build();