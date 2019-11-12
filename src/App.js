import React, { Component } from 'react';
import PropTypes from 'prop-types'

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './App.css';


import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'


import { demoAsyncCall, saveToken, RSS_AZS_EDIT, set_Curent_Login, get_Curent_Login, refreshPage } from './core/core_Function.jsx'

import history from "./controls/history";

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Link as S_Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import W_AZS_SF from './w_AZS_SF.jsx'

import W_main_edit_azs from './azs_sf/edit/w_main_edit_azs.jsx'

import W_ListErr_AZS from './azs_sf/j_err/listErr_AZS.jsx';


import W_Login from './w_Login.jsx'

import W_LeftPanel from './test/w_LeftPanel.jsx'
import W_AccordPanel from './test/w_AccordPanel.jsx'


const _Debuge_LeftPanel = false;
const _Debuge_TestMenu = false;

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as='a'>
      <Icon name='home' />
      Home
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='gamepad' />
      Games
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='camera' />
      Channels
    </Menu.Item>
  </Sidebar>
)
VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

class Main extends Component {
  render() {
    return (<W_AZS_SF w_Height={this.props.w_Height} w_Width={this.props.w_Width}
      history={this.props.history} />);
  }
}
class AZS_SF extends Component {
  render() {

    return (<W_AZS_SF
      w_Height={this.props.w_Height}
      w_Width={this.props.w_Width}
      history={this.props.history} />);
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
    return <center><h2>Настройки</h2></center>;
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
  }
  render() {
    return (
      <nav>
        <ul className="topmenu">
          <li>
            <div className="header_Inner">

              <table className="header_Right">
                <tbody>
                  <tr>
                    {_Debuge_LeftPanel &&
                      <td id='td_mb'>
                        <button className='btn_Reload' type="button" onClick={this.props.handleAnimationChange('overlay')}>
                          <img className="header_Img" src={'../images/Normal.png'} alt="React"
                            width="14" height="14" />
                        </button>
                      </td>
                    }
                    <td id='td_mb'>
                    
                      <Link to="/" className="test3">Меню</Link>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="header_Text">
                <tbody>
                  <tr>
                    <td id='td_m'>
                      <S_Link activeClass="active" className="test1" to="test1"
                        spy={true} smooth={true} duration={500} offset={-40}>
                        цены</S_Link>
                    </td><td id='td_m'>
                      <S_Link activeClass="active" className="test2" to="test2"
                        spy={true} smooth={true} duration={500} offset={-40}>
                        тсо</S_Link>
                    </td><td id='td_m'>
                      <S_Link activeClass="active" className="test3" to="test3"
                        spy={true} smooth={true} duration={500} offset={-40}>
                        трк</S_Link>
                    </td><td id='td_m'>
                      <S_Link activeClass="active" className="test4" to="test4"
                        spy={true} smooth={true} duration={500} offset={-40}>
                        резервуары</S_Link>
                    </td>
                    <td id='td_m'>
                      <S_Link activeClass="active" className="test5" to="test5"
                        spy={true} smooth={true} duration={500} offset={-40}>
                        видео</S_Link>
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
            </div>
            <ul className="submenu">
              <li><Link to="/" >Главная</Link></li>
              <li><Link to="/AZS_SF" >Начальная</Link></li>

              <li><Link to="/"><center>Справочники&gt;&gt;</center></Link>
                <ul className="submenu">
                  <li><Link to="/List_Edit_AZS" >Справочник АЗК</Link></li>
                  <li><Link to="/settings">Настройки</Link></li>
                </ul>
              </li>




              <li><Link to="/clean">Очистить</Link></li>
              <li><Link to="/help">Помощь</Link></li>
              {_Debuge_TestMenu &&
                <li><Link to="/"><center>Тестовая &gt;&gt;</center></Link>
                  <ul className="submenu">
                    <li><Link to="/LeftPanel">Левая панель</Link></li>
                    <li><Link to="/AccordPanel">Аккордная панель</Link></li>
                  </ul>
                </li>
              }
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      W_Width: window.innerWidth,
      W_Height: window.innerHeight,
      data: null,
    }
  }
  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))

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
        this.setState({ data: Jsons });
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

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
    let token = localStorage.tokenData;
    if (token != null) {
      if (_Debuge_LeftPanel) {
        return (
          <Router history={history}>
            <Nav handleAnimationChange={this.handleAnimationChange} />
            <div className="content">

              <Sidebar.Pushable as={Segment}>
                {vertical ? (
                  null
                ) : (
                    <VerticalSidebar
                      animation={animation}
                      direction={direction}
                      visible={visible}
                    />
                  )}
                <Sidebar.Pusher dimmed={dimmed && visible}>
                  <Segment basic>
                    <Switch>
                      <Route exact path="/" render={({ history }) => <Main w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                        history={history} />} />
                      <Route exact path="/AZS_SF" render={({ history }) => <AZS_SF w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                        history={history} />} />
                      <Route exact path="/settings" component={Settings} />
                      <Route exact path="/clean" component={CleanTOKEN} />
                      <Route exact path="/help" component={Help} />
                      <Route exact path="/LeftPanel" render={({ history }) => <LeftPanel w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                        history={history} />} />
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
          <Router history={history}>
            <Nav handleAnimationChange={this.handleAnimationChange} />
            <div className="content">

              <Switch>
                <Route exact path="/" render={({ history }) => <Main w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                  history={history} />} />
                <Route exact path="/AZS_SF" render={({ history }) => <AZS_SF w_Height={this.state.W_Height} w_Width={this.state.W_Width}
                  history={history} />} />
                <Route exact path="/settings" component={Settings} />
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
                  history={this.props.history}
                />} />


                <Route exact component={NotFound} />
              </Switch>

            </div>
          </Router>
        );

      }
    } else {
      return (
        <W_Login history={history} />
      );
    }
  }
}
