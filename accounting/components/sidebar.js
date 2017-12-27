import { Component, wire } from 'hyperhtml';
import PageContainer from '../components/page_container';
import ListView from '../views/list';

class Sidebar extends Component {
    get defaultState() {
        return {
            active: null,
            nav_items: this.get_nav_items()
        }
    }

    get_nav_items() {
        const get_list_view = view => {
            return new ListView({
                title: view + ' List',
                columns: ['ID', 'Customer Name', 'Customer Group'],
                rows: [['CUST00001', 'Rohit Vakani', 'Plan 25'],
                    ['CUST00002', 'Amit Malani', 'Plan 20'],
                    ['CUST00003', 'Vikar Grover', 'Plan 25']]
            })
        }
        return [
            {label: 'Dashboard', action: () => PageContainer.show('Dashboard')},
            {label: 'Customers', action: () => PageContainer.show('Customer', get_list_view('Customer'))},
            {label: 'Invoices', action: () => PageContainer.show('Invoice', get_list_view('Invoice'))}
        ]
    }

    set_active(label) {
        this.setState({
            active: label
        })
    }

    nav_items() {
        const _class = item => this.state.active === item.label ? 'is-active' : '';
        return this.state.nav_items.map(item =>
            wire(item)`<li>
                <a class="${_class(item)}" onclick=${() => this.nav_item_click(item)}>${item.label}</a>
            </li>`
        );
    }

    nav_item_click(item) {
        item.action();
    }

    render() {
        return this.html`
            <aside class="menu">
                <ul class="menu-list">
                    ${this.nav_items()}
                </ul>
            </aside>
        `;
    }
}

export default new Sidebar;