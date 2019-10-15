import { get_Num } from '../core/core_Function.jsx'

import React from 'react';

export default class single_coll extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let text = get_Num(this.props.el, this.props._Debuge_Show_Crit);
        if (this.props._Debuge_Show_Code) {
            if (this.props.el.crit != "----" && this.props.el.crit != null) {
                text = text + " {" + this.props.el.crit + "}";
            }
            return (
                <>{text + " [ " + this.props.el.key + " / " + this.props.el.main_type + " ]"}</>
            );
        } else {
            return (<>{text}</>);
        }
    }
}