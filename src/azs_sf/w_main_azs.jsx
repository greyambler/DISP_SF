import React from 'react';

import W_azs from './w_azs.jsx'
import W_List_azs from './w_List_azs.jsx'
import { RSS_AZS, Get_Main_PROPS_AZS } from '../core/core_Function.jsx'


const _Debuge = false;
const _Debuge_Show_Code = false;
const _Debuge_Show_Crit = false;
const _Debuge_Alert = true;

export default class w_main_azs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list_dvc_id: null,
        }
    }

    componentDidMount() {
        this.get_Id_Devices();
    }

    async get_Id_Devices() {
        if (this.props._List_AZS != null) {
            let M_ID = new Array();
            for (const iterator of this.props._List_AZS) {
                let m = await this.tick_dev_AZS(RSS_AZS, iterator.id);
                if (m != null && m.length > 0) {
                    M_ID.push(m);
                }
            }
            this.setState({ list_dvc_id: M_ID });
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
                if (Jsons.dvc != null) {
                    let M_ID = new Array();
                    for (const dvc of Jsons.dvc) {
                        M_ID.push(dvc.id);
                    }
                    return M_ID;
                } else {
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

    render() {
        if (this.state.list_dvc_id != null
        ) {
            return (
                <W_List_azs
                    list_book={this.props.list_book}
                    list_dvc_id={this.state.list_dvc_id}

                    _List_AZS={this.props._List_AZS}
                    _Fuels={this.props._Fuels}
                    _List_Main={this.props._List_Main}

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
