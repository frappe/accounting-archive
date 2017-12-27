import walk from 'walk';
import path from 'path';
import { slug } from './utils';
import frappe from '../frappe';
import process from 'process';

export class Models {
	constructor() {
		this.data = {};
		this.setup_path_map();
	}

	get(doctype, name) {
		if (!this.data[doctype]) {
			this.data[doctype] = {};
		}
		if (!this.data[doctype][name]) {
			this.data[doctype][name] = require(this.path_map[slug(doctype)][slug(name)]);
		}
		return this.data[doctype][name];
	}

	setup_path_map() {
		const cwd = process.cwd();
		this.path_map = {};
		for (let app_name of frappe.config.apps) {
			let start = path.resolve(cwd, app_name, 'models');
			walk.walkSync(start, {
				listeners: {
					file: (basepath, file_data, next) => {
						if (file_data.name.endsWith('.json')) {
							const doctype = path.basename(path.dirname(basepath));
							const name = path.basename(basepath);

							if (!this.path_map[doctype]) {
								this.path_map[doctype] = {};
							}

							this.path_map[doctype][name] = path.resolve(basepath, file_data.name);
						}
						next();
					}
				}
			})
		}
	}
}