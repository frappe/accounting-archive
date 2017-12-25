import { remote } from 'electron';

let frappe = {};

Object.assign(frappe, {
    user_directory: remote.app.getAppPath('userData')
});

window.frappe = frappe;
export default frappe;