import React from 'react';

import W_table_azs from './w_table_azs.jsx'

import { WS, get_Json_String } from '../core/core_Function.jsx'


export default class w_azs extends React.Component {
    constructor(props) {
        super(props);
        this.full_Key_Value = this.full_Key_Value.bind(this);

        /******** WS******************** */
        this.start_ws = this.start_ws.bind(this);
        this.stop_ws = this.stop_ws.bind(this);
        this.OnOpen = this.OnOpen.bind(this);
        /******** WS******************** */

        this.state = {
            list_book: this.props.list_book,
            list_azs: this.props.list_azs, // содержит все пареметры устройств азк   - требует добавления данных через WS
            list_id: this.props.list_id,

            /******** WS******************** */
            Ws: WS,
            data: null,
            connection: null,
            messages: [],
            IsOpen: false,
            /******** WS******************** */
        }
    }
    componentDidMount() {
        this.start_ws();
    }
    componentDidUpdate(prevProps) {
        if (this.props.list_book != prevProps.list_book) {
            this.setState({ list_book: this.props.list_book });
        }
        if (this.props.list_azs != prevProps.list_azs) {
            this.setState({ list_azs: this.props.list_azs });
        }

    }
    componentWillUnmount() {
        this.stop_ws();
    }

    /******** WS******************** */
    start_ws(e) {
        if (this.state.list_id != null) {
            if (this.state.connection == null) {

                this.state.connection = new WebSocket(this.state.Ws);
                this.state.connection.onopen = evt => { this.OnOpen(evt.data) }//{ this.add_messages(evt.data) }
                this.state.connection.onclose = evt => { this.add_messages(evt.data) }
                this.state.connection.onerror = evt => { this.add_messages(evt.data) }

                this.state.connection.onmessage = evt => {
                    if (evt.data != null) {
                        try {

                            if (evt.data != "") {
                                this.full_Key_Value(JSON.parse(evt.data));

                                //this.setState({ data: JSON.parse(evt.data) });// Рабочий
                                //this.add_messages("\n" + evt.data);
                                //console.log('***JSON*********************' + evt.data);
                            }
                        } catch (error) {
                            console.log('******WS******************' + error);
                            console.log('******WS******************' + evt.data);
                        }
                    }
                }
            }
        }
    }
    OnOpen(e) {
        if (this.state.list_id != null) {
            if (this.state.list_id.length > 0 && !this.state.IsOpen) {
                let MS = get_Json_String(this.state.list_id);
                this.state.connection.send(MS);
                this.setState({ messages: "", IsOpen: true })
            }
        }
    }
    stop_ws(e) {
        if (this.state.IsOpen) {
            this.state.connection.close(1000, "Hello Web Sockets!");
            this.setState({ connection: null, data: null, IsOpen: false });
        }
    }
    add_messages(e) {
        if (e != null) {
            this.setState({
                messages: this.state.messages.concat("\n[ №" +
                    " " + " ]\n " + e + "\n")
            });
        }
    }
    /******** WS******************** */

    async full_Key_Value(data) {
        //let need = false;

        if (this.state.list_azs != null && data != null) {
            for (const data_val of data.values) {
                for (const azs of this.state.list_azs) {
                    for (const dvc of azs) {

                        //comment

                        if (data.id == dvc.dvc_id && dvc.key == data_val.typ) {
                            if (data_val.comment != null) {
                                dvc.key_value = data_val.comment;
                            } else {
                                dvc.key_value = data_val.val;
                            }

                            dvc.crit = data_val.crit;
                            //break;
                        }
                    }
                    //break;
                }
            }
            this.setState({ list_azs: this.state.list_azs });
        }
    }

    render() {
        return (
            <W_table_azs
                list_book={this.state.list_book}
                list_azs={this.state.list_azs}
                _Debuge={this.props._Debuge}
                _Debuge_Show_Code={this.props._Debuge_Show_Code}
                _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                _Debuge_Alert={this.props._Debuge_Alert}

            />
        );
    }
}
