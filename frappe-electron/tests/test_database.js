import assert from 'assert';
import frappe from '../frappe';

describe('Document', () => {
	before(function() {
		frappe.init();
	});

	it('should create a table', () => {
		frappe.db.create_table('ToDo');
		frappe.db.write();
	});
});