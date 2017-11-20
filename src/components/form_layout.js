import { Component, wire } from 'hyperhtml';
import Data from '../controls/data';
import Text from '../controls/text';

export default class FormLayout extends Component {
    get defaultState() {
        return {
            fields: []
        }
    }

    constructor(opts) {
        super();
        this.setState(opts);
    }

    get_field(df) {
        const fieldmap = {
            Data,
            Text
        };

        const control = new fieldmap[df.fieldtype](df);
        return control;
    }

    render() {
        const { fields } = this.state;
        return fields.map(this.get_field);
    }
}