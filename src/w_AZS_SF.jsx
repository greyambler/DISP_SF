import React from 'react';

import { Element, animateScroll as scroll } from 'react-scroll'

import { demoAsyncCall, RSS_List_Main, RSS_AZS, Get_Main_PROPS } from './core/core_Function.jsx'
import W_main_azs from './azs_sf/w_main_azs.jsx'

const _Debuge = false;
const _Debuge_Alert = true;

export default class w_AZS_SF extends React.Component {
    constructor(props) {
        super(props);
        this.Get_list_book_row = this.Get_list_book_row.bind(this);

        this.View_Modal_Err = this.View_Modal_Err.bind(this);
        this.View_Modal_Ok = this.View_Modal_Ok.bind(this);

        this.state = {
            loading: true,
            header: 'Объекты.',
            isExistError: true,

            list_type_dvc: null,
            list_fuels: null,
            list_book_row: null,

            openModal_Err: false,
            openModal_Ok: false,

            DVC: this.props.DVC,
        }
    }

    /***Modal_Alert */
    View_Modal_Err(stt) {
        this.setState({ openModal_Err: stt });
    }
    View_Modal_Ok(stt) {
        this.setState({ openModal_Ok: stt });
    }
    /***Modal_Alert */

    componentDidMount() {
        demoAsyncCall().then(() => this.setState({ loading: false }));
        this.tick();
    }
    componentDidUpdate(prevProps) {
        if (this.props.DVC !== prevProps.DVC) {
            this.setState({ DVC: this.props.DVC }, this.Get_list_book_row);
        }
    }

    async tick() {
        let rss = RSS_List_Main;
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
                this.setState({ list_type_dvc: Jsons.dvctyptree, list_fuels: Jsons.fuel }, this.Get_list_book_row);
            }
            else {
                throw Error(response.statusText);
            }
            this.setState({ isExistError: false })
        }
        catch (error) {
            this.setState({ isExistError: true })
            console.log(error);
            if (_Debuge_Alert)
                alert(error);
        }
    }
    Get_list_book_row() {
        let BOOK_All = Get_Main_PROPS(this.state.list_type_dvc,this.state.DVC);
        this.setState({ list_book_row: BOOK_All });
    }

    render() {
        /***** Ждать *****************/
        const { loading } = this.state;
        if (loading) {
            let stayle_1 = {
                marginTop: '130px',
            }
            return (
                <div align="center">
                    <center><h1>Запрос данных.</h1></center>
                    <img src='images/anim_engine.gif' style={stayle_1} />
                </div>
            );
        }
        /***** Ждать *****************/

        if (this.state.list_book_row != null
            &&
            this.props.list_azs_check != null
        ) {
            return (
                <W_main_azs
                
                    w_Height={this.props.w_Height}
                    w_Width={this.props.w_Width}
                    history={this.props.history}

                    list_book_row={this.state.list_book_row}
                    list_type_dvc={this.state.list_type_dvc}

                    list_azs_check={this.props.list_azs_check}

                    list_fuels={this.state.list_fuels}

                />
            );
        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <h4><center>Нет связи с сервером!!(w_AZS_SF)</center></h4>
                </div>
            );
        }
    }
}
