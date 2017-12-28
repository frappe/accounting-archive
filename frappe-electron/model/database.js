import fs from 'fs';
import path from 'path';
import SQL from 'sql.js';

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
		let meta = frappe.get_meta(doctype);
		let columns = [];

		// add standard fields
		let fields = frappe.model.standard_fields;
		if (meta.istable) {
			fields = fields.concat(model.child_fields);
		}

		// add model fields
		fields = fields.concat(meta.fields);

		for (let df of fields) {
			if (frappe.model.type_map[df.fieldtype]) {
				columns.push(`${df.fieldname} ${frappe.model.type_map[df.fieldtype]} ${df.reqd ? "not null" : ""} ${df.default ? ("default " + frappe.utils.sqlescape(df.default)) : ""}`);
			}
		}

		const query = `CREATE TABLE IF NOT EXISTS ${frappe.utils.slug(doctype)} (
			${columns.join(", ")})`;

		return this.sql(query);
	}

	sql(query, opts={}) {
		//console.log(query);
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