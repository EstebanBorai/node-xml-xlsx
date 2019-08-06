function Xml() {
	this.doc = '';
}

function parseAttributes(attrs) {
	const attrNames = Object.keys(attrs);

	return attrNames.map((attr) => `${attr}="${attrs[attr]}"`);
}

Xml.prototype.tag = function (tag, attrs, children) {
	let line = `<${tag} `;

	if (attrs) {
		// If any attribute is given, set attributes to the XML tag
		line += `${parseAttributes(attrs)} `;
	}

	if (children) {
		if (Array.isArray(children)) {
			line += `>`;
			children.map((child) => {
				line += child;
			});
			line += `</${tag}>`;
		} else {
			line += `>${children}</${tag}>`;
		}
	} else {
		line += `/>`;
	}

	return line;
}

Xml.prototype.commit = function(tag) {
	this.doc += tag;
}

Xml.prototype.get = function() {
	return this.doc;
}

module.exports = Xml;
