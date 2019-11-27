import React from 'react';

import { demoAsyncCall, createGuid, WhatKeyNotShow, getColor_Crit } from '../core/core_Function.jsx'
import Single_Coll from './single_coll.jsx'
import Two_Coll from './two_coll.jsx'

const _Debuge = false;

export default class w_table_azs extends React.Component {
    constructor(props) {
        super(props);
        this.setFilter = this.setFilter.bind(this);
        this.get_Up = this.get_Up.bind(this);
        this.isShow_Row_Type = this.isShow_Row_Type.bind(this);
        this.state = {
            isPL_View: false,
            isPUMP_View: false,
            isTSO_View: false,
        }
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
                if (el.ID == 0 && el.key == "nm" && (el.type == "tso" || el.type == "fr" || el.type == "msc" || el.type == "cash")
                ) {
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
        let w_table_Main = {
            background: "#F0F0F0",
        }
        let style_th = {
            background: 'white',
            minWidth: '120px',
            Width: '120px',
            maxWidth: '120px',
            textAlign: 'center',
        }
        let style_div = {
            minHeight: this.props.w_Height - 70,
            minWidth: this.props.w_Width - 50,
        }


        return (
            <div style={style_div}>
                <table style={w_table_Main}>
                    <tbody>
                        {
                            this.props.list_book_row.map(el =>
                                (WhatKeyNotShow(el.key) && this.isShow_Row_Type(el)) &&
                                (
                                    (el.isDVC)
                                        ? (
                                            <tr key={createGuid()}>
                                                <Two_Coll el={el} />

                                                {this.props.List_dvc_azs != null &&
                                                    this.props.List_dvc_azs.map((el_azsS, n) => (
                                                        el_azsS.map(el_azs => (
                                                            (el.key == el_azs.key && el.type == el_azs.type) &&
                                                            <td key={createGuid()} colSpan={el_azs.ColSpan}
                                                                style={style_th}
                                                            >
                                                                <Single_Coll
                                                                    el={el_azs}
                                                                    el_azsS={el_azsS}
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
                                                    <Single_Coll
                                                        el={el}
                                                        setFilter={this.setFilter}
                                                        UP={this.get_Up(el)}
                                                    />
                                                </td>

                                                {/*колонки данные*/}
                                                {this.props.List_dvc_azs != null &&
                                                    this.props.List_dvc_azs.map((el_azsS, n) => (
                                                        el_azsS.map(el_azs => (
                                                            (el.key == el_azs.key && el.type == el_azs.type && el_azs.ID != 0) &&

                                                            <td key={createGuid()} colSpan={el_azs.ColSpan}
                                                                style={style_th}
                                                            >
                                                                <Single_Coll
                                                                    el={el_azs}
                                                                    UP={this.get_Up(el)}
                                                                    list_fuels={this.props.list_fuels}

                                                                    history={this.props.history}
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
    }
}
