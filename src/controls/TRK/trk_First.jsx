import React from 'react';

import { get_Num } from '../../core/core_Function.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import AZS_Image from '../AZS_Image.jsx'

export default class trk_First extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let BTN_width = 110;
        let BTN_height = 140;
        return (
            <center>
                <Stage width={BTN_width} height={BTN_height} x={0} y={0}>
                    <Layer key='1' background='red' >
                        <AZS_Image Image='/images/TRK.png'
                            _W='100' _H='120' _X={4} _Y={12} />
                    </Layer>
                </Stage>
            </center>
        );
    }
}