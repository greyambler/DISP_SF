import React from 'react';

import { createGuid, get_Num } from '../core/core_Function.jsx'


export default class two_coll extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let text = get_Num(this.props.el, this.props._Debuge_Show_Crit);
        /* let style_TD = {
            background: 'white',
            minWidth: '90px',
            Width: '90px',
            maxWidth: '90px',
        } */

        if (this.props._Debuge_Show_Code) {
            return (
                <>
                    <td key={createGuid()} id='style_TD'>
                        {this.props.el.isMain ? (
                            text + " [ " + this.props.el.type + " / " + this.props.el.main_type + " ]"
                        ) : (
                                <></>
                            )
                        }
                    </td>
                    <td key={createGuid()} id='style_TD'>
                        {!this.props.el.isMain ? (
                            text + " [ " + this.props.el.type + " / " + this.props.el.main_type + " ]"
                        ) : (
                                <></>
                            )
                        }
                    </td>
                </>
            );
        } else {
            return (<>
                <td key={createGuid()} id='style_TD'>
                    {this.props.el.isMain ? (
                        text
                    ) : (
                            <></>
                        )
                    }
                </td>
                <td key={createGuid()} id='style_TD' width="20px">
                    {!this.props.el.isMain ? (
                        text
                    ) : (
                            <></>
                        )
                    }
                </td>
            </>
            );
        }
    }
}