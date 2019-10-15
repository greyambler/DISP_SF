import React from 'react';

import { createGuid, WhatKeyNotShow } from '../core/core_Function.jsx'
import Single_Coll from '../controls/single_coll.jsx'
import Two_Coll from '../controls/two_coll.jsx'

const _Debuge = false;

export default class w_table_azs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list_book: this.props.list_book,
            list_azs: this.props.list_azs,

        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        if (this.props.list_azs != prevProps.list_azs) {
            this.setState({ list_azs: this.props.list_azs });
        }
    }

    getStyle_PL_ss(Crit) {
        switch (Crit) {
            case 0: {
                return {
                    background: 'white',
                    textAlign: 'center',
                    minWidth: '120px',
                    maxWidth: '120px',
                    fontSize: 14,
                }
                break;
            }
            case 1: {
                return {
                    background: 'white',
                    textAlign: 'center',
                    minWidth: '120px',
                    maxWidth: '120px',
                    fontSize: 14,
                }
                break;
            }
            case 2: {
                return {
                    background: 'yellow',
                    textAlign: 'center',
                    minWidth: '120px',
                    maxWidth: '120px',
                    fontSize: 14,
                }
                break;
            }
            case 3: {
                return {
                    background: 'hotpink',
                    textAlign: 'center',
                    minWidth: '120px',
                    maxWidth: '120px',
                    fontSize: 14,
                }
                break;
            }
        }
    }
    getStyle_PL(Crit) {
        let _background = 'white';
        switch (Crit) {
            case 1: { _background = 'white'; break; }
            case 2: { _background = 'yellow'; break; }
            case 3: { _background = 'hotpink'; break; }
            default: { _background = 'white'; break; }
        }
        return {
            background: _background,
            textAlign: 'center',
            minWidth: '120px',
            //fontSize: 14,
            //maxWidth: '120px',
        }
    }

    getStyle(el) {
        let style = {
            background: 'white',
            minWidth: '120px',
            maxWidth: '120px',
            textAlign: 'center',
        }
        if (el.crit != null) {
            let Crit = parseInt(el.crit);
            if (!isNaN(Crit)) {
                style = this.getStyle_PL(Crit);
            }
        }
        return style;
    }



    render() {
        let style_TD = {
            minWidth: '120px',
            textAlign: 'center',
        }
        if (this.state.list_book != null && this.state.list_azs != null) {
            return (
                <div>
                    <table>
                        <tbody>
                            {
                                this.state.list_book.map(el =>
                                    (WhatKeyNotShow(el.key)) &&
                                    (
                                        (el.isDVC)
                                            ? (
                                                <tr key={createGuid()}>
                                                    <Two_Coll el={el} _Debuge_Show_Code={this.props._Debuge_Show_Code} />

                                                    {this.state.list_azs != null &&
                                                        this.state.list_azs.map((el_azsS, n) => (
                                                            el_azsS.map(el_azs => (
                                                                (el.key == el_azs.key && el.type == el_azs.type) &&
                                                                <td key={createGuid()} colSpan={el_azs.ColSpan} //style={style_TD}
                                                                    style={this.getStyle(el_azs)}>
                                                                    <Single_Coll el={el_azs}
                                                                        _Debuge_Show_Code={this.props._Debuge_Show_Code}
                                                                        _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                                                                    />
                                                                </td>
                                                            ))
                                                        ))}
                                                </tr>
                                            )
                                            : (
                                                <tr key={createGuid()}>
                                                    <td key={createGuid()} colSpan='2' style={style_TD}>
                                                        {/*нулевая колонка*/}
                                                        <Single_Coll el={el}
                                                            _Debuge_Show_Code={this.props._Debuge_Show_Code}
                                                            _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                                                        />
                                                    </td>


                                                    {this.state.list_azs != null &&
                                                        this.state.list_azs.map((el_azsS, n) => (
                                                            el_azsS.map(el_azs => (
                                                                (el.key == el_azs.key && el.type == el_azs.type) &&
                                                                <td key={createGuid()} colSpan={el_azs.ColSpan} //style={style_TD}
                                                                    style={this.getStyle(el_azs)}>
                                                                    <Single_Coll el={el_azs}

                                                                        _Debuge_Show_Code={this.props._Debuge_Show_Code}
                                                                        _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                                                                    />
                                                                </td>
                                                            ))
                                                        ))}
                                                </tr>
                                            )
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (<h2> Нет данных.</h2>);
        }
    }
}
