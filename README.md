# node-xml-xlsx
📋 XLSX file generator for NodeJS

## Installation
```bash
npm i node-xml-xlsx
```

## Usage
```javascript
const fs = require('fs');
const Xlsx = require('node-xml-xlsx');

const xlsx = new Xlsx();
const xlsxFileStream = xlsx.getStream();

// Pipe xlsx file to a writeable stream
xlsxFileStream.pipe(fs.createWriteStream('./new-workbook.xlsx'));

// Append rows to the Xlsx file
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

// Invoke build to finalize workbook writting
xlsx.build();
```

## API
- Xlsx
	- [Xlsx]()
	- [getStream]()
	- [addRow]()
	- [build]()

- Sheet
	- [Sheet]()
	- [XLSXValue]()

### Xlsx
Create an instance of `Xlsx` class in order to create a new XLSX workbook.

```javascript
const Xlsx = require('node-xml-xlsx');

const xlsx = new Xlsx();
```

### Xlsx.getStream(): IArchiver
`node-xml-xlsx` uses [Archiver](https://github.com/archiverjs/node-archiver) internally to create a **zip** file.
An **xlsx** file is basically a **zip** file with an specific structure based on **xml** files.

Returns an [Archiver](https://github.com/archiverjs/node-archiver) instance that can be used to pipe the file
contents to a writeable stream while writting the xlsx file.

```javascript
const fs = require('fs');
const Xlsx = require('node-xml-xlsx');

const xlsx = new Xlsx();
const xlsxFileStream = xlsx.getStream();

xlsxFileStream.pipe(fs.createWriteStream('./workbook.xlsx'));
```

### Xlsx.addRow(values: XLSXValue[]): void
Appends a new row to the xlsx file based on the array values.
Each element of the array represents a column of the xlsx file.

```javascript
// Append rows to the Xlsx file
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
```

### Xlsx.build(): Promise<void>
Finalizes writting process and write fotters to the **zip** file.

```javascript
// Invoke build to finish workbook writting
xlsx.build();
```

### Sheet
A `Sheet` implements the capabilities of an **xlsx** file's sheet.

> Sheet's API is exported but its usage is internal, in the current version `node-xml-xlsx` is capable of creating single sheet workbooks only.

### Sheet - XLSXValue
