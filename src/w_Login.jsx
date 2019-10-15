import React, { Component, PropTypes } from 'react';
import { RSS_LOGIN, saveToken } from './core/core_Function.jsx';


const _Debuge = false;

export default class w_Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Post_Data = this.Post_Data.bind(this);
        this.state = {
            login: null,
            password: null,
            Token: null,
        };
    }
    handleChange(event, nameField) {
        switch (nameField) {
            case "login": {
                this.setState({ login: event.target.value });
                break;
            } case "password": {
                this.setState({ password: event.target.value });
                break;
            }
        }
        let J_Post = {
            "username": this.state.login,
            "password": this.state.password
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        let _anser = await this.Post_Data(event);
        this.props.history.push('/');
        window.location.reload(true);


        //event.stopPropagation()
        //historyPush('/');
        //historyPush('/AZS_SF');
        //event.stopPropagation();
        //event.preventDefault();
        //this.props.history.push('/');
    }
    async Post_Data(event) {
        
        let J_Post = {
            "username": this.state.login,
            "password": this.state.password
        }
        /*
        "username":"admin",
        "password":"password"
        */
        let token = localStorage.tokenData;
        let _body = JSON.stringify(J_Post);
        let rss = RSS_LOGIN;
        var myRequest = new Request(rss);
        try {
            var response = await fetch(myRequest,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: _body,
                }
            );
            const Jsons = await response.json();
            if (response.ok) {
                saveToken(Jsons.token ,  this.state.login);
                
                
                return Jsons.token;
            }
            else {
                throw Error(Jsons.message);
            }
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        return null;
    }


    render() {
        return (
            <>
                <center><h2>W_login</h2></center>
                <form onsubmit="return false;">
                    <table>
                        <tbody>
                            <tr>
                                <td width="70"><label htmlFor="loginField">Логин</label></td>
                                <td>
                                    <input id="loginField" type="text"
                                        name="login"
                                        onChange={el => { this.handleChange(el, "login") }}/>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="passwordField">Пароль</label></td>
                                <td>
                                    <input id="passwordField" type="password"
                                        name="password"
                                        onChange={el => { this.handleChange(el, "password") }} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"><input type="submit" onClick={e => {this.handleSubmit(e)}} value="Войти"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </>
        );
    }
}
