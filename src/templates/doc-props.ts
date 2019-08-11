import { toOneLine } from '../utils';

enum DocLang {
 EN = 'en-US'
}

interface IDocCore {
	createdAt: Date;
	language: DocLang;
	modifiedAt: Date;
}

/**
 * App.xml contains information about the content of the file.
 * 
 * https://wiki.fileformat.com/specification/spreadsheet/xlsx/
 */
export const app = () => toOneLine(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties 
	xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
	xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
>
	<TotalTime>84507</TotalTime>
</Properties>
`);

/**
 * The core.xml contains information like author, date created and saved, and modified.
 * 
 * https://wiki.fileformat.com/specification/spreadsheet/xlsx/
 */
export const core = (docProps: IDocCore) => toOneLine(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties
	xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:dcterms="http://purl.org/dc/terms/"
	xmlns:dcmitype="http://purl.org/dc/dcmitype/"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>
	<dcterms:created xsi:type="dcterms:W3CDTF">${docProps.createdAt.toISOString()}</dcterms:created>
	<dc:language>${docProps.language}</dc:language>
	<dcterms:modified xsi:type="dcterms:W3CDTF">${docProps.modifiedAt.toISOString()}</dcterms:modified>
	<cp:revision>1</cp:revision>
</cp:coreProperties>
`);
