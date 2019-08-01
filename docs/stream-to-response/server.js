const express = require('express');
const mockFetch = require('./mocks')._mockFetchData;
const ExcelXML = require('../../dist/index').default;

const app = express();

app.get('/', (req, res) => {
	res.send(`<a href="http://localhost:3000/file/">Stream Pizza Order</a>`);
});

app.get('/file', (req, res) => {
	res.statusCode = 200;

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	res.setHeader('Content-Disposition', 'attachment; filename=pizza-order.xlsx');
	res.setHeader('Transfer-Encoding', 'chunked');

	// Creates a new ExcelXML workbook
	const workbook = new ExcelXML();

	// Get reference to readable stream
	const readableStream = workbook.getReadableStream();

	//initialize workbook
	workbook.init();

	//Add header row
	workbook.addRow([
		'orderId',
		'address',
		'postalCode',
		'clientId',
		'clientName',
		'orderDate'
	]);

	// Listen on readableStream `data` event
	// and writes to response
	readableStream.on('data', (chunk) => {
		res.write(chunk);
	});

	// Ends writting after `readableStream` finishes
	readableStream.on('end', () => {
		res.send();
	});

	// In case of error, ends connection and logs
	// received error
	readableStream.on('error', (err) => {
		res.statusCode = 500;
		console.error(err)
		res.end();
	});

	// "Fetches data" and write results to existing workbook
	mockFetch()
		.then((data) => {
			workbook.addRow(Object.values(data));
			workbook.addRow(Object.values(data));
			workbook.addRow(Object.values(data));
			workbook.addRow(Object.values(data));
		})
		.then(() => {
			workbook.end();
		});
});

app.listen(3000, () => {
	console.log('Listening on http://127.0.0.1:3000/');
});
