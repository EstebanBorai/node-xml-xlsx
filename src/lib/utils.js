/**
 * Returns a string containing the `<head/>` of the ExcelXML file.
 */
export function headerString() {
	let str = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head>`;
	str += `<xml><x:ExcelWorkbook><x:ExcelWorksheets>`;
	str += `<x:ExcelWorksheet>`;
	str += `<x:Name>Sheet 1</x:Name>`;
	str += `</x:ExcelWorksheet>`;
	str += `</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>`;

	return str;
}

/**
 * Sanitize values to avoid ExcelXML read errors
 */
export function sanitize(value) {
	if (value === null || undefined) {
		return '';
	}

	if (value instanceof Date) {
		let d = value,
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	return value;
}

/**
 * 
 * @param {any[]} row - Row contents
 * 
 * Creates a table row for the ExcelXML and
 * returns it as a string.
 */
export function toRow(row) {
	let str = `<tr>`;

	for (let i = 0; i < row.length; i++) {
		str += `<td>${sanitize(row[i])}</td>`
	}

	str += `</tr>`;

	return str;
}
