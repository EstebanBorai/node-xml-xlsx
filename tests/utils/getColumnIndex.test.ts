import getColumnIndex from '../../src/utils/getColumnIndex';

describe('utils :: getColumnIndex', () => {
	it('returns the expected column index from an integer', () => {
		const have = 5;
		const want = 'F';
	
		expect(getColumnIndex(have)).toBe(want);
	});
	
	it('returns the expected column index from an integer greather than 25', () => {
		const have = 26;
		const want = 'AA';
	
		expect(getColumnIndex(have)).toBe(want);
	});

	it('returns the second lap for column number 52', () => {
		const have = 52;
		const want = 'BA';
	
		expect(getColumnIndex(have)).toBe(want);
	});
});
