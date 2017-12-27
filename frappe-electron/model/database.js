import fs from 'fs';
import path from 'path';
import SQL from 'sql.js';
import { slug, sqlescape } from './utils';

import frappe from '../frappe';

export class Database {
	constructor(db_path) {
		this.db_file_name = db_path;
		this.connect();
	}

	connect() {
		if (this.db_path) {
			const filebuffer = fs.readFileSync(this.db_path);
			this._conn = new SQL.Database(filebuffer);
		} else {
			this._conn = new SQL.Database();
		}
	}

	write() {
		if (this.db_path) {
			let data = this._conn.export();
			fs.writeFileSync(this.db_path, new Buffer(data));
		}
	}

	close() {
		this.write();
		this._conn.close();
	}

	create_db() {
		// Create a database.
		let db = new SQL.Database();
		let query = SCHEMA;
		let result = db.exec(query);
		if (Object.keys(result).length === 0 &&
			typeof result.constructor === 'function') {
			return db;
		} else {
			return null;
		}
	}

	create_table(doctype) {
		let model = require('./index');
		let meta = frappe.get_meta(doctype);
		let columns = [];

		// add standard fields
		let fields = model.standard_fields;
		if (meta.istable) {
			fields.concat(model.child_fields);
		}

		// add model fields
		fields.concat(meta.fields);

		for (let df of fields) {
			if (type_map[df.fieldtype]) {
				columns.push(`${df.fieldname} ${type_map[df.fieldtype]} ${df.reqd ? "not null" : ""} ${df.default ? ("default '" + sqlescape(df.default) + "'") : ""}`)
			}
		}

		const query = `CREATE TABLE ${slug(doctype)} (
			${columns.join(", ")})`;

		return this.sql(query);
	}

	sql(query, opts={}) {
		const result = frappe.db._conn.exec(query);
		if (result.length > 0) {
			if (opts.as_list)
				return result[0];
			else
				return sql_result_to_obj(result[0]);
		}
		return null;
	}
}

const type_map = {
	'Currency':		'real'
	,'Int':			'integer'
	,'Float':		'real'
	,'Percent':		'real'
	,'Check':		'integer'
	,'Small Text':	'text'
	,'Long Text':	'text'
	,'Code':		'text'
	,'Text Editor':	'text'
	,'Date':		'text'
	,'Datetime':	'text'
	,'Time':		'text'
	,'Text':		'text'
	,'Data':		'text'
	,'Link':		'text'
	,'Dynamic Link':'text'
	,'Password':	'text'
	,'Select':		'text'
	,'Read Only':	'text'
	,'Attach':		'text'
	,'Attach Image':'text'
	,'Signature':	'text'
	,'Color':		'text'
	,'Barcode':		'text'
	,'Geolocation':	'text'
}

function sql_result_to_obj(result) {
	const columns = result.columns;
	return result.values.map(row => {
		return columns.reduce((res, col, i) => {
			res[col] = row[i];
			return res;
		}, {});
	})
}

export default Database;