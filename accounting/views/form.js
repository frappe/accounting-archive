import { Component } from 'hyperhtml';
import Page from '../components/page';
import FormLayout from '../components/form_layout';

export default class FormView extends Component {
    get defaultState() {
        return {
            title: 'New Form 1',
            fields: []
        }
    }

    constructor(opts) {
        super();

        this.page = new Page();
        this.form_layout = new FormLayout();

        this.setState(opts);

        this.form_layout.setState({
            fields: this.state.fields
        });

        this.page.setState({
            title: this.state.title,
            primary_action: {
                label: 'Save',
                action: console.log
            },
            menu_items: [
                { label: 'Delete' },
                { label: 'Duplicate' },
                { label: 'Reload' },
            ],
            side_section: this.side_section(),
            main_section: this.form_layout.render()
        });
    }

    side_section() {
        return this.html`
            <p class="menu-label">
                Assigned To
            </p>
            <ul class="menu-list">
                <li><a>Faris Ansari</a></li>
                <li><a>Assign +</a></li>
            </ul>
            <p class="menu-label">
                Attachments
            </p>
            <ul class="menu-list">
                <li><a>offer.doc</a></li>
            </ul>
        `;
    }

    render() {
        return this.page.render();
    }
}