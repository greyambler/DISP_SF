import React from 'react';

import W_azs from './w_azs.jsx'
import W_List_azs from './w_List_azs.jsx'
import { RSS_AZS, Get_Main_PROPS_AZS } from '../core/core_Function.jsx'


const _Debuge = false;

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
                let m = await this.tick_azs_id(RSS_AZS, iterator.id);
                if (m != null && m.length > 0) {
                    M_ID.push(m);
                }
            }
            this.setState({ list_dvc_id: M_ID });
        }
    }

    async tick_azs_id(RES, id_azs) {
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
                    list_book_row={this.props.list_book_row}
                    list_dvc_id={this.state.list_dvc_id}
                    _List_AZS={this.props._List_AZS}
                    list_fuels={this.props.list_fuels}
                    list_type_dvc={this.props.list_type_dvc}

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
