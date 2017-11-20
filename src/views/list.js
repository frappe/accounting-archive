import './list.css';
import { Component, wire } from 'hyperhtml';
import Page from '../components/page';

export default class ListView extends Component {
    get defaultState() {
        return {
            title: 'List',
            data: {
                columns: [],
                rows: []
            }
        }
    }

    constructor(opts) {
        super();
        this.page = new Page();
        this.setState(opts);
        this.page.setState({
            title: this.state.title,
            primary_action: {
                label: 'New',
                action: console.log
            },
            secondary_action: {
                label: 'Refresh',
                action: console.log
            },
            main_section: this.list_template(),
            side_section: this.sidebar_template()
        });
    }

    list_template() {
        const body = this.get_list_body();

        return this.html`
            <section>
                ${this.get_action_area()}
                <table class="table is-bordered is-striped is-hoverable is-fullwidth">
                    ${this.get_list_head()}
                    ${this.get_list_body()}
                </table>
            </section>
        `;
    }

    get_action_area() {
        return this.html`
            <div class="filter-container">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            ${this.get_filter_area()}
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            ${this.get_sort_dropdown()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    get_filter_area() {
        return this.html`
            <div class="field has-addons">
                <p class="control">
                <input class="input" type="text" placeholder="Filter">
                </p>
                <p class="control">
                <button class="button">
                    Search
                </button>
                </p>
            </div>
        `;
    }

    get_sort_dropdown() {
        return this.html`
            <div class="dropdown is-hoverable is-right">
                <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Sort By</span>
                    <span class="icon is-small">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                <a href="#" class="dropdown-item">Last Modified</a>
                    <a href="#" class="dropdown-item">Name</a>
                    <a class="dropdown-item">Subject</a>
                    <a href="#" class="dropdown-item">Description</a>
                </div>
                </div>
            </div>
        `;
    }

    get_list_head() {
        const columns = this.state.data.columns.map(c => ({title: c}));
        return this.html`
            <thead>
                <tr>
                ${columns.map(col => wire(col)`
                    <th>${toTitleCase(col.title)}</th>
                `)}
                </tr>
            </thead>
        `;
    }

    onclick(e) {
        console.log(e);
        if (e.target.matches(".list-row-item")) {
            const id = e.target.dataset.rowIndex;
            console.log(id);
        }
    }

    get_list_body() {
        const rows = this.state.data.rows.map(
            r => r.map(c => ({title: c}))
        );

        return this.html`
            <tbody>
                ${rows.map((row, i) => wire(row)`
                    <tr class="list-row-item" data-row-index="${i}" onclick=${this}>
                    ${row.map(cell => wire(cell)`
                        <td>${cell.title}</td>
                    `)}
                    </tr>
                `)}
            </tbody>
        `;
    }

    sidebar_template() {
        return this.html`
            <p class="menu-label">
                Views
            </p>
            <ul class="menu-list">
                <li><a class="is-active">List</a></li>
                <li><a>Report</a></li>
                <li><a>Gantt</a></li>
                <li><a>Calendar</a></li>
            </ul>
        `;
    }

    render() {
        return this.page.render();
    }
}

function toTitleCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}