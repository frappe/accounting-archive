import { Component } from 'hyperhtml';

export default class Data extends Component {
    get defaultState() {
        return {
            fieldtype: 'Data',
            label: '',
            placeholder: '',
            value: ''
        }
    }

    constructor(df) {
        super();
        this.setState(df);
    }

    set_value(value) {
        this.setState({ value });
    }

    get_value() {
        return this.state.value;
    }

    field_html() {
        const df = this.state;
        return this.html`
            <input
                class="input"
                type="text"
                placeholder="${df.placeholder}"
                value=${df.value}
            >
        `;
    }

    render() {
        const df = this.state;
        return this.html`
            <div class="field">
                <label class="label">${df.label}</label>
                <div class="control">
                    ${this.field_html()}
                </div>
            </div>
        `;
    }
}
