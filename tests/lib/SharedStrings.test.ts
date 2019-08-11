import SharedStrings from '../../src/lib/SharedStrings';

describe('lib :: SharedStrings', () => {
	let sharedStrings: SharedStrings;
	
	beforeEach(() => {
		sharedStrings = new SharedStrings();
	});

	it('initializes stringsMap and totalStrings', () => {
		expect.assertions(2);

		const stringMap = sharedStrings['stringMap'];
		const totalStrings = sharedStrings['totalStrings'];

		expect(stringMap).toEqual({});
		expect(totalStrings).toBe(0);
	});
});

describe('lib :: SharedStrings :: fromString', () => {
	let sharedStrings: SharedStrings;
	
	beforeEach(() => {
		sharedStrings = new SharedStrings();
	});

	it('the first string is indexed as 0', () => {
		const stringIndex = sharedStrings.fromString('foo');
		expect(stringIndex).toBe(0);
	});

	it('appends a new string if it doesnt exists', () => {
		sharedStrings.fromString('foo');
		const stringIndex = sharedStrings.fromString('bar');

		expect(stringIndex).toBe(1);
	});

	it('returns the index of a existent string', () => {
		expect.assertions(6);

		const indexes = {
			boo: 0,
			bar: 1,
			loop: 2,
			foo: 3
		}

		expect(sharedStrings.fromString('boo')).toBe(indexes.boo);
		expect(sharedStrings.fromString('bar')).toBe(indexes.bar);
		expect(sharedStrings.fromString('loop')).toBe(indexes.loop);
		expect(sharedStrings.fromString('foo')).toBe(indexes.foo);
		expect(sharedStrings.fromString('boo')).toBe(indexes.boo);
		expect(sharedStrings.fromString('loop')).toBe(indexes.loop);
	});
});

describe('lib :: SharedStrings :: build', () => {
	let sharedStrings: SharedStrings;
	
	beforeEach(() => {
		sharedStrings = new SharedStrings();
	});

	it('creates a sharedStrings.xml file', () => {
		sharedStrings.fromString('today');
		sharedStrings.fromString('tomorrow');
		sharedStrings.fromString('today');

		const have = sharedStrings.build();
		const want = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><sst xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" uniqueCount=\"2\"><si><t>today</t></si><si><t>tomorrow</t></si></sst>`;

		expect(have).toBe(want);
	});
});
