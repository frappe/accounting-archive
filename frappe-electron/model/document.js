import frappe from '../frappe';

export default class Document {
	constructor(data, name) {
		Object.assign(this, data);
	}

	get(key) {
		return this[key];
	}

	set(key, value) {
		this.validate_field(key, value);
		this[key] = value;
	}

	append(key, document) {
		if (!this[key]) {
			this[key] = [];
		}
		this[key].push(this.init_doc(document));
	}

	init_doc(data) {
		if (data.prototype instanceof Document) {
			return data;
		} else {
			return new Document(d);
		}
	}

	validate_field(key, value) {
		let df = frappe.get_meta(this.doctype).get_field(key);
		if (df.fieldtype=='Select') {
			let options = df.options.split('\n');
			if (!options.includes(value)) {
				throw new frappe.ValueError(`${value} must be one of ${options.join(", ")}`);
			}
		}
	}

	validate() {

	}
};