import '../node_modules/bulma/css/bulma.css';
import hyperhtml, { Component } from 'hyperhtml';

import frappe from './frappe';
import Database from './db';
import Navbar from './components/navbar';
import Page from './components/page';

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
        const page = new Page({
            title: 'ERPNext Desktop',
            primary_action_label: 'New',
            secondary_action_label: 'Refresh',
            menu_items: [
                { label: 'Print', action: console.log },
                { label: 'Add to Desktop', action: console.log },
            ],
            side_section: {
                html: `
                    <p class="menu-label">
                        General
                    </p>
                    <ul class="menu-list">
                        <li><a>Dashboard</a></li>
                        <li><a>Customers</a></li>
                    </ul>
                `
            },
            main_section: {
                html: `
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                        <input class="input" type="text" placeholder="Text input">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                        <span class="icon is-small is-left">
                            <i class="fa fa-user"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fa fa-check"></i>
                        </span>
                        </div>
                        <p class="help is-success">This username is available</p>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                        <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fa fa-warning"></i>
                        </span>
                        </div>
                        <p class="help is-danger">This email is invalid</p>
                    </div>

                    <div class="field">
                        <label class="label">Subject</label>
                        <div class="control">
                        <div class="select">
                            <select>
                            <option>Select dropdown</option>
                            <option>With options</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Message</label>
                        <div class="control">
                        <textarea class="textarea" placeholder="Textarea"></textarea>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                        <label class="checkbox">
                            <input type="checkbox">
                            I agree to the <a href="#">terms and conditions</a>
                        </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                        <label class="radio">
                            <input type="radio" name="question">
                            Yes
                        </label>
                        <label class="radio">
                            <input type="radio" name="question">
                            No
                        </label>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                        <button class="button is-link">Submit</button>
                        </div>
                        <div class="control">
                        <button class="button is-text">Cancel</button>
                        </div>
                    </div>
                `
            }
        });
        const { pages } = this.state;
        pages.push(page);
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

