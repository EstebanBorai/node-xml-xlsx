const Xml = require('./utils/Xml');

function Workbook() {
	const _xml = new Xml();
	_xml.doc += `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">`;
	this.xml = _xml.doc;
	this.sheets = [];
}

Workbook.prototype.addSheet = function(name) {
	this.sheets.push(name);
}

Workbook.prototype.build = function() {
	const sheets = new Xml().tag('sheets', null, this.sheets.map((sheet) => {
		const xml = new Xml();

		return xml.tag('sheet', {
			name: sheet
		});
	}));

	this.xml += sheets;
	this.xml += `</workbook>`;

	return this.xml;
}

const wb = new Workbook();
wb.addSheet('Sheet1');

console.log(wb.build());
