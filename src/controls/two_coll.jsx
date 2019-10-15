import React from 'react';
import { createGuid, get_Num} from '../core/core_Function.jsx'


export default class two_coll extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let text = get_Num(this.props.el, this.props._Debuge_Show_Crit);
        if (this.props._Debuge_Show_Code) {
            return (
                <>
                    <td key={createGuid()} >
                        {this.props.el.isMain ? (
                            text + " [ " + this.props.el.key + " ]"
                        ) : (
                                <></>
                            )
                        }
                    </td>
                    <td key={createGuid()}>
                        {!this.props.el.isMain ? (
                            text + " [ " + this.props.el.key  + " ]"
                        ) : (
                                <></>
                            )
                        }
                    </td>
                </>
            );
        } else {
            return (<>
                <td key={createGuid()} >
                    {this.props.el.isMain ? (
                        text
                    ) : (
                            <></>
                        )
                    }
                </td>
                <td key={createGuid()}>
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