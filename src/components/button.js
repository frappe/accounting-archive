import { Component } from 'hyperhtml';

export default class Button extends Component {
    get defaultState() {
        return {
            label: 'Button',
            action: () => {},
            is_primary: false
        }
    }

    constructor(opts) {
        super();
        this.setState(opts);
    }

    onclick(e) {
        this.state.action();
    }

    render() {
        const classes = [
            'button',
            this.state.is_primary ? 'is-primary' : ''
        ].join(' ');

        return this.html`
            <button class="${classes}" onclick=${this}>
                ${this.state.label}
            </button>
        `;
    }
}