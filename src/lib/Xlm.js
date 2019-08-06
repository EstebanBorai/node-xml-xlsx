function Xlm() {
	this.doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
}

function parseAttributes(attrs) {
	const attrNames = Object.keys(attrs);

	return attrNames.map((attr) => `${attr}="${attrs[attr]}"`);
}

Xlm.prototype.tag = function (tag, attrs, children) {
	let line = `<${tag} `;

	if (attrs) {
		// If any attribute is given, set attributes to the XML tag
		line += `${parseAttributes(attrs)} `;
	}

	if (children) {
		line += `>${children}</${tag}>`;
	} else {
		line += `/>`;
	}

	return line;
}

Xlm.prototype.commit = function(tag) {
	this.doc += tag;
}

export default Xlm;
