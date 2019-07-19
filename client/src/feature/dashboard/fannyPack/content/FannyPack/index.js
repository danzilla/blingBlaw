/*  
  Head - FannyPack info 
  Body - Account Info 
  FannyPack contains Multiple Accounts
  Pass userSerial on change from Head to Body
*/
// React
import React, { Component } from 'react';
// Head and Body
import AddFannyPack from './addFannyPack';
import ViewFannyAccount from './viewFannyAccount';
// Content
class Content extends Component {
  // constructor
  constructor(props) {
    super(props)
    this.state = {
      activeFannyPackUser: "",
      activeFannyPack: "",
      userFannyPackz: ""
    }
  }
  // Raaar
  render() {
    return (
      <div className="row h-100 ">
        <div className="col m12 s12">
          <AddFannyPack
            getUserFannyPack={this.props.getUserFannyPack}
            updateAlertMessage={this.props.updateAlertMessage}
            changeActiveFannyPack={this.props.changeActiveFannyPack}
            userFannyPackz={this.props.userFannyPackz}
            activeFannyPackName={this.props.activeFannyPackName}
            activeFannyPack={this.props.activeFannyPack}
            activeUser={this.props.activeUser}
            pageName={this.props.pageName} />
          <hr />
          <ViewFannyAccount
            activeShowAccount={this.props.activeShowAccount}
            activeShowFannyPack={this.props.activeShowFannyPack}

            activeFannyPackName={this.props.activeFannyPackName}
            userFannyPackz={this.props.userFannyPackz}
            activeFannyPack={this.props.activeFannyPack}
            activeUser={this.props.activeUser}
            pageName={this.props.pageName} />
        </div>
      </div>
    );
  }
}
export default Content;
