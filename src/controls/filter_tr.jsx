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
            //border: "1px solid hotpink",
            background: '#F0F0F0',
            //minWidth: '210px',
            //height: '100%',
            height: '30px',
            width: '100%',
            verticalAlign: 'top',
        }
        let _style_3 = {
            top: '0',
            fontFamily: 'Neusa Next Pro',
            fontSize: '22px',
            height: '27px',
        }
        let _style_4 = {
            marginTop: '10px',
            color: '#1A2737',
            width: "30px",

        }
        return (
            <table style={_style_2} onClick={this.Click}>
                <tr>
                    <td onClick={this.Click}>
                        {this.state.text_dvc}
                    </td>
                    <td style={_style_4}>
                        <Image src={this.state._arrow} onClick={this.Click} />
                    </td>
                </tr>
            </table>
        );
        /*
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
        */
    }
}
