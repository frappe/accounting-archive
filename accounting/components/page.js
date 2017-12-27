import './page.css';
import { Component, wire } from 'hyperhtml';

import Button from './button';

export default class Page extends Component {
    get defaultState() {
        return {
            title: 'Page',
            primary_action: null, // { label, action }
            secondary_action: null, // { label, action }
            menu_items: [
                // { label, action }
            ],
            side_section: null,
            main_section: null
        }
    }

    constructor(opts) {
        super();
        this.setState(opts);
    }

    get_primary_button() {
        if (this.state.primary_action) {
            return new Button({
                label: this.state.primary_action.label,
                action: this.state.primary_action.action,
                is_primary: true
            });
        }
    }

    get_secondary_button() {
        if (this.state.secondary_action) {
            return  new Button({
                label: this.state.secondary_action.label,
                action: this.state.secondary_action.action
            });
        }
    }

    get_menu_dropdown() {
        if (this.state.menu_items.length === 0) return;

        return wire()`
            <div class="dropdown is-right is-hoverable">
                <div class="dropdown-trigger">
                    <button class="button">
                        <span>Menu</span>
                        <span class="icon is-small">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        ${this.state.menu_items.map(
                            item => wire(item)`
                                <a class="navbar-item" onclick=${item.action}>
                                    ${item.label}
                                </a>
                            `
                        )}
                    </div>
                </div>
            </div>
        `;
    }

    get_main_section() {
        if (!this.state.main_section) return;
        return this.html`
            <main class="column">
                ${this.state.main_section}
            </aside>
        `;
    }

    get_side_section() {
        if (!this.state.side_section) return;
        return this.html`
            <aside class="menu column is-one-fifth">
                ${this.state.side_section}
            </aside>
        `;
    }

    render() {
        return this.html`
            <section class="page-container" data-page-container>
                <header class="page-head">
                    <div class="">
                        <nav class="level">
                            <div class="level-left">
                                <div class="page-title">
                                    <h1 class="title">${this.state.title}</h1>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="">
                                    <div class=" page-actions">
                                        ${this.get_menu_dropdown()}
                                        ${this.get_secondary_button()}
                                        ${this.get_primary_button()}
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                <div class="page-body">
                    <div class="">
                        <div class="columns">
                            ${this.get_main_section()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}