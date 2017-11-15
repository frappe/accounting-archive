import { Component } from 'hyperhtml';

export default class Navbar extends Component {
    get defaultState() {
        return {

        }
    }

    constructor() {
        super();
        // add helper class for fixed navbar
        document.querySelector('html')
            .classList.add('has-navbar-fixed-top');
    }

    render() {
        return this.html`
            <nav class="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            <img src="https://erpnext.com/assets/frappe_theme/img/erp-icon.svg" width="30">
                        </a>
                    </div>
                    <div class="navbar-menu">
                        <div class="navbar-end">
                            <a class="navbar-item">
                                Home
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}
