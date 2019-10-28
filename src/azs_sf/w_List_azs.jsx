import React from 'react';

import W_azs from './w_azs.jsx'

import { RSS_AZS, Get_Main_PROPS_AZS } from '../core/core_Function.jsx'

const _Debuge = false;

export default class w_List_azs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_azs: null,
            list_dvc_azs: null,
        }
    }
    componentDidMount() {
        this.get_ALL_DVC();
    }
    async get_ALL_DVC() {
        let BOOK_All_AZSs = new Array();
        let _list_AZS = new Array();
        let l = 0;
        for (const item of this.props._List_AZS) {
            if (l == 0) {
                let BOOK_AZS = await this.tick_dev_AZS(RSS_AZS, item.id);
                if (BOOK_AZS != null) {
                    _list_AZS.push(item);
                    BOOK_All_AZSs.push(BOOK_AZS);
                }
                l = 0;
            }
        }
        this.setState({ list_dvc_azs: BOOK_All_AZSs, list_azs: _list_AZS });//
    }
    async tick_dev_AZS(RES, id_azs) {
        let rss = RES + '/' + id_azs;
        var myRequest = new Request(rss);
        try {
            var response = await fetch(myRequest,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                    },
                }
            );
            const Jsons = await response.json();
            if (response.ok) {
                if (Jsons.dvc != null && Jsons.dvc.length > 0) {
                    for (const _azs of this.props._List_AZS) {
                        if (id_azs == _azs.id) {
                            return Get_Main_PROPS_AZS(_azs, Jsons.dvc, this.props.list_type_dvc);
                        }
                    }
                }
                else {
                    return null;
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async Full_BOOK_From_AZS(BOOK_All_AZSs, id_AZS, mass_DVC) {
        if (mass_DVC != null) {
            if (this.props._List_AZS != null) {

                for (const _azs of this.props._List_AZS) {
                    if (id_AZS == _azs.id) {
                        let BOOK_AZS = Get_Main_PROPS_AZS(_azs, mass_DVC, this.props.list_type_dvc);
                        BOOK_All_AZSs.push(BOOK_AZS);
                        break;
                    }
                }
            }
        }
    }
    render() {
        if (this.state.list_azs != null
            && this.state.list_dvc_azs != null
        ) {
            return (
                <W_azs
                    list_book_row={this.props.list_book_row}
                    list_dvc_id={this.props.list_dvc_id}
                    list_fuels={this.props.list_fuels}

                    _List_AZS={this.state.list_azs}
                    list_dvc_azs={this.state.list_dvc_azs}
                />
            );
        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <h4><center>Нет данных (w_main_azs)</center></h4>
                </div>
            );
        }
    }
}
