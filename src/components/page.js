import './page.css';
import { Component, wire } from 'hyperhtml';

import Button from './button';

export default class Page extends Component {
    get defaultState() {
        return {
            title: 'Page',
            primary_action_label: 'Primary',
            primary_action: () => {},
            secondary_action_label: 'Secondary',
            secondary_action: () => {},
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
        if (this.state.primary_action && this.state.primary_action_label) {
            return new Button({
                label: this.state.primary_action_label,
                action: this.state.primary_action,
                is_primary: true
            });
        }
    }

    get_secondary_button() {
        if (this.state.secondary_action && this.state.secondary_action_label) {
            return  new Button({
                label: this.state.secondary_action_label,
                action: this.state.secondary_action
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

    render() {
        return this.html`
            <section class="page-container" data-page-container>
                <header class="page-head">
                    <div class="container">
                        <nav class="navbar">
                            <div class="navbar-brand">
                                <div class="navbar-item page-title">
                                    <h1 class="title">${this.state.title}</h1>
                                </div>
                            </div>
                            <div class="navbar-menu">
                                <div class="navbar-end">
                                    <div class="navbar-item page-actions">
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
                    <div class="container">
                        <div class="columns">
                            <aside class="menu column is-one-fifth">
                                ${this.state.side_section}
                            </aside>
                            <main class="column">
                                ${this.state.main_section}
                            </main>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}