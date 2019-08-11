import { toOneLine } from '../utils';

interface ISharedStrings {
	fromString: (value: string) => number;
	build: () => string;
}

interface IStringMap {
	[s: string]: number
}

class SharedStrings implements ISharedStrings {
	private stringMap: IStringMap;
	private totalStrings: number;

	constructor() {
		this.stringMap = {};
		this.totalStrings = 0;
	}

	/**
	 * 
	 * @param value - String to track or gather from shared strings
	 * 
	 * fromString appends `value` to the `stringMap` if `value`
	 * doesn't exists in the `stringMap` and returns it index.
	 * 
	 * Otherwise returns the index of the given string.
	 * 
	 */
	public fromString(value: string): number {
		if (this.stringMap[value] === undefined) {
			this.stringMap[value] = this.totalStrings;
			this.totalStrings++;

			return this.stringMap[value];
		}

		return this.stringMap[value];
	}

	/**
	 * Build the `sharedStrings.xml` file from the current `stringMap`,
	 * returns the XML string.
	 * 
	 */
	public build(): string {
		const stringsArray = Object.keys(this.stringMap);
		let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;

		xml += `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" uniqueCount="${stringsArray.length}">`;
		xml += stringsArray.map((str) => `<si><t>${str}</t></si>`).join('');
		xml += `</sst>`;

		return toOneLine(xml);
	}
}

export default SharedStrings;
