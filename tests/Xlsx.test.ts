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

file.addRow({
	foo: 'bar',
	bar: 1
});

file.build().then(() => {
	console.log('BUILDED');
});
