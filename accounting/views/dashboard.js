import './list.css';
import { Component, wire } from 'hyperhtml';
import Page from '../components/page';
import Sidebar from '../components/sidebar';

class Dashboard extends Page {
    get defaultState() {
        const state = super.defaultState;
        return Object.assign(state, {
            title: 'Dashboard',
            main_section: this.body()
        });
    }

    constructor(opts) {
        super(opts);
        Sidebar.set_active('Dashboard');
    }

    body() {
        return this.html`
            <h1>Hi there</h1>
        `;
    }
}

export default new Dashboard;