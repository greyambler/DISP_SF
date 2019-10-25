import React from 'react';

import { createGuid, WhatKeyNotShow, getColor_Crit } from '../core/core_Function.jsx'
import Single_Coll from '../controls/single_coll.jsx'
import Two_Coll from '../controls/two_coll.jsx'


const _Debuge = false;

export default class w_table_azs extends React.Component {
    constructor(props) {
        super(props);
        this.setFilter = this.setFilter.bind(this);
        this.get_Up = this.get_Up.bind(this);
        this.isShow_Row_Type = this.isShow_Row_Type.bind(this);
        this.state = {
            list_book: this.props.list_book,
            list_azs: this.props.list_azs,


            isPL_View: true,
            isPUMP_View: true,
            isTSO_View: true,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        if (this.props.list_azs != prevProps.list_azs) {
            this.setState({ list_azs: this.props.list_azs });
        }
    }
    getStyle_PL(Crit) {
        let _background = getColor_Crit(Crit);//'white';
        return {
            background: _background,
            textAlign: 'center',
            minWidth: '120px',
            Width: '120px',
            maxWidth: '120px',

            //fontSize: 14,
            //maxWidth: '120px',
        }
    }
    getStyle(el) {
        let style = {
            background: 'white',
            //background: '#F0F0F0',

            //borderWidth: '41',

            minWidth: '120px',
            Width: '120px',
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
    setFilter(isView, type) {
        switch (type) {
            case "pl": { this.setState({ isPL_View: isView }); break; }
            case "pump": { this.setState({ isPUMP_View: isView }); break; }
            case "tso": { this.setState({ isTSO_View: isView }); break; }
        }
    }
    get_Up(el) {
        let isView = true;
        switch (el.main_type) {
            case "pl": {
                isView = this.state.isPL_View;
                break;
            }
            case "pump": {
                isView = this.state.isPUMP_View;
                break;
            }
            case "fr":
            case "cash":
            case "td":
            case "msc":
            case "tso": {
                isView = this.state.isTSO_View;
                break;
            }
            default: {
                isView = true;
                break;
            }
        }
        return isView;
    }
    isShow_Row_Type(el) {
        let isView = true;
        switch (el.main_type) {
            case "pl": {
                if (el.ID == 0 && el.key == "nm") {
                    isView = true;
                } else {
                    isView = this.state.isPL_View;
                }
                break;
            }
            case "pump": {
                if (el.ID == 0 && el.key == "nm") {
                    isView = true;
                } else {
                    isView = this.state.isPUMP_View;
                }
                break;
            }
            case "fr":
            case "cash":
            case "td":
            case "msc":
            case "tso": {
                if (el.ID == 0 && el.key == "nm" && el.type == "tso") {
                    isView = true;
                } else {
                    isView = this.state.isTSO_View;
                }
                break;
            }
            default: {
                isView = true;
                break;
            }
        }
        return isView;
    }
    render() {
        /* let style_TD = {
            minWidth: '90px',
            Width: '90px',
            maxWidth: '90px',
            textAlign: 'center',
            background: 'white',
            //minHeight: '120px',
        } */
        let w_table_Main = {
            background: "#F0F0F0"
        }
        // const { activeIndex } = this.state

        if (this.state.list_book != null && this.state.list_azs != null) {
            return (
                <div>
                    <table style={w_table_Main}>
                        <tbody>
                            {
                                this.state.list_book.map(el =>
                                    (WhatKeyNotShow(el.key) && this.isShow_Row_Type(el)) &&
                                    (
                                        (el.isDVC)
                                            ? (
                                                <tr key={createGuid()}>
                                                    <Two_Coll el={el} _Debuge_Show_Code={this.props._Debuge_Show_Code} />

                                                    {this.state.list_azs != null &&
                                                        this.state.list_azs.map((el_azsS, n) => (
                                                            el_azsS.map(el_azs => (
                                                                (el.key == el_azs.key && el.type == el_azs.type) &&
                                                                <td key={createGuid()} colSpan={el_azs.ColSpan}
                                                                    style={this.getStyle(el_azs)}>
                                                                    <Single_Coll el={el_azs}
                                                                        el_azsS={el_azsS}
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
                                                    {/*нулевая колонка*/}
                                                    <td key={createGuid()} colSpan='2' id='style_TD'>
                                                        <Single_Coll el={el}
                                                            setFilter={this.setFilter} UP={this.get_Up(el)}
                                                            _Debuge_Show_Code={this.props._Debuge_Show_Code}
                                                            _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                                                        />
                                                    </td>

                                                    {/*колонки данные*/}
                                                    {this.state.list_azs != null &&
                                                        this.state.list_azs.map((el_azsS, n) => (
                                                            el_azsS.map(el_azs => (
                                                                (el.key == el_azs.key && el.type == el_azs.type && el_azs.ID != 0) &&

                                                                <td key={createGuid()} colSpan={el_azs.ColSpan}
                                                                    style={this.getStyle(el_azs)}>
                                                                    <Single_Coll el={el_azs}
                                                                        UP={this.get_Up(el)}
                                                                        _Fuels={this.props._Fuels}
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
