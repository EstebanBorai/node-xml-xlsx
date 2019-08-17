import Xlsx from '../src/lib/Xlsx';
import { createWriteStream } from 'fs';

const file = new Xlsx();

const stream = file.getStream();

stream.pipe(createWriteStream('./test.xlsx'));
stream.on('data', (chunk) => {
	console.log(`Received: ${chunk.toString()}`);
});

stream.on('close', () => {
	console.log(`closed @ ${new Date().toISOString()}`);
});

stream.on('end', () => {
	console.log(`ended @ ${new Date().toISOString()}`);
});

stream.on('finish', () => {
	console.log(`finished @ ${new Date().toISOString()}`);
});

file.addRow(['foo', 1, 'bar', 30.0]);
file.addRow(['foo1', 2, 'bar1', 30.0]);
file.addRow(['foo2', 3, 'bar2', 30.0]);
file.addRow(['foo', 4, 'bar', 30.0]);

file.build().then(() => {
	console.log('BUILDED');
});
