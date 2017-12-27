import assert from 'assert';
import Document from '../model/document.js';

describe('Document', () => {
	before(function() {
		frappe.init();
	});

	it('should get a value', () => {
		assert.equal(test_doc().get('description'), 'testing 1');
	});

	it('should set a value', () => {
		let doc = test_doc();
		doc.set('description', 'testing 1')
		assert.equal(doc.get('description'), 'testing 1');
	});

	it('should not allow incorrect Select option', () => {
		let doc = test_doc();
		assert.throws(
			() => {
				doc.set('status', 'Illegal');
			},
			frappe.ValueError
		);
	});

});

const test_doc = () => {
	return new Document({
		doctype: 'ToDo',
		status: 'Open',
		description: 'testing 1'
	});
}