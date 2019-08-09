import { toOneLine } from '../utils';

type BodyString = string | number;

export const header = (count: number) => toOneLine(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${count}">`
);

export const bodyString = (value: BodyString) => toOneLine(`
<si>
	<t>${value}</t>
</si>`
);

export const footer = `</sst>`;
