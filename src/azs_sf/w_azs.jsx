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
            list_azs: this.props.list_azs_dvc, // содержит все пареметры устройств азк   - требует добавления данных через WS
            list_id: this.props.list_dvc_id,

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
                                console.log('***JSON*********************' + evt.data);
                            } else {
                                let r = 0;
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

    get_Fuel_Code(data, data_val, azs) {
        let _fuel = 0;
        let mass_DVC_AZS = null;
        for (const dvc of azs) {
            if (data.id == dvc.dvc_id) {
                for (const _dvc of azs) {
                    if (_dvc.ID == dvc.ID && _dvc.key == "id") {
                        mass_DVC_AZS = _dvc.mass_DVC;
                        break;
                    }
                }
            }
            if (data.id == dvc.dvc_id && dvc.key == data_val.typ && dvc.key == "nozzle") {
                for (const dev_A of mass_DVC_AZS) {
                    if (dev_A.typ == data_val.typ) {
                        if (dev_A.prop != undefined) {
                            for (const item_prop of dev_A.prop) {
                                if (item_prop.typ == 'NUM') {
                                    if (parseInt(item_prop.capacity) == parseInt(data_val.val)) {
                                        _fuel = dev_A.fuel;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return _fuel;
    }

    async full_Key_Value(data) {

        if (this.state.list_azs != null && data != null) {
            for (const data_val of data.values) {
                for (const azs of this.state.list_azs) {
                    for (const dvc of azs) {
                        if (data.id == dvc.dvc_id) {
                            switch (data_val.typ) {
                                case "STATE_PL": dvc.state_pl = data_val.val; break;
                                case "WATER_LEVEL": dvc.water_level = data_val.crit; break;
                                case "STATE_SHIFT": dvc.state_shift = data_val.val; break;
                                case "STATUS_TRK":
                                    {
                                        dvc.state_trk = data_val.val;
                                        break;
                                    }
                                case "nozzle":
                                    {
                                        if (data_val.val != 0) {
                                            let _fuel = this.get_Fuel_Code(data, data_val, azs);
                                            dvc.fuel = _fuel;
                                        } else {
                                            dvc.fuel = 0;
                                        }
                                        break;
                                    }
                            }
                            if (dvc.key == data_val.typ) {
                                if (data_val.comment != null) {
                                    dvc.key_value = data_val.comment;
                                } else {
                                    dvc.key_value = data_val.val;
                                }
                                dvc.crit = data_val.crit;
                            }
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

                _Fuels={this.props._Fuels}

                _Debuge={this.props._Debuge}
                _Debuge_Show_Code={this.props._Debuge_Show_Code}
                _Debuge_Show_Crit={this.props._Debuge_Show_Crit}
                _Debuge_Alert={this.props._Debuge_Alert}

            />
        );
    }
}
