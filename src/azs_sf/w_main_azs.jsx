import React from 'react';

import W_azs from './w_azs.jsx'
import { RSS_AZS, Get_Main_PROPS_AZS } from '../core/core_Function.jsx'

function get_Json_String(mstring) {
    var mS = [];
    mS[0] = mstring;
    const T_Json = JSON.stringify(mstring);
    return T_Json;
}

const _Debuge = false;
const _Debuge_Show_Code = false;
const _Debuge_Show_Crit = false;
const _Debuge_Alert = true;

export default class w_main_azs extends React.Component {
    constructor(props) {
        super(props);
        this.Full_BOOK_From_AZS = this.Full_BOOK_From_AZS.bind(this);
        this.state = {
            list_book: this.props.list_book,

            _List_AZS: this.props._List_AZS,
            _List_Main: this.props._List_Main,

            list_id: null,
            list_azs: null,
        }
    }
    componentDidMount() {
        if (this.state._List_AZS != null) {
            this.get_Id_Devices();
        }
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
                return Jsons.dvc;
            }
            else {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async get_Id_Devices() {
        let M_ID = new Array();
        let BOOK_All_AZSs = new Array();
        let l = 0;
        if (this.state._List_AZS != null) {
            for (const iterator of this.state._List_AZS) {
                let rss = await this.tick_dev_AZS(RSS_AZS, iterator.id);
                if (rss != null) {
                    if (l == 0) {
                        await this.Full_BOOK_From_AZS(BOOK_All_AZSs, iterator.id, rss);
                        l = 0;
                    }
                    for (const dvc of rss) {
                        M_ID.push(dvc.id);
                    }
                }
            }
        }
        this.setState({ list_id: M_ID, list_azs: BOOK_All_AZSs });
    }
    async Full_BOOK_From_AZS(BOOK_All_AZSs, id_AZS, mass_DVC) {
        if (mass_DVC != null) {
            if (this.state._List_AZS != null) {

                for (const _azs of this.state._List_AZS) {
                    if (id_AZS == _azs.id) {
                        let BOOK_AZS = Get_Main_PROPS_AZS(_azs, mass_DVC, this.state._List_Main);
                        BOOK_All_AZSs.push(BOOK_AZS);
                        break;
                    }
                }
            }
        }
    }

    render() {
        if (this.state.list_book != null
            && this.state.list_id != null
            //&& this.state.list_azs != null
        ) {
            return (
                <W_azs
                    list_book={this.state.list_book}

                    list_id={this.state.list_id}
                    list_azs={this.state.list_azs}

                    _Debuge={_Debuge}
                    _Debuge_Show_Code={_Debuge_Show_Code}
                    _Debuge_Show_Crit={_Debuge_Show_Crit}
                    _Debuge_Alert={_Debuge_Alert}

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
