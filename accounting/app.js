import '../node_modules/bulma/css/bulma.css';
import hyperhtml, { Component } from 'hyperhtml';

import frappe from '../frappe-electron/frappe';

import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import PageContainer from './components/page_container';

import ListView from './views/list';
import FormView from './views/form';

import Dashboard from './views/dashboard';

import './app.css';

import process from 'process';

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
        this.init_body();
    }

    init_body() {
        PageContainer.make_page('Dashboard', Dashboard);
        PageContainer.show('Dashboard');
    }

    render() {
        this.html`
            ${Navbar}
            <div class="app-container">
                ${Sidebar}
                <main>
                    ${PageContainer}
                </main>
            </div>
        `;
    }
}

const app = new App();
app.start();

