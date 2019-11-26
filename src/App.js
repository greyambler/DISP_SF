import React, { Component } from 'react';
import PropTypes from 'prop-types'

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './App.css';


import {
  Icon, Menu, Segment, Sidebar, Grid, Image, Header,
  Input, Form, Table, List, Label, Button, Select, Radio, TextArea, Checkbox
} from 'semantic-ui-react'


import { demoAsyncCall, saveToken, RSS_AZS_EDIT, set_Curent_Login, get_Curent_Login, refreshPage, createGuid } from './core/core_Function.jsx'

import history from "./controls/history";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link as S_Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import W_AZS_SF from './w_AZS_SF.jsx'

import W_main_edit_azs from './azs_sf/edit/w_main_edit_azs.jsx'

import W_ListErr_AZS from './controls/listErr_AZS.jsx';


import W_Login from './w_Login.jsx'

import W_LeftPanel from './test/w_LeftPanel.jsx'
import W_AccordPanel from './test/w_AccordPanel.jsx'

import W_test_Check from './test/test_Check.jsx'

import W_Set_Filter from './controls/w_Filter_AZS_Props.jsx'


import AZS_Image from './controls/AZS_Image.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape } from 'react-konva';


const _Debuge_TestMenu = false;


class Filter_Sidebar_Main extends Component {
  render() {
    /*     let DVC = new Array();
        DVC.push({ nm: "Резервуары", check: true, id: createGuid() });
        DVC.push({ nm: "ТРК", check: true, id: createGuid() });
        DVC.push({ nm: "ТСО", check: true, id: createGuid() });
     */
    return (
      <Sidebar
        as={Segment}
        animation={this.props.animation} direction={this.props.direction}
        visible={this.props.visible} icon='labeled' vertical width='thin'>
        <W_Set_Filter
          w_Height={this.props.w_Height} w_Width={this.props.w_Width}
          OnColse={this.props.T_close}
          list_azs_check={this.props.list_azs_check}
          DVC={this.props.DVC}

        />
      </Sidebar>
    );
  }
}
class SettingsFilter extends Component {
  render() {
    return (
      <W_Set_Filter w_Height={this.props.w_Height}
        w_Width={this.props.w_Width} history={this.props.history}
        list_azs_check={this.props.list_azs_check}
      />
    );
  }
}



function get_list_azs_check_NEED(list_azs_check) {
  let r = new Array();
  if (list_azs_check != null) {
    for (const iterator of list_azs_check) {
      if (iterator.check) {
        r.push(iterator);
      }
    }
  }
  return r;
}
function get_DVC_NEED(DVC_check) {
  let r = new Array();
  if (DVC_check != null) {
    for (const iterator of DVC_check) {
      if (iterator.check) {
        r.push(iterator);
      }
    }
  }
  return r;
}


class Main extends Component {
  render() {
    return (<W_AZS_SF w_Height={this.props.w_Height} w_Width={this.props.w_Width}
      history={this.props.history}
      list_azs_check={this.props.list_azs_check}
      DVC={this.props.DVC}
    />);
  }
}
class AZS_SF extends Component {
  render() {
    return (<W_AZS_SF
      w_Height={this.props.w_Height}
      w_Width={this.props.w_Width}
      history={this.props.history}
      list_azs_check={this.props.list_azs_check}
      DVC={this.props.DVC}
    />);
  }
}

class Edit_List_AZS extends Component {
  render() {

    return (<W_main_edit_azs
      w_Height={this.props.w_Height}
      w_Width={this.props.w_Width}
      history={this.props.history} />);
  }
}
class AZS_listerror extends Component {
  render() {
    return (<W_ListErr_AZS w_Height={this.props.w_Height} w_Width={this.props.w_Width} _List_Objs={this.props._List_Objs}
      azs_id={this.props.azs_id}
    />);
  }
}
class CleanTOKEN extends Component {
  render() {
    saveToken(null);
    //this.props.history.push('/');
    window.location.reload(true);

    return <center><h2>Очистить</h2></center>;
  }
}
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
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
          <center><h1>Настройки.</h1></center>
          <img src='images/anim_engine.gif' style={stayle_1} />
        </div>
      );
    }
    return (
      <>
        <center><h2>Настройки</h2></center>
        <W_test_Check />
      </>
    );
  }
}




class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
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
          <center><h1>Помощь.</h1></center>
          <img src='images/anim_engine.gif' style={stayle_1} />
        </div>
      );
    }
    return <center><h2>Помощь</h2></center>;
  }
}
class NotFound extends Component {
  render() {
    return <center><h2>Ресурс не найден</h2></center>;
  }
}
class LeftPanel extends Component {
  render() {

    return (<W_LeftPanel
      w_Height={this.props.w_Height}
      w_Width={this.props.w_Width}
      history={this.props.history} />);
  }
}
class AccordPanel extends Component {
  render() {
    return (<W_AccordPanel
      w_Height={this.props.w_Height}
      w_Width={this.props.w_Width}
      history={this.props.history} />);
  }
}
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count_AZS: "0",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.count_AZS !== prevProps.count_AZS) {
      this.setState({ count_AZS: this.props.count_AZS });
    }
  }

  render() {
    return (
      <nav>

        <table className="header_Right">
          <tbody>
            <tr>
              <td id='td_mb'>
                <button className='btn_Reload' type="button" onClick={this.props.handleAnimationChange('overlay')}>
                  <left>
                    <Stage width={34} height={34} x={-2} y={0}>
                      <Layer key='1' background='red' >
                        <AZS_Image Image='../images/Normal.png'
                          _W='25' _H='25' _X={0} _Y={7} />
                        <AZS_Image Image='../images/no_check.png'
                          _W='12' _H='12' _X={14} _Y={7} />
                        <Text x={16} y={10} text={this.state.count_AZS} fontSize={9} />
                      </Layer>
                    </Stage>
                  </left>
                  {/*                   <img className="header_Img" src={'../images/Normal.png'} alt="React"
                    width="14" height="14" />
 */}                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <ul className="topmenu">

          <li>
            <Link to="/"> Меню</Link>
            <ul className="submenu">
              <li><Link to="/" >Главная</Link></li>
              <li><Link to="/AZS_SF" >Начальная</Link></li>

              <li><Link to="/" ><center>Справочники&gt;&gt;</center></Link>
                <ul className="submenu">
                  <li><Link to="/List_Edit_AZS">Справочник АЗК</Link></li>
                  <li><Link to="/settings" >Настройки</Link></li>

                  {/*                   <li><Link to="/settingsFilter" >Настройки фильтра</Link></li>
 */}
                </ul>
              </li>
              <li><Link to="/clean" >Очистить</Link></li>
              <li><Link to="/help" >Помощь</Link></li>
            </ul>
          </li>

          <table className="header_Text">
            <tbody>
              <tr>
                <td id='td_m'>
                  <S_Link activeClass="active" className="test2" to="test2"
                    spy={true} smooth={true} duration={500} offset={-40}>  тсо</S_Link>
                </td><td id='td_m'>
                  <S_Link activeClass="active" className="test3" to="test3"
                    spy={true} smooth={true} duration={500} offset={-40}> трк</S_Link>
                </td><td id='td_m'>
                  <S_Link activeClass="active" className="test4" to="test4"
                    spy={true} smooth={true} duration={500} offset={-40}>  резервуары</S_Link>
                </td>
                <td id="td_max">
                </td>
              </tr>
            </tbody>
          </table>

          <table className="header_Left">
            <tbody>
              <tr>
                <td id='td_mb'>
                  <button className='btn_Reload' type="button" onClick={refreshPage}>
                    <img className="header_Img" src={'../images/Repeat.png'} alt="React"
                      width="14" height="14" />
                  </button>
                </td>
                <td id='td_user'>
                  {get_Curent_Login()}
                </td>
                <td id='td_mb'>
                  <Link to="/clean">
                    <img className="header_Img" src={'../images/log-out.png'} alt="React"
                      width="22" height="22" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

        </ul>
      </nav>
    );
  }
}

function Init_DVC() {
  let DVC = new Array();
  DVC.push({ nm: "Резервуар", typ: "pl", check: true, id: createGuid() });
  DVC.push({ nm: "ТРК", typ: "pump", check: true, id: createGuid() });
  DVC.push({ nm: "ТСО", typ: "tso", check: true, id: createGuid() });
  return DVC;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.get_ListAZS_Check = this.get_ListAZS_Check.bind(this);
    this.T_close = this.T_close.bind(this);

    this.state = {
      W_Width: window.innerWidth,
      W_Height: window.innerHeight,

      list_azs_check: null,
      DVC: Init_DVC(),
      direction: 'top',//'bottom',//

      animation: 'overlay',
      visible: false,
    }
  }


  handleAnimationChange = (animation) => () => this.setState((prevState) => ({
    animation, visible: !prevState.visible,
    list_azs_check: prevState.list_azs_check
  }))
  T_close(list_azs_check) { this.setState({ visible: false }) };

  handleResize(WindowSize, event) {
    this.setState({ W_Width: window.innerWidth, W_Height: window.innerHeight })
  }
  componentDidMount() {
    this.tick();
  }
  async tick() {
    let rss = RSS_AZS_EDIT;
    let token = localStorage.tokenData;
    if (token != null) {
      let r = token.indexOf("!^!");
      set_Curent_Login(token.substring(0, r));
      token = token.substring(r + 3);
    }
    var myRequest = new Request(rss);
    try {
      var response = await fetch(myRequest,
        {
          method: 'GET',
          headers:
          {
            'Authorization': "Bearer" + token,
            'Accept': 'application/json',
          },
        }
      );
      const Jsons = await response.json();
      if (response.ok) {
        this.setState({ list_azs_check: this.get_ListAZS_Check(Jsons.object) });
      }
      else {
        throw Error(response.statusText);
      }
      this.setState({ isExistError: false })
    }
    catch (error) {
      saveToken(null);
      this.setState({ isExistError: true })
      console.log(error);
    }
  }

  get_ListAZS_Check(data) {
    let List_AZS = new Array();
    if (data != null) {
      for (const item of data) {

        List_AZS.push({
          iid: item.iid,
          id: item.id,
          nm: item.dispname,
          check: true
        });
      }
    }
    //let tt = List_AZS.sort(this.compare_azs_iid);

    return List_AZS.sort(this.compare_azs_iid);
  }
  compare_azs_iid(a, b) {
    if (a.iid > b.iid) return 1;
    if (a.iid < b.iid) return -1;
  }

  render() {
    const { animation, dimmed, direction, visible, W_Height, W_Width } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
    let token = localStorage.tokenData;
    if (token != null) {
      return (

        <Router history={history}>
          <Nav handleAnimationChange={this.handleAnimationChange}
            count_AZS={(this.state.list_azs_check != null) ? get_list_azs_check_NEED(this.state.list_azs_check).length : 0} />
          <div className="content">
            <Sidebar.Pushable as={Segment}>

              <Filter_Sidebar_Main
                animation={animation}
                direction={direction}
                visible={visible}
                history={history} T_close={this.T_close}
                list_azs_check={this.state.list_azs_check}
                DVC={this.state.DVC}
                w_Height={this.state.W_Height}
              />

              <Sidebar.Pusher dimmed={dimmed && visible}>
                <Segment basic>
                  <Switch>
                    <Route exact path="/" render={({ history }) => <Main w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                      history={history}
                      list_azs_check={get_list_azs_check_NEED(this.state.list_azs_check)}
                      DVC={get_DVC_NEED(this.state.DVC)}
                    />} />


                    <Route exact path="/AZS_SF" render={({ history }) => <AZS_SF w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                      history={history}
                      list_azs_check={get_list_azs_check_NEED(this.state.list_azs_check)}
                      DVC={get_DVC_NEED(this.state.DVC)}
                    />} />

                    <Route exact path="/settings" component={Settings} />

                    {/*                       <Route exact path="/settingsFilter" render={({ history }) =>
                        <SettingsFilter
                          w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                          history={history}
                          list_azs_check={this.state.list_azs_check}
                          T_close={this.T_close}
                        />
                      }
                      />
 */}
                    <Route exact path="/clean" component={CleanTOKEN} />
                    <Route exact path="/help" component={Help} />
                    <Route exact path="/LeftPanel" render={({ history }) => <LeftPanel w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                      history={history} />} />

                    <Route exact path="/AccordPanel" render={({ history }) => <AccordPanel w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                      history={history} />} />


                    <Route exact path="/List_Edit_AZS" render={({ history }) => <Edit_List_AZS w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                      history={history} />} />


                    <Route exact path="/azs_listerror&*" render={(ev) => <AZS_listerror
                      azs_id={ev.match.params[0]}
                      w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                      _List_Objs={this.state._List_Objs}
                      history={this.props.history} />}
                    />


                    <Route exact component={NotFound} />
                  </Switch>

                </Segment>
              </Sidebar.Pusher>

            </Sidebar.Pushable>

          </div>
        </Router>
      );
    } else {
      return (
        <W_Login history={history} />
      );
    }
  }
}
