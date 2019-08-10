/**
 * 
 * @param value - Value to evaluate
 * 
 * Returns the XLSX Row value type given any value.
 * If a value is invalid for a XLSX Row throws an exception.
 * 
 */
function getCellValueType(value: any): string {
	switch (typeof value) {
		case 'string':
			return 's';
		case 'number':
			return 'n';
		default:
			throw new Error(`Invalid value of type ${typeof value}. Valid types are "string", "number".`);
	}
}

export default getCellValueType;
