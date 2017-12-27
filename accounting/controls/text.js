import Data from './data';

export default class Text extends Data {
    field_html() {
        const df = this.state;
        const textarea = this.html`
            <textarea
                class="textarea"
                placeholder="${df.placeholder}"
                value=${df.value}>
            </textarea>
        `;
        textarea.value = df.value;
        return textarea;
    }
}