const Xml = require('../lib/utils/Xml');
const cols = require('../lib/utils/cols');

function Worksheet() {
	this.doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">`;
	this.sheetData = [];
}

Worksheet.prototype.createEntry = function(value) {
	return new Xml().tag(
		'c', {
			r: 'A1', // get last column/row coordinate
		}, 
		new Xml().tag(
			'v',
			null,
			value
		)
	);
}
