import assert from 'assert';
import frappe from '../frappe';

describe('Models', () => {
	before(function() {
		frappe.init();
	});

	it('should get todo json', () => {
		let todo = frappe.models.get('DocType', 'ToDo');
		assert.equal(todo.issingle, 0);
	});
});