import React from 'react';

import W_azs from './w_azs.jsx'
// import W_List_azs from './w_List_azs.jsx'
import { RSS_AZS, Get_Main_PROPS_AZS } from '../core/core_Function.jsx'

const _Debuge = false;

export default class w_main_azs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list_dvc_id: null,

            list_azs: null,
            list_dvc_azs: null,
        }
    }
    componentDidMount() {
        this.get_Id_Devices();
    }
    async get_Id_Devices() {
        if (this.props._List_AZS != null) {
            let M_ID = new Array();
            let M = new Array();

            let _list_AZS = new Array();

            for (const iterator of this.props._List_AZS) {
                let m = await this.tick_azs_id(RSS_AZS, iterator.id);
                if (m['M_ID'] != null && m['M_ID'].length > 0) {
                    M_ID.push(m['M_ID']);

                    //M.push(m['M']);
                    let mas = Get_Main_PROPS_AZS(iterator, m['M'], this.props.list_type_dvc);
                    M.push(mas);

                    //Get_Main_PROPS_AZS(_azs, Jsons.dvc, this.props.list_type_dvc);
                    _list_AZS.push(iterator);
                }
            }
            this.setState({ list_dvc_azs: M, list_dvc_id: M_ID, list_azs: _list_AZS });
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
                    let M = new Array();
                    let M_M_ID = new Array();
                    for (const dvc of Jsons.dvc) {
                        M_ID.push(dvc.id);
                        M.push(dvc);
                    }
                    M_M_ID['M'] = M;
                    M_M_ID['M_ID'] = M_ID;
                    return M_M_ID;
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
        if (this.state.list_dvc_id != null) {
            return (
                <W_azs
                    list_book_row={this.props.list_book_row}
                    list_dvc_id={this.state.list_dvc_id}
                    list_fuels={this.props.list_fuels}

                    _List_AZS={this.state.list_azs}

                    list_dvc_azs={this.state.list_dvc_azs}

                    history={this.props.history}
                />
                /*     
                  <W_List_azs
                      list_book_row={this.props.list_book_row}
                      list_dvc_id={this.state.list_dvc_id}
                      list_fuels={this.props.list_fuels}
  
                      _List_AZS={this.state.list_azs}
  
                      list_dvc_azs={this.state.list_dvc_azs}
  
                      list_type_dvc={this.props.list_type_dvc}
  
                      history={this.props.history}
  
                  /> */
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
