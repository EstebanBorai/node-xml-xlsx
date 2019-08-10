import toOneLine from '../../src/utils/toOneLine';

it('removes whitespaces and returns cleaned string', () => {
	const have = ' something is wrong with this line ';
	const want = 'somethingiswrongwiththisline';

	expect(toOneLine(have)).toBe(want);
});
