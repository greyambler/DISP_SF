import React from 'react';

import { Divider, Grid, Image, Segment } from 'semantic-ui-react'


export default class filter_tr extends React.Component {
    constructor(props) {
        super(props);
        this.Click = this.Click.bind(this);
        this.state = {
            text_dvc: this.props.text_dvc,
            _up: this.props.UP,
            _arrow: this.props.UP ? "images/arrow_Up.png" : "images/arrow_Down.png",
            type: this.props.type,
        }
    }

    Click() {
        let _UP = !this.state._up;
        if (_UP) {
            this.setState({ _arrow: "images/arrow_Up.png" });
        } else {
            this.setState({ _arrow: "images/arrow_Down.png" });
        }
        this.props.setFilter(_UP, this.state.type);
    }

    render() {
        let _style_2 = {
            background: '#F0F0F0',
            minWidth:'210px',
            //height: '27px',
        }
        let _style_3 = {
            top: '0',
            fontFamily: 'Neusa Next Pro',
            fontSize: '22px',
        }
        let _style_4 = {
            marginTop: '10px',
            color: '#1A2737',
        }
        return (
            <Segment onClick={this.Click}>
                <Grid style={_style_2}>
                    <Grid.Column width={13} onClick={this.Click}>
                        <p style={_style_3}>
                            {this.state.text_dvc}
                        </p>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <p style={_style_4}>
                            <Image src={this.state._arrow} onClick={this.Click} />
                        </p>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}





/*
    render() {

        let _style_2 = {
            width: '100%',
            height: '64px',
            display: 'table',
            background: '#F0F0F0',
        }

        let _style_3 = {
            fontFamily: 'Neusa Next Pro',
            fontSize: '32px',
            lineHeight: '41px',
        }
        let _style_4 = {
            alignItems: 'left',
            color: '#1A2737',
        }

        return (
            <>
                <nobr style={_style_2}>
                    <nobr style={_style_3} onClick={this.Click}>{this.state.text_dvc} </nobr>
                    <nobr style={_style_4}><img src={this.state._arrow} width="12" onClick={this.Click} /></nobr>
                </nobr>
            </>
        );
    }
}
*/

/*
     <nobr style={_style_td1}> {this.state.text_dvc} </nobr>
    <table>
                <tbody>
                    <tr style={_style_tr}>
                        <td style={_style_td1}>
                            {this.state.text_dvc}

                            <button style={_style_Min_button}><img src="images/arrow_Up.png" alt="Флаг России" width="12" /></button>

                        </td>
                        <td>
                            <button style={_style_Min_button}><img src="images/arrow_Up.png" alt="Флаг России" width="12" /></button>
                        </td>
                    </tr>
                </tbody>
            </table>

                <p style={_style} > {this.state.text_dvc}</p>
                <img src="images/arrow_Up.png" alt="Флаг России" width="12"></img>
*/
