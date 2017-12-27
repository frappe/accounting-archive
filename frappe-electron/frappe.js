import { remote } from 'electron';
import { FileStorage } from './model/file_storage';

let frappe = {};

Object.assign(frappe, {
    user_directory: remote.app.getAppPath('userData'),
	init() {
		if (this._initialized) return;
		this.init_config();
		this.init_errors();
		this.init_globals();
		this.storage = new FileStorage();
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
	get_meta(doctype) {
		let meta = require('./model/meta');

		if (!this.meta_cache[doctype]) {
			this.meta_cache[doctype] = new meta.Meta(frappe.storage.get('DocType', doctype));
		}
		return this.meta_cache[doctype];
	}
});

window.frappe = frappe;
export default frappe;