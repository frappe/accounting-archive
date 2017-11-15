import { remote } from 'electron';

let frappe = {};
frappe.user_directory = remote.app.getAppPath('userData');
window.frappe = frappe;

export default frappe;