import React from 'react';

import { get_Num, getColor_Crit, POST, get_Curent_Login } from '../core/core_Function.jsx'

import { Stage, Layer, Rect, Text, Line, Circle, Shape, Image } from 'react-konva';

import Konva from "konva";

import AZS_Image from '../controls/AZS_Image.jsx'


export default class azs_Head extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    AZS_ERROR_Onclick(id_azs) {
        //alert("Тест = " + id_azs);
        //history={this.props.history}
        this.props.history.push('/azs_listerror&' + id_azs);
    }

    render() {
        let S_width = 120;
        let S_height = 200;

        let Head_Staly = {
            fontFamily: 'Neusa Next Pro',
            fontSize: '26px',
            lineHeight: '21px',
            //display: 'flex',
            //alignItems: 'flex - end',
            letterSpacing: '0.02em',
            textAlign: 'center',
            color: '#000000',
        }
        return (
            <center><p style={Head_Staly}>{this.props.text}

                <button className='Min_button_White' title="Журнал ошибок" 
                onClick={() => this.AZS_ERROR_Onclick(this.props.ID)}>
                    <div align="center">
                        <img src='images/anim_engine.gif' width="15px" />
                    </div>
                </button>
            </p>
            </center>
        );
    }
}