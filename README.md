# node-xml-xlsx
📋 XLSX file generator for NodeJS

## Installation
```bash
npm i node-xml-xlsx
```

## Usage
```javascript
const fs = require('fs');
const ExcelXML = require('node-xml-xlsx');

async function createExcelWorkbook() {
	const workbook = new ExcelXML(),
		workbookStream = workbook.getStream();

	workbookStream.pipe(fs.createWriteStream('./test.xlsx'));

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

	await workbook.build();
	console.log('XLSX has been created');
}

createExcelWorkbook();
```

```
