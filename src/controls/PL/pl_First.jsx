import React from 'react';

import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import AZS_Image from '../AZS_Image.jsx'

export default class pl_First extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let BTN_width = 160;
        let BTN_height = 110;
        return (
            <center>
                {<Stage width={BTN_width} height={BTN_height} x={0} y={0}>
                    <Layer key='1'>
                        <AZS_Image Image='/images/PL.png'
                            _W='140' _H='80' _X={7} _Y={7} />
                    </Layer>
                </Stage>
                }
            </center>
        );
    }
}