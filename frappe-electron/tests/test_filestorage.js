import assert from 'assert';
import frappe from '../frappe';

describe('FileStorage', () => {
	before(function() {
		frappe.init();
	});

	it('should get todo json', () => {
		let todo = frappe.storage.get('DocType', 'ToDo');
		assert.equal(todo.issingle, 0);
	});
});