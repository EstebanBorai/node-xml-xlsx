# node-xml-xlsx
📋 XLSX file generator for NodeJS

## Installation
```bash
npm i node-xml-xlsx
```
## Usage
```typescript
import { createWriteStream } from 'fs';
import Xlsx from 'node-xml-xlsx';

// Create a new xlsx file
const file = new Xlsx();

// Pipe a xlsx file's readableStream to a
// fs writeableStream
const xlsxStream = file.getStream();
xlsxStream.pipe(createWriteableStream('path/to/output/file.xlsx'));

// Write to the worksheet
const data = ['foo', 'bar', 12000];
file.addRow(data);

// Build the xlsx file
file.build().then(() => {
	console.log('Xlsx file has been created');
});
```
