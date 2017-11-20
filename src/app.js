import '../node_modules/bulma/css/bulma.css';
import hyperhtml, { Component } from 'hyperhtml';

import frappe from './frappe';
import Database from './db';
import Navbar from './components/navbar';
import Page from './components/page';
import ListView from './views/list';
import FormView from './views/form';

export default class App extends Component {
    get defaultState() {
        return {
            pages: []
        }
    }

    constructor() {
        super();
        this.wrapper = document.querySelector('#app');
        this.html = hyperhtml.bind(this.wrapper);
    }

    start() {
        this.render();
        this.init_db();
        this.init_navbar();
        this.init_body();
    }

    init_db() {
        frappe.db = new Database();
        frappe.db.init();
    }

    init_navbar() {
        frappe.navbar = new Navbar();
    }

    init_body() {
        const data = frappe.db.sql('Select * from ToDo', { as_list: 1 });
        // const list = new ListView({
        //     title: 'ToDos',
        //     doctype: 'ToDo',
        //     data: {
        //         columns: data.columns,
        //         rows: data.values
        //     }
        // });
        const list = new FormView({
            title: 'ToDos',
            fields: [
                { fieldtype: 'Data', label: 'Name' },
                { fieldtype: 'Text', label: 'Description' },
            ]
        });


        const { pages } = this.state;
        pages.push(list);
        this.setState({ pages });
    }

    render() {
        this.html`
            <header>
                ${frappe.navbar}
            </header>
            <section>
                ${this.state.pages}
            </section>
        `;
    }
}

const app = new App();
app.start();

