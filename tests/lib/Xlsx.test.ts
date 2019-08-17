// import Xlsx from '../src/lib/Xlsx';
// import { createWriteStream } from 'fs';

// const file = new Xlsx();

// const stream = file.getStream();

// stream.pipe(createWriteStream('./test.xlsx'));
// stream.on('data', (chunk) => {
// 	console.log(`Received: ${chunk.toString()}`);
// });

// stream.on('close', () => {
// 	console.log(`closed @ ${new Date().toISOString()}`);
// });

// stream.on('end', () => {
// 	console.log(`ended @ ${new Date().toISOString()}`);
// });

// stream.on('finish', () => {
// 	console.log(`finished @ ${new Date().toISOString()}`);
// });

// file.addRow(['foo', 1, 'bar', 30.0]);
// file.addRow(['foo1', 2, 'bar1', 30.0]);
// file.addRow(['foo2', 3, 'bar2', 30.0]);
// file.addRow(['foo', 4, 'bar', 30.0]);

// file.build().then(() => {
// 	console.log('BUILDED');
// });

import Xlsx from '../../src/lib';
import stream from 'stream';

describe('lib :: Xlsx :: getStream', () => {
	let xlsx: Xlsx;
	
	beforeEach(() => {
		xlsx = new Xlsx();
	});

	it('returns a readable stream', () => {
		const xlsxStream = xlsx.getStream()
		
		expect(xlsxStream instanceof stream.Stream).toBe(true);
	});

	it('triggers "data" event when adding a row', (done) => {
		expect.assertions(1);

		const rowData = ['foo', 'bar'];
		const xlsxStream = xlsx.getStream();
		const onDataMock = jest.fn((chunk) => {
			return new Promise((resolve) => {
				resolve(chunk.toString());
			});
		});

		xlsxStream.on('data', (chunk) => {
			onDataMock(chunk).then((data) => {
				expect(data).toBe(rowData.toString());
				done();
			});
		});

		xlsx.addRow(rowData);
	});
});
