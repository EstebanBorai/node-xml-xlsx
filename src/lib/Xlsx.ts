import fs from 'fs';
import Archiver, { Archiver as IArchiver } from 'archiver';
import {} from '../templates';

export interface IXlsx {
	archive: IArchiver;
}

class Xlsx implements IXlsx {
	public archive: IArchiver;

	constructor() {
		this.archive = Archiver('zip');
	}

	template.
}

export default Xlsx;
