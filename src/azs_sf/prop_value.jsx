import React from 'react';

import { demoAsyncCall, createGuid, WhatKeyNotShow, getColor_Crit } from '../core/core_Function.jsx'


export default class prop_value extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*        return (
                    <>{this.props.prop_value}</>
                );
    
                {this.getStyle(this.props.el)}
                 id="s_table"
                */
        if (this.props.prop_value == "" || this.props.prop_value == " " || this.props.prop_value == "_") {
            return (<></>);
        } else {

            let _bgcolor = 'white';
            if (this.props.el.crit != null) {
                let Crit = parseInt(this.props.el.crit);
                if (!isNaN(Crit)) {
                    _bgcolor = getColor_Crit(Crit);
                }
            }
            return (
                <table id="s_table" bgcolor={_bgcolor} >
                    <tbody>
                        <tr>
                            <td >{this.props.prop_value}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
}