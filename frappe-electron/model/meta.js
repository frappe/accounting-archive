import Document from './document';

export class Meta extends Document {
	constructor(data) {
		super(data);
		this.event_handlers = {};
	}

	get_field(fieldname) {
		if (!this.field_map) {
			this.field_map = {};
			for (let df of this.fields) {
				this.field_map[df.fieldname] = df;
			}
		}
		return this.field_map[fieldname];
	}

	on(key, fn) {
		if (!this.event_handlers[key]) {
			this.event_handlers[key] = [];
		}
		this.event_handlers[key].push(fn);
	}

	trigger(key) {

	}
}

