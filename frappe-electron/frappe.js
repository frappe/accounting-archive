import { remote } from 'electron';

let frappe = {};

Object.assign(frappe, {
	user_directory: remote.app.getAppPath('userData'),
	init(db_path) {
		this.db_path = db_path || 'test.db';
		if (this._initialized) return;
		this.init_config();
		this.init_errors();
		this.init_globals();
		this.init_models();
		this.init_db();
		this._initialized = true;
	},
	init_config() {
		this.config = require("../frappe.json");
	},
	init_errors() {
		this.ValueError = class extends Error { };
	},
	init_globals() {
		this.meta_cache = {};
	},
	init_models() {
		let models = require('./model/models');
		this.models = new models.Models();
	},
	init_db() {
		let database = require('./model/Database');
		this.db = new database.Database(this.db_path);
	},
	get_meta(doctype) {
		let meta = require('./model/meta');

		if (!this.meta_cache[doctype]) {
			this.meta_cache[doctype] = new meta.Meta(frappe.models.get('DocType', doctype));
		}
		return this.meta_cache[doctype];
	}
});

window.frappe = frappe;
export default frappe;