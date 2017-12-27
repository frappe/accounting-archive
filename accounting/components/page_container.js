import { Component, wire } from 'hyperhtml';

class PageContainer extends Component {
    get defaultState() {
        return {
            active_page: null
        }
    }

    constructor() {
        super();
        this.pages = {};
    }

    make_page(page_name, page) {
        this.pages[page_name] = page;
    }

    show(page_name, page) {
        if (page) {
            this.make_page(page_name, page);
        }
        this.setState({
            active_page: this.pages[page_name]
        });
    }

    render_page() {
        if (!this.state.active_page) {
            return 'Nothing to show';
        }
        return this.state.active_page;
    }

    render() {
        return this.html`
            ${this.render_page()}
        `;
    }
}

export default new PageContainer;