import Archiver, { Archiver as IArchiver } from 'archiver';

export interface IXlsx {
	archive: IArchiver;
}

class Xlsx implements IXlsx {
	public archive: IArchiver;

	constructor() {
		this.archive = Archiver('zip');
	}
}

export default Xlsx;
