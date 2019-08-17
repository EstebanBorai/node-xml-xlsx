export enum XLSXValueTypes {
	string = 'string',
	number = 'number'
}

/**
 * 
 * @param value - Value to evaluate
 * 
 * Returns the XLSX Row value type given any value.
 * If a value is invalid for a XLSX Row throws an exception.
 * 
 */
function getCellValueType(valueType: XLSXValueTypes): string {
	switch (valueType) {
		case 'string':
			return 's';
		case 'number':
			return 'n';
		default:
			throw new Error(`Unable to get value type for ${valueType}`);
	}
}

export default getCellValueType;
