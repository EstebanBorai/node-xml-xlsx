/**
 * 
 * @param original - String to clean
 * 
 * Removes whitespaces and line breaks from a string and returs
 * the contents of the original string in a one-line string.
 * 
 */
function toOneLine (original: string): string {
	return original.replace(/\n\s*/g, '');
}

export default toOneLine;
