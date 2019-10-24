import React from 'react';

import W_azs from './w_azs.jsx'

import { RSS_AZS, Get_Main_PROPS_AZS } from '../core/core_Function.jsx'


export default class w_List_azs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _list_AZS: null,
            list_azs_dvc: null,
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
                l = 1;
            }
        }
        this.setState({ list_azs_dvc: BOOK_All_AZSs, _list_AZS: _list_AZS });//
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
                            return Get_Main_PROPS_AZS(_azs, Jsons.dvc, this.props._List_Main);
                        }
                    }
                }
                else {
                    return null;
                }
                //return Jsons.dvc;
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
                        let BOOK_AZS = Get_Main_PROPS_AZS(_azs, mass_DVC, this.props._List_Main);
                        BOOK_All_AZSs.push(BOOK_AZS);
                        break;
                    }
                }
            }
        }
    }

    render() {
        if (this.props.list_book != null
            && this.state._list_AZS != null
            && this.props.list_dvc_id != null
            && this.state.list_azs_dvc != null
        ) {
            return (
                <W_azs
                    list_book={this.props.list_book}
                    list_dvc_id={this.props.list_dvc_id}
                    list_azs_dvc={this.state.list_azs_dvc}
                    _Fuels={this.props._Fuels}
                    _List_AZS={this.state._list_AZS}


                    _Debuge={this.props._Debuge}
                    _Debuge_Show_Code={this.props._Debuge_Show_Code}
                    _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                    _Debuge_Alert={this.props._Debuge_Alert}

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
