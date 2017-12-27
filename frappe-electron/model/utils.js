export function slug(text) {
	return text.toLowerCase().replace(/ /g, '_');
}

export function sqlescape(text) {
	return text.replace(/'/g, '\'').replace(/"/g, '\"');
}