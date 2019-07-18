/*  
  Head - FannyPack info 
  Body - Account Info 
  FannyPack contains Multiple Accounts
  Pass userSerial on change from Head to Body
*/
// React
import React, { Component } from 'react'
// Head and Body
import HeadContent from './head'
import BodyContent from './body'

import AddFannyPack from './head/addFannyPack';


import RANDOMCOMBO from '../../../../component/RandomComboz'
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
      <div className="row h-100 overflowN">
        <div className="col m12 s12 h-100 overflowY">

          <HeadContent
            getUserFannyPack={this.props.getUserFannyPack}
            updateAlertMessage={this.props.updateAlertMessage}
            changeActiveFannyPack={this.props.changeActiveFannyPack}
            userFannyPackz={this.props.userFannyPackz}
            activeFannyPackName={this.props.activeFannyPackName}
            activeFannyPack={this.props.activeFannyPack}
            activeUser={this.props.activeUser}
            pageName={this.props.pageName} />


          <div className="container light-blue accent-2 my-1">
            <div className="row light-blue accent-1">
              <div className="col s10 m10 l10 dark-blue accent-2">
                <p>
                  FannyPack: {this.props.activeFannyPack}
                </p>
              </div>
              <div className="col dark-blue accent-2">
                <button
                  data-position="bottom"
                  data-tooltip="New FannyPack"
                  className="tooltipped blue-text text-darken-1 transparent btn-large waves-effect waves-dark z-depth-4">
                  <i className="material-icons">add</i>
                </button>
              </div>
              <div className="col s12 m12 l12 light-blue accent-2">

                <p>
                  GET ALL - Active FannyPack Accounts from fanny_Serial.accountRecord 
                </p>
                
                {this.props.activeFannyPack}
              </div>
            </div>
          </div>


          {/* Head - Add FannyPack and Select FannyPack 
          <div className="row card-1">
            <HeadContent
              getUserFannyPack={this.props.getUserFannyPack}
              updateAlertMessage={this.props.updateAlertMessage}
              changeActiveFannyPack={this.props.changeActiveFannyPack}
              userFannyPackz={this.props.userFannyPackz}
              activeFannyPackName={this.props.activeFannyPackName}
              activeFannyPack={this.props.activeFannyPack}
              activeUser={this.props.activeUser}
              pageName={this.props.pageName} />
          </div>
          {/* Body - Add and View Fanny's Accounts 
          <div className="row">
            <BodyContent
              activeFannyPackName={this.props.activeFannyPackName}
              userFannyPackz={this.props.userFannyPackz}
              activeFannyPack={this.props.activeFannyPack}
              activeUser={this.props.activeUser}
              pageName={this.props.pageName} />
          </div>
          */}




        </div>
      </div>
    );
  }
}
export default Content;
