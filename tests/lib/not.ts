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
		const rowData = ['foo', 'bar'];
		const xlsxStream = xlsx.getStream();
		const onDataMock = jest.fn(() => {
			console.log('DATA');
		});

		xlsxStream.on('data', () => {
			onDataMock();
		});

		xlsx.addRow(rowData);

		expect(onDataMock).toHaveBeenCalled();
	});
});
