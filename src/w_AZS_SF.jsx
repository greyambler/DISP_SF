import React from 'react';

import { Element, animateScroll as scroll } from 'react-scroll'

import { demoAsyncCall, RSS_List_Main, RSS_AZS, Get_Main_PROPS } from './core/core_Function.jsx'
import W_main_azs from './azs_sf/w_main_azs.jsx'

const _Debuge = false;
const _Debuge_Alert = true;

export default class w_AZS_SF extends React.Component {
    constructor(props) {
        super(props);
        this.Get_BOOK_From_TREE = this.Get_BOOK_From_TREE.bind(this);

        this.View_Modal_Err = this.View_Modal_Err.bind(this);
        this.View_Modal_Ok = this.View_Modal_Ok.bind(this);

        this.state = {
            loading: true,
            header: 'Объекты.',
            isExistError: true,

            _List_Main: null,
            _Fuels:null,
            _List_AZS: null,

            _array_ID: null,
            list_book: null,

            openModal_Err: false,
            openModal_Ok: false,
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
        this.tick();
        this.tick_AZS();
        demoAsyncCall().then(() => this.setState({ loading: false }));
    }

    sort_List(typ, list) {
        for (const iterator of list) {
            if (iterator.typ == typ) {
                return iterator;
            }
        }
        return null;
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

                /*
                                let t = new Array();
                                let item1 = this.sort_List("tso", Jsons.dvctyptree);
                                if (item1 != null); { t.push(item1); }
                                let item2 = this.sort_List("pump", Jsons.dvctyptree);
                                if (item2 != null); { t.push(item2); }
                                let item3 = this.sort_List("pl", Jsons.dvctyptree);
                                if (item3 != null); { t.push(item3); }
                                this.setState({ _List_Main: t }, this.Get_BOOK_From_TREE);
                 */
                this.setState({ _List_Main: Jsons.dvctyptree, _Fuels: Jsons.fuel}, this.Get_BOOK_From_TREE);
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
    async tick_AZS() {
        let rss = RSS_AZS;
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
                this.setState({ _List_AZS: Jsons.obList });//, this.get_Id_Devices);
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
    Get_BOOK_From_TREE() {
        let BOOK_All = Get_Main_PROPS(this.state._List_Main);
        this.setState({ list_book: BOOK_All });
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

        if (this.state.list_book != null && this.state._List_AZS != null) {
            return (
                <W_main_azs
                    w_Height={this.props.w_Height}
                    w_Width={this.props.w_Width}
                    history={this.props.history}

                    list_book={this.state.list_book}
                    _List_Main={this.state._List_Main}
                    _List_AZS={this.state._List_AZS}

                    _Fuels={this.state._Fuels}

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
