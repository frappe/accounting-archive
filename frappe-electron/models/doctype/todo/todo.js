import frappe from '../../../frappe';

export class todo extends frappe.document.Document {
	validate() {
		if (!this.status) {
			this.status = 'Open';
		}
	}
}
