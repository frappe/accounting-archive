import frappe from '../frappe';

export class Document {
	constructor(data) {
		Object.assign(this, data);
	}

	get(key) {
		return this[key];
	}

	set(key, value) {
		this.validate_field(key, value);
		this[key] = value;
	}

	set_name() {
		// assign a random name by default
		// override this to set a name
		if (!this.name) {
			this.name = Math.random().toString(36).substr(3);
		}
	}

	get meta() {
		if (!this._meta) {
			this._meta = frappe.get_meta(this.doctype);
		}
		return this._meta;
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

	validate_field (key, value) {
		let df = this.meta.get_field(key);
		if (df.fieldtype=='Select') {
			this.meta.validate_select(df, value);
		}
	}

	validate() {
	}

	get_valid_dict() {
		let doc = {};
		for(let df of this.meta.get_valid_fields()) {
			doc[df.fieldname] = this.get(df.fieldname);
		}
		return doc;
	}

	set_standard_values() {
		let now = new Date();
		if (this.docstatus === null || this.docstatus === undefined) {
			this.docstatus = 0;
		}
		if (!this.owner) {
			this.owner = frappe.session.user;
			this.creation = now;
		}
		this.modified_by = frappe.session.user;
		this.modified = now;
	}

	load() {
		let doc = frappe.db.sql(`select * from ${frappe.utils.slug(this.doctype)} where name = ${frappe.utils.sqlescape(this.name)}`);
		Object.assign(this, doc[0]);
	}

	insert() {
		this.set_name();
		this.set_standard_values();
		let doc = this.get_valid_dict();
		frappe.db.sql(`insert into ${frappe.utils.slug(this.doctype)}
			(${Object.keys(doc).join(", ")})
			values (${Object.values(doc).map(d => frappe.utils.sqlescape(d)).join(", ")})`);
	}

	update() {
		this.set_standard_values();
		let assigns = [];
		for (let key of this.meta.get_valid_keys()) {
			assigns.push(`${key} = ${frappe.utils.sqlescape(this.get(key))}`);
		}
		frappe.db.sql(`update ${frappe.utils.slug(this.doctype)}
			set ${assigns.join(", ")}`);
	}
};