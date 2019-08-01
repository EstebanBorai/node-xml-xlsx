const ExcelXML = require('../../dist/index').default;

const workbook = new ExcelXML();
workbook.init();

workbook.addRow([
	'id',
	'first name',
	'last name',
	'age',
	'country',
	'date'
]);

workbook.addRow([
	1,
	'John',
	'Appleseed',
	42,
	'EE.UU.',
	new Date()
]);

console.log(workbook.end());
