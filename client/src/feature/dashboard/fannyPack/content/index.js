/*  
  Head - FannyPack info 
  Body - Account Info 
  FannyPack contains Multiple Accounts
  Pass userSerial on change from Head to Body
*/
// React
import React, { Component } from 'react';
// Head and Body
import FannyPack from './FannyPack';
import Account from './Account';
import RANDOMCOMBO from '../../../../component/RandomComboz';
// Content
class Content extends Component {
  // constructor
  constructor(props) {
    const pages = {
      showFannyPack: true,
      showAccount: false
    }
    super(props)
    this.state = {
      pages: pages,
      activeFannyPackUser: "",
      activeFannyPack: "",
      userFannyPackz: ""
    }
  }
  // activeShowAccount
  activeShowAccount = () => {
    this.setState({
      pages: {
        ...this.state.pages,
        showFannyPack: false, showAccount: true
      }
    })
  }
  // activeShowFannyPack
  activeShowFannyPack = () => {
    this.setState({
      pages: {
        ...this.state.pages,
        showFannyPack: true, showAccount: false
      }
    })
  }
  // Raaar
  render() {
    // Which content to show
    let showPage;
    if (this.state.pages.showFannyPack === true) {
      // FannyPack page
      showPage = <FannyPack
        activeShowAccount={this.activeShowAccount}
        activeShowFannyPack={this.activeShowFannyPack}

        getUserFannyPack={this.props.getUserFannyPack}
        updateAlertMessage={this.props.updateAlertMessage}
        changeActiveFannyPack={this.props.changeActiveFannyPack}
        userFannyPackz={this.props.userFannyPackz}
        activeFannyPackName={this.props.activeFannyPackName}
        activeFannyPack={this.props.activeFannyPack}
        activeUser={this.props.activeUser}
        pageName={this.props.pageName} />;
    } else if (this.state.pages.showAccount === true) {
      // Account page
      showPage = <Account    
        activeShowAccount={this.activeShowAccount}
        activeShowFannyPack={this.activeShowFannyPack}

        getUserFannyPack={this.props.getUserFannyPack}
        updateAlertMessage={this.props.updateAlertMessage}
        changeActiveFannyPack={this.props.changeActiveFannyPack}
        userFannyPackz={this.props.userFannyPackz}
        activeFannyPackName={this.props.activeFannyPackName}
        activeFannyPack={this.props.activeFannyPack}
        activeUser={this.props.activeUser}
        pageName={this.props.pageName} />;
    } else {
      // FannyPack page
      showPage = <FannyPack
        activeShowAccount={this.activeShowAccount}
        activeShowFannyPack={this.activeShowFannyPack}

        getUserFannyPack={this.props.getUserFannyPack}
        updateAlertMessage={this.props.updateAlertMessage}
        changeActiveFannyPack={this.props.changeActiveFannyPack}
        userFannyPackz={this.props.userFannyPackz}
        activeFannyPackName={this.props.activeFannyPackName}
        activeFannyPack={this.props.activeFannyPack}
        activeUser={this.props.activeUser}
        pageName={this.props.pageName} />;
    }
    return (
      <div className="row h-100 overflowN">
        <div className="col m12 s12 h-100 overflowY">
          {JSON.stringify(this.state.pages)}
          {/* Page content */}
          {showPage}
        </div>
      </div>
    );
  }
}
export default Content;
